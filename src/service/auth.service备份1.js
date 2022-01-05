/* 28-5-6.单独创建一个auth.service.js文件而不再moment.service.js文件编写用户修改权限的原因是:
            -现在修改的是用户发表的动态信息,如果以后还需要修改用户图片等一些信息,查看她是否有权限的话。
                写入到moment.service.js文件中耦合太高了,所以单独封装到auth.service.js文件中
*/
//28-5-16.导出database
const connection=require('../app/database')
class AuthService{
    //28-5-7.创建用户修改发布的动态信息的权限
    async checkMoment(momentId,userId){
        try{
            //28-5-15.创建SQL的修改权限语句
            const statement=`select *from moment where id=? and user_id=?;`
            //28-5-17.执行sql语句
            const [result]=await connection.execute(statement,[momentId,userId])
            //28-5-18.当return fasle的时候result是一个空数组,所以通过长度来判断是否有权限
            return result.length === 0 ? false : true
        }catch(error){
            console.log(error);
        }
       
        
    }

}
//28-5-8.导出
module.exports=new AuthService()