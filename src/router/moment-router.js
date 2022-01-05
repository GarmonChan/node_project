//24-1.导入koa-router
const Router=require('koa-router')

//24-2.创建路由
const momentRouter=new Router({prefix:'/moment'})

const {
    //24-5.在发表动态消息--比如说说,前要验证是否登录,导入封装好的verifyAuth
    verifyAuth,
    //28-5-1.导入用户修改内容的权限(只能修改自己)---在auth.middleware.js文件中定义verifyPermission中间件
    verifyPermission
}=require('../middleware/auth.middleware')

//41-1.导出判断标签是否存在的中间件---在middleware文件夹中创建label.middleware.js文件
const {verifyLabelExists}=require('../middleware/label.middleware')

const {
    //24-6.导入create中间件---在controller文件夹中创建moment.controller.js文件
    create,
    //26-2.导入detail中间件---在moment.controller.js文件中定义detail中间件
    detail,
    //27-2.导入list中间件---在moment.controller.js文件中定义list中间件
    list,
    //28-2.导入update中间件---在moment.controller.js文件中定义update中间件
    update,
    //29-2.导入remove中间件---在moment.controller.js文件中定义remove中间件
    remove,
    //40-2.导入addLabels中间件---在moment.controller.js文件中定义remove中间件
    addLabels,
    //51-2.导入fileInfo中间件---在moment.controller.js文件中定义fileInfo中间件
    fileInfo
}=require("../controller/moment.controller")

//24-4.创建路由中间件--接口,verifyAuth用于做未登录的拦截,create用于登录后的发表动态
momentRouter.post('/',verifyAuth,create)
//26-1.创建获取发布的单个动态信息的接口--momentId对应的是moment表中的id
momentRouter.get('/:momentId',detail)
//27-1.创建获取发布的多个动态信息的接口
momentRouter.get('/',list)
/* 28-1.创建一个接口用于对发布的动态信息进修修改---修改内容一般用patch请求
        -用户必须登录(授权)---verifyAuth中间件
        -验证登录的用户是否有具备去修改内容的权限,只能修改自己不能修改他人---verifyPermission中间件
        -对发布的动态信息进行修改---update中间件
*/
momentRouter.patch('/:momentId',verifyAuth,verifyPermission,update)
//29-1.创建一个接口,用于对发表的动态信息进行删除---使用delete请求
momentRouter.delete('/:momentId',verifyAuth,verifyPermission,remove)

//40-1.创建给动态添加标签的接口
//momentRouter.post('/:momentId/labels',verifyAuth,verifyPermission,addLabels)
//41-2.在添加标签之前首先要判断标签是否存在,所以把verifyLabelExists中间件放到addLabels前面
momentRouter.post('/:momentId/labels',verifyAuth,verifyPermission,verifyLabelExists,addLabels)

//51-1.动态配图服务:创建获取用户动态信息时,显示配图的接口
momentRouter.get('/images/:filename',fileInfo)



//24-3.导出路由
module.exports=momentRouter  