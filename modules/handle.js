//handel.js
/*
    数据增删改查模块封装
    req.query 解析GET请求中的参数 包含在路由中每个查询字符串参数属性的对象，如果没有则为{}
    req.params 包含映射到指定的路线“参数”属性的对象,如果有route/user/：name，那么“name”属性可作为req.params.name
    req.body通常用来解析POST请求中的数据
     +req.query.id 可以将id转为整数
 */
// 引入mysql
const mysql = require('mysql');
// 引入mysql连接配置
const mysqlconfig = require('../config/mysql');
// 引入连接池配置
const poolExtend = require('./poolExtend');
// 引入SQL模块
const sql = require('./sql');
// 引入json模块
const json = require('./json');
// token
const jwt = require("jsonwebtoken")
// 使用连接池，提升性能
const pool = mysql.createPool(poolExtend({}, mysqlconfig));
const userData = {
  add: function (req, res, next) {
    pool.getConnection(function (err, connection) {
      const param = req.query || req.params;
      connection.query(sql.insert, [param.id, param.name, param.age], function (err, result) {
        if (result) {
          result = 'add'
        }
        // 以json形式，把操作结果返回给前台页面
        json(res, result);
        // 释放连接 
        connection.release();
      });
    });
  },
  delete: function (req, res, next) {
    pool.getConnection(function (err, connection) {
      const id = +req.query.id;
      connection.query(sql.delete, id, function (err, result) {
        if (result.affectedRows > 0) {
          result = 'delete';
        } else {
          result = undefined;
        }
        json(res, result);
        connection.release();
      });
    });
  },
  update: function (req, res, next) {
    const param = req.body;
    if (param.name == null || param.age == null || param.id == null) {
      json(res, undefined);
      return;
    }
    pool.getConnection(function (err, connection) {
      connection.query(sql.update, [param.name, param.age, +param.id], function (err, result) {
        if (result.affectedRows > 0) {
          result = 'update'
        } else {
          result = undefined;
        }
        json(res, result);
        connection.release();
      });
    });
  },
  queryByUserName: function (req, res, next) {
    const username = req.query.username;
    pool.getConnection(function (err, connection) {
      connection.query(sql.queryByUserName, username, function (err, result) {
        if (result != '') {
          const _result = result;
          result = {
            result: 'select',
            data: _result
          }
        } else {
          result = undefined;
        }
        json(res, result);
        connection.release();
      });
    });
  },
  queryAll: function (req, res, next) {
    pool.getConnection(function (err, connection) {
      connection.query(sql.queryAll, function (err, result) {
        if (result != '') {
          const _result = result;
          result = {
            result: 'selectall',
            data: _result
          }
        } else {
          result = undefined;
        }
        json(res, result);
        connection.release();
      });
    });
  },
  logins(req, res, next) {
    pool.getConnection((err, connection) => {
      const params = req.body || req.params;
      connection.query(sql.logins, [params.username, params.password], (err, result) => {
        if (result != '') {
          const _result = result
          let token = jwt.sign({
            username: params.username//加密的对象
          }, "abc")//加密算法
          result = {
            code: 200,
            msg: '登录成功',
            data: {
              data: _result[0],
              token
            }
          }
        } else {
          result = {
            code: 1,
            msg: '账号或密码错误，请重试'
          }
        }
        // 以json形式，把操作结果返回给前台页面
        json(res, result);
        // console.log(err);
        // 释放连接 
        connection.release();
      })
    })
  }
};
module.exports = userData;