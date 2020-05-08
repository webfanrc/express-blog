const sql = require('./sql');
const url = require("url");
var connection = sql.connection;


exports.ip = function (request, response) {
  let sql = `
  select 
  date_format(view_date, '%Y-%m-%d') date, count(*) count 
  from ip
  group by date_format(view_date, '%Y-%m-%d');`;
  connection.query(sql, function(error, res) {
    let results = {};
    results.ipListFormat = res;
    if (typeof res != 'undefined') {
      response.write(JSON.stringify(results));
    }
    response.end();
  });
};

exports.article = function ( request, response ) {
  let sql = `select date_format(create_date, '%Y-%m') as date, count(*) as count from blog group by date ORDER BY date;`;
  connection.query(sql, function(error, res) {
    let results = {};
    results.articleListFormat = res;
    if (typeof res != 'undefined') {
      response.write(JSON.stringify(results));
    }
    response.end();
  });
};

exports.readAmount = function (request, response) {
  let id = url.parse(request.url, true).query.id;
  let sql = `
    select count(*) as count
    from ip
    where view_title like '%detail?id=${id}'
  `;
  console.log(sql);
  connection.query(sql, function (error, res) {
    console.log(error);
    response.write(JSON.stringify(res[0]));
    response.end();
  });
};

exports.readAmounts = function (request, response) {
  let sql = `  
    select blog.id, A.count
    from blog
    join
    (
    select view_title, count(*) as count 
    from ip
    group by view_title
    ) A
    on A.view_title = '/blog/detail?id=31'
  `;
  console.log(sql);
  connection.query(sql, function (error, res) {
    console.log(error);
    response.write(JSON.stringify(res[0]));
    response.end();
  });
};

