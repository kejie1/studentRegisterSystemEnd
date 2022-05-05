//router/index.js
const express = require('express');
const router = express.Router();
const { hostelData } = require('../modules/handle');
/* GET users listing. */
router.post('/addHostel', function (req, res, next) {
  hostelData.addHostel(req, res, next);
});
router.get('/hostelList', function (req, res, next) {
  hostelData.queryAll(req, res, next);
});
router.get('/queryCount', function (req, res, next) {
  hostelData.queryCount(req, res, next);
});

router.get('/queryHostelName', function (req, res, next) {
  hostelData.queryHostelName(req, res, next);
});
router.get('/queryById', function (req, res, next) {
  hostelData.queryById(req, res, next);
});
router.post('/delete', function (req, res, next) {
  hostelData.delete(req, res, next);
});
router.post('/update', function (req, res, next) {
  hostelData.update(req, res, next);
});
module.exports = router;