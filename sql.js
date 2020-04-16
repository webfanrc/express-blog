const sql = require('mysql');

exports.connection = sql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'rootroot',
  database: 'test'
});