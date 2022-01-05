//8-5.对md5password加密方式进行封装
//8-6.导入node自带的库crypto
const crypto=require('crypto')
//8-7.创建md5password加密方式
const md5password=(password)=>{
    //8-8.创建加密类型:md5加密算法
    const md5=crypto.createHash('md5')
    //8-9.利用md5对象进行加密,digest('hex')表示拿到16进制的结果,digest()获取到的是buffer
    const result=md5.update(password).digest('hex')//
    //8-10.将结果返回
    return result
}

//8-11.导出md5password
module.exports=md5password