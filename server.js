const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const tokenMiddleWare = require('./middleware/tokenMiddleWare')
// 启动服务器的同时启动数据库
require('./db/connect')

// post 数据的解析
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 静态资源路劲
app.use('/public', express.static(path.join(__dirname, './public')))

const AdminRouter = require('./router/AdminRouter')
const BannerRouter = require('./router/BannerRouter')

app.use('/admin', AdminRouter)
app.use('/banner',BannerRouter)

app.listen(3000, () => {
  console.log('服务器启动，端口号3000')
})