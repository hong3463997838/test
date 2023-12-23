// 当前这个模块：api进行统一管理
import requests  from "./request";
// 获取轮播图数据
export const resGetBannerList=()=>requests({url:'/home/banner',method:'get'});
 
// 获取首页推荐的课程数据
export const resGetHomeCourse=()=>requests({url:'/home/getHomeCourse',method:'get'});

  // 获取首页名师教学的老师
export const resGetHomeTeacher=()=>requests({url:'/home/getHomeTeacher',method:'get'});

  // 获取首页课程分类
  export const resGetHomeCourseCategory=(id)=>requests({url:`/home/getHomeCourseCategory?cid=${id}`,method:'get'});

// 注册接口
export const resPostRegister=(data)=>requests({url:`/study/register`,data,method:'post'})

//登录接口
export const resPostLogin=(data)=>requests({url:'/study/login',data,method:'post'})

// 把生成的token插入数据库
export const resPutUserToken=(data)=>requests({url:'/study/updateToken',data,method:'put'})

// 首页根据token查询用户数据
export const resGetUser=()=>requests({url:'/study/selectUser',method:'get'})

// 退出登录
// /api/user/logout
export const resPostLogout=()=>requests({url:'/user/logout',method:'post'})

// 个人信息中，点击保存，修改数据
export const resPutUpdateUser=(data)=>requests({url:'/study/updateUser',data,method:'put'})

// 修改用户头像
export const resPutUpdateUserImg=(data)=>requests({url:'/study/updateUserImg',data,method:'put'})

// 修改用户密码
export const resPutUpdateUserPassword=(data)=>requests({url:'/study/updateUserPassword',data,method:'put'})

// 用户留言
export const resPostUserLeaveMessage=(data)=>requests({url:'/study/leaveMessage',data,method:'post'})

// 生成图片验证码/api/study/getCode
export const resGetCode=()=>requests({url:'/study/getCode',method:'get'})

// 教师资源中获取课程信息
export const resGetCourse=()=>requests({url:'/teacher/getCourse',method:'get'})

// 教师资源中获取课程对应的老师
export const resGetTeacher=(data)=>requests({url:'/teacher/getTeacher',method:'post',data})

// 教师资源中获取课程对应的老师
export const resGetAllTeacher=()=>requests({url:'/teacher/getAllTeacher',method:'get'})

// 教师资源中老师的信息
export const resGetTeacherMessage=(id)=>requests({url:`/teacher/getTeacherMessage?tid=${id}`,method:'get'})

// 教师资源中老师的信息
export const resGetCourseCategory=(id)=>requests({url:`/resource/getCourseCategory?cid=${id}`,method:'get'})


// 根据课程一个id获取课程资源
export const resGetResourceByOneId=(data)=>requests({url:'/resource/getResourceByOneId',method:'post',data})

// 根据课程两个个id获取课程资源
export const resGetResourceByTwoId=(data)=>requests({url:'/resource/getResourceByTwoId',method:'post',data})

// 根据获取全部课程资源
export const resGetAllResource=()=>requests({url:'/resource/getAllResource',method:'get'})

// 根据资源的id获取对应的pdf文件链接
export const resGetRecourcePdf=(id)=>requests({url:`/resource/getRecourcePdf?rid=${id}`,method:'get'})

// 名师教学
// 获取总课程id获取对应的老师
export const resGetFamousTeacher=(id)=>requests({url:`/famousteach/getTeacher?cid=${id}`,method:'get'})

// 根据课程名称获取对应的课程分类信息,一个id
export const resGetCategoryCourseByOne=(data)=>requests({url:`/famousteach/getCategoryCourseByOne`,method:'post',data})

 // 点击课程和老师后获取课程详细信息,根据一个课程id和一个教师id
export const resGetCategoryCourseByTwo=(data)=>requests({url:`/famousteach/getCategoryCourseByTwo`,method:'post',data})

// 获取全部的课程信息
export const resGetAllCategoryCourse=()=>requests({url:`/famousteach/getAllCategoryCourse`,method:'get'})

//题目页面，获取选择题目及对应的课程信息
export const resGetSelectQuestion=(data)=>requests({url:`/topic/getSelectQuestion?data=${data}`,method:'get'})

 // 点击选项，并将我选择的答案存入数据库中，方便后面查看解析
//  export const resUpdateMyAnswer=(data)=>requests({url:`/topic/updateMyAnswer`,method:'put',data})

 // 点击选项，并将我选择的答案存入数据库中，方便后面查看解析
 export const resInsertMyAnswer=(data)=>requests({url:`/topic/insertMyAnswer`,method:'post',data})

  // 点击选项，并将我填空题相关数据存入数据库中，方便后面查看解析
 export const resInsertFillMyAnswer=(data)=>requests({url:`/topic/insertFillMyAnswer`,method:'post',data})

   // 点击选项，并将我计算题相关数据存入数据库中，方便后面查看解析
 export const resInsertOperateMyAnswer=(data)=>requests({url:`/topic/insertOperateMyAnswer`,method:'post',data})

// 在交卷的时候，将 统计好的错题数据存入已完成的那条数据中
export const resInsertErrorNumber=(data)=>requests({url:`/topic/insertErrorNumber`,method:'put',data})

 //题目页面，获取选择题目及对应的课程信息
export const resGetFillQuestion=(data)=>requests({url:`/topic/getFillQuestion?data=${data}`,method:'get'})

//题目页面，获取计算题目及对应的课程信息
export const resGetOperateQuestion=(data)=>requests({url:`/topic/getOperateQuestion?data=${data}`,method:'get'})

//获取已完成的选择题题课程信息页面
export const resGetTopicHistory=(token)=>requests({url:`/topic/getTopicHistory?token=${token}`,method:'get'})

// 根据时间和token获取对应选择课程的题目
export const resGetTopicByTokenTime=(data)=>requests({url:`/topic/getTopicByTokenTime`,method:'post',data})

// 根据时间和token获取对应填空课程的题目
export const resGetTopicFillByTokenTime=(data)=>requests({url:`/topic/getTopicFillByTokenTime`,method:'post',data})

  // 根据时间和token获取对应计算课程的题目
export const resGetTopicOperateByTokenTime=(data)=>requests({url:`/topic/getTopicOperateByTokenTime`,method:'post',data})

 //查询数据库中的收藏状态，根据时间、token、topicid查询收藏状态
export const resGetTopicCollect=(data)=>requests({url:`/topic/getTopicCollect`,method:'post',data})

// 在交卷的时候，将 统计好的收藏数据存入已完成的那条数据中
export const resInsertCollectNumber=(data)=>requests({url:`/topic/insertCollectNumber`,method:'put',data})

// 在交卷的时候，将 统计好的填空题收藏数据存入已完成的那条数据中
export const resInsertFillCollectNumber=(data)=>requests({url:`/topic/insertFillCollectNumber`,method:'put',data})

// 在交卷的时候，将 统计好的计算题收藏数据存入已完成的那条数据中
export const resInsertOperateCollectNumber=(data)=>requests({url:`/topic/insertOperateCollectNumber`,method:'put',data})

//获取已完成的填空题题课程信息页面
export const resGetTopicFinishFill=(token)=>requests({url:`/topic/getTopicFinishFill?token=${token}`,method:'get'})

//获取已完成的计算题课程信息页面
export const resGetTopicFinishOperate=(token)=>requests({url:`/topic/getTopicFinishOperate?token=${token}`,method:'get'})

// 课程学习页面
// 根据课程一个id获取课程学习
export const resGetStudyByOneId=(data)=>requests({url:`/studycourse/getStudyByOneId`,method:'post',data})

// 根据课程两个id获取课程资源
export const resGetStudyByOneTwo=(data)=>requests({url:`/studycourse/getStudyByTwoId`,method:'post',data})

 //获取全部课程学习
export const resGetAllStudy=()=>requests({url:'/studycourse/getAllStudy',method:'get'})