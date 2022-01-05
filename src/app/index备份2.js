//1-1.导入koa
const Koa=require('koa')
//4-15.导出koa-bodyparser---用于解析json代码
const bodyParser=require('koa-bodyparser')

//4-3.导入封装好的userRouter
const userRouter=require("../router/user.router")
//9-6.导入路由authRouter
const authRouter=require('../router/auth.router')
//6-14.导入错误处理行数errorHandle
const errorHandler=require('./error-handle')

//1-2.创建koa服务器
const app=new Koa();

//4-16.注册bodyParser---顺序不能变,因为中间件是挨个执行的
app.use(bodyParser())
//3-4.注册路由
app.use(userRouter.routes())
//3-5.设置未被设置的网络请求方法,在向服务器发送请求时返回Method Not Allowed
app.use(userRouter.allowedMethods())
//9-7.注册路由
app.use(authRouter.routes())
app.use(authRouter.allowedMethods())


//6-11.在app目录下创建错误处理函数文件夹error-handle.js
//6-15.监听错误处理函数errorHandler
app.on('error',errorHandler)

//2-1.导出app
module.exports=app