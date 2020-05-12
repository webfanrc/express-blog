const express = require('express');
const app = express();
const port = 3000;

const middleware = require('./middleware');
const blog = require('./blog');
const statistic = require('./statistic');

// middleware
app.use(middleware.setHeader);
app.use('/blog', middleware.ipFilterAndLogIn);


// blog
app.get('/blog/lists', blog.lists);
app.get('/blog/detail', blog.detail);
app.post('/blog/update', blog.update);
app.post('/blog/new', blog.new);
app.post('/blog/delete', blog.delete);
app.get('/blog/distinct', blog.distinct);
app.get('/blog/all', blog.all);
app.get('/blog/tagChange', blog.tagChange);

// statistic
app.get('/statistic/ip', statistic.ip);
app.get('/statistic/article', statistic.article);
app.get('/statistic/readAmount', statistic.readAmount);
app.get('/statistic/orderByReading', statistic.orderByReading);

// static
app.use(express.static('public'));



app.listen(port, () => console.log(`Example app listening on port ${port}!`));