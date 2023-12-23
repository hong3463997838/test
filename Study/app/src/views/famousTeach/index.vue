<template>
  <div class="contain">
    <div class="top">
      <span>所在位置：首页</span>-
      <span class="title">名师教学</span>
      <hr />
    </div>
    <div class="nav">
      <div class="course">
        <span>学科：</span>
        <ul>
          <li v-for="(c,index) in courseList" :key="c.id" :class="currentcourseIndex==index?'active':''" @click="onCourse(c.id,index)" >
            {{ c.cname }}
          </li>
     
        </ul>
      </div>
      <div class="coursecate">
        <span>分类：</span>
        <ul>
          <li
            v-for="(t,index) in teacherList"
            :key="t.tid"
            :class="currentteacherIndex==index?'active':''"
          @click="onTeacher(t.tid,index)"
          >
            {{ t.tname}}
          </li>
        
        
        </ul>
      </div>
    </div>
    <div class="content">
      <div class="tmessage" v-for="s in categorycourseList" :key="s.sid">
        <img :src="s.simg"  />
        <div class="tcontent">
          <span>{{s.sname}}</span>
        </div>
      </div>
   
    </div>
  </div>
</template>

<script>
export default {
  name: "famousTeach",
  data(){
    return{
      courseList:'',
   currentcourseIndex:-1,
teacherList:'',
categorycourseList:'',
currentteacherIndex:-1
    }
  },
  methods:{
      // 获取课程数据
async getCourseList(){
let result= await this.$store.dispatch('getCourse')
console.log(result);
if(result=='ok'){
  this.courseList=this.$store.state.teacher.courseList
}
},
// 获取总课程id获取对应的老师
async getTeacherList(cid){
  try {
     await this.$store.dispatch('getFamousTeacher',cid)

  this.teacherList=this.$store.state.famousteach.teacherList
  } catch (error) {
    console.log(error);
  }


},
// 获取全部课程信息resGetAllCategoryCourse
async getAllCategoryCourseList(){
  try {
     await this.$store.dispatch('getAllCategoryCourse')
  this.categorycourseList=this.$store.state.famousteach.categorycourseList

  } catch (error) {
    console.log(error);
  }


},
// 点击课程名称后发起请求,根据一个id
async getCourseCategoryListByOne(cid){
  try {
     await this.$store.dispatch('getCourseCategoryByone',{cid:cid})

  this.categorycourseList=this.$store.state.famousteach.categorycourseList
  } catch (error) {
    console.log(error);
  }
},

 // 点击课程和老师后获取课程详细信息,根据一个课程id和一个教师id
async getCourseCategoryListByTwo(cid,tid){
  try {
     await this.$store.dispatch('getCourseCategoryByTwo',{cid:cid,tid:tid})

  this.categorycourseList=this.$store.state.famousteach.categorycourseList
  } catch (error) {
    console.log(error);
  }


},

// 点击总课程名称
onCourse(id,index){
  // 改变点击样式
  this.currentcourseIndex=index
  // 改变路由
  this.$router.push({name:'famousTeach',params:{cid:id}},()=>{},()=>{})
  // 发起 请求
  this.getTeacherList(id)
  this.getCourseCategoryListByOne(id)
  this.currentteacherIndex=-1
},
// 点击老师名字
onTeacher(tid,index){
 // 改变点击样式
  this.currentteacherIndex=index
  // 改变路由
  this.$router.push({name:'famousTeach',params:{cid:this.$route.params.cid,tid:tid}},()=>{},()=>{})
  // 发起 请求
  this.getCourseCategoryListByTwo(this.$route.params.cid,tid)
}

  },
  created () {
 
            this.$emit('header', true);
            this.$emit('footer', false);
 
        },
  mounted(){
    this.getCourseList()
  this.getTeacherList(1)
  if(this.$route.params.cid || this.$route.params.tid){
    this.$route.params.cid=''
    this.$route.params.tid=''
    this.$router.push({name:'famousTeach'})
  this.getAllCategoryCourseList()
}else{
 this.getAllCategoryCourseList()

}
  
  }

};
</script>

<style scoped>
.contain {
  margin-top: 40px;
  width: 1150px;
  height: 800px;
  margin-left: 180px;
}
.top {
  color: #666691;
  width: 700px;
  height: 30px;
  margin-top: -5px;
  margin-bottom: 20px;
}
.top .title {
  font-weight: bold;
  color: #00a476;
}
hr {
  width: 1250px;
  margin-top: 10px;
  /* margin-bottom: 20px; */
  border: 1px solid #eeeeee;
}
.nav {
  font-size: 15px;
}
.nav .course span {
  font-weight: 600;
  color: #999999;
}
.nav .course ul {
  width: 1100px;
  /* height: 750px; */
  margin-left: -50px;
  display: inline-flex;
  margin-top: -10px;

  /* background-color: rosybrown; */
}
.nav .course ul li {
  /* flex: 1; */
  margin-left: 30px;
  list-style: none;
}
.nav .coursecate span {
  font-weight: 600;
  color: #999999;
}
.nav .coursecate ul {
  width: 1100px;
  /* height: 750px; */
  margin-left: -50px;
  display: inline-flex;
  margin-top: -10px;

  /* background-color: rosybrown; */
}
.nav .coursecate ul li {
  /* flex: 1; */
  margin-left: 30px;
  list-style: none;
}
.active {
  color: #00a476;
}

.content {
  /* float: left; */
  width: 1150px;
  height: 800px;
  /* background-color: #666691; */
}
 .tmessage{
      float: left;
      width: 265px;
      height: 250px;
      /* border: 1px solid white; */
      /* border-radius: 15px; */
      margin-right: 20px;
      margin-bottom: 20px;
      /* background-color: rebeccapurple; */
      /* flex: 0.5; */
    }
    .tmessage img{
      width: 265px;
      height: 230px;
    }
    .tcontent{
        /* background-color: red; */
        width: 265px;
        height: 25px;
        line-height: 8px;
    }
    /* .active{
    color:white;
    background-color: #00a476;  

} */
</style>