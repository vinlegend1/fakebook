// Import dependencies
const express = require('express');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const passport = require('passport');

// Use dotenv to access .env variables
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const app = express();

// Use middlewares
require('./passport.config');
app.use(cookieParser());
app.use(cors());
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to mongoose
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;

connection.once('open', () => {
  console.log('Connected to MongoDB successfully!')
});

app.use('/api/user', require('./routes/user'));
app.use('/api/post', require('./routes/post'));
// app.use('/api/message', require('./routes/message'));
app.use('/api/friends', require('./routes/friends'));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));