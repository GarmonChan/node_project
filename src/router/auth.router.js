//9-1.导入koa-router
const Router=require('koa-router')
const {
    //9-4.导入login---目前还没有这个文件,我们先导入,后面我们再对该文件进行代码逻辑处理
    login,
    //23-2.导入授权成功的success中间件
    success
}=require('../controller/auth.controller')

const {
    //10-2.导入中间件---目前还没有这个文件,我们先导入,后面我们再对该文件进行代码逻辑处理
    verifyLogin,
    //23-3.导入jwt验证中间件verifyAuth
    verifyAuth
}=require('../middleware/auth.middleware')

//9-2.创建路由
const authRouter=new Router()

//9-3.创建路由中间件login
authRouter.post('/login',verifyLogin,login)
    //10-1.在login中间件前面再添加一个verifyLogin中间件

/* 23-1.❗❗在这里创建一个接口,这个接口没有实际意义,主要目的用于
            一:封装一个函数,这个函数用于验证用户有没有授权       
            二:验证上面的接口颁发的签名是否是有效的
            verifyAuth中间件:当用户发表一条评论或者其他操作是,验证其有没有登录,如果没,要求先登录在发表
            success中间件:用户已经授权登录,则可以发表信息
            */  
authRouter.get('/test',verifyAuth,success)

//9-5.导出authRouter
module.exports=authRouter
