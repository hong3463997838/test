<template>
  <div class="contain">
    <!-- 左边导航 -->
    <div class="nav">
      <ul>
        <router-link to="/my/mymessage" class="roulink"><li>个人信息</li></router-link>
        <router-link to="/home" class="roulink"> <li>我的收藏</li></router-link>
        <router-link to="/home" class="roulink"> <li>我的记录</li></router-link>
        <router-link to="/my/modifypassword" class="roulink"> <li>修改密码</li></router-link>
        <router-link to="/my/privacy" class="roulink"> <li>隐私说明</li></router-link>
         <router-link to="/help" class="roulink">  <li>帮助中心</li></router-link>
        <li @click="onLogout">退出登录</li>
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
  name: "My",
  data(){
    return{
      // courses:['','','','','','',''],
      currentindex:-1,
    }
  },
  methods:{
	// 退出登录
async	onLogout(){
	localStorage.removeItem('TOKEN')
  // this.$router.push('/home')
this.$router.push({ path:'/home' },()=>{},()=>{})
      // 状态保持清除后刷新页面
      location.reload();
	},
  }
};
</script>

<style scoped>
.contain {
  width: 1200px;
  height: 700px;
  margin-top: 22px;
  margin-left: 145px; 
  display: flex;
  border: #e1e2e5 solid 2px;
  background-color: #f8fafc;
}
/* 左边导航栏 */
.nav {
  width: 167px;
  height: 600px;
  border: 1px solid #e1e2e5;
 
  /* background-color: rosybrown; */
  /* text-align: center; */
}
.nav ul li {
  text-align: center;
  width: 100px;
  color: black;
  list-style: none;
  font-size: 20px;
  margin-top: 10px;
  padding: 16px 33px;
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
  background-color: #00a476;
  color: white;
}
.nav ul  {
  margin-top: -8px;

}
  /* 右边内容 */
  .content{
    width: 1100px;
    background-color: #ffffff;
  }
  .active{
      background-color: #00a476;
  color: white;
  }
</style>