//41-11.导入label.service.js
const service=require('../service/label.service')

//41-3.创建判断标签是否存在的中间件
const verifyLabelExists=async(ctx,next)=>{
    //41-5.取出要添加的所有标签
    const {labels}=ctx.request.body
    //41-6.判断每一个标签在label表中是否存在
    const newLabels=[]//用于保存数据
    for(let name of labels){
        //41-12.判断标签是否存在
        const labelResult=await service.getLabelByName(name)
        const label={name}
        if(!labelResult){
            //41-13.如果不存在则创建标签
            const result=await service.create(name)
            //41-14.给label添加新的属性--此时label为{id:result.insertId,name}
            label.id=result.insertId //创建标签的时候会有个insertId,postman中可查
        }else{
            //41-15.如果存在--此时label为{labelResult.id,name}
            label.id=labelResult.id
        }
        //41-16.把label获取到标签添加到newLabels中
        newLabels.push(label)
    }
    //41-17.❗❗❗返回结果---ctx.labels
    console.log(newLabels);
    ctx.labels=newLabels
    await next()//不写执行不了下一个中间件
}
//41-4.导出
module.exports={
    verifyLabelExists
}
