import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
// 引入路由
import router from './router'
import store from './store'
// 引入swiper样式
import "swiper/css/swiper.css"
// 三级联动组件---全局组件
import Header from '@/components/Header'
import Footer from '@/components/Footer'
// 轮播图----全局组件
import Carousel from '@/components/Carousel'
// 分页器---全局组价
import Pagination from '@/components/Pagination'
import {   DatePicker,  Upload } from 'element-ui';
Vue.component(DatePicker.name, DatePicker);
Vue.component( Upload.name, Upload);

// 注册全局组件
//第一个参数:全局组件的名字，第二个参数：哪一个组件
Vue.component(Header.name,Header)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)
Vue.component(Footer.name,Footer)

new Vue({
  render: h => h(App),
  // 配置路由，使其组件有$router,$route的属性
  router,
  store
}).$mount('#app')
