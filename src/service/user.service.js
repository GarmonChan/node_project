//5-9.导入database
const connection=require('../app/database')

//4-10.路由users查询数据相关代码
class UserService{
    async create(user){
        //console.log("将用户数据保存到数据库中:",user);//4-10
        
        //5-10.对name和password进行结构
        const{name,password}=user
        //5-11.执行SQL语句
        const statement=`
            insert into users(name,password) values(?,?);
        `
        //5-12.使用连接池,执行SQL语句
        const result=await connection.execute(statement,[name,password])
        //5-13.返回结果--并在postman中发送json请求,navicat中的project数据库users表就可以存储到数据了
        return result[0]

        //将user存储到数据库中4-10
        //return '创建用户成功啦啦啦'//4-10
    }
    //7-1.通过name查询数据表用户名是否已经被创建
    async getUserByName(name){
        const statement=`
            select *from users where name=?;
        `
        const result =await connection.execute(statement,[name])//名字相同,说明名字之前已被创建
        return result[0]//result返回的是一个数据,对我们有用的就第一个,所以result[0]
    }

    //49-5.创建根据id去更新头像url的方法
    async updateAvatarUrlById(avatarUrl,userId){
        //49-6.创建sql语句
        const statement=`update users set avatar_url=? where id=?;`
        //49-7.使用连接池,执行SQL语句
        const [result] =await connection.execute(statement,[avatarUrl,userId])
        return result
    }
}
module.exports=new UserService();