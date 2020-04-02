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
const ImgUploadRouter = require('./router/ImgUploadRouter')
const LogRouter = require('./router/LogRouter')
const BannerRouter = require('./router/BannerRouter')
const MenuTypeRouter = require('./router/MenuTypeRouter')
const MenuKindRouter = require('./router/MenuKindRouter')
app.use('/admin', AdminRouter)
app.use('/upload', tokenMiddleWare, ImgUploadRouter)
app.use('/log', tokenMiddleWare, LogRouter)
app.use('/banner', tokenMiddleWare, BannerRouter)
app.use('/menu',tokenMiddleWare, MenuTypeRouter)
app.use('/kinds',tokenMiddleWare,MenuKindRouter)

app.listen(3000, '0.0.0.0',  () => {
  console.log('服务器启动，端口号3000')
})