const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Classroom = require('../models/Classroom');

// Function to create a principal account (run on server start)
exports.createPrincipal = async () => {
  try {
    let user = await User.findOne({ email: 'principal@classroom.com' });

    if (!user) {
      const hashedPassword = await bcrypt.hash('Admin', 12);
      user = new User({
        name: 'Principal',
        email: 'principal@classroom.com',
        password: hashedPassword,
        role: 'Principal',
      });
      await user.save();
      console.log('Principal account created');
    } else {
      console.log('Principal account already exists');
    }
  } catch (error) {
    console.error(error);
  }
};

// Function for the principal to create a teacher
exports.createTeacher = async (req, res) => {
  console.log(req.user.role);
  
  if (req.user.role !== 'Principal') {
    return res.status(403).json({ msg: 'Access denied' });
  }

  const { name, email, password } = req.body;

  try {
    console.log("daakjdfn");
    
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      name,
      email,
      password: await bcrypt.hash(password, 12),
      role: 'Teacher',
    });

    await user.save();

    res.status(201).json({ msg: 'Teacher created successfully' });
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Function for the principal to create a student
exports.createStudent = async (req, res) => {
  if (req.user.role !== 'Principal' && req.user.role !== 'Teacher') {
    return res.status(403).json({ msg: 'Access denied' });
  }

  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      name,
      email,
      password: await bcrypt.hash(password, 12),
      role: 'Student',
    });

    await user.save();

    res.status(201).json({ msg: 'Student created successfully' });
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Login function
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = { userId: user.id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).send('Server error');
  }
};
exports.me= async (req,res)=>{
  try {
    const user = req.user;
    console.log(user);
    
    res.send({
      name: user.name,
      email: user.email,
      role: user.role, // Assuming role is a field in your User model
    });
  } catch (err) {
    res.status(500).send({ error: 'Error fetching user information.' });
  }
}
exports.teacherList = async (req,res)=>{
  // try {
  //   const teachers = await User.find({ role: 'Teacher' }).select('-password'); // Exclude password field
  //   res.json(teachers);
  // } catch (err) {
  //   res.status(500).json({ error: 'Failed to fetch teachers' });
  // }
  try {
    const teachers = await User.find({ role: 'Teacher' }).select('-password');

    // Fetch the classrooms to match the assigned teacher
    const classrooms = await Classroom.find().populate('teacher', 'name');

    // Map the classroom to its respective teacher
    const teachersWithClassroom = teachers.map(teacher => {
      const classroom = classrooms.find(c => c.teacher && c.teacher._id.equals(teacher._id));
      return {
        ...teacher._doc,
        classroom: classroom ? classroom.name : 'Not Assigned',
      };
    });

    res.json(teachersWithClassroom);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch teachers' });
  }
}
exports.studentList = async (req,res)=>{
  try {
    const students = await User.find({ role: 'Student' }).select('-password');

    // Fetch all classrooms to match the assigned students
    const classrooms = await Classroom.find().populate('students', 'name');

    // Map the classroom to its respective student
    const studentsWithClassroom = students.map(student => {
      const classroom = classrooms.find(c => c.students.some(s => s._id.equals(student._id)));
      return {
        ...student._doc,
        classroom: classroom ? classroom.name : 'Not Assigned',
      };
    });

    res.json(studentsWithClassroom);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
  
}
