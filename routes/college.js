//router/index.js
const express = require('express');
const router = express.Router();
const { collegeData } = require('../modules/handle');

router.post('/addCollege', function (req, res, next) {
  collegeData.addCollege(req, res, next);
});
router.get('/collegeList', function (req, res, next) {
  collegeData.queryAll(req, res, next);
});
router.get('/queryByClassId', function (req, res, next) {
  collegeData.queryByClassId(req, res, next);
});
router.get('/queryByUserName', function (req, res, next) {
  collegeData.queryByUserName(req, res, next);
});
router.get('/queryCollegeStrById', function (req, res, next) {
  collegeData.queryCollegeStrById(req, res, next);
});
router.get('/queryCollegeById', function (req, res, next) {
  collegeData.queryCollegeById(req, res, next);
});
router.get('/queryCollegeName', function (req, res, next) {
  collegeData.queryCollegeName(req, res, next);
});
router.post('/deleteCollege', function (req, res, next) {
  collegeData.delete(req, res, next);
});
router.post('/updateCollege', function (req, res, next) {
  collegeData.update(req, res, next);
});
module.exports = router;