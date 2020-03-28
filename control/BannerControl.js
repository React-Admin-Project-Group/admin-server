const BannerModel = require('../db/model/BannerModel')
const ResponseCode = require('../common/responseStatus')

const BannerControl = {
  //获取广告数据列表
    async getBanner () {
        const result = await BannerModel.find()
        if(result){
            return result.map(item =>{
                return {
                    _id:item['_id'],
                    banner_id:item.banner_id,
                    banner_name:item.banner_name,
                    banner_type:item.banner_type
                }
            })
        }
    },
    //添加广告
    async addBanner (banner) {
        const { banner_id, banner_name, banner_type} = banner
        //判断是否重复
        const isExist = await BannerModel.findOne({banner_name})
          if(isExist){
              return ResponseCode.USER_HAS_EXISTED
          }else{
              const result = await BannerModel.insertMany({
                  banner_id,
                  banner_name,
                  banner_type
              })
          }
    },
    //删除广告
    async delBanner (_id) {
        const result = BannerModel.deleteOne({_id})
        if(result){
            return result
        } else {
            throw '请输入有效的ID'
        }
    },
    //修改广告
    async updated (_id,updatedInfo) {
        // _id 要修改的主键id  updateInfo 修改的目标数据
        let result = await BannerModel.updateOne({_id},updatedInfo)
        return result
    }
}

module.exports = BannerControl