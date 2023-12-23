import {resGetCourseCategory,resGetResourceByOneId, resGetResourceByTwoId,resGetAllResource,resGetRecourcePdf} from "@/api";
// home模块的小仓库
const state = {
  coursecategoryList:[],
  resourceList :[],
  cateresourceList:[],
  allresourceList:[],
  resourcepdfList:[],
};
const mutations = {
  GETCATEGORYCOURSE(state, coursecategoryList) {
    state.coursecategoryList = coursecategoryList;
  },
  GETRESOURCEBYONEID(state,resourceList) {
    state.resourceList = resourceList;
  },
  GETRESOURCEBYTWOID(state,cateresourceList) {
    state.cateresourceList =cateresourceList;
  },
  GETALLRESOURCE(state,allresourceList) {
    state.allresourceList =allresourceList;
  },
  GETRESOURCEPDF(state,resourcepdfList) {
    state.resourcepdfList =resourcepdfList;
  },
};
const actions = {
    // 获取点击的课程的得到细分的课程名
    async getCategoryCourse({ commit }, id) {
      console.log(id);
      let result = await resGetCourseCategory(id);
      console.log(result);
      if (result.code == 200) {
        commit("GETCATEGORYCOURSE", result.data);
        return "ok";
      }
    },

// 根据课程一个id获取课程资源
    async getResourceByOneId({ commit }, data) {
      let result = await resGetResourceByOneId(data);
      console.log(result);
      if (result.code == 200) {
        commit("GETRESOURCEBYONEID", result.data);
        return "ok";
      }
    },

    // 根据课程一个id获取课程资源
    async getResourceByTwoId({ commit }, data) {
      let result = await resGetResourceByTwoId(data);
      console.log(result);
      if (result.code == 200) {
        commit("GETRESOURCEBYTWOID", result.data);
        return "ok";
      }
    },

    // 获取全部课程资源
    async getAllResource({ commit }) {
      let result = await resGetAllResource();
      console.log(result);
      if (result.code == 200) {
        commit("GETALLRESOURCE", result.data);
        return "ok";
      }
    },

    // 根据资源的id获取对应的pdf文件链接
async getResourcePdf({ commit }, id) {
  let result = await resGetRecourcePdf(id);
  console.log(result);
  if (result.code == 200) {
    commit("GETRESOURCEPDF", result.data[0]);
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
