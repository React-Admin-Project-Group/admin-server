const mongoose=require('mongoose')

// 创建Schema对象
const MenuKindSchema=new mongoose.Schema({
    menu_id:{type:String,require:true},
    kind_name:{type:String,required:true},
    child_kinds:{type:Array,required:false}
})
const MenuKindModel=mongoose.model('menuKinds',MenuKindSchema)
module.exports=MenuKindModel
