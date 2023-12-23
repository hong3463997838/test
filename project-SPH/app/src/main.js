import Vue from 'vue'
import App from './App.vue'
// 三级联动组件---全局组件
import TypeNav from '@/components/TypeNav';
// 轮播图----全局组件
import Carousel from '@/components/Carousel'
// 分页器---全局组价
import Pagination from '@/components/Pagination'
// 消息弹框，弹出付款二维码，利用element-ui组件
import {MessageBox} from 'element-ui';
// 注册全局组件
//第一个参数:全局组件的名字，第二个参数：哪一个组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)
//Element-ui 注册组件时，还有一种写法：挂载在原型
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// 导入api
import * as API from '@/api'
// console.log(API);
// 引入路由
import router from './router';
// 引入仓库store, 
import store from './store';
// import {resCategoryList} from '@/api';
// resCategoryList();
// 导入模拟数据mock
import '@/mock/mockServe.js'
// 引入swiper样式
import "swiper/css/swiper.css"
// 导入懒加载的默认图片
// 因为图片和json是默认暴露的，所以不用使用export
import tupian from '@/assets/1.jpg'
// 图片懒加载，下载的版本是1.3.3，才有效果
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload,{
// 懒加载的默认图片
loading:tupian
})

Vue.config.productionTip = false
// 导入表单验证
import VueValidate, { Field } from "vee-validate"
import VeeValidate from 'vee-validate';
// 使用表单验证插件
Vue.use(VueValidate);
// 表单验证导入中文包
import zh_CN from 'vee-validate/dist/locale/zh_CN'
// 表单验证
VeeValidate.Validator.localize('zh_CN',{
  messages:{
    ...zh_CN.messages,
    is:(filed)=>`${filed}必须与密码相同`
  },
  attributes:{
    phone:'手机号',
    code:'验证码',
    password:'密码',
    password1:'确认密码',
    agree:'协议'
  }
});
// 表单自定义校验规则
VeeValidate.Validator.extend('agree',{
  validate:value=>{
    return value;
  },
  getMessage:field=>field+'必须同意'
})
new Vue({
  render: h => h(App),
  // 配置全局事件总线
  beforeCreate() {
    Vue.prototype.$bus=this;
    Vue.prototype.$API=API;
    // console.log(this);

  },
//  mounted() {
//   this.$store.dispatch('Apitest')
//  },
  // 配置路由，所有组价身上都有$router,$route属性
  router,
  // 注册仓库，实现模块化
  store,
}).$mount('#app')
