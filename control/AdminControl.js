const AdminModel = require('../db/model/AdminModel')
const ResponseCode = require('../common/responseStatus')
const { createToken } = require('../utils/jwt')
const AdminControl = {
  /* 获取管理员列表 */
  async adminList (page = 1, pageSize = 5) {
    const count = await AdminModel.countDocuments()

    const result = await AdminModel.find()
      .limit(Number(pageSize)).skip((page - 1) * pageSize)
      .sort({_id: -1})
    if (result) {
      return {
        list: result.map(item => {
          return {
            _id: item['_id'],
            username: item.username,
            authority: item.authority
          }
        }),
        count
      }
    }
  },
  /* 添加管理员 */
  async adminRegister (admin) {
    const { username, password, authority } = admin
    // 判断用户名是否重复
    const isExist = await AdminModel.findOne({ username })
    if (isExist) {
      return ResponseCode.USER_HAS_EXISTED
    } else {
      const result = await AdminModel.insertMany({
        username,
        password,
        authority
      })
    }
  },

  /* 管理员登录 */
  async adminLogin (username, password) {
    const findResult = await AdminModel.findOne({ username, password })
    if (findResult) {
      // 登录成功，产生新的token
      const { _id, username, authority } = findResult
      const token = createToken({ _id, username })

      // 将用户登录产生的token更新到数据库
      const result = await AdminModel.updateOne({ _id }, { token })
      return { _id, username, authority, token }
    } else {
      throw '用户名或密码不匹配'
    }
  },

  /* 根据ID删除管理员 */
  async adminDel (_id) {
    const result = await AdminModel.deleteOne({ _id })
    if (result) {
      return result
    } else {
      throw '请传递有效的用户id'
    }
  },

  /* 检验用户token */
  async tokenCheck (_id, token) {
    const result = await AdminModel.findOne({ _id, token })
    if (result) {
      return result
    } else {
      throw '用户token不匹配'
    }
  },

  /* 管理员退出登录 */
  async loginOut (_id) {
    // 退出登录后把数据库中的token重置
    const result = await AdminModel.updateOne({ _id }, { token: '' })
    if (result) {
      return result
    } else {
      throw '退出失败请重试'
    }
  }

}

module.exports = AdminControl