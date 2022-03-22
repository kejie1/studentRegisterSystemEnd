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
  insert: 'INSERT INTO s_college(collegeStr, principal) VALUES(?,?)',
  update: 'UPDATE s_college SET collegeStr=?, principal=? WHERE id=?',
  delete: 'DELETE FROM s_college WHERE id=?',
  queryByUserName: 'SELECT * FROM s_college WHERE username=?',
  queryCollegeStrById: 'SELECT collegeStr FROM s_college WHERE id=?',
  queryCollegeById: 'SELECT * FROM s_college WHERE id=?',
  queryAll: 'SELECT * FROM s_college order by id asc limit ?, ?',
  queryCount: 'SELECT COUNT(*) FROM s_college',
  queryCollegeName: 'SELECT * FROM s_college WHERE collegeStr LIKE ?',
}
const vocationalSql = {
  insert: 'INSERT INTO s_vocational(username, password,phone,email, status,accountType,collegeId) VALUES(?,?,?,?,?,?,?,?)',
  update: 'UPDATE s_vocational SET username=?, password=?, status=?, auth=? WHERE id=?',
  delete: 'DELETE FROM s_vocational WHERE id=?',
  queryByUserName: 'SELECT * FROM s_vocational WHERE username=?',
  queryVocationalStrById: 'SELECT * FROM s_vocational WHERE id=?',
  queryVocationalById: 'SELECT * FROM s_vocational WHERE collegeId=?',
  queryAll: 'SELECT * FROM s_vocational',
}
const studentsSql = {
  insert: 'INSERT INTO s_students(name,studentId,sex,age,phone,idCard,collegeId,vocationalId,classId,hostelId,ethnic,birthPlace,address,graduate,counselorId,counselorPhone) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
  update: 'UPDATE s_students SET name=?,studentId=?,sex=?,age=?,phone=?,idCard=?,collegeId=?,vocationalId=?,classId=?,hostelId=?,ethnic=?,birthPlace=?,address=?,graduate=?,counselorId=?,counselorPhone=? WHERE id=?',
  delete: 'DELETE FROM s_students WHERE id=?',
  queryByName: 'SELECT * FROM s_students WHERE name=? and collegeId=? and vocationalId=?',
  queryById: 'SELECT * FROM s_students WHERE id=?',
  queryAll: 'SELECT * FROM s_students order by id asc limit ?, ?',
  queryCount: 'SELECT COUNT(*) FROM s_students',
  queryByHostel: 'SELECT * FROM s_students WHERE hostelId=?',
}
const counselorSql = {
  insert: 'INSERT INTO s_counselor(name,studentId,sex,age,phone,idCard,collegeId,vocationalId,classId,hostelId,ethnic,birthPlace,address,graduate,counselorId,counselorPhone) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
  update: 'UPDATE s_counselor SET name=?,sex=?,age=?,phone=?,idCard=?,college=?,class=?,hostelId=?,ethnic=?,birthPlace=?,address=?,college=?,counselor=?,counselorPhone=? WHERE id=?',
  delete: 'DELETE FROM s_counselor WHERE id=?',
  queryByName: 'SELECT * FROM s_counselor WHERE name=? and collegeId=? and vocationalId=?',
  queryPhoneByName: 'SELECT * FROM s_counselor WHERE id=?',
  queryAll: 'SELECT * FROM s_counselor order by id asc limit ?, ?',
}
const classSql = {
  insert: 'INSERT INTO s_class(name,studentId,sex,age,phone,idCard,collegeId,vocationalId,classId,hostelId,ethnic,birthPlace,address,graduate,counselorId,counselorPhone) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
  update: 'UPDATE s_class SET name=?,sex=?,age=?,phone=?,idCard=?,college=?,class=?,hostelId=?,ethnic=?,birthPlace=?,address=?,college=?,counselor=?,counselorPhone=? WHERE id=?',
  delete: 'DELETE FROM s_class WHERE id=?',
  queryByName: 'SELECT * FROM s_class WHERE name=? and collegeId=? and vocationalId=?',
  queryClassStrById: 'SELECT * FROM s_class WHERE id=?',
  queryAll: 'SELECT * FROM s_class',
}
const hostelSql = {
  insert: 'INSERT INTO s_hostel ( hostelSex, hostelBuild, hostelName) VALUES (?,?,?)',
  update: 'UPDATE s_hostel SET hostelSex = ?, hostelBuild = ?, hostelName = ? WHERE id = ?',
  delete: 'DELETE FROM s_hostel WHERE id=?',
  queryHostelName: 'SELECT * FROM s_hostel WHERE hostelName LIKE ?',
  queryById: 'SELECT * FROM s_hostel WHERE id=?',
  queryAll: 'SELECT * FROM s_hostel order by id asc limit ?, ?',
  queryCount: 'SELECT COUNT(*) FROM s_students',
}
module.exports = { userSql, collegeSql, studentsSql, vocationalSql, counselorSql, classSql, hostelSql };