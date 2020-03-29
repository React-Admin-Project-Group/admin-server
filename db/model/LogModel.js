const mongoose = require('mongoose')

// 创建Schema对象
const LogSchema = new mongoose.Schema({
  user_id: { type: String, require: true },
  log: { type: String, require: true},
  createTime: { type: Date, default: new Date().getTime() },
  type: { type: Number, default: 0, require: true},
  ip: { type: String, require: false}
})

const LogModel = mongoose.model('log', LogSchema)

module.exports = LogModel
