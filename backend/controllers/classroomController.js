const Classroom = require('../models/Classroom');
const User = require('../models/User');

exports.createClassroom = async (req, res) => {
  const { name, startTime, endTime, days } = req.body;

  try {
    const classroom = new Classroom({ name, startTime, endTime, days });
    await classroom.save();
    res.status(201).json(classroom);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

exports.assignTeacher = async (req, res) => {
  const { classroomId, teacherId } = req.body;

  try {
    const classroom = await Classroom.findById(classroomId);
    const teacher = await User.findById(teacherId);

    if (!classroom || !teacher || teacher.role !== 'Teacher') {
      return res.status(400).json({ msg: 'Invalid classroom or teacher' });
    }

    classroom.teacher = teacher;
    await classroom.save();

    res.status(200).json(classroom);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

exports.assignStudents = async (req, res) => {
  const { classroomId, studentIds } = req.body;

  try {
    const classroom = await Classroom.findById(classroomId);
    const students = await User.find({ _id: { $in: studentIds }, role: 'Student' });

    if (!classroom || students.length !== studentIds.length) {
      return res.status(400).json({ msg: 'Invalid classroom or students' });
    }

    classroom.students.push(...students);
    await classroom.save();

    res.status(200).json(classroom);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

exports.getClassrooms = async (req, res) => {
  try {
    const classrooms = await Classroom.find().populate('teacher', 'name');
    res.json(classrooms);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch classrooms' });
  }
};
exports.getClassroomStudents = async (req, res) => {
  try {
    console.log("hjvjhvh");
    const classroom = await Classroom.findById(req.params.classroomId).populate('students', 'name email');
      
    if (!classroom) {
      return res.status(404).json({ error: 'Classroom not found' });
    }

    res.json(classroom.students);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
};
exports.getTeacher = async (req, res) => {
  try {
    const classroom = await Classroom.findOne({ teacher: req.user._id }).populate('students', 'name email');

    if (!classroom) {
      return res.status(404).json({ error: 'Classroom not found' });
    }

    res.json(classroom); 
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch classroom' });
  }
};
exports.getStudent = async(req,res)=>{
  try {
    const classroom = await Classroom.findOne({ students: req.user._id }).populate('students', 'name email');
    if (!classroom) {
      return res.status(404).json({ error: 'Classroom not found' });
    }
    res.json(classroom.students);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
}
