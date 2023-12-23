// 当前这个模块：api进行统一管理
import requests  from "./request";
import mockRequests from "./mockAjax"
// 三级联动接口
//   api/product/getBaseCategoryList  get 无参数
  // 发请求:axios 发请求返回的结果是promise对象
export const resCategoryList=()=>requests({url:'/product/getBaseCategoryList',method:'get'});
// 获取轮播图的数据
export const resGetBannerList=()=>mockRequests({url:'/banner',method:'get'});
// 获取floor的数据
export const resGetFloorList=()=>mockRequests({url:'/floor',method:'get'});

// 获取search的数据
// 注意，当前这个接口，给服务器传递参数，至少是一个空对象，并且不接受外部传递参数
export const resGetSearchList=(params)=>requests({url:'/list',method:'post',data:params});

// 获取产品详情数据
export const resGetGoodsList=(skuId)=>requests({url:`/item/${skuId}`,method:'get'});

// 将产品添加到购物车，（获取更新某个产品的个数）
export const resAddOrUpdateShopCart=(skuId,skuNum)=>requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'});

// 获取购物车数据请求
export const resCartList=()=>requests({url:'/cart/cartList',method:'get'});

// 删除购物车数据
export const resDeleteCart=(skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'});

// 获取验证码
export const resGetCode=(phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get'});

// 注册
export const resUserRegister=(data)=>requests({url:'/user/passport/register',data,method:'post'});

// 登录
export const resUserLogin=(data)=>requests({url:'/user/passport/login',data,method:'post'});

// 根据token获取用户信息
export const resUserMessage=()=>requests({url:'/user/passport/auth/getUserInfo',method:'get'});

// 退出登录
export const resLogout=()=>requests({url:'/user/passport/logout',method:'get'});

// 获取收件人地址信息
export const resAddressInfo=()=>requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'});

// 获取用户商品清单
export const resGoodsInfo=()=>requests({url:'/order/auth/trade',method:'get'});

// 提交订单的接口
export const resSubmitOrder=(tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'});

// 获取支付信息
export const resPayInfo=(orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'});

// 获取支付订单状态
export const resPayStatus=(orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})

// 获取我的订单信息
export const resMyOrderList=(page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'})

// export const test=()=>requests({url:'/study/banner',method:'get'})
