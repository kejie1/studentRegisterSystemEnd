//router/index.js
const express = require('express');
const router = express.Router();
const {collegeData} = require('../modules/handle');
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'SQL for MySQL' });
});
router.post('/addUser', function (req, res, next) {
  collegeData.addUser(req, res, next);
});
router.get('/collegeList', function (req, res, next) {
  collegeData.queryAll(req, res, next);
});

router.get('/queryByUserName', function (req, res, next) {
  collegeData.queryByUserName(req, res, next);
});
router.get('/queryCollegeStrById', function (req, res, next) {
  collegeData.queryCollegeStrById(req, res, next);
});
router.get('/deleteUser', function (req, res, next) {
  collegeData.delete(req, res, next);
});
router.get('/update', function (req, res, next) {
  res.render('update');
});
router.post('/updateUser', function (req, res, next) {
  collegeData.update(req, res, next);
});
router.post('/logins', (req, res, next) => {
  collegeData.logins(req, res, next)
})
module.exports = router;