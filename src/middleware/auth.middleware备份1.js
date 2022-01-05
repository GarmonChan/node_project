//23-7.导入jsonwebtoken
const jwt=require('jsonwebtoken')
//23-8.导入公钥PUBLIC_KEY来验证token
const {PUBLIC_KEY}=require('../app/config')//记得加{}因为是对象的解构

//10-6-1.导入错误常量
const errorType=require('../constants/error-types')
//10-7-1.导入service的getUserByName
const userService=require('../service/user.service')
//28-5-9.导入用户修改动态信息权限checkMoment
const authService=require('../service/auth.service')
//10-8-1.导入md5password
const md5password=require('../utils/password-handle')


//10-3.创建用户名和密码校验中间件
const verifyLogin=async(ctx,next)=>{
    console.log("验证登录的middleware~");
    //10-5.获取用户名和密码
    const {name,password}=ctx.request.body
    //10-6.判断用户名和密码是否为空---复制user-middleware中的相关代码
    if(!name ||!password){
        const error=new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED)
        return ctx.app.emit('error',error,ctx)
    }
    //10-7.判断用用户名是否存在,即用户名有没有被注册---复制user-middleware中的相关代码
    const result=await userService.getUserByName(name)
    const user=result[0]//result返回的是数组[用户名,字段],[0]为用户名,user['messi','garmon'.....]
    console.log(user);//user返回时一个数组
    if(!user){//如果用户不存在,返回错误信息
        //10-7-4将用户不存在错误写入到Error中
        const error=new Error(errorType.USER_DOES_NOT_EXISTS)
        return ctx.app.emit('error',error,ctx)
    }
    //10-8.用户已存在,判断密码是否与数据库中的密码一致(加密)
    //10-8-2.判断md5password加密的密码和数据库中的密码是否一致
    if(md5password(password) !==user.password){
        //10-8-5.将用户密码不正确错误信息写入到Error中
        const error=new Error(errorType.PASSWORD_IS_INCORRENT)
        return ctx.app.emit('error',error,ctx)
    }

    //22-1.当什么的条件全部验证成功的话,将ctx.user放入一个user
    ctx.user=user

    //10-9.调用next,否则login中间件无法执行
    await next()

}

//23-5.创建jwt验证中间件verifyAuth
const verifyAuth=async(ctx,next)=>{
    console.log("验证授权的middleware~");
    //23-9.获取token
    const authorization=ctx.headers.authorization
    //23-17.对未在Authorization中传入token发送错误请求
    if(!authorization){
        const error=new Error(errorType.UNSEND_TOKEN)
        return ctx.app.emit('error',error,ctx)
    }
    const token=authorization.replace("Bearer ","")//23-9
    //23-10.验证token
    try{
        //通过公钥的方法验证签名(id/name/iat/exp)
        const result=jwt.verify(token,PUBLIC_KEY,{
            //验证的方法为RS256,因为验证的方法可以有很多种,所以以数据的形式进行编写
            algorithms:['RS256']
        })
        ctx.user=result//将result保存起来
        //23-11.验证完毕后执行下一个中间件
        await next()//不然执行不了下一个中间件sucess
    }catch(err){
        //23-14.验证失败,设置错误信息,并发送错误信息
        const error=new Error(errorType.UNAUTHORIZATION)
        ctx.app.emit('error',error,ctx) 

    }
}
/* 28-5-2.创建用户修改权限verifyPermission中间件
            -1.很多内容都需要验证权限:修改/删除动态,修改/删除评论,修改/删除头像图片...
            -2.接口:业务接口/后端管理系统
                一对一:user -> role
                一对多:role -> menu(删除动态/修改动态)
*/
const verifyPermission=async(ctx,next)=>{
    /*28-5-4.思路:用户在修改信息的时候看他是否具备修改权限(有权限修改自己的,无权限修改他人的),
            -如果有则await next()执行下一个中间件update进行修改
            -如果没有则输出错误信息    */
    console.log("验证用户有没有修改权限的middleware~~");
    //28-5-5.获取参数---在serice文件夹中创建auth.service.js文件
    const {momentId}=ctx.params
    const {id}=ctx.user
    //28-5-10.查询是否具备权限
    const isPermission=await authService.checkMoment(momentId,id)
    // if(!isPermission){
    //     //28-5-11.在error-type.js中创建没有权限的错误信息UNPERMISSION
    //     const error=new Error(errorType.UNPERMISSION)
    //     return ctx.app.emit('error',error,ctx)
    // }
    // await next()
    try{//用try catch的写法可以捕获异常,避免未授权--是上面的严谨写法
        if(!isPermission) throw new Error()
        await next()
    }catch(err){
        //28-5-11.在error-type.js中创建没有权限的错误信息UNPERMISSION
        const error=new Error(errorType.UNPERMISSION)
        return ctx.app.emit('error',error,ctx)
    }

    
}

module.exports={
    //10-4.导出中间件verifyLogin
    verifyLogin,
    //23-6导出verifyAuth
    verifyAuth,
    //28-5-3.导出verifyPermission
    verifyPermission
}