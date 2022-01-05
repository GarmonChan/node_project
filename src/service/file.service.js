//47-8.导入database
const connection=require('../app/database')

//47-9.创建将图片数据保存到数据库中的方法
class FileService{
    async createAvatar(filename,mimetype,size,userId){
        //47-11.创建SQL语句
        const statement=`insert into avatar (filename,mimetype,size,user_id) values(?,?,?,?);`
        //47-12.使用连接池,执行SQL语句
        const [result]=await connection.execute(statement,[filename,mimetype,size,userId])
        return result
    }
    //48-5.创建获取头像的方法--通过postman中请求的数字id获取头像
    async getAvatarByUserId(userId){
        const statement=`select *from avatar where user_id=?;`
        const [result]=await connection.execute(statement,[userId])
        return result[0]
    }
    //50-15.创建获取图片信息的方法
    async createFile(filename,mimetype,size,userId,momentId){
        const statement=`
            insert into file(filename,mimetype,size,user_id,moment_id) values(?,?,?,?,?);
        `
        const [result]=await connection.execute(statement,[filename,mimetype,size,userId,momentId])
        return result
    }
    //51-5.创建获取file表中filename的方法
    async getFileByFilename(filename){
        const statement=`select *from file where filename=?;`
        const [result]=await connection.execute(statement,[filename])
        return result[0]
    }
}
//47-10.导出
module.exports=new FileService()