const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models');

BlogPosts.create(
  "Chickens think you're dumb too.", "It's true", "Jethro");
BlogPosts.create(
  "Visions of a dead god", "I wouldn't believe it either", "Dr Melamed");

router.get('/', (req, res) => {
	res.json(BlogPosts.get());
});

router.post('/', jsonParser, (req, res) => {
	const requiredFields = ['title', 'content', 'author'];
	for (let i=0; i<requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
  		const message = `Missing \`${field}\` in request body`
  		console.error(message);
  		return res.status(400).send(message);
		}
	}
	const item = BlogPosts.create(req.body.title, req.body.content, req.body.author);
    res.status(201).json(item);
});

router.put('/:id', jsonParser, (req, res) => {
	const requiredFields = ['id', 'title', 'content', 'author', 'publishDate'];
	for (let i=0; i<requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
			const message = `Missing \`${field}\` in request body`
  		console.error(message);
  		return res.status(400).send(message);
		}
	}
	if (req.params.id !== req.body.id) {
    const message = (
    	`Your dang id: (${req.params.id}) doesn't match this id: `
    	`(${req.body.id}) ya doofus!`);
    console.error(message);
   	return res.status(400).send(message);
  }
  console.log(`Updating blog post with id \`${req.params.id}\``);
  const updatedItem = BlogPosts.update({
  	id: req.params.id,
  	title: req.body.title,
  	content: req.body.content,
 		author: req.body.author,
  	publishDate: req.body.publishDate
  });
  res.status(200).json(updatedItem);
})

router.delete('/:id', jsonParser, (req, res) => {
	BlogPosts.delete(req.params.id);
	console.log('Your legacy has been scrubbed from this server.')
	res.status(204).end();
});



module.exports = router;

