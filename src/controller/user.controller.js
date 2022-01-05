//48-9.ctx.body=avatarInfo不能返回一个图片的数据,因此我们要借助fs模块
const fs=require('fs')

//4-11.导出user数据查询的create
const userService=require('../service/user.service')
//48-6.导入获取头像的方法---getAvatarByUserId
const fileService=require('../service/file.service')
//48-16.导入封装好的常量AVATAR_PATH
const {AVATAR_PATH}=require('../constants/file-path')

//4-4.创建一个类用于控制user中注册接口的一些代码
class UserController{
    //4-5.异步操作数据库
    async create(ctx,next){
        //ctx.body='创建用户成功666~'
        
        //4-17.获取用户请求传递的参数
        const user=ctx.request.body

        //4-9.查询数据--对查询数据进行抽取,在service文件夹中创建user.service.js
        //4-12.查询数据---已封装
        const result=await userService.create(user)

        //4-13.返回数据
        ctx.body=result;
        //4-14.获取不到数据,需要对json数据进行解析,安装koa-bodyparser
    }

    //48-3.创建提供展示图片的中间件avatarInfo
    async avatarInfo(ctx,next){
        //48-4.用户的头像是哪一个文件?---在file.service.js中创建获取头像id的方法
        const {userId}=ctx.params
        //48-7.获取头像
        const avatarInfo=await fileService.getAvatarByUserId(userId)
        /* 48-8.❗在浏览器中输入地址localhost:8000/users/3/avatar 就可以获取到用户的头像图片了
                    浏览器显示的是json数据,和vue中老师写的接口类似 */
        //ctx.body=avatarInfo
        
        /*48-10.读取头像的相关数据---fs.createReadStream
            './uploads/avatar'是我们图片保存的地方,应该设置为常量,
            在constants文件夹中创建file-path.js文件,在里面定义常量*/
        //ctx.body=fs.createReadStream(`./uploads/avatar`) 48-10

        //48-17.提供图像信息--常量的写法---avatarInfo.filename获取具体的图片
        //ctx.body=fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`)

        /* 48-18.当我没在浏览器中输入localhost:8000/users/3/avatar,他并没有在页面中给我们显示图片
                    ,而是将图片文件自动下载了。原因是因为浏览器并不知道我们请求的这一个数据是一个图像
                    ,❗而是当成普通文件进行下载了。如果我们想当成普通文件进行下载可以使用上面的方法
                    ,❗如果想让浏览器知道其数据是一个图片在浏览器中显示,则用以下写法*/
        ctx.response.set('content-type',avatarInfo.mimetype)//类型image/jpeg
        ctx.body=fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`)
        
    }
}
//4-6.导出UserController这个对象
module.exports=new UserController()