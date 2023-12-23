import {resGetSearchList} from '@/api'
// search模块的小仓库
const state={
    // 初始化对象要根据请求结果的形式
    searchList:{}
};
const mutations={
    GETSEARCHLIST(state,searchList){
        state.searchList=searchList
    }

};

const actions={
    // 因为params传参至少要有一个空对象，所以只能通过派发的时候传参，再传给接口函数resGetSearchList
    // params={}，这个意思是如果有参数过来就按过来的参数赋值，没有就默认赋值为空对象
 async   getSearchList({commit},params={}){
   let result= await  resGetSearchList(params);
//    console.log(result.data);
   if(result.code==200){
    commit('GETSEARCHLIST',result.data)
   }
    }
};
// 相当于计算属性，根据state中的是来改变
const getters={
    // 简化仓库中数据,使其使用的页面不会写比较长串的数据
    // 之所以用[]空数组的原因是，假如当网络不给力的情况下，
    // state.searchList.goodsList的返回值为undefined，后面再遍历是会报错，
    // 所以至少要有一个空数组
    goodsList(state){
        return state.searchList.goodsList||[]
    },
    trademarkList(state){
        return state.searchList.trademarkList||[]
    },   
    attrsList(state){
        return state.searchList.attrsList||[]
    }
};
export default{
    state,
    mutations,
    actions,
    getters
}