//router/index.js
const express = require('express');
const router = express.Router();
const { counselorData } = require('../modules/handle');
/* GET users listing. */
router.post('/add', function (req, res, next) {
  counselorData.add(req, res, next);
});
router.get('/counselorList', function (req, res, next) {
  counselorData.queryAll(req, res, next);
});
router.get('/queryCount', function (req, res, next) {
  counselorData.queryCount(req, res, next);
});
router.get('/queryPhoneByName', function (req, res, next) {
  counselorData.queryPhoneByName(req, res, next);
});
router.get('/queryByVocationalId', function (req, res, next) {
  counselorData.queryByVocationalId(req, res, next);
});
router.get('/queryByClassId', function (req, res, next) {
  counselorData.queryByClassId(req, res, next);
});
router.get('/queryByUserName', function (req, res, next) {
  counselorData.queryByUserName(req, res, next);
});
router.get('/delete', function (req, res, next) {
  counselorData.delete(req, res, next);
});
router.post('/update', function (req, res, next) {
  counselorData.update(req, res, next);
});
module.exports = router;