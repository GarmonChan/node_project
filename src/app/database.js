//5-1.导入mysql2
const mysql=require('mysql2')
//5-2.在.env文件夹中写入连接池的环境变量
//5-4.导入连接池的环境变量
const config=require('./config')

//5-5.创建连接池
const connection=mysql.createPool({
    host:config.MYSQL_HOST,
    port:config.MYSQL_PORT,
    database:config.MYSQL_DATABASE,
    user:config.MYSQL_USER,
    password:config.MYSQL_PASSWORD
})

//5-6.测试连接是否成功
connection.getConnection((err,result)=>{
    result.connect(err=>{//测试为空,如果为空则创建成功
        if(err){
            console.log("连接失败",err.message);
        }else{
            console.log("数据库连接成功666~");
        }
    })
})

//5-7.导出
module.exports=connection.promise()//因为后续操作数据库都是通过promise的,所以以这个方法导出