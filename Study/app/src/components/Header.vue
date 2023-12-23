<template>
  <div class="header">
    <!-- 头部的顶部 -->
    <div class="top">
      <div class="top-left" v-if="!username">
        <router-link to="/login">登录账号</router-link>
        <router-link to="/register">免费注册</router-link>
      </div>
      <div class="top-left" v-else>
        <span>你好，{{ username }}</span>
        <span @click="onLogout">退出登录</span>
      </div>
      <div class="top-right">
        <ul>
          <li>
            <router-link to="/my" class="a">个人中心</router-link>
            <!-- <a href="###"></a> -->
            <ul class="to-right-first">
              <li><a href="">我的课程</a></li>
              <li><a href="">我的收藏</a></li>
              <li><a href="">客服中心</a></li>
              <li><a href="">设置</a></li>
            </ul>
          </li>
          <li>
            <a href="###" class="a">成为老师</a>
          </li>
          <li>
            <a href="###" class="a">历史记录</a>
          </li>
          <li>
            <a class="a"><router-link to="/questionbank">答题</router-link></a>

            <!-- <a href="###" class="a">答题</a> -->
          </li>
          <li>
            <a class="a"><router-link to="/help/contact">客服中心</router-link></a>
          </li>
          <li>
            <a href="javascript;:" class="a">网站导航</a>
            <ul class="to-right-three">
              <li><router-link to="/">首页</router-link></li>
              <li><router-link to="/teacher">热门推荐</router-link></li>
              <li><router-link to="/coursestudy">课程学习 </router-link></li>
              <li><router-link to="/famousteach">名师教学 </router-link></li>
              <li><router-link to="/teacher">教师资源 </router-link></li>
              <li @click="toResource">资源中心</li>
              <li><router-link to="/questionbank">题库</router-link></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>

    <!-- 头部中间 -->
    <div class="middle">
      <div class="middle-left">
        <router-link to="/"><img src="../assets/1.png" alt="" /></router-link>
      </div>
      <div class="middle-right">
        <input type="text" placeholder="请输入关键词" />
        <button>搜索</button>
      </div>
    </div>

    <!-- 头部底部 -->
    <div class="buttom">
      <div class="buttom-left">
        <ul>
          <li>
            <div @mouseenter="entershow" @mouseleave="leaveshow">
              <p>全部课程分类</p>
            </div>

            <ul v-show="isShowCourse" class="ulcourse">
              <li><a href="javascript;:">职业教育</a><span>></span></li>
              <li><a href="javascript;:">计算机</a><span>></span></li>
              <li><a href="javascript;:">经济管理</a><span>></span></li>
              <li><a href="javascript;:">文史哲</a><span>></span></li>
              <li><a href="javascript;:">外语</a><span>></span></li>
              <li><a href="javascript;:">医药卫生</a><span>></span></li>
              <li><a href="javascript;:">理工学</a><span>></span></li>
              <li><a href="javascript;:">艺术设计</a><span>></span></li>
            </ul>
          </li>
        </ul>
      </div>

      <div class="buttom-right">
        <ul>
          <li :class="$route.path.includes('home')?'active':''"><router-link to="/">首页</router-link></li>
          <li :class="$route.path.includes('teacher')?'active':''"><router-link to="/teacher">热门推荐</router-link></li>
          <li :class="$route.path.includes('coursestudy')?'active':''"><router-link to="/coursestudy">课程学习 </router-link></li>
          <li :class="$route.path.includes('famousteach')?'active':''"><router-link to="/famousteach">名师教学 </router-link></li>
          <li :class="$route.path.includes('teacher')?'active':''"><router-link to="/teacher">教师资源 </router-link></li>
          <li :class="$route.path.includes('resource')?'active':''"><router-link to="/resource">资源中心</router-link></li>
          <li :class="$route.path.includes('questionbank')?'active':''"><router-link to="/questionbank">题库</router-link></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import { mapState } from 'vuex'
export default {
  name: "Header",
  data() {
    return {
      // 是否展示课程列表
      isShowCourse: false,
      //是否展示登录与退出登录的切换
      isShowLogin: false,
    };
  },
  computed: {
    ...mapState({
      username: (state) => {
        return state.user.userList.uname;
      },
    }),
  },
  mounted() {
    
  },
  methods: {
    // 鼠标进入
    entershow() {
      this.isShowCourse = true;
    },
    // 鼠标离开
    leaveshow() {
      this.isShowCourse = false;
    },
    // 退出登录
    async onLogout() {
      localStorage.removeItem("TOKEN");
      this.username = "";
      this.$router.replace({ path:'/home' },()=>{},()=>{})
      // 状态保持清除后刷新页面
      location.reload();
    },
    toResource(){
      this.$router.push({name:'Resource'},()=>{},()=>{})
        // 刷新页面
          location.reload();
    }
  },
};
</script>

<style scoped>
* {
  margin: 0px;
  padding: 0px;
}
/* 头部样式 */
.header {
  /* width: 100%;
			 */
  width: 1450px;

  height: 180px;
  /* background-color: greenyellow; */
}
/* 头部的顶部的样式 */
.top {
  width: 99%;
  height: 30px;
  font-size: 13px;
  color: black;
  line-height: 30px;
  border: 1px solid #f7f7f7;
  background-color: #f7f7f7;
  position: relative;
}
.top-left {
  position: absolute;
  float: left;
  margin-left: 100px;
}
.top-right {
  position: absolute;
  margin-left: 900px;
}
.top .top-left a {
  color: black;
  padding-left: 20px;
  text-decoration: none;
}
.a {
  padding-left: 30px;
  color: black;
}
.top .top-right ul li a {
  display: block;
  color: black;
  text-decoration: none;
}
ul li {
  list-style: none;
}
.top .top-right ul li {
  float: left;
  position: relative;
}
.top .top-right ul li ul {
  width: 80px;
  z-index: 999;
  margin-left: 18px;
  display: none;
  position: absolute;
}

.top .top-right ul li ul li {
  width: 100%;
  height: 30px;
  line-height: 30px;
  border: 1px solid black;
  text-align: center;
  font-size: 13px;
}
.top .top-right ul li:hover ul {
  display: block;
}
/* 头部中间的样式 */
.middle {
  width: 100%;
  height: 130px;
  position: relative;
}
.middle-left {
  position: absolute;
  float: left;
  margin-left: 160px;
}
.middle-right {
  margin-left: 300px;
  float: left;
  position: absolute;
  margin-top: 40px;
  margin-left: 550px;
}
.middle-right input {
  border: #00a476 3px solid;
  width: 600px;
  height: 30px;
}
.middle-right button {
  border: 1px solid white;
  width: 100px;
  height: 37px;
  font-size: 17px;
  color: white;

  background-color: #00a476;
}
::placeholder {
  padding-left: 10px;
}
/* 头部底部样式 */
.buttom {
  position: relative;
  width: 99.5%;
  height: 40px;
  margin-left: 3px;
  background-color: #00a476;
}
.buttom-left {
  position: absolute;
  width: 100px;
  /* background-color: red; */
  margin-left: 180px;
}

.buttom-left ul li {
  position: relative;
}
.buttom-left ul li p {
  height: 40px;
  line-height: 40px;
  color: white;
  font-weight: bold;
}
.buttom-left ul li ul {
  width: 200px;
  float: left;
  margin-left: -50px;
  position: absolute;
  /* background-color: rosybrown; */
}
.buttom-left ul li ul li {
  height: 50px;
  line-height: 50px;
  text-align: center;
  padding-left: 47px;
  border-top-color: white !important;
  border: 1px black solid;
}
.buttom-left ul li a {
  text-decoration: none;
  color: black;
  font-size: 17px;
  font-weight: bold;
}
/* 	.buttom-left ul li ul li a:hover{
				color: #00a476;
				background-color: #00a476;
			} */
.buttom-left ul li ul li span {
  margin-left: 50px;
}
.buttom-right {
  position: absolute;
  float: left;
  margin-left: 400px;
}

.buttom-right ul li {
  display: inline;
  height: 40px;
  line-height: 40px;
  width: 100px;
  /* background-color: red; */
  margin-left: -5px;
  padding: 10px 40px;
}
.buttom-right ul li:nth-child(1) {
  padding: 10px 55px;
  margin-left: -70px;
}
.buttom-right ul li:nth-child(7) {
  padding: 10px 55px;
}
.buttom-right ul li a {
  color: white;
  text-decoration: none;
}
.buttom-right ul li:hover {
  /* 	-moz-box-shadow:5px 5px 10px #b7b7b7;
		box-shadow:5px 5px 10px #b7b7b7; */
  /* background-color: #fff; */
}
.to-right-three{
  background-color: #fff;
}
.ulcourse{
  background-color: #fff;
}
.active{
  background-color: #b7b7b7;

}
</style>