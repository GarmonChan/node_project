//25-7.导入moment.service
const momentService=require('../service/moment.service')

//24-7.创建一个类,对发表动态信息的代码进行管理
class MomentController{
    async create(ctx,next){
        //ctx.body='发表动态成功😊😊~'//24-7
        
        //25-1.获取数据(用户id:`user_id`,用户发布的内容:`content`)
        const userId=ctx.user.id
        const content=ctx.request.body.content
        console.log(userId,content);

        //25-2.将数据插入到数据库---在service文件夹中创建moment.service.js
        //25-8.将数据插入到数据库
        const result=await momentService.create(userId,content)
        /* 25-12.打印结果
                -在postman中的body/json中发送结果{"content":"床前明月光,疑是地上霜."}
                -post请求:{{baseURL}}/moment
                 */
        ctx.body=result
       
    }
    //26-3.定义detail中间件
    async detail(ctx,next){
        /* 26-4.获取某一条动态的详情---在postman中创建新的请求'获取动态接口(单个)' 
                GET请求:{{baseURL}}/moment/1    */
        //ctx.body='获取某一条动态的详情'

        //26-5.获取数据(momentId)
        //console.log(ctx.params);
        const momentId=ctx.params.momentId

        //26-6.工具id去查询这条数据---在moment.service.js中创建getMomentById的方法
        const result=await momentService.getMomentById(momentId)
        //26-11.将查询到的数据返回
        ctx.body=result
    }
    //27-3.定义list中间件
    async list(ctx,next){
        /* 27-4.获取数据(offset/size)---通过分页查询的方法,在postman中创建新的请求'获取动态接口(列表)' 
                GET请求:{{baseURL}}/moment/?offset=0&size10     */
        const {offset,size}=ctx.query
        //27-5.查询列表---在moment.service.js中创建getMomentlist的方法
        const result=await momentService.getMomentList(offset,size)
        //27-6.将查询到的数据返回
        ctx.body=result

    }
    //28-3.定义update中间件---在postman中创建'修改动态接口'
    async update(ctx,next){
        //28-4.获取参数
        const{content}=ctx.request.body
        const{momentId}=ctx.params
        //28-9.调用修改动态信息的方法
        const result=await momentService.update(content,momentId)
        //28-10.将修改的数据返回
        ctx.body=result

        //ctx.body='修改内容:'+momentId+',修改的内容:'+content+',当前id:'+id //28-4
    }
    //29-3.定义remove中间件---在postman中创建'删除动态接口'---delete请求:{{baseURL}}/moment/1
    async remove(ctx,next){
        //29-4.获取momentId
        const {momentId}=ctx.params
        //29-5.删除内容---在moment.service.js中创建remove的方法
        const result=await momentService.remove(momentId)
        ctx.body=result
    }

    /*40-3.创建给动态添加标签的中间件addLabels---在postman创建'动态添加标签'的接口请求
                post请求:{{baseURL}}/moment/1/labels
                body/raw/json:{"labels":["前端","javascript"]}     */
    async addLabels(ctx,next){
       const {labels}=ctx.request.body
       console.log(labels);
       ctx.body='给动态添加标签~~'
    }
}

//24-8.导出MomentController这个对象
module.exports=new MomentController()
