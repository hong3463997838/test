<template>
<div class="body">
  <div class="contain">
    <div class="top">
      <span>所在位置：首页</span>-
      <span class="title">课程学习</span></span>
      <hr />
    </div>
    <div class="nav">
      <div class="course">
        <span>学科：</span>
        <ul>
          <li v-for="(c,index) in courseList" :key="c.id" :class="coursecurrentIndex==index?'active':''" @click="onCourse(c.id,index)  ">
            {{ c.cname }}
          </li>
          <!-- <li>职业教育</li>
            <li>计算机</li>
            <li>经济管理</li>
            <li>文史哲</li>
            <li>外语</li>
            <li>医药卫生</li>
            <li>理工学</li>
            <li>艺术设计</li> -->
        </ul>
      </div>
      <div class="coursecate">
        <span>分类：</span>
        <ul>
          <li
            v-for="(c,index) in coursecategoryList"
            :key="c.categoryid"
           :class=" coursecatecurrentIndex==index?'active':''"
            @click="onCourseCategory(c.categoryid,index)"
          >
            {{ c.categoryname }}
          </li>

        </ul>
      </div>
    </div>
   <div class="content">
      <div
        class="tmessage"
        v-for="s in studycourseList"
        :key="s.sid"
        @click="onCourseStudy(s.sid)"
      >
        <img :src="s.simg" />
        <div class="tcontent">
          <span>{{ s.sname }}</span>
          <br />
          <span>{{s.tname}}</span>
        </div>
      </div>
    </div>
  </div>
</div>
  
</template>

<script>
export default {
  name: "courseStudy",
  data() {
    return {
      courseList: "",
      coursecategoryList: "",
      studycourseList:'',
      coursecurrentIndex:-1,
      coursecatecurrentIndex:-1
    };
  },
  methods: {
    // 点击课程学习，跳转到视频学习
    onCourseStudy(sid){
      console.log(sid);
      this.$router.push({name:'courseVideo',params:{sid:sid}},()=>{},()=>{})
    },
    // 获取课程数据
    async getCourseList() {
      let result = await this.$store.dispatch("getCourse");
      console.log(result);
      if (result == "ok") {
        this.courseList = this.$store.state.teacher.courseList;
      }
    },
    // 获取对应每个课程分类的课程
    async getCourseCategory(id) {
      let result = await this.$store.dispatch("getCategoryCourse", id);
      console.log(result);
      if (result == "ok") {
        this.coursecategoryList = this.$store.state.resource.coursecategoryList;
      }
    },
    // 获取全部课程学习
      async getAllCourseResource() {
      let result = await this.$store.dispatch("getAllStudy");
      console.log(result);
      if (result == "ok") {
        this.studycourseList = this.$store.state.studycourse.studycourseList;
      }
    },
    // 获取一个id的课程学习
   async getCourseResourceByOneId(id){
    let result = await this.$store.dispatch("getStudyByOneId",{cid:id});
      console.log(result);
      if (result == "ok") {
        this.studycourseList = this.$store.state.studycourse.studycourseList;
      }
    },

        // 获取两个id的课程学习
   async getCourseResourceByTwoId(cid,cateid){
    let result = await this.$store.dispatch("getStudyByTwoId",{cid:cid,cateid:cateid});
      console.log(result);
      if (result == "ok") {
        this.studycourseList = this.$store.state.studycourse.studycourseList;
      }
    },
    // 点击总课程的名称，
    onCourse(id,index) {
      // 路由跳转
      this.$router.push(
        { name: "courseStudy", params: { cid: id } },
        () => {},
        () => {}
      );
      this.coursecurrentIndex=index
      // 发起请求,获取对应每个课程分类的课程
      this.getCourseCategory(id);
    //   发起请求，获取一个id的课程资源
    this.getCourseResourceByOneId(id)
    this.coursecatecurrentIndex=-1
    },
    // 点击细分的课程
    onCourseCategory(categoryid,index) {
      // 路由跳转
      this.$router.push(
        {
          name: "courseStudy",
          params: { cid: this.$route.params.cid, categoryid: categoryid },
        },
        () => {},
        () => {}
      );
      this.coursecatecurrentIndex=index

      // 发起请求
    this.getCourseResourceByTwoId(this.$route.params.cid,categoryid)
    },
  
  },
  created () {
 
            this.$emit('header', true);
            this.$emit('footer', false);
 
        },
  mounted() {
if(this.$route.params.cid || this.$route.params.categoryid){
    this.$route.params.cid=''
    this.$route.params.categoryid=''
    this.$router.push({name:'courseStudy'})
    this.getAllCourseResource()
}else{
    this.getAllCourseResource()

}
    // 获取课程资源
    this.getCourseList();
    // 获取课程id为1的细分的课程
    this.getCourseCategory(1);
  },
};
</script>

<style scoped>
.body{
  background-color: #f5f5f5;
width: 1450px;
height: 1500px;
}
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
.nav .course  ul li {
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
.nav .coursecate  ul li {
  /* flex: 1; */
  margin-left: 30px;
  list-style: none;
}
.active{
    color: #00a476;  
}

.content {
  /* display: flex; */
  width: 1150px;
  height: 1320px;
  /* margin-left: 80px; */
  margin-top: 10px;
  /* background-color: royalblue; */
}
.tmessage {
  float: left;
   width: 200px;
border: 1px solid white;
border-radius: 15px;
  height: 210px;
  background-color: #fff;
  /* border: 1px solid white; */
  /* border-radius: 15px; */
  margin-left: 15px;
  margin-bottom: 25px;
  /* margin-bottom: 10px; */
  /* background-color: rebeccapurple; */
  /* flex: 0.5; */
}
.tmessage img {
  width: 200px;
  height: 130px;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;


}
.tcontent {
  margin-top: 7px;
  /* background-color: royalblue; */
    width: 200px;

}


</style>