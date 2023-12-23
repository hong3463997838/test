import Vue from "vue";
import Vuex from 'vuex';

// 使用插件
Vue.use(Vuex);
// 引入小仓库，实现模块化
import home from "./home"
import user from "./user"
import teacher from "./teacher"
import  resource from "./resource"
import famousteach from "./famousteach"
import questionbank from "./questionbank"
import topic from "./topic"
import studycourse from "./studycourse"


export default new Vuex.Store({
    // 实现Vuex仓库模块化开发存储数据
    modules:{
      home,
      user,
      teacher,
      resource,
      famousteach ,
      questionbank,
      topic,
      studycourse
    }
})