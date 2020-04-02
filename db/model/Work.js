const mongoose = require('mongoose')

const WorkSchema = new mongoose.Schema({
  user_id: { type: String, require: true },
  imgs: { type:Array, required:true },
  title: { type:String, require:false },
  content: { type:String, require:false },
  status: { type: Number, required: true}
})

const WorkModel = mongoose.model('works', WorkSchema)
module.exports = WorkModel
