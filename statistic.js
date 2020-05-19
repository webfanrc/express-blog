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
  connection.query(sql, function (error, res) {
    response.write(JSON.stringify(res[0]));
    response.end();
  });
};

exports.readAmountPv = function (request, response) {
  let id = url.parse(request.url, true).query.id;
  let sql = `
    select count(*) as count
    from pv
    where view_title like '%detail?id=${id}'
  `;
  connection.query(sql, function (error, res) {
    response.write(JSON.stringify(res[0]));
    response.end();
  });
};

exports.orderByReading = function (request, response) {
  let sql = `
  select A.readAmounts, blog.title, blog.id, blog.create_date
  from 
      
  (select view_title, count(*) as readAmounts
  from ip
  where view_title like '%/blog/detail?id%'
  group by view_title)
      
  A INNER JOIN blog
  on A.view_title like concat('%id=', blog.id)
  order by A.readAmounts DESC, blog.create_date DESC
  `;
  connection.query(sql, function (error, res) {
    response.write(JSON.stringify(res));
    response.end();
  });
};
