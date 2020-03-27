const JWT = require('jsonwebtoken')

// 对jwt进行封装
const secret = 'kitchen888kitchen'

/* 生成token */
const createToken = (data, expiresIn) => {
  const obj = {}
  obj.data = data || {} // 存入token的数据
  obj.createTime = (new Date()).getTime() // token创建时间
  obj.expiresIn = expiresIn || 1000 * 60 * 60 * 24 * 7
  const token = JWT.sign(obj, secret)
  return token
}

/* 验证token */
const verifyToken = (token) => {
  let result = null
  try {
    const { data, createTime, expiresIn } = JWT.verify(token, secret)
    // 判断token的过期时间
    const nowTime = (new Date()).getTime()
    if (nowTime - createTime < expiresIn) {
      // token没过期
      result = data
    }
  } catch (err) {
    console.log(err)
  }

  return result
}

module.exports = {
  createToken,
  verifyToken
}