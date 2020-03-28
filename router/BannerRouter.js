const express = require('express');
const BannerControl = require('../control/BannerControl');
const ResponseStatus = require('../common/responseStatus');
const router = express.Router();

/**
 * @api {get} /banner 获取广告数据列表
 * @apiName bannerList
 * @apiGroup Banner
 *
 *
 * @apiSuccess {String} code 状态码
 * @apiSuccess {String} msg  信息提示
 * @apiSuccess {Array} list  广告数据列表
 * 
 */

router.get('/', (req,res) => {
    BannerControl.getBanner()
    .then((result)=>{
        res.send(Object.assign({},ResponseStatus.SUCCESS,{list:result}))
    })
    .catch((err)=>{
        res.send(ResponseStatus.INTERFACE_INNER_INVOKE_ERROR)
    })
});

/**
 * @api {post} /banner  添加广告
 * @apiName bannerAdd
 * @apiGroup Banner
 *
 * @apiParam {Number} banner_id 添加的广告id
 * @apiParam {String} banner_name 添加的广告名称(唯一的,通过此名字判断是否重复)
 * @apiParam {String} banner_type 添加的广告类型
 * 
 * @apiSuccess {String} code 状态码
 * @apiSuccess {String} msg  信息提示
 * 
 */

router.post('/',(req,res) => {
    let {banner_id, banner_name, banner_type} = req.body
    if(banner_name){
        BannerControl.addBanner({banner_id, banner_name, banner_type})
        .then((result)=>{
            if (result) {
                res.send(ResponseStatus.USER_HAS_EXISTED)
            } else {
                res.send(Object.assign({}, ResponseStatus.SUCCESS, {msg: '添加成功'}))
            }
        })
        .catch((msg)=>{
            // console.log(msg)
            res.send(ResponseStatus.INTERFACE_INNER_INVOKE_ERROR)
        })
    } else {
        res.send(ResponseStatus.PARAM_NOT_COMPLETE)
    }
})

/**
 * @api {delete} /banner/delete  根据id删除广告
 * @apiName bannerDel
 * @apiGroup Banner
 *
 * @apiParam {String} _id 要删除的_id
 * 
 * @apiSuccess {String} code 状态码
 * @apiSuccess {String} msg  信息提示
 * 
 */

router.delete('/delete',(req,res)=>{
    const {_id} = req.body
    BannerControl.delBanner(_id)
    .then((result)=>{
        res.send(Object.assign({}, ResponseStatus.SUCCESS, {msg: '删除成功'}))
    })
    .catch((msg)=>{
        // console.log(msg)
        res.send(ResponseStatus.PARAM_TYPE_BIND_ERROR)
    })
})

/**
 * @api {put} /banner  修改广告
 * @apiName bannerUpData
 * @apiGroup Banner
 *
 * @apiParam {String} _id 通过此id来修改那一条
 * @apiParam {Number} banner_id 修改的广告id
 * @apiParam {String} banner_name 修改的广告名称
 * @apiParam {String} banner_type 修改的广告类型
 * 
 * @apiSuccess {String} code 状态码
 * @apiSuccess {String} msg  信息提示
 * 
 */

router.put('/',(req,res)=>{
    const {_id,banner_id,banner_name,banner_type} = req.body
    BannerControl.updated(_id,{banner_id,banner_name,banner_type})
    .then((result)=>{
        res.send(Object.assign({}, ResponseStatus.SUCCESS, {msg: '修改成功'}))
    })
    .catch((msg)=>{
        res.send(ResponseStatus.PARAM_TYPE_BIND_ERROR)
    })
})


module.exports = router