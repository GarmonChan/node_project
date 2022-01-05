//47-13.导出将图片数据保存到数据库中的方法createAvatar
const fileService=require('../service/file.service')
//49-2.导入常量
const {AVATAR_PATH}=require('../constants/file-path')
//49-3.导入user.service.js文件
const userService=require('../service/user.service')
//49-11.导入APP_HOST和APP_PORT
const {APP_HOST,APP_PORT}=require('../app/config')

//47-2.创建一个类,用于保存头像信息到数据库
class FileController{
    async saveAvatarInfo(ctx,next){
        //47-5.保存图像相关的信息---获取图像相关的信息
        console.log(ctx.req.file);
        const {filename,mimetype,size}=ctx.req.file
        const {id}=ctx.user
        //47-6.将图像数据保存到数据库中---在navicat中创建一张表,具体看'09.项目23-47'
        //47-7.在service文件夹中创建file.service.js文件
        //47-14.将图像数据保存到数据库中
        const result=await fileService.createAvatar(filename,mimetype,size,id)
        
        //49-1.将图片地址保存到users表中
        //const avatarUrl=`${AVATAR_PATH}/${filename}`
        /*49-9.像上面拼接的是绝对路径,我们应该拼接的是一个相对路径,所以把49-1注释掉
                const avatarUrl=`http://localhost:8000/users/3/avatar`  这是写死的方法
                应该在.env文件中设置全局变量
                    - APP_HOST=http://localhost     */
       //const avatarUrl=`http://localhost:8000/users/3/avatar`
       //49-12.常量的写法
       const avatarUrl=`${APP_HOST}:${APP_PORT}/users/${id}/avatar`
       //49-13.在这里对moment.service.js做一份备份---名为moment.service备份3.js

        //49-4.根据id去更新头像的url
        await userService.updateAvatarUrlById(avatarUrl,id)

        //47-15.返回结果
        //ctx.body=result 47-15

        //49-8.返回结果
        ctx.body='上传头像成功~~~'
    }
    /* 50-12.创建savePictureInfo中间件用于保存已经上传了图片的信息 
                在postman中的操作:
                    -在'上传图像接口'文件夹中创建'上传动态配图'请求
                    -POST:{{baseURL}}/upload/picture?momentId=1
                    -Body/form-data:上传两张图片,key都为picture
    */
    async savePictureInfo(ctx,next){
        //50-13.获取图像信息
        const files=ctx.req.files
        const{id}=ctx.user
        const{momentId}=ctx.query
        //50-14.将所有的文件信息保存到数据库中---在navicat中创建一个表file--具体看‘11.项目23-50’
        for(let file of files){
            const {filename,mimetype,size}=file
            //50-16.调用保存图片信息的方法---createFile,对图片信息进行保存
            await fileService.createFile(filename,mimetype,size,id,momentId)
        }
        //50-17.当所有图片都上传成功的时候打印
        ctx.body='动态配图上传完成'
    }
}
//47-3.导出
module.exports=new FileController()