//router/index.js
const express = require('express');
const router = express.Router();
const { vocationalData } = require('../modules/handle');
/* GET users listing. */
router.post('/add', function (req, res, next) {
  vocationalData.add(req, res, next);
});
router.get('/vocationalList', function (req, res, next) {
  vocationalData.queryAll(req, res, next);
});
router.get('/queryCount', function (req, res, next) {
  vocationalData.queryCount(req, res, next);
});
router.get('/queryByClassId', function (req, res, next) {
  vocationalData.queryByClassId(req, res, next);
});
router.get('/queryVocationalName', function (req, res, next) {
  vocationalData.queryVocationalName(req, res, next);
});
router.get('/queryVocationalStrById', function (req, res, next) {
  vocationalData.queryVocationalStrById(req, res, next);
});
router.get('/queryVocationalById', function (req, res, next) {
  vocationalData.queryVocationalById(req, res, next);
});
router.post('/delete', function (req, res, next) {
  vocationalData.delete(req, res, next);
});
router.post('/update', function (req, res, next) {
  vocationalData.update(req, res, next);
});
module.exports = router;