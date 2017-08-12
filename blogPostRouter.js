const express = require('express');
const bodyParser = require('body-parser');

const router = express.router();
const jsonParser = bodyparser.json();

const {BlogPosts} = require('./models');

router.get('/', (req, res) => {
	res.json(BlogPosts.get());
});

module.exports = router;

