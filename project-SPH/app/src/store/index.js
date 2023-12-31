import Vue from "vue";
import Vuex from 'vuex';

// 使用插件
Vue.use(Vuex);

// 引入小仓库，实现模块化
import home from "./home";
import search from "./search";
import detail from "./detail";
import shopcart from "./shopcart";
import user from "./user";
import trade from "./trade";

export default new Vuex.Store({
    // 实现Vuex仓库模块化开发存储数据
    modules:{
      home,
      search,
      detail,
      shopcart  ,
      user,
      trade

    }
})