//6-21.导入错误常量
const errorType=require('../constants/error-types')
//7-2.导入getUserByName
const service=require('../service/user.service')
//8-12.导入加密方法md5password
const md5password=require('../utils/password-handle')

//6-3.中间件不搞类,搞一个单独的函数
//6-4.创建verifyUser中间件,异步要加async❗❗
const verifyUser=async(ctx,next)=>{
    //6-7.获取用户名和密码
    const {name,password}=ctx.request.body
    //6-8.判断用户名或者密码是否为空---当name不传的时候为undefined,!name为真
    if(!name || !password){
        //const error=new Error("用户名或者密码不能为空~");//6-8

        /*6-18.在整个程序的开发过程中会有不同的错误,我们应该对每一个错误做出相对于的处理
            -在src目录下创建constants常量文件夹,并创建error-types.js文件   */
        //6-22.将错误常量写入到Error中
        const error=new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED)

        return ctx.app.emit('error',error,ctx)//6-8
    }
    //6-9.判断这次注册的用户名时没有被注册过的
    //7-3.判断这次注册的用户名时没有被注册过的
    const result=await service.getUserByName(name)
    console.log(result);//result返回时一个数组
    if(result.length){//如果length有值,说明当前是有数据的
        //7-6.将同名错误写入到Error中
        const error=new Error(errorType.USER_ALREADY_EXISTS)
        return ctx.app.emit('error',error,ctx)
    }


    //6-10.await不能省略,等所有操作完之后才会执行next,下一个中间件,省略了不会有这样的效果
    await next()
}

//8-2.创建handlePassword中间件,用于密码加密
const handlePassword=async(ctx,next)=>{
    //8-3获取密码
    const {password}=ctx.request.body //用let不用const的原因是可以对密码重新赋值
    //8-4.对获取到密码进行加密处理----在utils/password-handle.js对md5password进行封装
    ctx.request.body.password=md5password(password)

    //8-13.执行next,否者不会执行create中间件
    await next()

}

//6-5.导出中间件verifyUser
module.exports={
    verifyUser,
    //8-14.导出handlePassword
    handlePassword
}