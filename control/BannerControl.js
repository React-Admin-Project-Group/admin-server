const BannerModel = require('../db/model/BannerModel')
const ResponseCode = require('../common/responseStatus')

const BannerControl = {
  //获取广告数据列表
    async getBanner (page=1, pageSize=5) {
        const count = await BannerModel.countDocuments()

            const result =await BannerModel.find()
            .limit(Number(pageSize)).skip((page-1) * pageSize)
            .sort({_id:-1})
            if(result){
                return {
                    list: result.map(item=>{
                        return {
                            _id:item['_id'],
                            banner_id:item.banner_id,
                            banner_name:item.banner_name,
                            banner_type:item.banner_type
                        }
                    }),
                    count
                }
            }
        },
    //添加广告
    async addBanner (banner) {
        const { banner_id, banner_name, banner_type} = banner
        //判断banner_id是否重复
        const isExist = await BannerModel.findOne({banner_id})
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
    },
    //根据id获取当前那条数据
    async findOne(_id){
        //_id要查询的广告数据id
        const info = await BannerModel.findOne({_id})
        if(info){
            return info
        }else{
            return ResponseCode.DATA_NOT_EXIST
        }
    }
}

module.exports = BannerControl