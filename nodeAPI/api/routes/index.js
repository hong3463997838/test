var express = require('express');
// var fs=require('fs')
var path = require('path');
var router = express.Router();
// 导入请求数据库的封装的接口
const home=require('../controllers/home')
const user=require('../controllers/user')
const teacher=require('../controllers/teacher')
const resource=require('../controllers/resource')
const famousteach=require('../controllers/famousteach')
const topic=require('../controllers/topic')
const studycourse=require('../controllers/studycourse')


// const express = require("express");
// const multer = require("multer");
const fs = require("fs");



// 配置静态资源目录 整一个文件夹 通过域名能访问
 // 设置静态图片访问的路径
router.use(express.static(path.join(__dirname,"../public/images")))

// 上传图片的模板
var multer=require('multer');
// 生成的图片放入uploads文件夹下
var upload=multer({dest:'uploads/'})

// 图片上传必须用post方法
router.post('/api/unloadImg',upload.single('test'),(req,res)=>{
         // 设置响应类型及编码
    console.log(req.file);
//读取路径（req.file.path）
fs.readFile(req.file.path,(err,data)=>{
  //读取失败，说明没有上传成功
      if(err){return res.send('上传失败')}  
    //如果读取成功
    //声明图片名字为时间戳和随机数拼接成的，尽量确保唯一性
    let time=Date.now()+parseInt(Math.random()*999)+parseInt(Math.random()*2222);
    //拓展名
    let extname=req.file.mimetype.split('/')[1]
    //拼接成图片名
    let keepname=time+'.'+extname

   // 三个参数
   //1.图片的绝对路径
   //2.写入的内容
   //3.回调函数  

  fs.writeFile(path.join(__dirname,'../public/images/api/'+keepname),data,(err)=>{
    if(err){return res.send('写入失败')}
    res.send({err:200,msg:'上传成功',data:'http://localhost:3000/api/'+keepname})

      })
  })

})


// 获取轮播图数据
router.get('/api/home/banner',home.banner);

    // 获取首页推荐的课程数据
 router.get('/api/home/getHomeCourse',home.getHomeCourse);
 
  // 获取首页名师教学的老师
 router.get('/api/home/getHomeTeacher',home.getHomeTeacher);

   // 获取首页名课程分类
   router.get('/api/home/getHomeCourseCategory',home.getHomeCourseCategory);
// 注册接口
router.post('/api/study/register', user.register);

// 点击登录时把生成的token插入到数据库
router.put('/api/study/updateToken',user.updateToken);

// 登录接口
router.post('/api/study/login',user.login);

// 根据token查询用户数据
router.get('/api/study/selectUser',user.selectUser);

  // 个人信息页面中，保存或修改用户数据
 router.put('/api/study/updateUser',user.updateUser);

// 修改用户头像updateUserImg 
router.put('/api/study/updateUserImg',user.updateUserImg);

// 修改用户密码
router.put('/api/study/updateUserPassword',user.updateUserPassword);

// 用户留言
router.post('/api/study/leaveMessage',user.leaveMessage);

// 生成图片验证码getCode
router.get('/api/study/getCode',user.getCode);

// 用户退出登录，清空服务器中的token数据
// router.post('/api/user/logout', (req, res) => {
//     // 删除token====服务器
// // req.body.token=''
//   });
  // 

// 教师资源
// 获取课程信息
router.get('/api/teacher/getCourse',teacher.getCourse);

// 获取对应课程的老师信息
router.post('/api/teacher/getTeacher',teacher.getTeacher);

// 获取全部老师信息
router.get('/api/teacher/getAllTeacher',teacher.getAllTeacher);

// 根据教师id获取教师信息
router.get('/api/teacher/getTeacherMessage',teacher.getTeacherMessage);

// 根据课程id获取课程的细分的课程信息
router.get('/api/resource/getCourseCategory',resource.getCourseCategory);

// 根据全部课程资源
router.get('/api/resource/getAllResource',resource.getAllResource);

// 根据课程一个id获取课程资源
router.post('/api/resource/getResourceByOneId',resource.getResourceByOneId);

// 根据课程两个id获取课程资源
router.post('/api/resource/getResourceByTwoId',resource.getResourceByTwoId);

// 根据资源的id获取对应的pdf文件链接
router.get('/api/resource/getRecourcePdf',resource.getRecourcePdf);

// 名师教学
// 根据课程总名称获取对应的老师
router.get('/api/famousteach/getTeacher',famousteach.getTeacher);

// 根据课程总名称获取对应的老师
router.post('/api/famousteach/getCategoryCourseByOne',famousteach.getCategoryCourseByOne);

// 点击课程和老师后获取课程详细信息,根据一个课程id和一个教师id
router.post('/api/famousteach/getCategoryCourseByTwo',famousteach.getCategoryCourseByTwo);

// 获取全部的课程信息
router.get('/api/famousteach/getAllCategoryCourse',famousteach.getAllCategoryCourse);

//题目页面，获取选择题目及对应的课程信息
router.get('/api/topic/getSelectQuestion',topic.getSelectQuestion);

 // 点击选项，并将我选择的答案存入数据库中，方便后面查看解析
// router.put('/api/topic/updateMyAnswer',topic.updateMyAnswer);

 // 点击选项，并将我选择的答案及时间，是否完成存入数据库中，方便后面查看解析
 router.post('/api/topic/insertMyAnswer',topic.insertMyAnswer);

  // 点击选项，并将我填空题相关数据存入数据库中，方便后面查看解析
 router.post('/api/topic/insertFillMyAnswer',topic.insertFillMyAnswer);
  
  // 点击选项，并将我计算题相关数据存入数据库中，方便后面查看解析
 router.post('/api/topic/insertOperateMyAnswer',topic.insertOperateMyAnswer);
  
//题目页面，获取填空题目及对应的课程信息
router.get('/api/topic/getFillQuestion',topic.getFillQuestion);

//题目页面，获取计算题目及对应的课程信息
router.get('/api/topic/getOperateQuestion',topic.getOperateQuestion);

//获取已完成的选择题题课程信息页面
router.get('/api/topic/getTopicHistory',topic.getTopicHistory);

// 根据时间和token获取对应选择课程的题目
router.post('/api/topic/getTopicByTokenTime',topic.getTopicByTokenTime);

  // 根据时间和token获取对应填空课程的题目
router.post('/api/topic/getTopicFillByTokenTime',topic.getTopicFillByTokenTime);

  // 根据时间和token获取对应计算课程的题目
router.post('/api/topic/getTopicOperateByTokenTime',topic.getTopicOperateByTokenTime);

  

// 在交卷的时候，将 统计好的错题数据存入已完成的那条数据中
router.put('/api/topic/insertErrorNumber',topic.insertErrorNumber);

 //查询数据库中的收藏状态，根据时间、token、topicid查询收藏状态
// router.post('/api/topic/getTopicCollect',topic.getTopicCollect);

// 在交卷的时候，将 统计好的收藏数据存入已完成的那条数据中
router.put('/api/topic/insertCollectNumber',topic.insertCollectNumber );
 
// 在交卷的时候，将 统计好的填空题收藏数据存入已完成的那条数据中
router.put('/api/topic/insertFillCollectNumber',topic.insertFillCollectNumber );

// 在交卷的时候，将 统计好的计算题收藏数据存入已完成的那条数据中
router.put('/api/topic/insertOperateCollectNumber',topic.insertOperateCollectNumber);

//获取已完成的填空题题课程信息页面
router.get('/api/topic/getTopicFinishFill',topic.getTopicFinishFill);

//获取已完成的计算题题课程信息页面
router.get('/api/topic/getTopicFinishOperate',topic.getTopicFinishOperate);

// 根据课程一个id获取课程学习
router.post('/api/studycourse/getStudyByOneId',studycourse.getStudyByOneId);

// 根据课程两个id获取课程资源
router.post('/api/studycourse/getStudyByTwoId',studycourse.getStudyByTwoId);

 //获取全部课程学习
router.get('/api/studycourse/getAllStudy',studycourse.getAllStudy);
module.exports = router;
