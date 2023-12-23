import {resGetBannerList,resGetHomeCourse,resGetHomeTeacher,resGetHomeCourseCategory} from '@/api'
// home模块的小仓库
const state={
    // state 中数据默认初始值别瞎写，服务器返回对象，服务器返回数组【根据返回值进行初始化】
    bannerList:[],
    courseList:[],
    teacherList:[],

    categoryList1:[],
    categoryList2:[],
    categoryList3:[],
    categoryList4:[],
    categoryList5:[],
    categoryList6:[],
    categoryList7:[],
    categoryList8:[],

};
const mutations={

    GETBANNERLIST(state,bannerList){
        state.bannerList=bannerList
    },
    GETHOMECOURSE(state,courseList){
        state.courseList=courseList
    },
    GETHOMETEACHER(state,teacherList){
        state.teacherList=teacherList
    },
    GETHOMECOURSECATEGORY1(state,categoryList1){
        state.categoryList1=categoryList1
    },
    GETHOMECOURSECATEGORY2(state,categoryList2){
        state.categoryList2=categoryList2
    },
    GETHOMECOURSECATEGORY3(state,categoryList3){
        state.categoryList3=categoryList3
    },
    GETHOMECOURSECATEGORY4(state,categoryList4){
        state.categoryList4=categoryList4
    },
    GETHOMECOURSECATEGORY5(state,categoryList5){
        state.categoryList5=categoryList5
    },
    GETHOMECOURSECATEGORY6(state,categoryList6){
        state.categoryList6=categoryList6
    },
    GETHOMECOURSECATEGORY7(state,categoryList7){
        state.categoryList7=categoryList7
    },
    GETHOMECOURSECATEGORY8(state,categoryList8){
        state.categoryList8=categoryList8
    },
};
const actions={
    //通过api里面的接口函数调用，向服务器发送请求，获取服务器的数据
    // 获取轮播图数据
  async  getBannerList({commit}){
    // console.log(111);
     let result= await  resGetBannerList();
    //  console.log(222);
        console.log(result);
        if(result.code==200){
            commit('GETBANNERLIST',result.data)
           }
    },

// 获取首页推荐的课程数据
    async  getHomeCourse({commit}){
         let result= await  resGetHomeCourse();
            console.log(result);
            if(result.code==200){
                commit('GETHOMECOURSE',result.data)
            return 'ok'
               }
        },
  // 获取首页名师教学的老师
  async  getHomeTeacher({commit}){
    let result= await  resGetHomeTeacher();
       console.log(result);
       if(result.code==200){
           commit('GETHOMETEACHER',result.data)
       return 'ok'
          }
   },

     // 获取首页课程分类的数据
  async  getHomeCourseCategory1({commit},cid){
    let result= await  resGetHomeCourseCategory(cid);
       console.log(result);
       if(result.code==200){
        commit('GETHOMECOURSECATEGORY1',result.data) 
       return 'ok'
          }
   },
   async  getHomeCourseCategory2({commit},cid){
    let result= await  resGetHomeCourseCategory(cid);
       console.log(result);
       if(result.code==200){
        commit('GETHOMECOURSECATEGORY2',result.data) 
       return 'ok'
          }
   },  async  getHomeCourseCategory3({commit},cid){
    let result= await  resGetHomeCourseCategory(cid);
       console.log(result);
       if(result.code==200){
        commit('GETHOMECOURSECATEGORY3',result.data) 
       return 'ok'
          }
   },  async  getHomeCourseCategory4({commit},cid){
    let result= await  resGetHomeCourseCategory(cid);
       console.log(result);
       if(result.code==200){
        commit('GETHOMECOURSECATEGORY4',result.data) 
       return 'ok'
          }
   },  async  getHomeCourseCategory5({commit},cid){
    let result= await  resGetHomeCourseCategory(cid);
       console.log(result);
       if(result.code==200){
        commit('GETHOMECOURSECATEGORY5',result.data) 
       return 'ok'
          }
   },  async  getHomeCourseCategory6({commit},cid){
    let result= await  resGetHomeCourseCategory(cid);
       console.log(result);
       if(result.code==200){
        commit('GETHOMECOURSECATEGORY6',result.data) 
       return 'ok'
          }
   },  async  getHomeCourseCategory7({commit},cid){
    let result= await  resGetHomeCourseCategory(cid);
       console.log(result);
       if(result.code==200){
        commit('GETHOMECOURSECATEGORY7',result.data) 
       return 'ok'
          }
   },  async  getHomeCourseCategory8({commit},cid){
    let result= await  resGetHomeCourseCategory(cid);
       console.log(result);
       if(result.code==200){
        commit('GETHOMECOURSECATEGORY8',result.data) 
       return 'ok'
          }
   },
    };

    

const getters={};
export default{
    state,
    mutations,
    actions,
    getters
}