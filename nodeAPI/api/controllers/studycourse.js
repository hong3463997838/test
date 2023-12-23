const dbconfig = require('../util/dbconfig')
      //获取全部课程学习
      getAllStudy=function (req, res) {

        // let sql = 'select * from course join studycourse  on  studycourse.courseid = course.id';
        let sql = 'select * from course join studycourse  on  studycourse.courseid = course.id join teacher on course.id =teacher.cid';
        
        var sqlArr=[];
         var callback=(err,result)=>{
          if(err){
            console.log('连接出错');
            res.send({mag:'查询失败',code:404})
          }
          else{
            // console.log(result);
            // console.log(sql);
            res.send({mag:'查询成功',code:200,data:result})
        
          }
         }
          dbconfig.sqlConnect(sql,sqlArr,callback)
        } 
// 根据课程一个id获取课程学习
getStudyByOneId=function (req, res) {
    let cid=req.body.cid
    console.log(cid);
    let sql = 'select * from course join studycourse on  studycourse.courseid = course.id join teacher on course.id =teacher.cid where course.id=?';
     var sqlArr=[cid];
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
// 根据课程两个id获取课程学习
getStudyByTwoId=function (req, res) {
    let cid=req.body.cid
    let cateid=req.body.cateid
    // console.log(cid);
    let sql = 'select * from course join studycourse on  studycourse.courseid = course.id join teacher on course.id =teacher.cid where course.id=? and studycourse.categoryid=?';
     var sqlArr=[cid,cateid];
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
module.exports={
    getStudyByOneId,
    getStudyByTwoId,
    getAllStudy
    }