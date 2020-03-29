const MenuKindModel=require('../db/model/MenuKindModel')
const ResponseCode=require('../common/responseStatus')

const MenuKindControl={
    /* 获取菜谱大类数据列表 */ 
    async KindsList(){
        const result =await MenuKindModel.find()
        if(result){
            return result.map(item =>{
                return {
                    _id:item['_id'],
                    kind_name:item['kind_name'],
                    child_kinds:item['child_kinds'],
                }
            })
        }
    },
    /* 添加菜谱大类 */ 
    async addKinds(kinds){
        const {kind_name,child_kinds}=kinds
        //判断菜谱大类名是否重复
        const isExist=await MenuKindModel.findOne({kind_name})
        if(isExist){
            return ResponseCode.USER_HAS_EXISTED
        }else{
            const result= await MenuKindModel.insertMany({
                kind_name,
                child_kinds,
            })
        }
    },
    /* 根据_id删除菜谱大类名 */
    async kindsDel(_id){
        const isExist=await MenuKindModel.findOne({_id})
        let result = ''
        if(!isExist){
            result = ResponseCode.DATA_NOT_EXIST
        }else{
            result = await MenuKindModel.deleteOne({_id})
        }
        if(result){
            return result
        }else{
            throw '请传递有效的菜谱大类名id'
        }
    },
    /* 根据id修改菜谱大类名 */ 
    async kindsAlter(_id,updateInfo){
        // _id 要修改的菜谱大类的Id update 修改的目标数据
        let result=await MenuKindModel.updateOne({_id},updateInfo)
        if(result){
            return result
        }else{
            throw '请传递有效的菜谱大类名id'
        }
    }
}
module.exports= MenuKindControl