/* 成功状态码 */
const SUCCESS = {
  code: 1,
  msg: '成功'
}
/* 参数错误：10001-19999 */
const PARAM_IS_INVALID = {
  code: 10001,
  msg: '参数无效'
}
const PARAM_IS_BLANK = {
  code: 10002,
  msg: '参数为空'
}
const PARAM_TYPE_BIND_ERROR = {
  code: 10003,
  msg: "参数类型错误"
}
const PARAM_NOT_COMPLETE = {
  code: 10004,
  msg: '参数缺失'
}
/* 用户错误 */
const USER_NOT_LOGGED_IN = {
  code: 20001,
  msg: '用户未登录'
}
const USER_LOGIN_ERROR = {
  code: 20002,
  msg: '账号不存在或密码错误'
}
const USER_ACCOUNT_FORBIDDEN = {
  code: 20003,
  msg: '账号已被禁用'
}
const USER_NOT_EXIST = {
  code: 20004,
  msg: '用户不存在'
}
const USER_HAS_EXISTED = {
  code: 20005,
  msg: '用户已存在'
}
const USER_Login_Expire = {
  code: 20006,
  msg: '用户登录失效'
}
const USER_Login_Token_Error = {
  code: 20007,
  msg: '用户token不匹配'
}
/* 业务错误：30001-39999 */
/* 系统错误：40001-49999 */
const SYSTEM_INNER_ERROR = {
  code: 40001,
  msg: '系统繁忙，请稍后重试'
}
/* 数据错误 */
const RESULT_DATA_NONE = {
  code: 50001,
  msg: '数据未找到'
}
const DATA_IS_WRONG = {
  code: 50002,
  msg: '数据有误'
}
const DATA_ALREADY_EXISTED = {
  code: 50003,
  msg: '数据已存在'
}
/* 接口错误：60001-69999 */
const INTERFACE_INNER_INVOKE_ERROR = {
  code: 60001,
  msg: '内部系统接口调用异常'
}
const INTERFACE_ADDRESS_INVALID = {
  code: 60004,
  msg: '接口地址无效'
}
const INTERFACE_REQUEST_TIMEOUT = {
  code: 60005,
  msg: '接口请求超时'
}
/* 权限错误：70001-79999 */
const PERMISSION_NO_ACCESS = {
  code: 70001,
  msg: '无访问权限'
}
const PERMISSION_NOT_ENABLE = {
  code: 70002,
  msg: '不能删除自己的账号'
}

module.exports = {
  SUCCESS,
  PARAM_IS_INVALID,
  PARAM_IS_BLANK,
  PARAM_TYPE_BIND_ERROR,
  PARAM_NOT_COMPLETE,
  USER_NOT_LOGGED_IN,
  USER_LOGIN_ERROR,
  USER_ACCOUNT_FORBIDDEN,
  USER_NOT_EXIST,
  USER_HAS_EXISTED,
  USER_Login_Expire,
  USER_Login_Token_Error,
  SYSTEM_INNER_ERROR,
  RESULT_DATA_NONE,
  DATA_IS_WRONG,
  DATA_ALREADY_EXISTED,
  INTERFACE_INNER_INVOKE_ERROR,
  INTERFACE_ADDRESS_INVALID,
  PERMISSION_NO_ACCESS,
  PERMISSION_NOT_ENABLE
}

