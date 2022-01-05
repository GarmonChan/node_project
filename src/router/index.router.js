//11-1.导入fs模块
const fs=require('fs')
//11-2.创建动态加载的路由的方法
const indexRouter=(app)=>{//readdirSync()读取当前文件所在的目录,可以获取到目录下的所有文件
    fs.readdirSync(__dirname).forEach(file=>{
        if(file==='index.router.js') return
        const router=require(`./${file}`)//导入除index.router.js的路由文件
        //11-3.对路由文件进行注册
        app.use(router.routes())
        app.use(router.allowedMethods())
    })

}

//11-4.导出动态加载的路由函数
module.exports=indexRouter