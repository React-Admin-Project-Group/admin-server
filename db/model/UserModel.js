const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: {type:String,require:true},
  password: {type:String,required:true},
  menus: {type:Array,required:false},
  works: {type:Array,required:false},
  focus: {type:Array,required:false},
  follows: {type:Array,required:false},
  favorite: {type:Array,required:false},
})

const UserModel = mongoose.model('users', UserSchema)
module.exports = UserModel
