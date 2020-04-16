const sql = require('./sql');
var connection = sql.connection;

exports.setHeader = function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin","http://localhost:8081");
  console.log('req.originalUrl: ', req.originalUrl);
  next();
};

exports.ipFilterAndLogIn = function (req, res, next) {
  let user_ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress; //需要在nginx上进行配置
  let view_title = req.originalUrl;
  let view_date = new Date();

  let date = "";
  let month = view_date.getMonth() < 10 ? '0' + (view_date.getMonth() + 1) : view_date.getMonth() + 1;

  if (view_date.getDate() < 10) {
    date = '0' + view_date.getDate();
  } else {
    date = view_date.getDate();
  }

  let formate_view_date = view_date.getFullYear() + '-' + (month) + '-' + date;

  let sql = `select * from ip where user_ip='${user_ip}' and view_title='${view_title}' and date_format(view_date, '%Y-%m-%d')='${formate_view_date}'`;

  connection.query(sql, function(error, res) {
    if (typeof res != 'undefined') {
      if (res.length != 0) { // 存在内容，
        console.log('ipHasLoggedInTheDay');
      } else {
        console.log('ipHasNotLoggedInTheDay');
        connection.query('INSERT INTO ip SET ?', {
          user_ip: user_ip,
          view_title: view_title,
          view_date: view_date,
        })
      }
    }
    next();
  })
};