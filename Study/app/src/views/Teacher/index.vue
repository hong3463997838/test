<template>
  <div>
    <div class="nav">
      <div class="top">
        <span>所在位置：首页</span>-
        <span class="title">教师资源</span>
        <hr />
      </div>
      <ul>
        <li @click="allTeacher">分类</li>
        <li
          v-for="(c, index) in courseList"
          :key="c.id"
          :class="currentIndex == index ? 'active' : ''"
          @click="getCourseTeacher(c.id, index)"
        >
          {{ c.cname }}
        </li>
      </ul>
    </div>
    <div class="content">
      <div
        class="tmessage"
        v-for="t in teacherList"
        :key="t.tid"
        @click="toTeacherIntroduction(t.tid)"
      >
        <img :src="t.timg" />
        <div class="tcontent">
          <span>{{ t.tname }}</span>
          <br />
          <span>{{ t.introduction }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Teacher",
  data() {
    return {
      // 课程数据
      courseList: "",
      teacherList: "",
      currentIndex: -1,
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
    // 点击课程名称时，获取对应的老师信息
    async getTeacherList() {
      let result = await this.$store.dispatch("getTeacher", {
        cid: this.$route.params.cid,
      });
      console.log(result);
      if (result == "ok") {
        this.teacherList = this.$store.state.teacher.teacherList;
      }
    },
    // 点击全部或一加载页面时，获取全部老师信息
    async getAllTeacherList() {
      let result = await this.$store.dispatch("getAllTeacher");
      console.log(result);
      if (result == "ok") {
        this.teacherList = this.$store.state.teacher.teacherList;
      }
    },
    // 点击全部按钮时，跳转至当前页面
    allTeacher() {
      this.$router.push(
        { name: "Teacher" },
        () => {},
        () => {}
      );

      this.getAllTeacherList();
    },
    // 点击课程名称时，路由跳转及获取数据
    async getCourseTeacher(id, index) {
      this.currentIndex = index;

      this.$router.push(
        { name: "Teacher", params: { cid: id } },
        () => {},
        () => {}
      );
      // 发起请求
      this.getTeacherList();
    },
    // 点击教师图片去教师教师页面
    toTeacherIntroduction(id) {
      this.$router.push(
        { name: "teacherIntroduction", params: { tid: id } },
        () => {},
        () => {}
      );
    },
  },
  created() {
    this.$emit("header", true);
    this.$emit("footer", false);
  },
  mounted() {
    this.getCourseList();
    if (this.$route.params.cid) {
      this.$route.params.cid = "";
      this.$router.push(
        { name: "Teacher" },
        () => {},
        () => {}
      );
      this.getAllTeacherList();
    } else {
      this.getAllTeacherList();
    }
  },
};
</script>

<style scoped>
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
/* 导航 */
.nav {
  width: 1150px;
  height: 30px;
  line-height: 30px;
  margin-left: 180px;
  margin-top: 30px;
  /* margin-bottom: 30px; */
}
/* .nav ul{
      margin-bottom: 300px;
    } */
.nav ul li {
  list-style: none;
  display: inline-block;
  border: 1px solid #000000;
  margin-left: 20px;
  font-size: 13px;
  padding: 0px 25px;
  border-radius: 15px;
}
.nav ul li:nth-child(1) {
  margin-left: -38px;
  font-size: 19px;
  /* color: black; */
  border: 1px white solid;
  /* background-color: #00a476; */
}
.nav ul li a {
  text-decoration: none;
  color: black;
}
.nav ul li a:hover {
  color: #00a476;
}
/* 教师 */
.content {
  /* display: flex; */
  width: 1150px;
  height: 1320px;
  margin-left: 180px;
  margin-top: 80px;
  /* background-color: royalblue; */
}
.tmessage {
  float: left;
  width: 250px;
  height: 300px;
  /* border: 1px solid white; */
  /* border-radius: 15px; */
  margin-left: 15px;
  margin-bottom: 30px;
  /* background-color: rebeccapurple; */
  /* flex: 0.5; */
}
.tmessage img {
  width: 250px;
  height: 230px;
}
.tcontent {
  width: 250px;
}
.active {
  color: white;
  background-color: #00a476;
}
</style>