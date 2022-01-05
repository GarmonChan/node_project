//31-16.导入database
const connection=require('../app/database')

//31-14.创建发布评论的方法
class CommentService{
    async create(momentId,content,userId){
        //31-17.创建发表评论的SQL语句
        const statement=`insert into comment(content,moment_id,user_id) values(?,?,?);`
        //31-18.使用连接池执行SQL语句,[result]对数组进行解构
        const [result]=await connection.execute(statement,[content,momentId,userId])
        return result
    }
    //32-7.创建回复评论的方法
    async reply(momentId,content,userId,commentId){
        //32-8.创建发表评论的SQL语句
        const statement=`insert into comment(content,moment_id,user_id,comment_id) values(?,?,?,?);`
        //32-9.使用连接池执行SQL语句,[result]对数组进行解构
        const [result]=await connection.execute(statement,[content,momentId,userId,commentId])
        return result
    }
    //33-8.创建修改评论的方法update
    async update(commentId,content){
        //33-9.创建发表评论的SQL语句
        const statement=`update comment set content=? where id=?;`
        //33-10.使用连接池执行SQL语句,[result]对数组进行解构
        const [result]=await connection.execute(statement,[content,commentId])
        return result
    }
    //35-6.创建删除评论的方法remove
    async remove(commentId){
        //35-6创建发表评论的SQL语句
        const statement=`delete from comment where id=?;`
        //35-7.使用连接池执行SQL语句,[result]对数组进行解构
        const [result]=await connection.execute(statement,[commentId])
        return result
    }
    //37-6.创建获取评论列表的方法在getCommentsByMomentId
    async getCommentsByMomentId(momentId){
        //37-7.创建获取评论的SQL语句
        const statement=`
        select 
            m.id,m.content,m.comment_id commentId,m.createAt createTime,
            json_object('id',u.id,'name',u.name)'评论人'
        from comment m
        left join users u on u.id=m.user_id
        where moment_id=?;
        `
        //37-8.使用连接池执行SQL语句,[result]对数组进行解构
        const [result]=await connection.execute(statement,[momentId])
        return result

    }
}
//31-15.导出
module.exports=new CommentService()