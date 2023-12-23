import {resGetStudyByOneId,resGetStudyByOneTwo,resGetAllStudy} from "@/api";
  // user模块的小仓库
  const state = {
    studycourseList:[],

  };
  const mutations = {
    GETSTUDYBYONEID(state,studycourseList) {
        state.studycourseList = studycourseList;
      },
  };
  const actions = {
       // 获取全部课程学习
       async getAllStudy({ commit }) {
        let result = await resGetAllStudy();
        console.log(result);
        if (result.code == 200) {
          commit("GETSTUDYBYONEID", result.data);
          return "ok";
        }
      },
// 根据课程一个id获取课程学习
async getStudyByOneId({ commit }, data) {
    let result = await resGetStudyByOneId(data);
    console.log(result);
    if (result.code == 200) {
      commit("GETSTUDYBYONEID", result.data);
      return "ok";
    }
  },

  // 根据课程一个id获取课程学习
  async getStudyByTwoId({ commit }, data) {
    let result = await resGetStudyByOneTwo(data);
    console.log(result);
    if (result.code == 200) {
      commit("GETSTUDYBYONEID", result.data);
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
  