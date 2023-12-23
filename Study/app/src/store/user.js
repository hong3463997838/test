import {
  resPostRegister,
  resPostLogin,
  resGetUser,
  resPostLogout,
  resPutUpdateUser,
  resPutUpdateUserImg,
  resPutUserToken,
  resPutUpdateUserPassword,
  resPostUserLeaveMessage,
  resGetCode

} from "@/api";
// user模块的小仓库
const state = {
  // 在没派发之前，localStorage.getItem('TOKEN'),，相当于空串，因为派发了后才会进行本地存储
  //    点击登录发时候，有空串变为字符串，并进行存储，再次刷新的时候，从localStorage.getItem('TOKEN'),获取字符串
  // token: localStorage.getItem('TOKEN'),
  token: localStorage.getItem("TOKEN"),
  //   用户数据
  userList: {},
};
const mutations = {
  ONLOGIN(state, token) {
    state.token = token;
  },
  GETUSERMESSAGE(state, userList) {
    state.userList = userList;
  },
};
const actions = {
  // 用户注册
  async onRegister({ commit }, data) {

    let result = await resPostRegister(data);
    console.log(result);

    if (result.code == 200) {
      return result.code;
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  // 用户登录
  async onLogin({ commit }, data) {
    let result = await resPostLogin(data);
    //  console.log(result);
    if (result.code == 200) {
      commit("ONLOGIN", result.data[0].token);
      // console.log(result.data[0].token);
      // 因为vuex不能持久化保存token
      // 所以存到持久化存储--本地存储中
      localStorage.setItem("TOKEN", result.data[0].token);
      return result.code;
    } else {
      return Promise.reject(new Error("faile"));
    }
  },

  // 把生成的token 插入数据库
  async onInsertUserToken({ commit }, data) {
    let result = await resPutUserToken(data);
    console.log(result);
    console.log(commit);
    if (result.code == 200) {
      // commit('ONLOGIN', result.data[0].token)
      // console.log(result.data[0].token);
      // 因为vuex不能持久化保存token
      // 所以存到持久化存储--本地存储中
      // localStorage.setItem('TOKEN',result.data[0].token)
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  //  获取用户信息，根据token
  async getUserMessage({ commit }) {
    let result = await resGetUser();
    if (result.code == 200) {
      commit("GETUSERMESSAGE", result.data[0]);
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },

  // 个人信息中，点击保存，修改数据
  async updateUser({ commit }, data) {
    let result = await resPutUpdateUser(data);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },

  // 修改用户头像
  async updateUserImg({ commit }, data) {
    let result = await resPutUpdateUserImg(data);
    // console.log(result + "update");
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },

// 修改密码
async updateUserPassword({ commit }, data) {
    let result = await resPutUpdateUserPassword(data);
    // console.log(result + "update");
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
// 用户留言
async onUserLeaveMessage({ commit }, data) {

    let result = await resPostUserLeaveMessage (data);
    // console.log(result);

    if (result.code == 200) {
      return 'ok';
    } else {
      return Promise.reject(new Error("faile"));
    }
  },

  // 获取生成的图片验证
   async getImgCode({ commit }) {
    let result = await resGetCode();
    // console.log(result);
 return result
  },
  // 退出登录
//   async userLogout({ commit }) {
//     let result = await resPostLogout();
//     console.log(result);

//     if (result.code == 200) {
//       return result.code;
//     } else {
//       return Promise.reject(new Error("faile"));
//     }
//   },
};
const getters = {};
export default {
  state,
  mutations,
  actions,
  getters,
};
