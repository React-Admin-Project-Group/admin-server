const mongoose = require('mongoose')

const MenuSchema = new mongoose.Schema({
  user_id: { type: String, require: true },
  title: { type:String, require:false },
  coverImg: { type: String, required:true },
  content: { type:String, require:false },
  status: { type: Number, required: true}
})

const MenuModel = mongoose.model('menus', MenuSchema)
module.exports = MenuModel