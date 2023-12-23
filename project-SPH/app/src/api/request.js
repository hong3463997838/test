// 对axios进行二次封装
import axios from 'axios'
// 导入进度条
// 进度条有两个方法
// nprogress.start,进度条开始
// nprogress.done,进度条结束
// 进度条的样式是可以修改的
import nProgress from 'nprogress';
// 引入store
// 引入进度条样式
import "nprogress/nprogress.css"
import store from '@/store';
// 1.利用axios对象的方法create,去创建一个axios实例
// 2.request就是axios，只是稍微配置一下
const requests=axios.create({
    // 配置对象
    // 基础路径：发送请求的时候，路径当中会出现api,
    baseURL:'/api',
    
    // 代表请求超时的世间为5秒
    timeout:5000,
})

// 请求拦截器：在发送请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config)=>{
    // config:配置对象，对象里面有一个属性很重要，headers请求头
    // 在请求的时候把请求的游客身份id传过去，因为在加入购物车时，她的接口的参数已经定好的两个，不能多
    // 所以只能通过请求时传递参数
    if(store.state.detail.uuid_token){
        config.headers.userTempId=store.state.detail.uuid_token
    }

    // 判断是否需要携带token
    if(store.state.user.token){
        config.headers.token=store.state.user.token
    }
    // 请求时，进度条开始
nProgress.start();
    return config;
})

// 响应拦截器：
requests.interceptors.response.use((res)=>{
    // 成功的回调：服务器响应数据回来以后，响应拦截器可以检测到，可以做一些事情
   //响应成功时，进度条结束
nProgress.done();
    return res.data

},(err)=>{
    // 响应失败的回调
    return Promise.reject(new Error('faile'));
})

// 对外暴露
export default requests;