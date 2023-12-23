import { resGetCourse, resGetTeacher, resGetAllTeacher,resGetTeacherMessage } from "@/api";
// home模块的小仓库
const state = {
  // state 中数据默认初始值别瞎写，服务器返回对象，服务器返回数组【根据返回值进行初始化】
  courseList: [],
  teacherList: [],
  teachermessageList:{}
};
const mutations = {
  GETCOURSE(state, courseList) {
    state.courseList = courseList;
  },
  GETTEACHER(state, teacherList) {
    state.teacherList = teacherList;
  },
  GETTEACHERMESSAGE(state, teachermessageList) {
    state.teachermessageList = teachermessageList;
  },
};
const actions = {
  //通过api里面的接口函数调用，向服务器发送请求，获取服务器的数据
  // 获取课程数据
  async getCourse({ commit }) {
    // console.log(111);
    let result = await resGetCourse();
    //  console.log(222);
    console.log(result);
    if (result.code == 200) {
      commit("GETCOURSE", result.data);
      return "ok";
    }
  },
  // 获取点击的对应课程的老师
  async getTeacher({ commit }, data) {

    let result = await resGetTeacher(data);
   
    console.log(result);
    if (result.code == 200) {
      commit("GETTEACHER", result.data);
      return "ok";
    }
  },

  // 获取全部老师
  async getAllTeacher({ commit }) {
    // console.log(111);
    let result = await resGetAllTeacher();
    //  console.log(222);
    console.log(result);
    if (result.code == 200) {
      commit("GETTEACHER", result.data);
      return "ok";
    }
  },
//   resGetTeacherMessage
  // 获取点击的对应课程的老师
  async getTeacherMessage({ commit }, id) {
   console.log(id);
    let result = await resGetTeacherMessage(id);
    //  console.log(222);
    console.log(result);
    if (result.code == 200) {
      commit("GETTEACHERMESSAGE", result.data[0]);
      return "ok";
    }
  },
};
const getters = {};
export default {
  state,
  mutations,
  actions,
  getters,
};
