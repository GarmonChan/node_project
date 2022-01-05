//2-5.导出dotenv插件
const dotenv=require('dotenv')
//22-5.导入fs模块
const fs=require('fs')
//22-7.导入path,使用绝对路径的写法
const path=require('path')

//2-6.调用config
dotenv.config()//❗❗调用config函数之后根目录下的.env文件中的环境变量就加入到process.env中了
//console.log(process.env.APP_PORT);//❗❗打印的是8000

//22-6.对私钥和公钥文件的读取--因为项目是在main.js文件启动的,所以相对路径的写法如下
//const PRIVATE_KEY=fs.readFileSync('src/app/keys/private.key')
//22-8.绝对路径的写法如下
const PRIVATE_KEY=fs.readFileSync(path.resolve(__dirname,'./keys/private.key'))//路径拼接
const PUBLIC_KEY=fs.readFileSync(path.resolve(__dirname,'./keys/public.key'))//路径拼接



//2-7.导出process.env.APP_PORT
module.exports={
    //49-10.导出APP_HOST
    APP_HOST,

    APP_PORT,//2-7
    
    //5-3.导出连接池的环境变量
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_DATABASE,
    MYSQL_USER,
    MYSQL_PASSWORD
}=process.env

/*将APP_PORT加入到process.env中并导出,等同于如下
const {APP_PORT}=process.env
module.exports={APP_PORT}
*/

//22-9.导出读取到的公钥和私钥文件
module.exports.PRIVATE_KEY=PRIVATE_KEY
module.exports.PUBLIC_KEY=PUBLIC_KEY