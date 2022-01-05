 //52-7.安装jimp库---npm install jimp 并导入
 const Jimp =require('jimp')
 //52-12.导入path
 const path=require('path')

//46-6.安装并导入koa-multer,用户获取上传图片的数据---npm install koa-multer
const Multer=require('koa-multer')
//48-14.导入封装好的常量路径AVATAR_PATH
const{AVATAR_PATH}=require('../constants/file-path')
//50-4.导入封装好的常量路径PICTURE_PATH
const{PICTURE_PATH}=require('../constants/file-path')

//46-7.创建获取上传的图片数据的方法和保存的路径
const avatarUpload=Multer({
    //dest:'./uploads/avatar'  46-7
    
    //48-15.常量写法
    dest:AVATAR_PATH
})
//46-8.读取上传图片的字段
const avatarHandler=avatarUpload.single('avatar')//avatar即是postman中上传的key名字

//50-5.创建获取上传的图片数据的方法和保存的路径
const pictureUpload=Multer({
    dest:PICTURE_PATH
})
//50-6.读取上传图片的字段
const pictureHandler=pictureUpload.array('picture',9)//一个动态最多上传9个

//52-3.创建对上传的图片进行分辨率处理的中间件fileResize
const pictureResize=async (ctx,next)=>{
    //52-5.获取所有的图像信息
    const files=ctx.req.files

    //52-6.对图像进行处理---可以使用两个库处理---sharp库 (大库) 和 jimp库 (小库)---两者选其一即可
    for(let file of files){
        //52-9.路径和filename拼接
        const destPath=path.join(file.destination,file.filename)
       //52-8.通过Jimp.read读取文件
       Jimp.read(file.path).then(image=>{
           //52-10.通过resize对图片进行处理
           image.resize(1280,Jimp.AUTO)//❗❗宽1280,高保持比例缩放
                    .write(`${destPath}-large`)//写入文件,大图
                .resize(640,Jimp.AUTO)
                    .write(`${destPath}-middle`)//中图
                .resize(320,Jimp.AUTO)
                    .write(`${destPath}-small`)//小图
       })

    }
    //52-11.执行下一个中间件
    await next()
    //52-12.对moment.controller.js做一份备份---'moment.controller备份2.js'
}

//46-10.导出封装好的中间件
module.exports={
    avatarHandler,
    //50-7.导出封装好的pictureHandler中间件
    pictureHandler,
    //52-4.导出封装好的pictureResize
    pictureResize
}