//25-3.导入database
const connection=require("../app/database")

//25-4.创建一个类,将发布的动态信息插入到数据库中
class MomentService{
    //25-6.创建create
    async create(userId,content){
        //25-9.创建SQL语句
        const statement=`insert into moment(content,user_id) values(?,?);`
        //25-10.使用连接池,执行SQL语句
        const [result]=await connection.execute(statement,[content,userId])
        //25-11.返回结果
        return result
    }
    //26-7.创建getMomentById的方法
    async getMomentById(id){
        //26-8.创建SQL的查询语句
            //49-14.❗❗❗复制粘贴navicat中‘项目23-49’中的sql语句---具体实现看视频23最前面
                //51-11.将navicat中--‘12.项目23-51’中的sql代码复制粘贴到这里取
        const statement=`
    SELECT 
        m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
        JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUrl', u.avatar_url) author,
        IF(COUNT(l.id),JSON_ARRAYAGG(
            JSON_OBJECT('id', l.id, 'name', l.name)
        ),NULL) labels,
        (SELECT IF(COUNT(c.id),JSON_ARRAYAGG(
            JSON_OBJECT('id', c.id, 'content', c.content, 'commentId', c.comment_id, 'createTime', c.createAt,
                                    'user', JSON_OBJECT('id', cu.id, 'name', cu.name, 'avatarUrl', cu.avatar_url))
        ),NULL) FROM comment c LEFT JOIN users cu ON c.user_id = cu.id WHERE m.id = c.moment_id) comments,
        (select json_arrayagg(concat('http://localhost:8000/moment/images/',file.filename)) from file where m.id=file.moment_id)images
    FROM moment m
    LEFT JOIN users u ON m.user_id = u.id
    LEFT JOIN moment_label ml ON m.id = ml.moment_id
    LEFT JOIN label l ON ml.label_id = l.id
    WHERE m.id = ?
    GROUP BY m.id; 
        `
        //26-9.使用连接池执行SQL语句
        const [result]=await connection.execute(statement,[id])
        //26-10.返回结果
        return result[0]
    }
    //27-7.创建getMomentlist的方法
    async getMomentList(offset,size){
        //27-8.创建SQL的查询语句
            //36-1.在SQL语句中添加一个查询评论的个数的sql语句
                //44-1.获取动态的时候显示动态的标签数
                    //51-13.列表查询--显示配图信息--‘12.项目23-51’中的sql代码复制粘贴到这里取
        const statement=`
    SELECT 
        m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
        JSON_OBJECT('id', u.id, 'name', u.name) author,
        (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount,
        (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) labelCount,
        (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8000/moment/images/', file.filename)) 
        FROM file WHERE m.id = file.moment_id) images
    FROM moment m
    LEFT JOIN users u ON m.user_id = u.id
    LIMIT ?, ?;	
        `;
        //27-9.使用连接池执行SQL语句
        const [result]=await connection.execute(statement,[offset,size])
        //27-10.返回结果
        return result
    }
    //28-6.创建用户修改动态信息的方法update
    async update(content,momentId){
        //28-7.创建修改动态信息的sql语句
        const statement=`update moment set content=? where id=?;`
        //28-8.使用连接池执行sql语句
        const [result]=await connection.execute(statement,[content,momentId])
        return result
    }
    //29-6.创建用户删除动态信息的方法remove
    async remove(momentId){
        //29-7.创建修改动态信息的sql语句
        const statement=`delete from moment where id=?;`
        //29-8.使用连接池执行sql语句
        const [result]=await connection.execute(statement,[momentId])
        return result

    }

    //42-4.创建判断标签是否之前已经添加过了的方法
    async hasLabel(momentId,labelId){
        //42-5.创建修改动态信息的sql语句
        const statement=`select *from moment_label where moment_id=? and label_id=?;`
        //42-6.使用连接池执行sql语句
        const [result]=await connection.execute(statement,[momentId,labelId])
        //42-7.判断有无--有返回true,无返回false
        return result[0] ? true : false
    }
    //42-10.创建把标签添加到动态中的方法---此时动态没有这个标签的情况下
    async addLabel(momentId,labelId){
         //42-11.创建修改动态信息的sql语句
         const statement=`insert into moment_label (moment_id,label_id) values(?,?);`
         //42-12.使用连接池执行sql语句
         const [result]=await connection.execute(statement,[momentId,labelId])
         return result
    }


}
//25-5.导出MomentServic类
module.exports=new MomentService()