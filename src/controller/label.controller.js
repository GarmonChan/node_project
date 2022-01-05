//39-13.导入label。router.js
const service=require('../service/label.service')

//39-7.创建创建标签的中间件create
class LabelController{
    async create(ctx,next){
        /* 39-9.在postman中创建一个文件夹'标签数据接口',然后再创建一个'创建标签接口'请求
                    post请求:{{baseURL}}/label
                    body/raw/json:{'name':"前端"} */
        //39-10.在service文件夹中创建label.service.js文件
        //39-14.获取从body发送出来的json数据name
        const {name}=ctx.request.body
        //39-15.创建标签---在label.service.js中创建创建标签的方法create
        const result=await service.create(name)
        ctx.body=result
    }

    //43-3.创建展示标签的中间件---创建'获取标签请求'---get请求:{{baseURL}}/label?limit=5&offset=0
    async list(ctx,next){
        //43-4.获取limit offset
        const{limit,offset}=ctx.query
        //43-5.展示标签---在label.service.js文件中创建getLabels的方法
        const result=await service.getLabels(limit,offset)
        ctx.body=result
    }
}
//39-8.导出
module.exports=new LabelController()