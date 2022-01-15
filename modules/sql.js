//sql.js
// SQL语句封裝
const user = {
  insert: 'INSERT INTO s_user(username, password, status,auth) VALUES(?,?,?,?)',
  update: 'UPDATE s_user SET username=?, password=?, status=?, auth=? WHERE id=?',
  delete: 'DELETE FROM s_user WHERE id=?',
  queryByUserName: 'SELECT * FROM s_user WHERE username=?',
  queryAll: 'SELECT * FROM s_user',
  logins: 'SELECT * FROM s_user where username=? and password=?'
};
module.exports = user;