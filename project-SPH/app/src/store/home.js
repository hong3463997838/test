import {resCategoryList,resGetBannerList,resGetFloorList,test} from '@/api'
// home模块的小仓库
const state={
    // state 中数据默认初始值别瞎写，服务器返回对象，服务器返回数组【根据返回值进行初始化】
    categoryList:[],
    bannerList:[],
    floorList:[],

};
const mutations={
    CATEGORYLIST(state,categoryList){
        state.categoryList=categoryList
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList=bannerList
    },
    GETFLOORLIST(state,floorList){
        state.floorList=floorList
    },
};
const actions={
    //通过api里面的接口函数调用，向服务器发送请求，获取服务器的数据
  async  categoryList({commit}){
        // resCategoryList()的返回结果是promise，为了获取成功结果，要用await,async
       let result=await resCategoryList();
    //    console.log(result);
       if(result.code===200){
        commit('CATEGORYLIST',result.data)
       }
    },
    // 获取轮播图数据
  async  getBannerList({commit}){
     let result= await  resGetBannerList();
        // console.log(result);
        if(result.code===200){
            commit('GETBANNERLIST',result.data)
           }
    },
    // 获取轮播图数据
    async  getFloorList({commit}){
        let result= await  resGetFloorList();
           // console.log(result);
           if(result.code===200){
               commit('GETFLOORLIST',result.data)
              }
       },
    //    async  Apitest({commit}){
    //     console.log('jjjjjjj')
    //     let result= await test();
    //        console.log(result);
          
    //    },

  
    
};
const getters={};
export default{
    state,
    mutations,
    actions,
    getters
}