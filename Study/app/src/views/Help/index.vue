<template>
<div class="contain">
    <!-- 左边导航 -->
    <div class="nav">
      <ul>
        <router-link to="/help/introduction" class="roulink"><li>本站简介</li></router-link>
        <router-link to="/help/declare" class="roulink"> <li>免责声明</li></router-link>
        <router-link to="/help/agreement" class="roulink"> <li>条款协议</li></router-link>
        <router-link to="/help/notice" class="roulink"> <li>网站公告</li></router-link>
         <router-link to="/help/register" class="roulink">  <li>账号注册</li></router-link>
         <router-link to="/help/lostpassword" class="roulink">  <li>密码遗失</li></router-link>
         <router-link to="/help/contact" class="roulink">  <li>联系我们</li></router-link>
         <router-link to="/help/leavemessage" class="roulink">  <li>留言反馈</li></router-link>
      </ul>
    </div>
   
    <div class="content">
 <!-- 右边内容 -->
    <router-view></router-view>
    </div>
  </div> 
</template>

<script>
export default {
name:'Help'
}
</script>

<style scoped>
.contain {
  width: 1200px;
  height: 700px;
  margin-top: 22px;
  margin-left: 145px; 
  display: flex;
  border: #e1e2e5 solid 2px;
  background-color: #eeeeee;
}
/* 左边导航栏 */
.nav {
  width: 167px;
  height: 700px;
  border: 1px solid #e1e2e5;
 
  /* background-color: rosybrown; */
  /* text-align: center; */
}
.nav ul li {
  text-align: center;
  width: 100px;
  color: black;
  list-style: none;
  font-size: 14px;
  margin-top: 10px;
  padding: 10px 33px;
  margin-left: -40px;

}
.roulink  {
  /* text-align: center; */
  /* width: 100px; */
  color: black;
  /* list-style: none; */
  font-size: 20px;
  margin-top: 5px;
  /* padding: 16px 33px; */
  /* margin-left: -40px; */
  text-decoration: none;

}
.nav ul li:hover {
  background-color: #ffffff;
  color: #00a476;
}
.nav ul  {
  margin-top: -8px;

}
  /* 右边内容 */
  .content{
    width: 1100px;
    background-color: #ffffff;
  }
</style>