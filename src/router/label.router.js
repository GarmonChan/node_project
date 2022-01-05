//39-1.导入koa-router
const Router=require("koa-router")

const {
    //39-5.导入验证登录verifyAuth
    verifyAuth
}=require('../middleware/auth.middleware')
const {
    //39-6.导入创建标签的中间件create---在controller文件夹中创建label.controller.js文件
    create,
    //43-2.导入展示标签的中间件list---在label.controller.js中创建展示标签的中间件
    list
}=require('../controller/label.controller')


//39-2.创建路由
const labelRouter=new Router({prefix:'/label'})

//39-4.创建标签接口
labelRouter.post('/',verifyAuth,create)
//43-1.创建展示标签的接口
labelRouter.get('/',list)

//39-3.导出labelRouter
module.exports=labelRouter