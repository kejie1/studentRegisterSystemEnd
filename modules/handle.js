//handel.js
/*
    数据增删改查模块封装
    req.query 解析GET请求中的参数 包含在路由中每个查询字符串参数属性的对象，如果没有则为{}
    req.params 包含映射到指定的路线“参数”属性的对象,如果有route/user/：name，那么“name”属性可作为req.params.name
    req.body通常用来解析POST请求中的数据
     +req.query.id 可以将id转为整数
 */
// 引入mysql
const mysql = require('mysql')
// 引入mysql连接配置
const mysqlconfig = require('../config/mysql')
// 引入连接池配置
const poolExtend = require('./poolExtend')
// 引入SQL模块
const { userSql, collegeSql, studentsSql,vocationalSql } = require('./sql')
// 引入json模块
const json = require('./json')
// token
const jwt = require('jsonwebtoken')
// 使用连接池，提升性能
const pool = mysql.createPool(poolExtend({}, mysqlconfig))
const userData = {
  addUser: function (req, res, next) {
    pool.getConnection(function (err, connection) {
      const param = req.body
      const params = [
        param.username,
        param.password,
        param.phone,
        param.email,
        param.status,
        param.accountType,
        param.collegeId,
      ]
      connection.query(userSql.insert, params, function (err, result) {
        if (result) {
          const _result = result
          result = {
            result: 'add',
          }
        }
        // 以json形式，把操作结果返回给前台页面
        json(res, result)
        // 释放连接
        connection.release()
      })
    })
  },
  delete: function (req, res, next) {
    pool.getConnection(function (err, connection) {
      const id = req.query.id
      console.log(id)
      connection.query(userSql.delete, id, function (err, result) {
        if (result.affectedRows > 0) {
          result = 'delete'
        } else {
          result = undefined
        }
        json(res, result)
        connection.release()
      })
    })
  },
  update: function (req, res, next) {
    const param = req.body
    console.log(param)
    const params = [
      param.username,
      param.password,
      param.phone,
      param.email,
      param.status,
      param.accountType,
      param.collegeId,
      param.id,
    ]
    if (param.username == null || param.password == null || param.id == null) {
      json(res, undefined)
      return
    }
    pool.getConnection(function (err, connection) {
      connection.query(userSql.update, params, function (err, result) {
        if (result.affectedRows > 0) {
          result = 'update'
        } else {
          result = undefined
        }
        json(res, result)
        connection.release()
      })
    })
  },
  queryByUserName: function (req, res, next) {
    const username = req.query.username
    pool.getConnection(function (err, connection) {
      connection.query(
        userSql.queryByUserName,
        username,
        function (err, result) {
          if (result != '') {
            const _result = result
            result = {
              result: 'select',
              data: _result,
            }
          } else {
            result = undefined
          }
          json(res, result)
          connection.release()
        }
      )
    })
  },
  queryAll: function (req, res, next) {
    pool.getConnection(function (err, connection) {
      connection.query(userSql.queryAll, function (err, result) {
        if (result) {
          const _result = result
          result = {
            result: 'selectall',
            data: _result,
          }
        } else {
          result = undefined
        }
        json(res, result)
        connection.release()
      })
    })
  },
  logins(req, res, next) {
    pool.getConnection((err, connection) => {
      const params = req.body || req.params
      connection.query(
        userSql.logins,
        [params.username, params.password],
        (err, result) => {
          if (result != '') {
            const _result = result
            let token = jwt.sign(
              {
                username: params.username, //加密的对象
              },
              'abc'
            ) //加密算法
            result = {
              code: 200,
              msg: '登录成功',
              data: {
                data: _result[0],
                token,
              },
            }
          } else {
            result = {
              code: 1,
              msg: '账号或密码错误，请重试',
            }
          }
          // 以json形式，把操作结果返回给前台页面
          json(res, result)
          // console.log(err);
          // 释放连接
          connection.release()
        }
      )
    })
  },
}
// 学院
const collegeData = {
  queryAll: function (req, res, next) {
    pool.getConnection(function (err, connection) {
      connection.query(collegeSql.queryAll, function (err, result) {
        if (result) {
          const _result = result
          result = {
            result: 'selectall',
            data: _result,
          }
        } else {
          result = undefined
        }
        json(res, result)
        connection.release()
      })
    })
  },
}
// 专业
const vocationalData = {
  queryAll: function (req, res, next) {
    pool.getConnection(function (err, connection) {
      connection.query(vocationalSql.queryAll, function (err, result) {
        if (result) {
          const _result = result
          result = {
            result: 'selectall',
            data: _result,
          }
        } else {
          result = undefined
        }
        json(res, result)
        connection.release()
      })
    })
  },
}
// 学生
const studentsData = {

  queryAll: function (req, res, next) {
    let param = req.query || req.params
    let currentPage = parseInt(param.currentPage || 1);// 页码
    let end = parseInt(param.pageSize || 10); // 默认页数
    let start = (currentPage - 1) * end;
    pool.getConnection(function (err, connection) {
      connection.query(studentsSql.queryAll,[start, end], function (err, result) {
        if (result) {
          const _result = result
          result = {
            result: 'selectall',
            data: {
              result: _result,
              pagination: {
                pageSize:end,
                currentPage,
                total: result.length,
              },
            },
          }
        } else {
          result = undefined
        }
        json(res, result)
        connection.release()
      })
    })
  },
  addUser: function (req, res, next) {
    pool.getConnection(function (err, connection) {
      const param = req.body
      const params = [
        param.username,
        param.password,
        param.phone,
        param.email,
        param.status,
        param.accountType,
        param.collegeId,
      ]
      console.log(params)
      connection.query(studentsSql.insert, params, function (err, result) {
        if (result) {
          const _result = result
          result = {
            result: 'add',
          }
        }
        // 以json形式，把操作结果返回给前台页面
        json(res, result)
        // 释放连接
        connection.release()
      })
    })
  },
  delete: function (req, res, next) {
    pool.getConnection(function (err, connection) {
      const id = req.query.id
      console.log(id)
      connection.query(studentsSql.delete, id, function (err, result) {
        if (result.affectedRows > 0) {
          result = 'delete'
        } else {
          result = undefined
        }
        json(res, result)
        connection.release()
      })
    })
  },
  update: function (req, res, next) {
    const param = req.body
    console.log(param)
    const params = [
      param.username,
      param.password,
      param.phone,
      param.email,
      param.status,
      param.accountType,
      param.collegeId,
      param.id,
    ]
    if (param.username == null || param.password == null || param.id == null) {
      json(res, undefined)
      return
    }
    pool.getConnection(function (err, connection) {
      connection.query(studentsSql.update, params, function (err, result) {
        if (result.affectedRows > 0) {
          result = 'update'
        } else {
          result = undefined
        }
        json(res, result)
        connection.release()
      })
    })
  },
  queryByName: function (req, res, next) {
    const username = req.query.username
    pool.getConnection(function (err, connection) {
      connection.query(
        studentsSql.queryByName,
        username,
        function (err, result) {
          if (result != '') {
            const _result = result
            result = {
              result: 'select',
              data: _result,
            }
          } else {
            result = undefined
          }
          json(res, result)
          connection.release()
        }
      )
    })
  },
}
module.exports = { userData, collegeData, studentsData,vocationalData }
