const MenuKindModel=require('../db/model/MenuKindModel')
const ResponseCode=require('../common/responseStatus')

const MenuKindControl={
    /* 获取菜谱大类数据列表 */ 
    async KindsList(){
        const result =await MenuKindModel.find()
        if(result){
            return result
        }
    },
    /* 添加菜谱大类 */ 
    async addKinds(kinds){
        const {kind_name,child_kinds}=kinds
        //判断菜谱大类名是否重复
        const isExist=await MenuKindModel.findOne({kind_name})
        if(isExist){
            return ResponseCode.DATA_ALREADY_EXISTED
        }else{
            await MenuKindModel.insertMany({
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
            const infos =await MenuKindModel.find({_id})
            if(infos[0].child_kinds == null) {
                result = await MenuKindModel.deleteOne({_id})
            }else {
                const child = infos[0].child_kinds.join(',')
                if(child.length !== 0){
                    result = ResponseCode.CHILD_NOT_DELETE
                }else{
                    result = await MenuKindModel.deleteOne({_id})
                }
            }
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
    },
    /* 根据id新增单个菜谱子类别 */ 
    async addChild_type(_id,child_id){
        // _id 要修改的菜谱大类的Id child_id 子类别中新增的子类
        const info =await MenuKindModel.find({_id})
        let kinds = info[0].child_kinds
        const kind_name = info[0].kind_name
        let child_kinds = []
        if(kinds.length == 0) {
            kinds.push(child_id)
            child_kinds = kinds
        }else {
            let arr = kinds.join(',').split(',')
            arr.push(child_id)
            child_kinds = arr
        }
        let result=await MenuKindModel.updateOne({_id},{kind_name,child_kinds})
        if(result){
            return result
        }else{
            throw '请传递有效的菜谱大类名id'
        }
    },
    /* 根据id删除单个菜谱子类别 */ 
    async delChild_type(_id,child_id){
        // _id 要修改的菜谱大类的Id child_id 子类别中要删除的子类
        const info =await MenuKindModel.find({_id})
        let kinds = info[0].child_kinds
        const kind_name = info[0].kind_name
        let child_kinds = []
        if(kinds.length !== 0) {
            child_kinds = kinds.join(',').split(',')
        }else {
            child_kinds = kinds
        }
        let index = child_kinds.indexOf(child_id)
        if(index !== -1) {
            child_kinds.splice(index,1)
        }else {
            return ResponseCode.DATA_NOT_EXIST
        }
        let result=await MenuKindModel.updateOne({_id},{kind_name,child_kinds})
        if(result){
            return result
        }else{
            throw '请传递有效的菜谱大类名id'
        }
    },
    /* 根据id查询单条记录 */ 
    async findOne(_id){
        // _id 要查询的菜谱大类的Id
        const info =await MenuKindModel.findOne({_id})
        if(info){
            return info
        }else {
            return ResponseCode.DATA_NOT_EXIST
        }
    },
}
module.exports= MenuKindControl