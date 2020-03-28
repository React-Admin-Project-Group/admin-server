const mongoose=require('mongoose')

// 创建Schema对象
const MenuTypeSchema=new mongoose.Schema({
    menu_id:{type:String,require:true},
    menu_name:{type:String,required:true},
    menu_path:{type:String,required:true}
})
const MenuTypeModel=mongoose.model('menu',MenuTypeSchema)
module.exports=MenuTypeModel
