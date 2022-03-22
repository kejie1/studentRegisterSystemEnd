//router/index.js
const express = require('express');
const router = express.Router();
const { vocationalData } = require('../modules/handle');
/* GET users listing. */
router.post('/addUser', function (req, res, next) {
  vocationalData.addUser(req, res, next);
});
router.get('/vocationalList', function (req, res, next) {
  vocationalData.queryAll(req, res, next);
});

router.get('/queryByUserName', function (req, res, next) {
  vocationalData.queryByUserName(req, res, next);
});
router.get('/queryVocationalStrById', function (req, res, next) {
  vocationalData.queryVocationalStrById(req, res, next);
});
router.get('/queryVocationalById', function (req, res, next) {
  vocationalData.queryVocationalById(req, res, next);
});
router.get('/deleteUser', function (req, res, next) {
  vocationalData.delete(req, res, next);
});
router.get('/update', function (req, res, next) {
  res.render('update');
});
router.post('/updateUser', function (req, res, next) {
  vocationalData.update(req, res, next);
});
module.exports = router;