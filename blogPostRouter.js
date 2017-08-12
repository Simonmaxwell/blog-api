const express = require('express');
const bodyParser = require('body-parser');

const router = express.router();
const jsonParser = bodyparser.json();

const {BlogPosts} = require('./models');



