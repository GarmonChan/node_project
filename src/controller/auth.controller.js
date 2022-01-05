//22-3.安装jsonwebtoken库并导入
const jwt=require('jsonwebtoken')
//22-10.导入私钥文件和公钥文件
const{PRIVATE_KEY,PUBLIC_KEY}=require('../app/config')

//9-8.创建用户登录的控制器
class AuthController{
    async login(ctx,next){
        //22-2.放入user之后,可以在这里获取得到user
        console.log(ctx.user);
        //22-4.颁发签名--使用的是非对称加密,所以我们把直接的keys文件夹粘贴到app目录下
        const {id,name}=ctx.user
        const token=jwt.sign({id,name},PRIVATE_KEY,{//22-11.颁发签名并设置加密方式
            expiresIn:60*60*24,//保存时间
            algorithm:'RS256'//非对称加密方式为RS256
        })
        //22-12.返回id,name,token
        ctx.body={id,name,token}

        //获取用户名
        //const {name}=ctx.request.body //9-8
        //console.log(name);  //9-8
        //ctx.body=`登录成功,欢迎${name}回来~` //9-8
    }

    //23-4.创建jwt验证成功的success中间件
    async success(ctx,next){
        ctx.body='授权成功~~'
    }
}

//9-9.导出AuthController这个对象
module.exports=new AuthController()
//9-10.在postman中创建一个新的请求-'用户请求接口'