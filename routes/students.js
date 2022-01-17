//router/index.js
const express = require('express');
const router = express.Router();
const {studentsData} = require('../modules/handle');
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'SQL for MySQL' });
});
router.post('/addStudent', function (req, res, next) {
  studentsData.addUser(req, res, next);
});
router.get('/studentsList', function (req, res, next) {
  studentsData.queryAll(req, res, next);
});

router.get('/queryByName', function (req, res, next) {
  studentsData.queryByUserName(req, res, next);
});
router.get('/deleteStudent', function (req, res, next) {
  studentsData.delete(req, res, next);
});
router.post('/updateStudentInfo', function (req, res, next) {
  studentsData.update(req, res, next);
});
module.exports = router;