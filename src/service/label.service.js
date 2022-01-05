//39-16.导入database
const connection=require('../app/database')
//39-11.创建创建标签的方法
class LabelService{
    async create(name){
        //39-17.创建SQL语句
        const statement=`insert into label (name) values(?);`
        //39-18.使用连接池,执行SQL语句
        const [result]=await connection.execute(statement,[name])
        return result
    }
    
    //41-7.创建判断每一个标签在label表中是否存在的方法
    async getLabelByName(name){
        //41-8.创建SQL语句
        const statement=`select *from label where name=?;`
        //41-9.使用连接池,执行SQL语句
        const [result]=await connection.execute(statement,[name])
        //41-10.返回数据
        return result[0]
    }
    //43-6.创建展示标签的方法
    async getLabels(limit,offset){
        //43-7.创建SQL语句
        const statement=`select *from label limit ?,?;`
        //43-8.使用连接池,执行SQL语句
        const [result]=await connection.execute(statement,[offset,limit])
        return result
    }
}


//39-12.导出
module.exports=new LabelService()