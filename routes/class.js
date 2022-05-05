//router/index.js
const express = require('express');
const router = express.Router();
const { classData } = require('../modules/handle');
/* GET users listing. */
router.post('/add', function (req, res, next) {
  classData.add(req, res, next);
});
router.get('/classList', function (req, res, next) {
  classData.queryAll(req, res, next);
});
router.get('/queryCount', function (req, res, next) {
  classData.queryCount(req, res, next);
});
router.get('/queryByUserName', function (req, res, next) {
  classData.queryByUserName(req, res, next);
});
router.get('/queryClassName', function (req, res, next) {
  classData.queryClassName(req, res, next);
});
router.get('/queryClassStrById', function (req, res, next) {
  classData.queryClassStrById(req, res, next);
});
router.get('/queryVocationalById', function (req, res, next) {
  classData.queryVocationalById(req, res, next);
});
router.post('/delete', function (req, res, next) {
  classData.delete(req, res, next);
});
router.post('/update', function (req, res, next) {
  classData.update(req, res, next);
});
module.exports = router;