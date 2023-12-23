// 导入数据库
const mysql=require('mysql')
module.exports={
    // 数据库配置
    config:{
        host:'localhost',
        port:'3306',
        user:'root',
        password:'771209',
        database:'study',
    },
    // 连接数据库，使用MySQL的连接池的方式
    sqlConnect:function(sql,sqlArr,callback){
        var pool=mysql.createPool(this.config)
        pool.getConnection((err,conn)=>{
            if(err){
                console.log("连接失败");
                return;
            }
            // 连接成功回调
            conn.query(sql,sqlArr,callback);
            // 释放连接
            conn.release()
        })
    }

}