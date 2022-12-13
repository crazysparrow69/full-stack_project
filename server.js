const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// Global variables
const PORT = 3500;

// Connect to db
connectDB();

// Middleware for cookies
app.use(cookieParser());

// Built-in middleware for json
app.use(express.json());

// Serve static files
app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/register', express.static(path.join(__dirname, '/public')));
app.use('/auth', express.static(path.join(__dirname, '/public')));

// Routes
app.use('/', require('./route/rootRoute'));
app.use('/register', require('./route/registerRoute'));
app.use('/auth', require('./route/authRoute'));
app.use('/logout', require('./route/logoutRoute'));
app.use('/refresh', require('./route/refreshRoute'));

// Listen ports
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});
