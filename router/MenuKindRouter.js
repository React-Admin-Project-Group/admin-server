const express=require('express');
const router=express.Router();
const MenuKindControl =require('../control/MenuKindControl');
const ResponseStatus =require('../common/responseStatus');
/**
 * @api {get} /kinds 获取菜谱大类名列表
 * @apiName KindsList
 * @apiGroup menuKinds
 *
 *
 * @apiSuccess {String} code 状态码
 * @apiSuccess {String} msg  信息提示
 * @apiSuccess {Array} list  菜谱列表
 * 
 */
router.get('/',(req,res)=>{
    MenuKindControl.KindsList()
    .then((result)=>{
        res.send(Object.assign({},ResponseStatus.SUCCESS,{list:result}))
    })
    .catch((err)=>{
        res.send(ResponseStatus.INTERFACE_INNER_INVOKE_ERROR)
    })
})
/**
 * @api {post} /kinds  添加菜谱大类
 * @apiName addKinds
 * @apiGroup menuKinds
 *
 * @apiParam {String} kind_name 添加菜谱大类的名字
 * @apiParam {Array} child_kinds 添加菜谱大类的子类别
 * 
 * @apiSuccess {String} code 状态码
 * @apiSuccess {String} msg  信息提示
 * 
 **/
router.post('/',(req,res)=>{
    let {kind_name,child_kinds}=req.body
    if(kind_name){
        MenuKindControl.addKinds({kind_name,child_kinds})
        .then((result)=>{
            if(result){
                res.send(ResponseStatus.USER_HAS_EXISTED)
            }else{
                res.send(Object.assign({},ResponseStatus.SUCCESS,{msg:'添加成功'}))
            }
        })
        .catch((msg)=>{
            console.log(msg)
            res.send(ResponseStatus.INTERFACE_INNER_INVOKE_ERROR)
        })
    }else{
        res.send(ResponseStatus.PARAM_NOT_COMPLETE)
    }
})
/**
 * @api {delete} /kinds  删除菜谱大类名
 * @apiName kindsDel
 * @apiGroup menuKinds
 *
 * @apiParam {String} _id 要删除的菜谱大类名_id
 * 
 * @apiSuccess {String} code 状态码
 * @apiSuccess {String} msg  信息提示
 * 
 **/
router.delete('/',(req,res)=>{
    let {_id}=req.body
    MenuKindControl.kindsDel(_id)
    .then((data)=>{
        // console.log(data)
        if(data.code === 20008) {
            res.send(data);
        }else if(data.code === 20009){
            res.send(data);
        }else {
            res.send(Object.assign({},ResponseStatus.SUCCESS,{msg:'删除成功'}))
        }
    })
    .catch(()=>{
        res.send(ResponseStatus.PARAM_TYPE_BIND_ERROR)
    })
})
/**
 * @api {put} /kinds  修改菜谱大类名
 * @apiName kindsUpdate
 * @apiGroup menuKinds
 *
 * @apiParam {String} _id 要修改的菜谱大类名的_id
 * @apiParam {String} kind_name 要修改的菜谱大类的名称
 * @apiParam {Array} child_kinds 要修改的菜谱大类的子类别
 * 
 * @apiSuccess {String} code 状态码
 * @apiSuccess {String} msg  信息提示
 * 
 **/
router.put('/',(req,res)=>{
    let {_id,kind_name,child_kinds}=req.body
    MenuKindControl.kindsAlter(_id,{kind_name,child_kinds})
    .then(()=>{
        res.send(Object.assign({},ResponseStatus.SUCCESS,{msg:'修改成功'}))
    })
    .catch(()=>{
        res.send(ResponseStatus.PARAM_TYPE_BIND_ERROR)
    })
})

module.exports=router
