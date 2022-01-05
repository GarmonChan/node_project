//4-1.将index.js文件中有关路由user的代码剪切到这里
const Router=require('koa-router')
const{
    //4-7.导入user.controller.js中的create对象
    create,
    //48-2.导入avatarInfo中间件---在user.controller.js文件中创建avatarInfo中间件
    avatarInfo
}=require('../controller/user.controller')

const{
    //6-6.导入verifyUser
    verifyUser,
    //8-15.导入handlePassword
    handlePassword
}=require('../middleware/uer-middleware')



//创建路由
const userRouter=new Router({prefix:'/users'})

/*
//注册接口---post请求
userRouter.post('/',(ctx,next)=>{
    ctx.body='创建用户成功~'
})
*/

//4-8.注册接口
//userRouter.post('/',create)//4-8
//6-1.在真正执行create之前,先判断用户名和密码是否正确,意味着要在create前面添加一个verifyUser中间件
//userRouter.post('/',verifyUser,create)//verifyUser表示验证用户中间件
//6-2.在src目录下创建middleware文件夹,并创建user.middleware.js文件

//8-1.再增加一个中间件handlePassword,所以将6-1注释掉
userRouter.post('/',verifyUser,handlePassword,create)//handlePassword中间件是将密码作加密处理

//48-1.创建提供展示图片的接口
userRouter.get('/:userId/avatar',avatarInfo)


//4-2.导出路由userRouter
module.exports=userRouter