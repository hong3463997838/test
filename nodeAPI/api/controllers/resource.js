const  dbconfig=require('../util/dbconfig')

    // 教师资源中获取全部教师的信息
    getCourseCategory=function (req, res) {
      let id=req.query.cid
      let sql = 'select * from course join coursecategory on  coursecategory.courseid = course.id where course.id=?';
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

      //获取全部课程资源 
      getAllResource=function (req, res) {
        let sql = 'select * from course join resource on  resource.courseid = course.id';
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

// 根据课程一个id获取课程资源
      getResourceByOneId=function (req, res) {
        let cid=req.body.cid
        console.log(cid);
        let sql = 'select * from course join resource on  resource.courseid = course.id where course.id=?';
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

// 根据课程两个id获取课程资源
        getResourceByTwoId=function (req, res) {
          let cid=req.body.cid
          let cateid=req.body.cateid
          console.log(cid);
          let sql = 'select * from course join resource on  resource.courseid = course.id where course.id=? and resource.cateid=?';
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

            // 根据资源的id获取对应的pdf文件链接
    getRecourcePdf=function (req, res) {
      let id=req.query.rid
      let sql = 'select * from resource where rid=?';
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
    module.exports={
      getCourseCategory,
      getResourceByOneId,
      getResourceByTwoId,
      getAllResource,
      getRecourcePdf
    }
    