const express = require('express');
const router = express.Router();
const TimetableController = require('../controllers/timetableController');
const auth = require('../middlewares/authMiddleware');
router.get('/', auth,TimetableController.getTimetable);
router.post('/:classroomId/timetable', auth, TimetableController.createTimetable);

module.exports = router;
