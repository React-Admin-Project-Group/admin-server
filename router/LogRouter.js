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
  const { user_id, page = 1, pageSize = 5, startTime, endTime } = req.query
  if (user_id) {
    LogControl.logList(user_id, page, pageSize, startTime, endTime)
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

router.delete('/', (req, res) => {
  const { del_ids } = req.body
  if (del_ids.length) {
    LogControl.logDel(del_ids)
      .then(result => {
        res.send(Object.assign({}, ResponseStatus.SUCCESS, {msg: '删除成功'}))
      })
      .catch(err => {
        res.send(ResponseStatus.INTERFACE_INNER_INVOKE_ERROR)
      })
  } else {
    res.send(ResponseStatus.PARAM_NOT_COMPLETE)
  }
})

module.exports = router

