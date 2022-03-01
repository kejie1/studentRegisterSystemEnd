//router/index.js
const express = require('express');
const router = express.Router();
const {classData} = require('../modules/handle');
/* GET users listing. */
router.post('/addUser', function (req, res, next) {
  classData.addUser(req, res, next);
});
router.get('/vocationalList', function (req, res, next) {
  classData.queryAll(req, res, next);
});

router.get('/queryByUserName', function (req, res, next) {
  classData.queryByUserName(req, res, next);
});
router.get('/queryClassStrById', function (req, res, next) {
  classData.queryClassStrById(req, res, next);
});
router.get('/deleteUser', function (req, res, next) {
  classData.delete(req, res, next);
});
router.get('/update', function (req, res, next) {
  res.render('update');
});
router.post('/updateUser', function (req, res, next) {
  classData.update(req, res, next);
});
module.exports = router;