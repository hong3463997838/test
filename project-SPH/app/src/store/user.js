import { resGetCode, resUserRegister, resUserLogin, resUserMessage ,resLogout} from '@/api'
// search模块的小仓库
const state = {
    // 初始化对象要根据请求结果的形式
    code: '',
    // 在没派发之前，localStorage.getItem('TOKEN'),，相当于空串，因为派发了后才会进行本地存储
//    点击登录发时候，有空串变为字符串，并进行存储，再次刷新的时候，从localStorage.getItem('TOKEN'),获取字符串
    token: localStorage.getItem('TOKEN'),
    userInfo: {}
};
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state, token) {
        state.token = token
    },
    GETUSERMESSAGE(state, userInfo) {
        state.userInfo = userInfo
    },
    // 清除本地数据
    CLEAR(state){
        //仓库中相关用户信息，和本地存储 
        state.token='',
        state.userInfo={},
        localStorage.removeItem('TOKEN')
    }

};

const actions = {
    //    获取验证码,是通过接口发送验证码，不是通过后台发送到手机
    async getCode({ commit }, phone) {
        let result = await resGetCode(phone);
        //    console.log(result);
        if (result.code == 200) {
            commit('GETCODE', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 注册
    async userRegister({ commit }, data = {}) {
        let result = await resUserRegister(data);
        console.log(result);
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 登录
    async userLogin({ commit }, data = {}) {
        let result = await resUserLogin(data);
        console.log(result);
        if (result.code == 200) {
            commit('USERLOGIN', result.data.token)
            // 因为vuex不能持久化保存token
            // 所以存到持久化存储--本地存储中
            localStorage.setItem('TOKEN',result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //  获取用户信息，根据token
    async getUserMessage({ commit }) {
        let result = await resUserMessage();
        // console.log(result);

        if (result.code == 200) {
            commit('GETUSERMESSAGE', result.data)
            return 'ok'
        } else{
            return Promise.reject(new Error('faile'))

        }

    },
    // 退出登录
  async  userLogout({commit}){
    // 这个接口函数只是通知服务器清除token，因为token是服务器下发的，
    // 除此之外，还应该清除本地缓存的token
         let result=await resLogout();
         console.log(result);
         if(result.code==200){
            commit('CLEAR');
            return 'ok'
         }else{
            // return Promise.reject(new Error('faile'))

         }
    }
};
// 相当于计算属性，根据state中的是来改变
const getters = {

};
export default {
    state,
    mutations,
    actions,
    getters
}