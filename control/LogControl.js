const LogModel = require('../db/model/LogModel')

const LogControl = {
  /* 获取用户日志信息 */
  async logList (user_id, page, pageSize, startTime, endTime) {
    const count = await LogModel.countDocuments({user_id})
    let result = null
    if (startTime && endTime) {
       const startDate = new Date(startTime).getTime()
       const endDate = new Date(endTime).getTime()
       result = await LogModel.find({
         user_id,
         "createTime":{$gte:startDate},
         "createTime":{$lte:endDate},
        })
      .limit(Number(pageSize)).skip((page - 1) * pageSize)
      .sort({ createTime: -1})
    } else {
      result = await LogModel.find({user_id})
      .limit(Number(pageSize)).skip((page - 1) * pageSize)
      .sort({ createTime: -1})
    }
    if (result) {
      return {
        list: result,
        count
      }
    }
  },

  /* 插入一条用户日志 */
  async logAdd (log, type = 0) {
    const { user_id, ip } = global
    return await LogModel.insertMany({
      user_id,
      log,
      type,
      ip,
      createTime: new Date().getTime()
    })
  },
  /* 获取用户最新的登录信息 */
  async lastLogin () {
    const { user_id } = global
    const count = await LogModel.countDocuments({
      user_id,
      type: 1
    })
    const last = await LogModel.findOne({
      user_id,
      type: 1
    }).sort({
      createTime: -1
    }).skip(1)
    return {
      last,
      count
    }
  },
  /* 删除用户日志 */
  async logDel (del_ids) {
    let mapFilter = []
    for (let _id of del_ids) {
      mapFilter.push({ _id})
    }
    return await LogModel.deleteMany({
      $or: mapFilter
    })
  }
}

module.exports = LogControl