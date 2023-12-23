import {resAddressInfo,resGoodsInfo,resSubmitOrder,resPayInfo} from '@/api'
const state={
    userAddressList:[],
    goodsTradeList:{},
    submitOrderList:{},
    paymentList:{}
};
const mutations={
    GETUSERADDRESS(state, userAddressList){
        state. userAddressList= userAddressList
    },
    GETGOODSMESSAGE(state,goodsTradeList){
        state.goodsTradeList=goodsTradeList
    },
    SUBMITORDER(state,submitOrderList){
        state.submitOrderList=submitOrderList
    },
    GETPAYMENTMESSAGE(state,paymentList){
        state. paymentList= paymentList
    },
};
const actions={
    // 获取用户收件地址信息
  async  getUserAdderss({commit}){
      let result= await resAddressInfo();
    console.log(result);
    if(result.code==200){
        commit('GETUSERADDRESS',result.data)
    }
    },
        // 获取商品清单
  async  getGoodsMessage({commit}){
    let result= await resGoodsInfo();
  console.log(result);
  if(result.code==200){
      commit('GETGOODSMESSAGE',result.data)
  }
  },
//  提交订单
async  SubmitOrder({commit},{tradeNo,data}){
    let result= await resSubmitOrder(tradeNo,data);
  console.log(result);
  if(result.code==200){
      commit('SUBMITORDER',result.data)
      return result.data
  }else{
    return Promise.reject(new Error('faile'))
  }
  },

  //  获取支付信息
async getPaymentMessage({commit},orderId){
    let result= await resPayInfo(orderId);
  console.log(result);
  if(result.code==200){
      commit('GETPAYMENTMESSAGE',result.data)
  }
  },
};
const getters={};

export default{
    state,
    mutations,
    actions,
    getters,
}

