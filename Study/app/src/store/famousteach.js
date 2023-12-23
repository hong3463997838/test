import {resGetFamousTeacher,resGetCategoryCourseByOne,resGetCategoryCourseByTwo,resGetAllCategoryCourse} from "@/api";
// home模块的小仓库
const state = {
    teacherList:[],
    categorycourseList:[],
};
const mutations = {
    GETFAMOUSTEACHER(state, teacherList) {
        state.teacherList = teacherList;
      },
      GETCATEGORYCOURSEBYONE(state,  categorycourseList) {
        state. categorycourseList =  categorycourseList;
      },
    
};
const actions = {
    // 获取总课程id获取对应的老师
    async getFamousTeacher({ commit },cid) {
        let result = await resGetFamousTeacher(cid);
        console.log(result);
        if (result.code == 200) {
          commit("GETFAMOUSTEACHER", result.data);
          return "ok";
        }
      },
    //   获取全部课程信息
    async getAllCategoryCourse({ commit }) {
        let result = await resGetAllCategoryCourse();
        console.log(result);
        if (result.code == 200) {
          commit("GETCATEGORYCOURSEBYONE", result.data);
          return "ok";
        }
      },
// 根据课程名称获取对应的课程分类信息,一个id
    async getCourseCategoryByone({ commit },data) {
      let result = await resGetCategoryCourseByOne(data);
        console.log(result);
        if (result.code == 200) {
          commit("GETCATEGORYCOURSEBYONE", result.data);
          return "ok";
        }
      },
 // 点击课程和老师后获取课程详细信息,根据一个课程id和一个教师id
 async getCourseCategoryByTwo({ commit },data) {
    let result = await resGetCategoryCourseByTwo(data);
      console.log(result);
      if (result.code == 200) {
        commit("GETCATEGORYCOURSEBYONE", result.data);
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
