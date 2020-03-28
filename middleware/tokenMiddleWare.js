const { verifyToken } = require('../utils/jwt')
const AdminControl = require('../control/AdminControl')
const ResponseStatus = require('../common/responseStatus')
const tokenMiddleWare = (req, res, next) => {
  // console.log('req.headers:', )authorization
  const token = req.headers.authorization.split('Bearer ')[1]
  if (!token) { 
    res.send(ResponseStatus.Token_NOT_COMPLETE)  
    return
  } 
  const tokenState = verifyToken(token)
  if (tokenState) {
    AdminControl.tokenCheck(tokenState._id, token)
      .then(() => {
        next()
      })
      .catch((err) => {
        res.send(ResponseStatus.USER_Login_Token_Error)
      })
  } else {
    res.send(ResponseStatus.USER_Login_Expire)
  }
}

module.exports = tokenMiddleWare