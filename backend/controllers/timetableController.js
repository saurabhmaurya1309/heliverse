const Timetable = require('../models/TimeTable');
const Classroom =require('../models/Classroom')

exports.getTimetable = async (req, res) => { 
  
  try {
    const classroom = await Classroom.findOne({ students: req.user._id });
    
    if (!classroom) {
      return res.status(404).json({ error: 'Classroom not found' });
    }
    const timetable = await Timetable.find({ classroom: classroom._id });
    res.json(timetable);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch timetable' });
  }
};
exports.createTimetable = async (req, res) => {
  
  try {
    const { subject, startTime, endTime, day } = req.body;
    const { classroomId } = req.params;
    console.log("classroomId",classroomId);

    const validDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    if (!validDays.includes(day)) {
      return res.status(400).json({ error: 'Invalid day' });
    }

    const classroom = await Classroom.findById(classroomId);
    console.log("classroomIddsd");
    
    if (!classroom) {
      return res.status(404).json({ error: 'Classroom not found' });
    }
      console.log("classroom is ",classroom);
      
    const timetable = new Timetable({
      classroom: classroomId,
      subject,
      startTime,
      endTime,
      day
    });

    await timetable.save();

    res.status(201).json(timetable);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create timetable' });
  }
};
