<template>
  <div>
    <!-- 使用组件 -->
  <Header></Header>
  <router-view></router-view>
  <!-- 显示和隐藏，利用在配置路由信息中设置路由元meta对象 -->
  <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>

// 引入
import Header  from './components/Header'
import Footer from './components/Footer.vue'
export default {
  // 注册
components:{
Header,
Footer
},
// 组件挂载完毕后向服务器发请求
mounted(){
    // 通知Vuex发送请求，获取数据，存储于仓库
    this.$store.dispatch('categoryList');
  
    }
}
</script>

<style>

</style>