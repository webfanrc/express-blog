const express = require('express');
const app = express();
const port = 3000;

const middleware = require('./middleware');
const site = require('./site');
const blog = require('./blog');
const statistic = require('./statistic');

// middleware
app.use(middleware.setHeader);
app.use('/blog', middleware.ipFilterAndLogIn);


// General
app.get('/', site.index);


// blog
app.get('/blog/lists', blog.lists);
app.get('/blog/detail', blog.detail);
app.post('/blog/update', blog.update);
app.get('/blog/distinct', blog.distinct);
app.get('/blog/tag', blog.tag);

// statistic
app.get('/statistic/ip', statistic.ip);
app.get('/statistic/article', statistic.article);


// static
app.use(express.static('public'));



app.listen(port, () => console.log(`Example app listening on port ${port}!`));