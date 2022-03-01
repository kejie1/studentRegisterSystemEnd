//router/index.js
const express = require('express');
const router = express.Router();
const {counselorData} = require('../modules/handle');
/* GET users listing. */
router.post('/addUser', function (req, res, next) {
  counselorData.addUser(req, res, next);
});
router.get('/counselorList', function (req, res, next) {
  counselorData.queryAll(req, res, next);
});
router.get('/queryPhoneByName', function (req, res, next) {
  counselorData.queryPhoneByName(req, res, next);
});
router.get('/queryByUserName', function (req, res, next) {
  counselorData.queryByUserName(req, res, next);
});
router.get('/deleteUser', function (req, res, next) {
  counselorData.delete(req, res, next);
});
router.get('/update', function (req, res, next) {
  res.render('update');
});
router.post('/updateUser', function (req, res, next) {
  counselorData.update(req, res, next);
});
module.exports = router;