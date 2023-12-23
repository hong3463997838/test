const dbconfig = require('../util/dbconfig')
//选择题题目页面，获取题目及对应的课程信息
getSelectQuestion=function (req, res) {
    let canshu=JSON.parse (req.query.data)
    let cid=canshu.cid
    let cateid=canshu.cateid
    let sql = 'select * from selecttopic join coursecategory on  selecttopic.cid = coursecategory.courseid and selecttopic.cateid=coursecategory.categoryid where selecttopic.cid =? and selecttopic.cateid=?';
     var sqlArr=[cid,cateid];
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
    }
      //填空题题目页面，获取题目及对应的课程信息
      getFillQuestion=function (req, res) {
        let canshu=JSON.parse (req.query.data)
        let cid=canshu.cid
        let cateid=canshu.cateid
        // console.log(cid,cateid);
        let sql = 'select * from filltopic join coursecategory on  filltopic.cid = coursecategory.courseid and filltopic.cateid=coursecategory.categoryid where filltopic.cid =? and filltopic.cateid=?';
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
        },
      
      //题目页面，获取计算题目及对应的课程信息
      getOperateQuestion=function (req, res) {
        let canshu=JSON.parse (req.query.data)
        let cid=canshu.cid
        let cateid=canshu.cateid
        // console.log(cid,cateid);
        let sql = 'select * from operatetopic join coursecategory on  operatetopic.cid = coursecategory.courseid and operatetopic.cateid=coursecategory.categoryid where operatetopic.cid =? and operatetopic.cateid=?';
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
        },
      
    // 点击选项，并将我选择的答案存入数据库中，方便后面查看解析
  //   updateMyAnswer=function (req, res) {
  //     let topicid =req.body.topicid
  //     let myanswer=req.body.myanswer
  //  let sql = 'update selecttopic set myanswer=? where topicid=? '
  //      var sqlArr=[myanswer,topicid];
  //      var callback=(err,result)=>{
  //       if(err){
  //         console.log('连接出错');
  //         res.send({mag:'插入失败',code:404})
  //       }
  //       else{
  //         // console.log(result);
  //         console.log(sql);
  //         res.send({mag:'插入成功',code:200,data:result})
      
  //       }
  //      }
  //       dbconfig.sqlConnect(sql,sqlArr,callback)
  //     }

    // 点击选项，并将我选择的答案等相关数据存入数据库中，方便后面查看解析，选择题
      insertMyAnswer = function (req, res, next) {
        let topicid =req.body.topicid
      let myanswer=req.body.myanswer
      let token=req.body.token
      let time=req.body.time
      let isfinished=req.body.isfinished
      let cid=req.body.cid
      let cateid=req.body.cateid
      let correct=req.body.correct
      let iscollected=req.body.iscollected
        let sql = 'insert into myanswer (topicid,myanswer,token,time,isfinished,cid,cateid,correct,iscollected) values (?,?,?,?,?,?,?,?,?)'
        var sqlArr=[topicid,myanswer,token,time,isfinished,cid,cateid,correct,iscollected];
        const callback = (err, result) => {
          if (err) {
            console.log('数据库连接出错');
            console.log(err);
          }
          else {
            res.send({ mag: '插入成功', code: 200, data: result })
          }
        }
        dbconfig.sqlConnect(sql, sqlArr, callback)
      };
  // 点击选项，并将我填空题相关数据存入数据库中，方便后面查看解析
  insertFillMyAnswer = function (req, res, next) {
    let topicid =req.body.topicid
  let token=req.body.token
  let time=req.body.time
  let isfinished=req.body.isfinished
  let cid=req.body.cid
  let cateid=req.body.cateid
  let iscollected=req.body.iscollected
    let sql = 'insert into fillmyanswer (topicid,token,time,isfinished,cid,cateid,iscollected) values (?,?,?,?,?,?,?)'
    var sqlArr=[topicid,token,time,isfinished,cid,cateid,iscollected];
    const callback = (err, result) => {
      if (err) {
        console.log('数据库连接出错');
        console.log(err);
      }
      else {
        res.send({ mag: '插入成功', code: 200, data: result })
      }
    }
    dbconfig.sqlConnect(sql, sqlArr, callback)
  };

    // 点击选项，并将我计算题相关数据存入数据库中，方便后面查看解析
    insertOperateMyAnswer = function (req, res, next) {
      let topicid =req.body.topicid
    let token=req.body.token
    let time=req.body.time
    let isfinished=req.body.isfinished
    let cid=req.body.cid
    let cateid=req.body.cateid
    let iscollected=req.body.iscollected
      let sql = 'insert into operatemyanswer (topicid,token,time,isfinished,cid,cateid,iscollected) values (?,?,?,?,?,?,?)'
      var sqlArr=[topicid,token,time,isfinished,cid,cateid,iscollected];
      const callback = (err, result) => {
        if (err) {
          console.log('数据库连接出错');
          console.log(err);
        }
        else {
          res.send({ mag: '插入成功', code: 200, data: result })
        }
      }
      dbconfig.sqlConnect(sql, sqlArr, callback)
    };
// 在交卷的时候，将 统计好的错题数据存入已完成的那条数据中
insertErrorNumber = function (req, res, next) {
  let topicid =req.body.topicid
let token=req.body.token
let time=req.body.time
let cid=req.body.cid
let cateid=req.body.cateid
let errornumber=req.body.errornumber
  let sql = 'update myanswer set errornumber=? where isfinished=1 and token =? and time=? and topicid=? and cid=? and cateid=?'
  var sqlArr=[errornumber,token,time,topicid,cid,cateid];
  const callback = (err, result) => {
    if (err) {
      console.log('数据库连接出错');
      console.log(err);
    }
    else {
      res.send({ mag: '插入成功', code: 200, data: result })
    }
  }
  dbconfig.sqlConnect(sql, sqlArr, callback)
};

// 在交卷的时候，将 统计好的选择题收藏数据存入已完成的那条数据中
insertCollectNumber = function (req, res, next) {
  let topicid =req.body.topicid
let token=req.body.token
let time=req.body.time
let cid=req.body.cid
let cateid=req.body.cateid
let collectedtotal=req.body.collectedtotal
  let sql = 'update myanswer set collectedtotal=? where isfinished=1 and token =? and time=? and topicid=? and cid=? and cateid=?'
  var sqlArr=[collectedtotal,token,time,topicid,cid,cateid];
  const callback = (err, result) => {
    if (err) {
      console.log('数据库连接出错');
      console.log(err);
    }
    else {
      res.send({ mag: '插入成功', code: 200, data: result })
    }
  }
  dbconfig.sqlConnect(sql, sqlArr, callback)
};

// 在交卷的时候，将 统计好的填空题收藏数据存入已完成的那条数据中
insertFillCollectNumber = function (req, res, next) {
  let topicid =req.body.topicid
let token=req.body.token
let time=req.body.time
let cid=req.body.cid
let cateid=req.body.cateid
let collectedtotal=req.body.collectedtotal
  let sql = 'update fillmyanswer set collectedtotal=? where isfinished=1 and token =? and time=? and topicid=? and cid=? and cateid=?'
  var sqlArr=[collectedtotal,token,time,topicid,cid,cateid];
  const callback = (err, result) => {
    if (err) {
      console.log('数据库连接出错');
      console.log(err);
    }
    else {
      res.send({ mag: '插入成功', code: 200, data: result })
    }
  }
  dbconfig.sqlConnect(sql, sqlArr, callback)
};

// 在交卷的时候，将 统计好的计算题收藏数据存入已完成的那条数据中
insertOperateCollectNumber = function (req, res, next) {
  let topicid =req.body.topicid
let token=req.body.token
let time=req.body.time
let cid=req.body.cid
let cateid=req.body.cateid
let collectedtotal=req.body.collectedtotal
console.log(collectedtotal);
  let sql = 'update operatemyanswer set collectedtotal=? where isfinished=1 and token =? and time=? and topicid=? and cid=? and cateid=?'
  var sqlArr=[collectedtotal,token,time,topicid,cid,cateid];
  const callback = (err, result) => {
    if (err) {
      console.log('数据库连接出错');
      console.log(err);
    }
    else {
      res.send({ mag: '插入成功', code: 200, data: result })
    }
  }
  dbconfig.sqlConnect(sql, sqlArr, callback)
};

//获取已完成的选择题课程信息页面
getTopicHistory=function (req, res) {
  
 let token=req.query.token
  let sql = 'select * from myanswer join coursecategory on  myanswer.cid = coursecategory.courseid and myanswer.cateid=coursecategory.categoryid where myanswer.isfinished =1 and myanswer.token=?';
   var sqlArr=[token];
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
//获取已完成的填空题题课程信息页面
  getTopicFinishFill=function (req, res) {
    let token=req.query.token
     let sql = 'select * from fillmyanswer join coursecategory on  fillmyanswer.cid = coursecategory.courseid and fillmyanswer.cateid=coursecategory.categoryid where fillmyanswer.isfinished =1 and fillmyanswer.token=?';
      var sqlArr=[token];
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
//获取已完成的计算题课程信息页面
getTopicFinishOperate=function (req, res) {
  let token=req.query.token
   let sql = 'select * from operatemyanswer join coursecategory on   operatemyanswer.cid = coursecategory.courseid and  operatemyanswer.cateid=coursecategory.categoryid where  operatemyanswer.isfinished =1 and  operatemyanswer.token=?';
    var sqlArr=[token];
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
     
// 根据时间和token获取对应选择课程的题目
getTopicByTokenTime=function (req, res) {
  let time=req.body.time
  let token=req.body.token
  let cid=req.body.cid
  let cateid=req.body.cateid
   let sql = 'select * from selecttopic left join  myanswer on  myanswer.cid =selecttopic.cid and selecttopic.cateid=myanswer.cateid  and myanswer.topicid=selecttopic.topicid where myanswer.time =? and myanswer.token=? and myanswer.cid=? and myanswer.cateid=?';
  
   var sqlArr=[time,token,cid,cateid];
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
   // 根据时间和token获取对应填空课程的题目
   getTopicFillByTokenTime=function (req, res) {
  let time=req.body.time
  let token=req.body.token
  let cid=req.body.cid
  let cateid=req.body.cateid
   let sql = 'select * from filltopic left join  fillmyanswer on  fillmyanswer.cid =filltopic.cid and filltopic.cateid=fillmyanswer.cateid  and fillmyanswer.topicid=filltopic.topicid where fillmyanswer.time =? and fillmyanswer.token=? and fillmyanswer.cid=? and fillmyanswer.cateid=?';
   var sqlArr=[time,token,cid,cateid];
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
   
      // 根据时间和token获取对应计算课程的题目
      getTopicOperateByTokenTime=function (req, res) {
        let time=req.body.time
        let token=req.body.token
        let cid=req.body.cid
        let cateid=req.body.cateid
         let sql = 'select * from operatetopic left join operatemyanswer on operatemyanswer.cid =operatetopic.cid and operatetopic.cateid=operatemyanswer.cateid  and operatemyanswer.topicid=operatetopic.topicid where operatemyanswer.time =? and operatemyanswer.token=? and operatemyanswer.cid=? and operatemyanswer.cateid=?';
         var sqlArr=[time,token,cid,cateid];
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
         
 //查询数据库中的收藏状态，根据时间、token、topicid查询收藏状态
// getTopicCollect=function (req, res) {
//   let time=req.body.time
//   let token=req.body.token
//   let topicid=req.body.topicid
//   // let canshu=JSON.parse (req.query.data)
//   // let time=canshu.time
//   // let token=canshu.token
//   // let topicid=canshu.topicid
//   console.log(time);
//   console.log(token);
//   console.log(topicid
//   );
//    let sql = 'select * from  myanswer where myanswer.time=? and myanswer.token=? and myanswer.topicid=?';
  
//   //  let sql = 'select * from myanswer where myanswer.time =? and myanswer.token=?';
//    var sqlArr=[time,token,topicid];
//     var callback=(err,result)=>{
//      if(err){
//        console.log('连接出错');
//        res.send({mag:'查询失败',code:404})
//      }
//      else{
//        // console.log(result);
//        console.log(sql);
//        res.send({mag:'查询成功',code:200,data:result})
   
//      }
//     }
//      dbconfig.sqlConnect(sql,sqlArr,callback)
//    }

module.exports={
  getSelectQuestion,
    // updateMyAnswer,
    insertMyAnswer,
    getFillQuestion,
    getOperateQuestion,
    getTopicHistory,
    getTopicByTokenTime,
    insertErrorNumber ,
    // getTopicCollect,
    insertCollectNumber ,
    insertFillMyAnswer,
    insertFillCollectNumber,
    insertOperateCollectNumber,
    insertOperateMyAnswer,
    getTopicFinishFill,
    getTopicFillByTokenTime,
    getTopicFinishOperate,
    getTopicOperateByTokenTime
  }