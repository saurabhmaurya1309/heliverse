const express = require('express');
const router = express.Router();
const ClassroomController = require('../controllers/classroomController');
const auth = require('../middlewares/authMiddleware');


// Classroom management routes
router.post('/create', auth,ClassroomController.createClassroom);
router.post('/assign-teacher',auth, ClassroomController.assignTeacher);
router.post('/assign-students',auth ,ClassroomController.assignStudents);
router.get('/',auth, ClassroomController.getClassrooms);
router.get('/:classroomId/students',auth, ClassroomController.getClassroomStudents);
router.get('/classroom',auth, ClassroomController.getTeacher);
router.get('./student',auth,ClassroomController.getStudent);



module.exports = router;
