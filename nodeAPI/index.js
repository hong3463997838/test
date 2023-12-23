var express = require('express');
var fs=require('fs');
var path=require('path')
var router = express.Router();
var dbconfig=require('../util/dbconfig')
/* GET home page. */
router.post('/api/study/insertStudyList', function(req, res, next) {
  const jsonData = {
    id:1,
    name: [
      {a:"aa"},
      {b:"bb"},
      {c:"cc"},
    ],
    age: 30,
    city:"New York"
  };
let sql = 'INSERT INTO myTable (data) VALUES (?)';
 var sqlArr=JSON.stringify(jsonData); 
// var sqlArr=jsonData; 

 var callback=(err,result)=>{
  if(err){
    console.log('出错');
    console.log(err);
  }
  else{
    console.log(sql);
    res.send({mag:'插入成功',code:200,result:result})
  }
 }

  dbconfig.sqlConnect(sql,sqlArr,callback)

});
router.get('/api/study/getBaseStudyList', function(req, res, next) {

let sql = 'select *  from myTable';

 var sqlArr=[];
 var callback=(err,result)=>{
  if(err){
    console.log('连接出错');
  }
  else{

    console.log(result);
// console.log(JSON.parse(result));
    // res.json({mag:'查询成功',code:200,data:JSON.parse(result)})
    res.send({mag:'查询成功',code:200,result:result})

  }
 }

  dbconfig.sqlConnect(sql,sqlArr,callback)

});



module.exports = router;
