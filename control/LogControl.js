const LogModel = require('../db/model/LogModel')

const LogControl = {
  /* 获取用户日志信息 */
  async logList (user_id) {
    const count = await LogModel.countDocuments()
    const result = await LogModel.find()
      .sort({ createTime: -1})
    if (result) {
      return {
        list: result,
        count
      }
    }
  },

  /* 插入一条用户日志 */
  async logAdd (user_id, log) {
    return await LogModel.insertMany({
      user_id,
      log
    })
  }
}

module.exports = LogControl