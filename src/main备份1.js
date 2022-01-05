//1-1.导入koa
const Koa=require('koa')
//1-2.创建koa服务器
const app=new Koa();

//1-3.监听koa
app.listen(8446,()=>{
    console.log("8446端口的koa服务器启动成功~~~");
})
//1-4.安装开发依赖nodemon:npm install nodemon -D
//1-5.在package.json文件中设置项目允许方式"start": "nodemon ./src/main.js"
//1-6.在终端启动项目:npm start
