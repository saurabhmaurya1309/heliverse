const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const auth = require('../middlewares/authMiddleware');

// Login route
router.post('/login', AuthController.login);

// Principal creates teachers and students
router.get('/me',auth, AuthController.me);


router.post('/create-teacher', auth, AuthController.createTeacher);
router.get('/teacher-list', auth, AuthController.teacherList);

router.post('/create-student', auth, AuthController.createStudent);
router.get('/student-list', auth, AuthController.studentList);

module.exports = router;
