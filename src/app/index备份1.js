//1-1.导入koa
const Koa=require('koa')
//3-1.koa中只有use方法没有post等方法,所以安装koa-router并导入
const Router=require('koa-router')

//1-2.创建koa服务器
const app=new Koa();

//3-2.创建路由
const userRouter=new Router({prefix:'/users'})
//3-3.注册接口---post请求
userRouter.post('/',(ctx,next)=>{
    console.log("哈哈哈哈");
    ctx.body='创建用户成功~'
})
//3-4.注册路由
app.use(userRouter.routes())
//3-5.设置未被设置的网络请求方法,在向服务器发送请求时返回Method Not Allowed
app.use(userRouter.allowedMethods())
/* 3-6.在postman中向服务器发送请求
        -在collections->New Collection创建新的文件夹'coderhub'
        -在'coderhub'文件夹右键选择add folder创建新的文件夹为'用户请求接口'
        -在'用户请求接口'文件夹中右键add request创建请求为'用户请求接口'

        -在postman中创建环境变量
            -new --> Enviornment -->略
        
        -发送网络请求post请求
            -{{baseURL}}/users
            -编写json文件 { "name":"garmon.chan" , "password":123456 }
*/

//2-1.导出app
module.exports=app