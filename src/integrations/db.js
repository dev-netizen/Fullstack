const mysql = require('mysql2/promise');

let pool;

module.exports.query = async (mysql, params = []) => {
  try {
    const [rows] = await pool.query(mysql, params);
    return rows;
  } catch (error) {
    return error;
  }
};
module.exports.init = async (connstr) => {
  try {
    pool = new mysql.createPool(connstr);
  } catch (error) {
    console.error(error);
  }
};
