//46-1.导入路由
const Router=require("koa-router")
/*/
/46-6.安装并导入koa-multer,用户获取上传图片的数据---npm install koa-multer
const Multer=require('koa-multer')

//46-7.创建获取上传的图片数据的方法和保存的路径
const avatarUpload=Multer({
    dest:'./uploads/avatar'
})
//46-8.读取上传图片的字段
const avatarHandler=avatarUpload.single('avatar')//avatar即是postman中上传的key名字
*/

//46-9.把46-6,7,8放入到file.middleware.js文件中封装
const {
    //46-11.导入封装好的avatarHandle
    avatarHandler,
    //50-8.导入封装好的pictureHandle
    pictureHandler,
    //52-2.导入pictureResize---在file.middleware文件中创建pictureResize中间件
    pictureResize
}=require("../middleware/file.middleware")
/*46-12.在postman中创建文件夹'上传图像接口',并创建请求'上传头像接口'。
        POST:{{baseURL}}/upload/avatar
        form-data:key(avatar) values(图片) 
*/


const {
    //46-4.导入登录中间件
    verifyAuth
}=require('../middleware/auth.middleware')

const {
    //47-4.导出saveAvatarInfo
    saveAvatarInfo,
    //50-11.导入savePictureInfo---在filr.controller.js文件中创建savePictureInfo中间件
    savePictureInfo,
}=require("../controller/file.controller")

//46-2.创建路由
const fileRouter=new Router({prefix:'/upload'})
//46-5.创建上传头像图片的接口
    //46-9.获取图片数据的中间件avatarHandler放入到接口中
        //47-1.添加saveAvatarInfo中间件---保存头像信息到数据库,在controller文件夹中创建file.controller.js文件
fileRouter.post('/avatar',verifyAuth,avatarHandler,saveAvatarInfo)

//50-1.创建添加上传配图的接口
    //50-9.加入pictureHandler中间件
        //50-10.把上传的图片信息保存起来---添加savePictureInfo中间件
            //52-1.添加一个中间件对上传的图片做一些分辨率处理pictureResize
fileRouter.post('/picture',verifyAuth,pictureHandler,pictureResize,savePictureInfo)

//46-3.导出路由
module.exports=fileRouter