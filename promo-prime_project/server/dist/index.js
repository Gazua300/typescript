"use strict";
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.listen(3003, () => {
    console.log('Server running at http://localhost:3003');
});
const signup = require('./endpoints/signup');
const login = require('./endpoints/login');
app.post('/login', login);
app.post('/signup', signup);
