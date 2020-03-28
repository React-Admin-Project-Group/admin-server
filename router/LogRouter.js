const express = require('express')
const LogControl = require('../control/LogControl')
const ResponseStatus = require('../common/responseStatus')
const router = express.Router()

/**
 * @api {get} /log 获取管理员日志信息
 * @apiName logList
 * @apiGroup Log
 *
 * @apiParam {String} user_id 用户id
 *
 * @apiSuccess {String} code 状态码
 * @apiSuccess {String} msg  信息提示
 * @apiSuccess {Array} list  日志列表
 * @apiSuccess {Number} count  日志列表数量
 * 
 */
router.get('/', (req, res) => {
  const { user_id } = req.query
  if (user_id) {
    LogControl.logList(user_id)
      .then(result => {
        res.send(Object.assign({}, ResponseStatus.SUCCESS, result))
      })
      .catch(err => {
        res.send(ResponseStatus.INTERFACE_INNER_INVOKE_ERROR)
      })
  } else {
    res.send(ResponseStatus.PARAM_NOT_COMPLETE)
  }
  
})

/**
 * @api {post} /log 获取管理员日志信息
 * @apiName logAdd
 * @apiGroup Log
 *
 * @apiParam {String} user_id 用户id
 * @apiParam {String} log 用户操作日志
 *
 * @apiSuccess {String} code 状态码
 * @apiSuccess {String} msg  信息提示
 * @apiSuccess {Array} list  日志列表
 * @apiSuccess {Number} count  日志列表数量
 * 
 */
router.post('/', (req, res) => {
  const { user_id, log } = req.body
  if (user_id, log) {
    LogControl.logAdd(user_id, log)
      .then(result => {
        res.send(Object.assign({}, ResponseStatus.SUCCESS, { msg: '操作日志添加成功' }))
      })
      .catch(msg => {
        res.send(ResponseStatus.INTERFACE_INNER_INVOKE_ERROR)
      })

  } else {
    res.send(ResponseStatus.PARAM_NOT_COMPLETE)
  }
})

module.exports = router

