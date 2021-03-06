const express=require('express');
const router=express.Router();
const MenuTypeControl =require('../control/MenuTypeControl');
const ResponseStatus =require('../common/responseStatus');
/**
 * @api {post} /menu 获取菜谱列表
 * @apiName menuList
 * @apiGroup Menu
 *
 *
 * @apiSuccess {String} code 状态码
 * @apiSuccess {String} msg  信息提示
 * @apiSuccess {Array} list  菜谱列表
 * 
 */
router.get('/',(req,res)=>{
    MenuTypeControl.MenuList()
    .then((result)=>{
        res.send(Object.assign({},ResponseStatus.SUCCESS,{list:result}))
    })
    .catch((err)=>{
        res.send(ResponseStatus.INTERFACE_INNER_INVOKE_ERROR)
    })
})
/**
 * @api {post} /menu  添加菜谱
 * @apiName addMenu
 * @apiGroup Menu
 *
 * @apiParam {String} menu_name 添加菜谱的名字
 * @apiParam {String} menu_path 添加菜谱的图片地址
 * 
 * @apiSuccess {String} code 状态码
 * @apiSuccess {String} msg  信息提示
 * 
 **/
router.post('/',(req,res)=>{
    let {menu_name,menu_path}=req.body
    if(menu_name){
        MenuTypeControl.addMenu({menu_name,menu_path})
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
 * @api {delete} /menu  删除菜谱
 * @apiName menuDel
 * @apiGroup Menu
 *
 * @apiParam {String} _id 要删除的用户_id
 * 
 * @apiSuccess {String} code 状态码
 * @apiSuccess {String} msg  信息提示
 * 
 **/
router.delete('/',(req,res)=>{
    let {_id}=req.body
    MenuTypeControl.menuDel(_id)
    .then(()=>{
        res.send(Object.assign({},ResponseStatus.SUCCESS,{msg:'删除成功'}))
    })
    .catch(()=>{
        res.send(ResponseStatus.PARAM_TYPE_BIND_ERROR)
    })
})
/**
 * @api {put} /menu  修改菜谱
 * @apiName menuUpdate
 * @apiGroup Menu
 *
 * @apiParam {String} _id 要修改的菜谱的_id
 * @apiParam {String} menu_name 要修改的菜谱的名称
 * @apiParam {String} menu_path 要修改的菜谱的图片地址
 * 
 * @apiSuccess {String} code 状态码
 * @apiSuccess {String} msg  信息提示
 * 
 **/
router.put('/',(req,res)=>{
    let {_id,menu_name,menu_path}=req.body
    MenuTypeControl.menuAlter(_id,{menu_name,menu_path})
    .then(()=>{
        res.send(Object.assign({},ResponseStatus.SUCCESS,{msg:'修改成功'}))
    })
    .catch(()=>{
        res.send(ResponseStatus.PARAM_TYPE_BIND_ERROR)
    })
})

module.exports=router
