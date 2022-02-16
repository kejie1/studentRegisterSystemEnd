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
}
const vocationalSql = {
  insert: 'INSERT INTO s_vocational(username, password,phone,email, status,accountType,collegeId) VALUES(?,?,?,?,?,?,?,?)',
  update: 'UPDATE s_vocational SET username=?, password=?, status=?, auth=? WHERE id=?',
  delete: 'DELETE FROM s_vocational WHERE id=?',
  queryByUserName: 'SELECT * FROM s_vocational WHERE username=?',
  queryAll: 'SELECT * FROM s_vocational',
}
const studentsSql = {
  insert: 'INSERT INTO s_students(name,studentId,sex,age,phone,idCard,collegeId,vocationalId,classId,hostelId,ethnic,birthPlace,address,graduate,counselorId,counselorPhone) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
  update: 'UPDATE s_students SET name=?,sex=?,age=?,phone=?,idCard=?,college=?,class=?,hostelId=?,ethnic=?,birthPlace=?,address=?,college=?,counselor=?,counselorPhone=? WHERE id=?',
  delete: 'DELETE FROM s_students WHERE id=?',
  queryByName: 'SELECT * FROM s_students WHERE name=? and collegeId=? and vocationalId=?',
  queryAll: 'SELECT * FROM s_students order by id asc limit ?, ?',
}
const counselorSql = {
  insert: 'INSERT INTO s_counselor(name,studentId,sex,age,phone,idCard,collegeId,vocationalId,classId,hostelId,ethnic,birthPlace,address,graduate,counselorId,counselorPhone) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
  update: 'UPDATE s_counselor SET name=?,sex=?,age=?,phone=?,idCard=?,college=?,class=?,hostelId=?,ethnic=?,birthPlace=?,address=?,college=?,counselor=?,counselorPhone=? WHERE id=?',
  delete: 'DELETE FROM s_counselor WHERE id=?',
  queryByName: 'SELECT * FROM s_counselor WHERE name=? and collegeId=? and vocationalId=?',
  queryAll: 'SELECT * FROM s_counselor order by id asc limit ?, ?',
}
module.exports = {userSql,collegeSql,studentsSql,vocationalSql,counselorSql};