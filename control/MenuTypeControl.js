const MenuTypeModel=require('../db/model/MenuTypeModel')
const ResponseCode=require('../common/responseStatus')

const MenuTypeControl={
    /* 获取菜谱数据列表 */ 
    async MenuList(){
        const result =await MenuTypeModel.find()
        if(result){
            return result.map(item =>{
                return {
                    _id:item['_id'],
                    menu_name:item.menu_name,
                    menu_path:item.menu_path,
                }
            })
        }
    },
    /* 添加菜谱 */ 
    async addMenu(menu){
        const {menu_name,menu_path}=menu
        //判断菜谱是否重复
        const isExist=await MenuTypeModel.findOne({menu_name})
        if(isExist){
            return ResponseCode.DATA_ALREADY_EXISTED
        }else{
            const result= await MenuTypeModel.insertMany({
                menu_name,
                menu_path,
            })
            return result
        }
    },
    /* 根据_id删除菜谱 */
    async menuDel(_id){
        const result =await MenuTypeModel.deleteOne({_id})
        if(result){
            return result
        }else{
            throw '请传递有效的菜谱小类id'
        }
    },
    /* 根据id修改菜谱 */ 
    async menuAlter(_id,updateInfo){
        // _id 要修改的菜谱的Id update 修改的目标数据
        let result=await MenuTypeModel.updateOne({_id},updateInfo)
        if(result){
            return result
        }else{
            throw '请传递有效的菜谱小类id'
        }
    },
    /* 根据id新增单个菜谱大类别*/
    async findOne(_id){
        // _id 根据id查询菜谱大类
        const info=await MenuTypeModel.find({_id})
        if(info){
            return info
        }else{
            return ResponseCode.DATA_NOT_EXIST
        }
    } 
}
module.exports= MenuTypeControl