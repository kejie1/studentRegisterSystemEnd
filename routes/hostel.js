//router/index.js
const express = require('express');
const router = express.Router();
const { hostelData } = require('../modules/handle');
/* GET users listing. */
router.post('/addUser', function (req, res, next) {
  hostelData.addUser(req, res, next);
});
router.get('/hostelList', function (req, res, next) {
  hostelData.queryAll(req, res, next);
});

router.get('/queryHostelName', function (req, res, next) {
  hostelData.queryHostelName(req, res, next);
});
router.get('/queryClassStrById', function (req, res, next) {
  hostelData.queryClassStrById(req, res, next);
});
router.get('/deleteUser', function (req, res, next) {
  hostelData.delete(req, res, next);
});
router.get('/update', function (req, res, next) {
  res.render('update');
});
router.post('/updateUser', function (req, res, next) {
  hostelData.update(req, res, next);
});
module.exports = router;