const mysql = require('mysql');
const url = require("url");

const crypto = require('crypto');
const UpdateArticleSecret = "a80bfa6001b769ce9689d4208ff2840e21cecde470a7dc109407ae0b0e57821c";

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rootroot',
  database: 'test'
});
connection.connect(); //todo: disconnect

exports.lists = function(request, response) {
  let sql = 'select id, title, DATE_FORMAT(create_date, \'%Y年%m月%d日\') as date from blog order by create_date DESC';
  connection.query(sql, function(error, res) {
    let results = {};
    results.blogList = res;

    if (typeof res != 'undefined') {
      response.write(JSON.stringify(results));
    }
    response.end();
  });
};

exports.detail = function (request, response) {
  let title = url.parse(request.url, true).query.title;
  let sql = `select * from blog where title = '${title}'`;
  connection.query(sql, function(error, results) {
    response.write(JSON.stringify(results));
    response.end();
  });
};

exports.update = function(request, response) {
  let post = '';

  request.on('data', function(chunk){
    post += chunk;
  });

  request.on('end', function(){

    if (post != '') {
      let userData = JSON.parse(post);

      console.log(123);
      const secret = userData.passport;
      const hash = crypto.createHmac('sha256', secret).digest('hex');
      if (hash == UpdateArticleSecret) {
        connection.query(`UPDATE blog SET ? where id=${userData.id}`, {
          content: userData.blog_content,
        })
      } else {
        console.log('fail');
      }
    }
  });

  response.end();
};