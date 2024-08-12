const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', require('./routes/authRoute'));
app.use('/api/classrooms', require('./routes/classroom'));
app.use('/api/timetable', require('./routes/timetable')); // Optional

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Create Principal account on server start
const AuthController = require('./controllers/authController');
AuthController.createPrincipal();
