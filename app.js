const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

const app = express();

// Connect to DB
mongoose.set('strictQuery', true);

mongoose.connect(
    process.env.DB_COLLECTION,
    () => {
    console.log("connected to db");
});

// Import Routes
const postsRoute = require('./routes/posts');

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use('/posts', postsRoute);



// Listen
app.listen(3000);