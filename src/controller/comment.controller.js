//31-14.导入comment.service.js
const service=require('../service/comment.service.js')
//31-7.创建发布评论的中间件
class CommentController{
    async create(ctx,next){
        /* 31-9.在postman中的body/raw/json中输入{"momentId:1,"content":"C罗才是世界上最好的球员"}
                -momentId对应的是发布的动态信息
                -content:是对发布的动态信息进行评论
        */
        //31-10.获取postman中发送请求的momtentId和content数据
        const {momentId,content}=ctx.request.body
        //31-11.获取用户的id,可以知道是谁对动态发表了评论
        const {id}=ctx.user
        //31-12.发布评论---在service文件夹中创建comment.service.js文件并创建create的方法
        const result=await service.create(momentId,content,id)
        //31-13.打印结果
        ctx.body=result

        //ctx.body=`对${momentId}发表评论成功,是${id}发表了评论,评论的内容为:${content}`//31-11
    }
    /* 32-3.创建回复评论的中间件reply---在postman中创建请求'回复评论接口'---{{baseURL}}/comment/1/reply
                -在body/raw/json中发送请求{"momentId":1,"content":"武磊才是最厉害的球员好吗？"}     */
    async reply(ctx,next){
        //32-4.获取postman发送请求的momtentId,content,commentId数据
        const {momentId,content}=ctx.request.body
        const {commentId}=ctx.params//{{baseURL}}/comment/1/reply--获取到的是1,对第1条评论进行回复
        //32-5.获取用户的id,可以知道是谁对动态发表了评论
        const {id}=ctx.user
        //32-6.回复评论---在comment.service.js中创建回复评论的方法reply
        const result=await service.reply(momentId,content,id,commentId)
        ctx.body=result

    }
    //33-4.创建修改评论的中间件---在postman中创建'修改评论接口'---patch请求:{{baseURL}}/comment
    async update(ctx,next){
        //33-5.获取修改哪一条评论
        const {commentId}=ctx.params
        //33-6.获取postman发送请求修改评论的内容content
        const {content}=ctx.request.body
        //33-7.修改评论---在comment.service.js中创建修改评论的方法update
        const result=await service.update(commentId,content)
        ctx.body=result

        //ctx.body='修改评论'+commentId+content //33-6
    }
    //35-3.创建删除评论的中间件remove---在postman中创建'删除评论接口'---delete请求:{{baseURL}}/comment/1
    async remove(ctx,next){
        //35-4.获取commentId,表示要删除哪一条
        const {commentId}=ctx.params
        //35-5.删除评论---在comment.service.js中创建删除评论的方法remove
        const result=await service.remove(commentId)
        ctx.body=result
    }
    //37-3.封装获取评论的中间件list---'获取评论接口'---get请求:{{baseURL}}/comment?momentId=1
    async list(ctx,next){
        //37-4.获取momentId---通过query方式--> {{baseURL}}/comment?momentId=1
        const {momentId}=ctx.query
        //37-5.获取评论---在comment.service.js中创建获取评论列表的方法getCommentsByMomentId
        const result=await service.getCommentsByMomentId(momentId)
        ctx.body=result
    }
}
//31-8.导出
module.exports=new CommentController()