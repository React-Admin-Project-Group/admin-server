// 该路由负责菜谱类别图片上传
const express = require('express')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const upload = multer({})
const router = express.Router()
const ResponseStatus = require('../common/responseStatus')

router.post('/kindImgUpload', upload.single('img'), (req, res) => {
  const { buffer, mimetype, size } = req.file
  if (size > 1000000) {
    return res.send(ResponseStatus.DATA_IMG_LARGE)
  }
  const types = ['jpg', 'gif', 'png', 'jpeg', 'webp']
  const extName = mimetype.split('/')[1]
  if (types.indexOf(extName) === -1) {
    return res.send(ResponseStatus.IMG_TYPE_ERROR)
  }
  // 将文件写入到静态资源目录下
  const name = new Date().getTime() + '_' + parseInt(Math.random() * 99999)
  fs.writeFile(path.join(__dirname, `../public/img/${name}.${extName}`), buffer, (err) => {
    if (err) {
      return res.send(ResponseStatus.INTERFACE_INNER_INVOKE_ERROR)
    } else {
      return res.send(Object.assign({}, ResponseStatus.SUCCESS, {
        msg: '图片上传成功',
        path: `/public/img/${name}.${extName}`
      }))
    }
  })
})
module.exports = router