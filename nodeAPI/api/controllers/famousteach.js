const  dbconfig=require('../util/dbconfig');
// 名师教学页面
// 获取全部老师教授的课程

// 根据课程总名称获取对应 的老师
getTeacher=function (req, res) {
    let id=req.query.cid
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
    },
    // 点击课程后获取课程详细信息,根据一个课程id
    getCategoryCourseByOne=function (req, res) {
        let id=req.body.cid
        let sql = 'select * from   studycourse where courseid =?';
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
        },

           // 点击课程和老师后获取课程详细信息,根据一个课程id和一个教师id
           getCategoryCourseByTwo=function (req, res) {
        let cid=req.body.cid
        let tid=req.body.tid
        let sql = 'select * from   studycourse where courseid =? and tid=?';
         var sqlArr=[cid,tid];
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
        },

           // 全部课程和老师后获取课程详细信息
           getAllCategoryCourse=function (req, res) {
            let sql = 'select * from  studycourse';
             var sqlArr=[];
             var callback=(err,result)=>{
              if(err){
                console.log('连接出错');
                res.send({mag:'查询失败',code:404})
              }
              else{
                console.log(sql);
                res.send({mag:'查询成功',code:200,data:result})
            
              }
             }
              dbconfig.sqlConnect(sql,sqlArr,callback)
            },
module.exports={
    getTeacher,
    getCategoryCourseByOne,
    getCategoryCourseByTwo,
    getAllCategoryCourse
}
