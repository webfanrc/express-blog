const sql = require('./sql');
var connection = sql.connection;


exports.ip = function (request, response) {
  let sql = `select date_format(view_date, '%Y-%m-%d') date, count(*) count from ip group by date_format(view_date, '%Y-%m-%d');`;
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