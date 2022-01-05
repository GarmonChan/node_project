//2-2.导入app/index.js文件
const app=require('./app/index')
//2-3.在.env文件中配置环境变量---配置服务器端口口号
//2-4.在app文件夹中创建config.js文件
//2-8.导入app/config.js文件
const config=require('./app/config')

//5-8.导入database.js的connection
require('./app/database')

//2-9.导入封装好的环境变量APP_PORT
app.listen(config.APP_PORT,()=>{
    //console.log(config.APP_PORT+"端口的koa服务器启动成功~~~");
    console.log(`${config.APP_PORT}端口的koa服务器启动成功~~~`);
})

