//31-1.导入koa-router
const Router=require('koa-router')

const {
    //31-5.导入登录中间件verifyAuth
    verifyAuth,
    //33-2.导入验证权限中间件verifyPermission 
    verifyPermission
}=require('../middleware/auth.middleware')
const {
    //31-6.导入发布评论的中间件create---在controller文件夹中创建comment.controller.js
    create,
    //32-2.导入回复评论中间件reply---在comment.controller.js文件中编写reply中间件
    reply,
    //33-3.导入修改评论的中间件update---在comment.controller.js文件中编写update中间件
    update,
    //35-2.导入删除评论的中间件remove---在comment.controller.js文件中编写remove中间件
    remove,
    //37-2.导入获取评论列表的中间件list---在comment.controller.js文件中编写list中间件
    list
}=require('../controller/comment.controller.js')

//31-2.创建路由
const commentRouter=new Router({prefix:'/comment'})

/* 31-4.创建发布评论的中间件 
        -verifyAuth中间件:要想评论必须先登录
        -create中间件:发布评论中间件
        -在postman中创建一个文件夹'用户评论接口'
            在文件夹中创建一个请求'发表评论接口'
*/
commentRouter.post('/',verifyAuth,create)
//32-1.创建回复评论的接口
commentRouter.post('/:commentId/reply',verifyAuth,reply)

//33-1.创建修改评论的接口---需要验证权限verifyPermission
//commentRouter.patch('/:commentId',verifyAuth,update)
//34-1.修改评论的权限认证---把33-1注释掉
commentRouter.patch('/:commentId',verifyAuth,verifyPermission,update)
/*34-6-2.❗传入一个tableName
commentRouter.patch('/:commentId',verifyAuth,verifyPermission("comment"),update)*/

//35-1.创建删除评论的接口
commentRouter.delete('/:commentId',verifyAuth,verifyPermission,remove)

//37-1.创建获取评论列表的接口
commentRouter.get('/',list)

//31-3.导出路由
module.exports=commentRouter