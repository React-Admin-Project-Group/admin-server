//广告的数据模型
const mongoose = require('mongoose')

let BannerSchema =new mongoose.Schema({
    // banner_id:{type:Number,required:true},
    banner_name:{type:String,required:true},
    banner_type:{type:String,required:true}
});

//将schema转化为数据模型
let Banner = mongoose.model('BannerAdmin',BannerSchema);
module.exports = Banner