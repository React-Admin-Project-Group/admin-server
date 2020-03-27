const mongoose = require('mongoose')

// 创建Schema对象
const AdminSchema = new mongoose.Schema({
  username: { type: String, require: true },
  password: { type: String, required: true, default: '666666'},
  authority: { type: Number, required: true, default: 0 },
  token: { type: String, required: false }
})

const AdminModel = mongoose.model('admin', AdminSchema)

module.exports = AdminModel