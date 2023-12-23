import {resGetGoodsList,resAddOrUpdateShopCart} from '@/api'
import {getUUID} from '@/utils/uuid_token'
const state={
    // 初始化对象要根据请求结果的形式
    goodInfo:{},
    // 游客临时身份
    uuid_token:getUUID()

};
const mutations={
    GETGOODSLIST(state,goodInfo){
        state.goodInfo=goodInfo
    },
  

};

const actions={
    
 async   getGoodsList({commit},skuId){
   let result= await  resGetGoodsList(skuId);

   if(result.code==200){
    commit('GETGOODSLIST',result.data)
   }
    },
    // 将产品添加到购物车中
    async   addOrUpdateShopCart({commit},{skuId,skuNum}){
        let result= await  resAddOrUpdateShopCart(skuId,skuNum);
        // 加入购物车以后（发请求）前台将参数带给服务器，服务器写入数据成功，并没有返回其他数据，只是返回code等于200，代表操作成功
        // 又因为服务器没有返回其余数据，所以不需要三连环，即mutations、state
        // console.log(result);
        // 返回值是promise，所以可以判断成功与否
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
         },
};
// 相当于计算属性，根据state中的是来改变
const getters={
    categoryView(state){
        return state.goodInfo.categoryView||{}
    },

    skuInfo(state){
        return state.goodInfo.skuInfo||{}
    },

    spuSaleAttrList(state){
    return state.goodInfo.spuSaleAttrList||[]
    }
    
};
export default{
    state,
    mutations,
    actions,
    getters
}