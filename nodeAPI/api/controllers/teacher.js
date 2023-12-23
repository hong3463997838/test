const dbconfig = require('../util/dbconfig')

// 教师资源中获取课程的列表
getCourse=function (req, res) {
    let sql = 'select *  from course';
     var sqlArr=[];
     var callback=(err,result)=>{
      if(err){
        console.log('连接出错');
        res.send({mag:'查询失败',code:404})
      }
      else{
        // console.log(result);

        res.send({mag:'查询成功',code:200,data:result})
    
      }
     }
      dbconfig.sqlConnect(sql,sqlArr,callback)
    }
// 教师资源中获取教师的信息
getTeacher=function (req, res) {
    let id=req.body.cid
    let sql = 'select * from course join teacher on  teacher.cid = course.id where course.id =?';
     var sqlArr=[id];
     var callback=(err,result)=>{
      if(err){
        console.log('连接出错');
        res.send({mag:'查询失败',code:404})
      }
      else{
        // console.log(result);
        console.log(sql);
        res.send({mag:'查询成功',code:200,data:result})
    
      }
     }
      dbconfig.sqlConnect(sql,sqlArr,callback)
    }
// 教师资源中获取全部教师的信息
    getAllTeacher=function (req, res) {
      let sql = 'select * from course join teacher on  teacher.cid = course.id';
       var sqlArr=[];
       var callback=(err,result)=>{
        if(err){
          console.log('连接出错');
          res.send({mag:'查询失败',code:404})
        }
        else{
          // console.log(result);
          console.log(sql);
          res.send({mag:'查询成功',code:200,data:result})
      
        }
       }
        dbconfig.sqlConnect(sql,sqlArr,callback)
      }    

      // 教师介绍页面根据教师id获取教师的信息
    getTeacherMessage=function (req, res) {
      const {tid} = req.query 
      console.log(tid);
      let sql = 'select * from teacher where tid=?';
       var sqlArr=[tid];
       var callback=(err,result)=>{
        if(err){
          console.log(err);
          console.log('连接出错');
          res.send({mag:'查询失败',code:404})
        }
        else{
          console.log(result);
          console.log(sql);
          res.send({mag:'查询成功',code:200,data:result})
      
        }
       }
        dbconfig.sqlConnect(sql,sqlArr,callback)
      }   
    module.exports={
        getCourse,
        getTeacher,
        getAllTeacher,
        getTeacherMessage
    }
    