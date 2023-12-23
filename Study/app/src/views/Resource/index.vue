<template>
  <div class="contain">
    <div class="top">
      <span>所在位置：首页</span>-
      <span class="title">资源中心</span>
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

          <!-- <li>计算机</li>
            <li>职业教育</li>
            <li>经济管理</li>
            <li>文史哲</li>
            <li>外语</li>
            <li>医药卫生</li>
            <li>理工学</li>
            <li>艺术设计</li>
            <li>艺术设计</li>
            <li>理工学</li>
            <li>艺术设计</li>
            <li>艺术设计</li>
            <li>文史哲</li>
             -->
        </ul>
      </div>
    </div>
    <div class="content">
      <div class="content2" v-for="r in  courseresourceList" :key="r.rid" @click="onPdf(r.rid)">
        <div class="img">
          <img
            src="https://img.zcool.cn/community/011aad554be56f000001bf72c38864.jpg@1280w_1l_2o_100sh.jpg"
            alt=""
          />
        </div>
        <div class="text">
          <h5>
           {{r.rname}}
          </h5>
          <p>文件大小：{{r.rsize}}g</p>
          <p>下载：{{r.unloadnumber}}</p>
          <p>添加时间：{{r.rdate}}</p>
        </div>
      </div>
   
    </div>
  </div>
</template>

<script>
export default {
  name: "Resource",
  data() {
    return {
      courseList: "",
      coursecategoryList: "",
      courseresourceList:'',
      coursecurrentIndex:-1,
      coursecatecurrentIndex:-1
    };
  },
  methods: {
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
    // 获取全部课程资源
    
      async getAllCourseResource() {
      let result = await this.$store.dispatch("getAllResource");
      console.log(result);
      if (result == "ok") {
        this.courseresourceList = this.$store.state.resource.allresourceList;
      }
    },
    // 获取一个id的资源
   async getCourseResourceByOneId(id){
    let result = await this.$store.dispatch("getResourceByOneId",{cid:id});
      console.log(result);
      if (result == "ok") {
        this.courseresourceList = this.$store.state.resource.resourceList;
      }
    },

        // 获取两个id的资源
   async getCourseResourceByTwoId(cid,cateid){
    let result = await this.$store.dispatch("getResourceByTwoId",{cid:cid,cateid:cateid});
      console.log(result);
      if (result == "ok") {
        this.courseresourceList = this.$store.state.resource.cateresourceList;
      }
    },
    // 点击总课程的名称，
    onCourse(id,index) {
      // 路由跳转
      this.$router.push(
        { name: "Resource", params: { cid: id } },
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
          name: "Resource",
          params: { cid: this.$route.params.cid, categoryid: categoryid },
        },
        () => {},
        () => {}
      );
      this.coursecatecurrentIndex=index

      // 发起请求
    this.getCourseResourceByTwoId(this.$route.params.cid,categoryid)
    },
    // 点击的样式
    // isClickCourse(event){
    //     console.log(event.current.target.value);
    //     // return this.coursecurrentIndex==index
    // },
    // isClickCourseCate(event){
    //            console.log(event.current.target.value);

    //     // return this.coursecatecurrentIndex==index

    // }
// 点击去资料pdf页面
    onPdf(rid){
      this.$router.push({name:'resourcePdf',params:{rid:rid}})
    }
  },
  created () {
 
            this.$emit('header', true);
            this.$emit('footer', false);
 
        },
  mounted() {
    // 页面一加载获取全部资源
//     if(!this.$route.params.cid && !this.$route.params.categoryid){
//     this.getAllCourseResource()
//     }else if(this.$route.params.cid && !this.$route.params.categoryid){

//   this.getCourseResourceByOneId(this.$route.params.cid)

//     }else if(this.$route.params.cid && this.$route.params.categoryid){
//   this.getCourseResourceByTwoId(this.$route.params.cid,this.$route.params.categoryid)

//     }

if(this.$route.params.cid || this.$route.params.categoryid){
    this.$route.params.cid=''
    this.$route.params.categoryid=''
    this.$router.push({name:'Resource'})
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
  margin-top: -25px;
  width: 1150px;
  height: 800px;
  /* background-color: rebeccapurple; */
}
.content2 {
  margin-top: 20px;
  margin-right: 20px;
  float: left;
  width: 500px;
  height: 120px;
  /* background-color: royalblue; */
}
.content2 .img {
  float: left;
  width: 120px;
  height: 120px;
  margin-right: 20px;
}
.content2 img {
  float: left;
  margin-top: 20px;
  width: 120px;
  height: 120px;
}
.text {
  /* float: left; */
  width: 500px;
  height: 120px;
  /* background-color: rosybrown; */
}
.text h5 {
  padding-top: 5px;
  margin-bottom: 15px;
}
.text h5:hover{
  color: #00a476;
  
}
.text p {
  color: #999999;
  margin-top: -5px;
  font-size: 12px;
}

</style>