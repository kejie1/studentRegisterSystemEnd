//router/index.js
const express = require('express');
const router = express.Router();
const user = require('../modules/handle');
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'SQL for MySQL' });
});
router.get('/addUser', function (req, res, next) {
  user.add(req, res, next);
});
router.get('/queryAll', function (req, res, next) {
  user.queryAll(req, res, next);
});

router.get('/queryByUserName', function (req, res, next) {
  user.queryByUserName(req, res, next);
});
router.get('/deleteUser', function (req, res, next) {
  user.delete(req, res, next);
});
router.get('/update', function (req, res, next) {
  res.render('update');
});
router.post('/updateUser', function (req, res, next) {
  user.update(req, res, next);
});
router.post('/logins', (req, res, next) => {
  user.logins(req, res, next)
})
module.exports = router;