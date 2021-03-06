//router/index.js
const express = require('express');
const router = express.Router();
const { studentsData } = require('../modules/handle');
/* GET users listing. */
router.post('/addStudent', function (req, res, next) {
  studentsData.addStudent(req, res, next);
});
router.get('/studentsList', function (req, res, next) {
  studentsData.queryAll(req, res, next);
});
router.get('/queryAgeCount', function (req, res, next) {
  studentsData.queryAgeCount(req, res, next);
});
router.get('/getSexCount', function (req, res, next) {
  studentsData.getSexCount(req, res, next);
});
router.get('/queryeThnicDesc', function (req, res, next) {
  studentsData.queryeThnicDesc(req, res, next);
});
router.get('/queryeGraduateDesc', function (req, res, next) {
  studentsData.queryeGraduateDesc(req, res, next);
});
router.get('/queryCollegeCount', function (req, res, next) {
  studentsData.queryCollegeCount(req, res, next);
});
router.get('/queryCount', function (req, res, next) {
  studentsData.queryCount(req, res, next);
});
router.get('/queryByClassId', function (req, res, next) {
  studentsData.queryByClassId(req, res, next);
});
router.get('/queryByName', function (req, res, next) {
  studentsData.queryByName(req, res, next);
});
router.get('/queryById', function (req, res, next) {
  studentsData.queryById(req, res, next);
});
router.get('/queryByHostel', function (req, res, next) {
  studentsData.queryByHostel(req, res, next);
});
router.get('/deleteStudent', function (req, res, next) {
  studentsData.delete(req, res, next);
});
router.post('/updateStudentInfo', function (req, res, next) {
  studentsData.update(req, res, next);
});
module.exports = router;