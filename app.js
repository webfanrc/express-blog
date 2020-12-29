const express = require('express');
const app = express();
const port = 3000;

const middleware = require('./middleware');
const blog = require('./blog');
const statistic = require('./statistic');
const file = require('./file');
const fileUpload = require('express-fileupload');


// middleware
app.use(middleware.setHeader);
app.use(fileUpload());
app.use('/blog/lists', middleware.ipFilter); // Blog.vue
app.use('/blog/detail', middleware.ipFilter); // BlogDetail.vue
app.use('/blog/all', middleware.ipFilter); // Archives.vue
app.use('/statistic/ip', middleware.ipFilter); // Statistic.vue
// todo // About.vue

app.use('/blog/lists', middleware.pvFilter); // Blog.vue
app.use('/blog/detail', middleware.pvFilter); // BlogDetail.vue
app.use('/blog/all', middleware.pvFilter); // Archives.vue
app.use('/statistic/ip', middleware.pvFilter); // Statistic.vue
// todo // About.vue

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
app.get('/statistic/pv', statistic.pv);
app.get('/statistic/article', statistic.article);
app.get('/statistic/readAmount', statistic.readAmount);
app.get('/statistic/orderByReading', statistic.orderByReading);

// Serve File
app.get('/file/ps', file.ps);
app.post('/file/singleNew', file.singleNew);



app.listen(port, () => console.log(`App listening on port ${port}!`));