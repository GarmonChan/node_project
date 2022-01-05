//6-19.创建错误常量,名字和密码为空
const NAME_OR_PASSWORD_IS_REQUIRED='name_or_password_is_required'//名字和密码时必须传的
//7-4.创建用户名已被创建的错误常量
const USER_ALREADY_EXISTS='user_already_exists'
//10-7-2.创建用户不存在的错误信息
const USER_DOES_NOT_EXISTS='user_does_not_exists'
//10-8-3.创建用户的密码不正确的错误信息
const PASSWORD_IS_INCORRENT='password_is_incorrent'
//23-12.创建jwt验证失败的错误信息
const UNAUTHORIZATION='UNAUTHORIZATION'
//23-18.创建对未在Authorization中传入token发送错误请求
const UNSEND_TOKEN='unsend_token'
//28-5-12.创建没有权限的错误信息
const UNPERMISSION='UNPERMISSION'


//6-20.导出错误常量
module.exports={
    NAME_OR_PASSWORD_IS_REQUIRED,
    //7-5.导出USER_ALREADY_EXISTS
    USER_ALREADY_EXISTS,
    //10-7-3.导出用户不存在的错误信息
    USER_DOES_NOT_EXISTS,
    //10-8-4.导出用户密码不正确的错误信息
    PASSWORD_IS_INCORRENT,
    //23-13.导出UNAUTHORIZATION
    UNAUTHORIZATION,
    //23-19.导出UNSEND_TOKEN
    UNSEND_TOKEN,
    //28-5-13.导出UNPERMISSION
    UNPERMISSION
}
