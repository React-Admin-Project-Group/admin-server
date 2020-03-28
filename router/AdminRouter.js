const express = require('express')
const AdminControl = require('../control/AdminControl')
const ResponseStatus = require('../common/responseStatus')
const router = express.Router()
const tokenMiddleWare = require('../middleware/tokenMiddleWare')
const { verifyToken } = require('../utils/jwt')

/**
 * @api {get} /admin 获取管理员列表
 * @apiName adminList
 * @apiGroup Admin
 *
 *
 * @apiSuccess {String} code 状态码
 * @apiSuccess {String} msg  信息提示
 * @apiSuccess {Array} list  管理员列表
 * 
 */
router.get('/', tokenMiddleWare, (req, res) => {
  AdminControl.adminList()
    .then(result => {
      res.send(Object.assign({}, ResponseStatus.SUCCESS, { list: result }))
    })
    .catch(err => {
      res.send(ResponseStatus.INTERFACE_INNER_INVOKE_ERROR)
    })
})

/**
 * @api {put} /admin  添加管理员
 * @apiName adminRegister
 * @apiGroup Admin
 *
 * @apiParam {String} username 添加的管理员的名字(唯一)
 * @apiParam {String} password 管理员注册密码, 不传默认为666666
 * @apiParam {Number} authority 添加的管理员权限, 不传默认为0
 * 
 * @apiSuccess {String} code 状态码
 * @apiSuccess {String} msg  信息提示
 * 
 */
router.put('/', tokenMiddleWare, (req, res) => {
  let { username, password = '666666', authority = 0 } = req.body
  if (username) {
    AdminControl.adminRegister({ username, password, authority })
      .then((result) => {
        if (result) {
          res.send(ResponseStatus.USER_HAS_EXISTED)
        } else {
          res.send(Object.assign({}, ResponseStatus.SUCCESS, { msg: '管理员添加成功' }))
        }
      })
      .catch((msg) => {
        console.log(msg)
        res.send(ResponseStatus.INTERFACE_INNER_INVOKE_ERROR)
      })
  } else {
    res.send(ResponseStatus.PARAM_NOT_COMPLETE)
  }
})

/**
 * @api {post} /admin  管理员登录
 * @apiName adminLogin
 * @apiGroup Admin
 *
 * @apiParam {String} username 管理员登录账号
 * @apiParam {String} password 管理员登录密码
 * 
 * @apiSuccess {String} code 状态码
 * @apiSuccess {String} msg  信息提示
 * @apiSuccess {Object} userInfo  登录成功返回的一些信息，包括token
 * 
 */

router.post('/', (req, res) => {
  const { username, password } = req.body
  if (username && password) {
    AdminControl.adminLogin(username, password)
    .then((result) => {
      res.send(Object.assign({}, ResponseStatus.SUCCESS, { list: result }))
    })
    .catch(msg => {
      res.send(ResponseStatus.USER_LOGIN_ERROR)
    })
  } else {
    res.send(ResponseStatus.PARAM_NOT_COMPLETE)
  }
})

/**
 * @api {delete} /admin/delete  根据id删除管理员
 * @apiName adminDel
 * @apiGroup Admin
 *
 * @apiParam {String} token 用户登录的token
 * @apiParam {String} _id 要删除的用户_id
 * 
 * @apiSuccess {String} code 状态码
 * @apiSuccess {String} msg  信息提示
 * 
 */
router.delete('/delete', (req, res) => {
  let { token, _id } = req.body
  // 验证用户有没有传递token
  if (!token) { return res.send(ResponseStatus.USER_NOT_LOGGED_IN)}
  // 获取验证token的状态，判断是否失效
  let tokenState = verifyToken(token)
  if (tokenState) {
    AdminControl.tokenCheck(tokenState._id, token)
      .then((result) => {
        if (_id) {
          if (_id == result._id) {
            res.send(ResponseStatus.PERMISSION_NOT_ENABLE)
          } else {
            AdminControl.adminDel(_id)
              .then(result => {
                if (result.deletedCount === 0) {
                  res.send(Object.assign({}, ResponseStatus.SUCCESS, { msg: '该管理员已被删除' }))
                } else {
                  res.send(Object.assign({}, ResponseStatus.SUCCESS, { msg: '管理员删除成功' }))
                }
              })
              .catch(err => {
                res.send(ResponseStatus.INTERFACE_INNER_INVOKE_ERROR)
              })
          }
        } else {
          res.send(ResponseStatus.PARAM_IS_BLANK)
        }
      })
      .catch((err) => {
        // 用户token不匹配
        res.send(ResponseStatus.USER_Login_Token_Error)
      })
  } else {
    res.send(ResponseStatus.USER_Login_Expire)
  }
})

/**
 * @api {put} /admin/logout  管理员退出登录
 * @apiName loginOut
 * @apiGroup Admin
 * 
 * @apiParam {String} token 用户登录的token
 * @apiParam {String} _id 退出登录的用户id
 * 
 * @apiSuccess {String} code 状态码
 * @apiSuccess {String} msg  信息提示
 * 
 */
router.put('/logout', (req, res) => {
  let { token, _id } = req.body
  // 验证用户有没有传递token
  if (!token) { return res.send(ResponseStatus.USER_NOT_LOGGED_IN)}
  // 获取验证token的状态，判断是否失效
  let tokenState = verifyToken(token)
  if (tokenState) {
    AdminControl.tokenCheck(tokenState._id, token)
      .then((result) => {
        if (_id) {
          AdminControl.loginOut(_id)
            .then(result => {
              res.send(Object.assign({}, ResponseStatus.SUCCESS, { msg: '管理员退出登录成功' }))
            })
            .catch(err => {
              res.send(ResponseStatus.INTERFACE_INNER_INVOKE_ERROR)
            })
        } else {
          res.send(ResponseStatus.PARAM_IS_BLANK)
        }
      })
      .catch((err) => {
        // 用户token不匹配
        res.send(ResponseStatus.USER_Login_Token_Error)
      })
  } else {
    res.send(ResponseStatus.USER_Login_Expire)
  }
})












module.exports = router