const  dbconfig=require('../util/dbconfig')

// 获取轮播图数据
banner=function (req, res) {
    let sql = 'select *  from banner';
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

    // 获取首页推荐的课程数据
    getHomeCourse=function (req, res) {
      let sql = 'select *  from studycourse limit 10';
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

          // 获取首页名师教学的老师
    getHomeTeacher=function (req, res) {
      let sql = 'select * from coursecategory join teacher on  teacher.tid = coursecategory.tid limit 4';
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

              // 获取首页课程分类
    getHomeCourseCategory=function (req, res) {
      let cid=req.query.cid
      let sql = 'select * from studycourse join course on  studycourse.courseid = course.id where studycourse.courseid=? limit 7';
       var sqlArr=[cid];
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
    module.exports={
        banner,
        getHomeCourse,
        getHomeTeacher,
        getHomeCourseCategory
        
    }
    