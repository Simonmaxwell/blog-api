const express = require('express');
const morgan = require('morgan');

const app = express();
const blogPostsRouter = require('./blogPostsRouter');

app.use(morgan('common'));
app.use('/blog-posts', blogPostRouter);

app.listen(process.env.PORT || 8080, () => {
  console.log(`App is up on ${process.env.PORT || 8080}`);
});