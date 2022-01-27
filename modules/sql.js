//sql.js
// SQL语句封裝
const userSql = {
  insert: 'INSERT INTO s_user(username, password,phone,email, status,accountType,collegeId) VALUES(?,?,?,?,?,?,?)',
  update: 'UPDATE s_user SET username=?, password=?,phone=?,email=?, status=?,accountType=?,collegeId=? WHERE id=?',
  delete: 'DELETE FROM s_user WHERE id=?',
  queryByUserName: 'SELECT * FROM s_user WHERE username=?',
  queryAll: 'SELECT * FROM s_user',
  logins: 'SELECT * FROM s_user where username=? and password=?'
};
const collegeSql = {
  insert: 'INSERT INTO s_college(username, password,phone,email, status,accountType,collegeId) VALUES(?,?,?,?,?,?,?,?)',
  update: 'UPDATE s_college SET username=?, password=?, status=?, auth=? WHERE id=?',
  delete: 'DELETE FROM s_college WHERE id=?',
  queryByUserName: 'SELECT * FROM s_college WHERE username=?',
  queryAll: 'SELECT * FROM s_college',
  logins: 'SELECT * FROM s_college where username=? and password=?'
}
const studentsSql = {
  insert: 'INSERT INTO s_students(name,sex,age,phone,idCard,collegeId,classId,hostelId,ethnic,birthPlace,address,graduate,counselorId,counselorPhone) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
  update: 'UPDATE s_students SET name=?,sex=?,age=?,phone=?,idCard=?,college=?,class=?,hostelId=?,ethnic=?,birthPlace=?,address=?,college=?,counselor=?,counselorPhone=? WHERE id=?',
  delete: 'DELETE FROM s_students WHERE id=?',
  queryByUserName: 'SELECT * FROM s_students WHERE username=?',
  // queryAll: 'SELECT * FROM s_students',
  queryAll: 'SELECT * FROM s_students order by id desc limit ?, ?',
}
module.exports = {userSql,collegeSql,studentsSql};