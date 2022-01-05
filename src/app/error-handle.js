//6-23:导入错误常量
const errorType=require('../constants/error-types')

//6-12.创建错误处理函数
const errorHandler=(error,ctx)=>{
    //6-24.创建status和message
    let status,message
    //6-25.通过错误常量对错误进行一些相对于的处理
    switch (error.message) {
        case errorType.NAME_OR_PASSWORD_IS_REQUIRED:
            status=400//bad request 错误请求
            message='用户名和密码不能为空'
            break;
        //7-7.同名错误处理
        case errorType.USER_ALREADY_EXISTS:
            status=409//conflict 冲突
            message='该用户名已被创建'
            break;
        //10-7-5.登录时,用户未注册的错误处理
        case errorType.USER_DOES_NOT_EXISTS:
            status=400//bad request 错误请求,参数错误
            message='用户名不存在'
            break;
        //10-8-6.登陆时,用户密码不正确
        case errorType.PASSWORD_IS_INCORRENT:
            status=400//bad request 错误请求,参数错误
            message='用户密码不正确'
            break;
        //23-15.jwt验证失败
        case errorType.UNAUTHORIZATION:
            status=401//bad request 错误请求,参数错误
            message='无效的token~'
            break;
            /* 23-16.在postman中的执行过:
            -'用户登录接口',发送{{baseURL}}/login请求,复制token
            -'用户登录验证',将token复制到Authorization/Bearer Token中
            ,发送请求{{baseURL}}/test查看验证是否成功~~
            
            ❗❗❗在postman中通过以上手动的方法去验证非常的麻烦,我们可以件token设置为全局变量,
            在我们发布签名的时候,就可以获取token,然后对token进行验证
            方法如下:
            -在'用户登录接口'的Tests中编写
            const res=pm.response.json();
            pm.globals.set('token',res.token);
            -在'用户登录验证',将{{token}}写入到Token中
            */
           //23-20.未在Authorization中传入token
           case errorType.UNSEND_TOKEN:
               status=401//bad request 错误请求,参数错误
               message='未在Authorization中传入token'
               break;
           //28-5-14.没有权限的错误信息UNPERMISSION
           case errorType.UNPERMISSION:
               status=401//bad request 错误请求,参数错误
               message='您不是该动态信息的发布者,无操作权限'
               break;
           

        default:
            status=404
            message='没找到~~~'
            break;
    }

    //6-16.打印错误信息
    //console.log(error.message);

    //6-17.返回404
    //ctx.status=404
    //ctx.body='发生错误啦'

    //6-26.把17注释掉,用变量来显示结果
    ctx.status=status
    ctx.body=message
    //6-27.这样写法好处就是当有别的错误处理的时候,我们可以在项目里面显示不同的错误信息
}

//6-13.导出错误处理函数errorHandle
module.exports=errorHandler