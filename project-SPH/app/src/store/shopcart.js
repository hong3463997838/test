import {resCartList,resDeleteCart} from '@/api'
// search模块的小仓库
const state={
    // 初始化对象要根据请求结果的形式
    cartList:[],
};
const mutations={
    GETCARTLIST(state,cartList){
        state.cartList=cartList
    }

};

const actions={
    // 获取购物车数据
    // 因为params传参至少要有一个空对象，所以只能通过派发的时候传参，再传给接口函数resGetSearchList
    // params={}，这个意思是如果有参数过来就按过来的参数赋值，没有就默认赋值为空对象
 async   getCartList({commit}){
   let result= await  resCartList();
   console.log(result);
   if(result.code==200){
    commit('GETCARTLIST',result.data)
   }
    },
// 删除购物车某条数据
 async   deleteCart({commit},skuId){
       let result= await resDeleteCart(skuId)
    //    删除不用三连环，与加入购物车、更新购物车一样，只是通知服务区删除数据，不用返回任何data，
    // 但要返回删除成功与否的值，因为要根据成功与否来判断是否在页面中获取新的购物车数据
    if(result.code==200){
        return 'ok'
    }else{
        return Promise.reject(new Error('faile'))
    }
    },
    // 删除选中的数据，因为没有删除选中产品的接口，所以利用产出某条产品数据的接口，进行多次删除
    deleteAllCartChecked({dispatch,getters}){
        // context相当于一个小仓库，包含commit,action,mutation,state,getters
        // 在仓库中派发删除某条数据的函数
        // console.log(getters,1111);
        let PromiseAll=[];
        getters.cartList.cartInfoList.forEach(item=> {
    
               let Promise= item.isChecked==1?dispatch('deleteCart',item.skuId):'';
        //    每次派发都会添加到数组中
               PromiseAll.push(Promise)
        });
        // Promise.all(PromiseAll),数组中 的每个Promise成功，则返回成功，若有一个失败则失败
        return Promise.all(PromiseAll)
        
    }
};
// 相当于计算属性，根据state中的是来改变
const getters={
    cartList(state){
    return state.cartList[0]||{}
    }
};
export default{
    state,
    mutations,
    actions,
    getters
}