//router/index.js
const express = require('express');
const router = express.Router();
const {userData} = require('../modules/handle');
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'SQL for MySQL' });
});
router.get('/queryCount', function (req, res, next) {
  userData.queryCount(req, res, next);
});
router.post('/addUser', function (req, res, next) {
  userData.addUser(req, res, next);
});
router.get('/queryAll', function (req, res, next) {
  userData.queryAll(req, res, next);
});

router.get('/queryByUserName', function (req, res, next) {
  userData.queryByUserName(req, res, next);
});
router.post('/deleteUser', function (req, res, next) {
  userData.delete(req, res, next);
});
router.post('/updateUser', function (req, res, next) {
  userData.update(req, res, next);
});
router.post('/logins', (req, res, next) => {
  userData.logins(req, res, next)
})
module.exports = router;