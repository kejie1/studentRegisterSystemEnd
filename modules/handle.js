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
const {
  userSql,
  collegeSql,
  studentsSql,
  vocationalSql,
  counselorSql,
  classSql,
  hostelSql,
} = require('./sql')
// 引入json模块
const json = require('./json')
// token
const jwt = require('jsonwebtoken')
const Promise = require('promise')
// 使用连接池，提升性能
const pool = mysql.createPool(poolExtend({}, mysqlconfig))
let total = 0
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
        if (result.affectedRows > 0) {
          result = 'add'
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
        if (result != '') {
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
          if (result.affectedRows > 0) {
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
  logins (req, res, next) {
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
  queryCount: function (req, res, next) {
    pool.getConnection(function (err, connection) {
      connection.query(collegeSql.queryCount, function (err, result) {
        if (result) {
          const _result = result
          total = _result[0]['COUNT(*)']
          result = {
            result: 'select',
          }
        } else {
          result = undefined
        }
        json(res, result)
        connection.release()
      })
    })
  },
  queryAll: function (req, res, next) {
    let param = req.query || req.params
    let currentPage = parseInt(param.currentPage || 1) // 页码
    let end = parseInt(param.pageSize || 10) // 默认页数
    let start = (currentPage - 1) * end
    pool.getConnection(function (err, connection) {
      connection.query(
        collegeSql.queryAll,
        [start, end],
        function (err, result) {
          if (result) {
            const _result = result
            result = {
              result: 'selectall',
              data: {
                result: _result,
                pagination: {
                  pageSize: end,
                  currentPage,
                  total,
                },
              },
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
  queryCollegeStrById: function (req, res, next) {
    const params = req.query
    pool.getConnection(function (err, connection) {
      connection.query(
        collegeSql.queryCollegeStrById,
        [params.id],
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
  queryCollegeById: function (req, res, next) {
    const params = req.query
    pool.getConnection(function (err, connection) {
      connection.query(
        collegeSql.queryCollegeById,
        [params.id],
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
  queryCollegeName: function (req, res, next) {
    const params = req.query
    pool.getConnection(function (err, connection) {
      connection.query(
        collegeSql.queryCollegeName,
        ['%' + params.collegeStr + '%'],
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
  queryByClassId: function (req, res, next) {
    const params = req.query
    pool.getConnection(function (err, connection) {
      connection.query(
        collegeSql.queryByClassId,
        [params.classId],
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
  addCollege: function (req, res, next) {
    pool.getConnection(function (err, connection) {
      const param = req.body
      const params = [
        param.collegeStr,
        param.principal,
      ]
      connection.query(collegeSql.insert, params, function (err, result) {
        if (result.affectedRows > 0) {
          result = 'add'
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
    console.log(param);
    if (param.id == null || param.collegeStr == null || param.principal == null) {
      json(res, undefined)
      return
    }
    const params = [
      param.collegeStr,
      param.principal,
      param.id,
    ]
    pool.getConnection(function (err, connection) {
      connection.query(collegeSql.update, params, function (err, result) {
        if (result != '') {
          result = 'update'
        } else {
          result = undefined
        }
        json(res, result)
        connection.release()
      })
    })
  },
  delete: function (req, res, next) {
    pool.getConnection(function (err, connection) {
      const id = req.body.id
      connection.query(collegeSql.delete, id, function (err, result) {
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
}
// 专业
const vocationalData = {
  queryCount: function (req, res, next) {
    pool.getConnection(function (err, connection) {
      connection.query(vocationalSql.queryCount, function (err, result) {
        if (result) {
          const _result = result
          total = _result[0]['COUNT(*)']
          result = {
            result: 'select',
          }
        } else {
          result = undefined
        }
        json(res, result)
        connection.release()
      })
    })
  },
  queryAll: function (req, res, next) {
    let param = req.query || req.params
    let currentPage = parseInt(param.currentPage || 1) // 页码
    let end = parseInt(param.pageSize || 10) // 默认页数
    let start = (currentPage - 1) * end
    pool.getConnection(function (err, connection) {
      connection.query(
        vocationalSql.queryAll,
        [start, end],
        function (err, result) {
          if (result) {
            const _result = result
            result = {
              result: 'selectall',
              data: {
                result: _result,
                pagination: {
                  pageSize: end,
                  currentPage,
                  total,
                },
              },
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
  queryVocationalStrById: function (req, res, next) {
    const params = req.query
    pool.getConnection(function (err, connection) {
      connection.query(
        vocationalSql.queryVocationalStrById,
        [params.id],
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
  queryVocationalById: function (req, res, next) {
    const params = req.query
    pool.getConnection(function (err, connection) {
      connection.query(
        vocationalSql.queryVocationalById,
        [params.collegeId],
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
  queryVocationalName: function (req, res, next) {
    const params = req.query
    pool.getConnection(function (err, connection) {
      connection.query(
        vocationalSql.queryVocationalName,
        ['%' + params.vocationalStr + '%'],
        function (err, result) {
          if (result != '') {
            const _result = result
            result = {
              result: 'select',
              data: {
                result: _result,
                pagination: {
                  pageSize: end,
                  currentPage,
                  total,
                },
              }
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
  queryByClassId: function (req, res, next) {
    const params = req.query
    pool.getConnection(function (err, connection) {
      connection.query(
        vocationalSql.queryByClassId,
        [params.classId],
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
  add: function (req, res, next) {
    pool.getConnection(function (err, connection) {
      const param = req.body
      const params = [
        param.vocationalStr,
        param.principal,
        param.collegeId
      ]
      connection.query(vocationalSql.insert, params, function (err, result) {
        if (result.affectedRows > 0) {
          result = 'add'
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
    if (param.id == null || param.vocationalStr == null || param.principal == null || param.collegeId == null) {
      json(res, undefined)
      return
    }
    const params = [
      param.vocationalStr,
      param.principal,
      param.collegeId,
      param.cost,
      param.id,
    ]
    console.log(params);
    pool.getConnection(function (err, connection) {
      connection.query(vocationalSql.update, params, function (err, result) {
        if (result != '') {
          console.log(err);
          result = 'update'
        } else {
          result = undefined
        }
        json(res, result)
        connection.release()
      })
    })
  },
  delete: function (req, res, next) {
    pool.getConnection(function (err, connection) {
      const id = req.body.id
      connection.query(vocationalSql.delete, id, function (err, result) {
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
}
// 班级
const classData = {
  queryCount: function (req, res, next) {
    pool.getConnection(function (err, connection) {
      connection.query(classSql.queryCount, function (err, result) {
        if (result) {
          console.log();
          const _result = result
          total = _result[0]['COUNT(*)']
          result = {
            result: 'select',
          }
        } else {
          result = undefined
        }
        json(res, result)
        connection.release()
      })
    })
  },
  queryAll: function (req, res, next) {
    let param = req.query || req.params
    let currentPage = parseInt(param.currentPage || 1) // 页码
    let end = parseInt(param.pageSize || 10) // 默认页数
    let start = (currentPage - 1) * end
    pool.getConnection(function (err, connection) {
      connection.query(
        classSql.queryAll,
        [start, end],
        function (err, result) {
          if (result) {
            const _result = result
            result = {
              result: 'selectall',
              data: {
                result: _result,
                pagination: {
                  pageSize: end,
                  currentPage,
                  total,
                },
              },
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
  queryClassStrById: function (req, res, next) {
    const params = req.query
    pool.getConnection(function (err, connection) {
      connection.query(
        classSql.queryClassStrById,
        [params.id],
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
  queryVocationalById: function (req, res, next) {
    const params = req.query
    pool.getConnection(function (err, connection) {
      connection.query(
        classSql.queryVocationalById,
        [params.vocationalId],
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
  add: function (req, res, next) {
    pool.getConnection(function (err, connection) {
      const param = req.body
      const params = [
        param.classStr,
        param.counselorId,
        param.vocationalId,
        param.collegeId
      ]
      connection.query(classSql.insert, params, function (err, result) {
        if (result.affectedRows > 0) {
          result = 'add'
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
    if (param.id == null || param.classStr == null || param.counselorId == null || param.collegeId == null || param.vocationalId == null) {
      json(res, undefined)
      return
    }
    const params = [
      param.classStr,
      param.counselorId,
      param.vocationalId,
      param.collegeId,
      param.id
    ]
    console.log(params);
    pool.getConnection(function (err, connection) {
      connection.query(classSql.update, params, function (err, result) {
        if (result != '') {
          console.log(err);
          result = 'update'
        } else {
          result = undefined
        }
        json(res, result)
        connection.release()
      })
    })
  },
  delete: function (req, res, next) {
    pool.getConnection(function (err, connection) {
      const id = req.body.id
      connection.query(classSql.delete, id, function (err, result) {
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
}
// 教师信息
const counselorData = {
  queryCount: function (req, res, next) {
    pool.getConnection(function (err, connection) {
      connection.query(counselorSql.queryCount, function (err, result) {
        if (result) {
          const _result = result
          total = _result[0]['COUNT(*)']
          result = {
            result: 'select',
          }
        } else {
          result = undefined
        }
        json(res, result)
        connection.release()
      })
    })
  },
  queryAll: function (req, res, next) {
    let param = req.query || req.params
    let currentPage = parseInt(param.currentPage || 1) // 页码
    let end = parseInt(param.pageSize || 10) // 默认页数
    let start = (currentPage - 1) * end
    pool.getConnection(function (err, connection) {
      connection.query(
        counselorSql.queryAll,
        [start, end],
        function (err, result) {
          if (result) {
            const _result = result
            result = {
              result: 'selectall',
              data: {
                result: _result,
                pagination: {
                  pageSize: end,
                  currentPage,
                  total,
                },
              },
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
  queryPhoneByName: function (req, res, next) {
    const params = req.query
    pool.getConnection(function (err, connection) {
      connection.query(
        counselorSql.queryPhoneByName,
        [params.id],
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
  queryByClassId: function (req, res, next) {
    const params = req.query
    pool.getConnection(function (err, connection) {
      connection.query(
        counselorSql.queryByClassId,
        [params.classId],
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
  queryByVocationalId: function (req, res, next) {
    const params = req.query
    pool.getConnection(function (err, connection) {
      connection.query(
        counselorSql.queryByVocationalId,
        [params.vocationalId],
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
  add: function (req, res, next) {
    pool.getConnection(function (err, connection) {
      const param = req.body
      const params = [
        param.name,
        param.phone,
        param.collegeId,
        param.vocationalId,
        param.classId,
      ]
      connection.query(classSql.insert, params, function (err, result) {
        if (result != 0) {
          result = 'add'
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
    if (param.id == null || param.name == null || param.phone == null || param.collegeId == null) {
      json(res, undefined)
      return
    }
    const params = [
      param.name,
      param.phone,
      param.collegeId,
      param.vocationalId,
      param.classId,
      param.id
    ]
    console.log(params);
    pool.getConnection(function (err, connection) {
      connection.query(counselorSql.update, params, function (err, result) {
        if (result != '') {
          console.log(err);
          result = 'update'
        } else {
          result = undefined
        }
        json(res, result)
        connection.release()
      })
    })
  },
  delete: function (req, res, next) {
    pool.getConnection(function (err, connection) {
      const id = req.body.id
      connection.query(counselorSql.delete, id, function (err, result) {
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
}
// 宿舍
const hostelData = {
  queryCount: function (req, res, next) {
    pool.getConnection(function (err, connection) {
      connection.query(hostelSql.queryCount, function (err, result) {
        if (result) {
          const _result = result
          total = _result[0]['COUNT(*)']
          result = {
            result: 'select',
          }
        } else {
          result = undefined
        }
        json(res, result)
        connection.release()
      })
    })
  },
  queryAll: function (req, res, next) {
    let param = req.query || req.params
    let currentPage = parseInt(param.currentPage || 1) // 页码
    let end = parseInt(param.pageSize || 10) // 默认页数
    let start = (currentPage - 1) * end
    pool.getConnection(function (err, connection) {
      connection.query(
        hostelSql.queryAll,
        [start, end],
        function (err, result) {
          if (result) {
            const _result = result
            result = {
              result: 'selectall',
              data: {
                result: _result,
                pagination: {
                  pageSize: end,
                  currentPage,
                  total,
                },
              },
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
  queryHostelName: function (req, res, next) {
    const params = req.query
    pool.getConnection(function (err, connection) {
      connection.query(
        hostelSql.queryHostelName,
        ['%' + params.hostelName + '%'],
        function (err, result) {
          if (result != '') {
            const _result = result
            result = {
              result: 'select',
              data: {
                result: _result,
              },
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
  queryById: function (req, res, next) {
    const params = req.query
    pool.getConnection(function (err, connection) {
      connection.query(
        hostelSql.queryById,
        [params.id],
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
  addHostel: function (req, res, next) {
    pool.getConnection(function (err, connection) {
      const param = req.body
      const params = [
        param.hostelSex,
        param.hostelBuild,
        param.hostelName,
      ]
      connection.query(hostelSql.insert, params, function (err, result) {
        if (result.affectedRows > 0) {
          result = 'add'
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
      const id = req.body.id
      connection.query(hostelSql.delete, id, function (err, result) {
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
    console.log(param.id, param.hostelSex, param.hostelBuild, param.hostelName);
    if (param.id == null || param.hostelSex == null || param.hostelBuild == null || param.hostelName == null) {
      json(res, undefined)
      return
    }
    const params = [
      param.hostelSex,
      param.hostelBuild,
      param.hostelName,
      param.id,
    ]
    pool.getConnection(function (err, connection) {
      connection.query(hostelSql.update, params, function (err, result) {
        if (result != '') {
          result = 'update'
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
  queryCount: function (req, res, next) {
    pool.getConnection(function (err, connection) {
      connection.query(studentsSql.queryCount, function (err, result) {
        if (result) {
          const _result = result
          total = _result[0]['COUNT(*)']
          result = {
            result: 'select',
          }
        } else {
          result = undefined
        }
        json(res, result)
        connection.release()
      })
    })
  },
  queryAll: function (req, res, next) {
    let param = req.query || req.params
    let currentPage = parseInt(param.currentPage || 1) // 页码
    let end = parseInt(param.pageSize || 10) // 默认页数
    let start = (currentPage - 1) * end

    pool.getConnection(function (err, connection) {
      connection.query(
        studentsSql.queryAll,
        [start, end],
        function (err, result) {
          if (result) {
            const _result = result
            result = {
              result: 'selectall',
              data: {
                result: _result,
                pagination: {
                  pageSize: end,
                  currentPage,
                  total,
                },
              },
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
  addStudent: function (req, res, next) {
    pool.getConnection(function (err, connection) {
      const param = req.body
      const params = [
        param.name,
        param.studentId,
        param.sex,
        param.age,
        param.phone,
        param.idCard,
        param.collegeId,
        param.vocationalId,
        param.classId,
        param.hostelId,
        param.ethnic,
        param.birthPlace,
        param.address,
        param.graduate,
        param.counselorId,
        param.counselorPhone,
      ]
      console.log(params)
      connection.query(studentsSql.insert, params, function (err, result) {
        if (result.affectedRows > 0) {
          result = 'add'
        }
        // 以json形式，把操作结果返回给前台页面
        json(res, result)
        // 释放连接
        connection.release()
      })
    })
  },
  queryByClassId: function (req, res, next) {
    const params = req.query
    pool.getConnection(function (err, connection) {
      connection.query(
        studentsSql.queryByClassId,
        [params.classId],
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
    const params = [
      param.name,
      param.studentId,
      param.sex,
      param.age,
      param.phone,
      param.idCard,
      param.collegeId,
      param.vocationalId,
      param.classId,
      param.hostelId,
      param.ethnic,
      param.birthPlace,
      param.address,
      param.graduate,
      param.counselorId,
      param.counselorPhone,
      param.id,
    ]
    if (
      param.id == null ||
      param.name == null ||
      param.studentId == null ||
      param.sex == null ||
      param.age == null ||
      param.phone == null ||
      param.idCard == null ||
      param.collegeId == null ||
      param.vocationalId == null ||
      param.classId == null ||
      param.hostelId == null ||
      param.ethnic == null ||
      param.birthPlace == null ||
      param.address == null ||
      param.graduate == null ||
      param.counselorId == null ||
      param.counselorPhone == null
    ) {
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
    const params = req.query
    pool.getConnection(function (err, connection) {
      connection.query(
        studentsSql.queryByName,
        [params.name, params.collegeId, params.vocationalId],
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
  queryById: function (req, res, next) {
    const params = req.query
    pool.getConnection(function (err, connection) {
      connection.query(
        studentsSql.queryById,
        [params.id],
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
  queryByHostel: function (req, res, next) {
    const params = req.query
    pool.getConnection(function (err, connection) {
      connection.query(
        studentsSql.queryByHostel,
        [params.hostelId],
        function (err, result) {
          const _result = result
          result = {
            result: 'select',
            data: _result,
          }
          json(res, result)
          connection.release()
        }
      )
    })
  },
  delete: function (req, res, next) {
    pool.getConnection(function (err, connection) {
      const id = req.query.id
      connection.query(studentsSql.delete, id, function (err, result) {
        console.log(result)
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
  queryeThnicDesc: function (req, res, next) {
    pool.getConnection(function (err, connection) {
      connection.query(
        studentsSql.queryeThnicDesc,
        function (err, result) {
          if (result) {
            const _result = result
            result = {
              result: 'selectall',
              data: _result
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
  queryeGraduateDesc: function (req, res, next) {
    pool.getConnection(function (err, connection) {
      connection.query(
        studentsSql.queryeGraduateDesc,
        function (err, result) {
          if (result) {
            const _result = result
            result = {
              result: 'selectall',
              data: _result
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
  queryAgeCount: function (req, res, next) {
    pool.getConnection(function (err, connection) {
      connection.query(
        studentsSql.queryAgeCount,
        function (err, result) {
          if (result) {
            const _result = result
            result = {
              result: 'selectall',
              data: _result
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
  queryCollegeCount: function (req, res, next) {
    pool.getConnection(function (err, connection) {
      connection.query(
        studentsSql.getCollegeCount,
        function (err, result) {
          if (result) {
            const _result = result
            result = {
              result: 'selectall',
              data: _result
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
module.exports = {
  userData,
  collegeData,
  studentsData,
  vocationalData,
  counselorData,
  classData,
  hostelData
}
