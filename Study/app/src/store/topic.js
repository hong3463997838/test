import {resGetSelectQuestion,resInsertMyAnswer,resGetTopicFinishOperate,resGetTopicOperateByTokenTime,
    resGetTopicFinishFill,resGetTopicFillByTokenTime,resInsertOperateMyAnswer,resInsertOperateCollectNumber,
    resInsertFillCollectNumber,resInsertFillMyAnswer,resInsertCollectNumber,resGetFillQuestion,resGetOperateQuestion,
    resGetTopicHistory,resGetTopicByTokenTime,resInsertErrorNumber} from '@/api'
// home模块的小仓库
const state={
    // state 中数据默认初始值别瞎写，服务器返回对象，服务器返回数组【根据返回值进行初始化】
    // 选择题
    questionList:[],
    // 填空题
    fillquestionList:[],
    operatequestionList:[],
    topichistoryList:[],
    topicList:[],
};
const mutations={
    GETSELECTQUESTION(state,questionList){
        state.questionList=questionList
    },
    GETFILLQUESTION(state,fillquestionList){
        state.fillquestionList=fillquestionList
    },
    GETOPERATEQUESTION(state,operatequestionList){
        state.operatequestionList=operatequestionList
    },
    GETTOPICHISTORY(state,topichistoryList){
        state.topichistoryList=topichistoryList
    },
    GETTOPICBYTOKENTIME(state,topicList){
        state.topicList=topicList
    },
};
const actions={
//题目页面，获取选择题目及对应的课程信息
    async getTopicSelectQuestion({commit},data){
        let result= await resGetSelectQuestion(JSON.stringify (data));
           console.log(result);
           if(result.code==200){
            commit('GETSELECTQUESTION',result.data) 
           return 'ok'
              }
       },

 // 点击选项，并将我选择的答案存入数据库中，方便后面查看解析
 async  insertMyAnswer({commit},data){
    let result= await resInsertMyAnswer(data);
   },
   
  // 点击选项，并将我填空题相关数据存入数据库中，方便后面查看解析
  async  insertFillMyAnswer({commit},data){
    let result= await resInsertFillMyAnswer(data);
   },
   
   // 点击选项，并将我计算题相关数据存入数据库中，方便后面查看解析
   async  insertOperateMyAnswer({commit},data){
    let result= await resInsertOperateMyAnswer(data);
   },


   // 在交卷的时候，将 统计好的错题数据存入已完成的那条数据中
   async  insertErrorNumber({commit},data){
    let result= await resInsertErrorNumber(data);
    //    console.log(result);
    //    if(result.code==200){
    //     commit('GETTOPICQUESTION',result.data) 
    //    return 'ok'
    //       }
   },

 // 在交卷的时候，将 统计好的收藏数据存入已完成的那条数据中
      async  insertCollectNumber({commit},data){
        let result= await resInsertCollectNumber(data);
        //    console.log(result);
        //    if(result.code==200){
        //     commit('GETTOPICQUESTION',result.data) 
        //    return 'ok'
        //       }
       },
// 在交卷的时候，将 统计好的填空题收藏数据存入已完成的那条数据中
async  insertFillCollectNumber({commit},data){
    let result= await resInsertFillCollectNumber(data);

   },
   // 在交卷的时候，将 统计好的计算题收藏数据存入已完成的那条数据中

   async  insertOperateCollectNumber({commit},data){
    let result= await resInsertOperateCollectNumber(data);
   },
       
   //题目页面，获取填空题目及对应的课程信息
   async  getTopicFillQuestion({commit},data){
    let result= await resGetFillQuestion(JSON.stringify (data));
    //    console.log(result);
       if(result.code==200){
        commit('GETFILLQUESTION',result.data) 
       return 'ok'
          }
   },

     //题目页面，获取计算题目及对应的课程信息
     async  getTopicOperateQuestion({commit},data){
        let result= await resGetOperateQuestion(JSON.stringify (data));
        //    console.log(result);
           if(result.code==200){
            commit('GETOPERATEQUESTION',result.data) 
           return 'ok'
              }
       }, 
       //获取已完成的选择题题课程信息页面
    async  getTopicHistory({commit},token){
        let result= await resGetTopicHistory(token);
        //    console.log(result);
           if(result.code==200){
            commit('GETTOPICHISTORY',result.data) 
           return 'ok'
              }
       },
//获取已完成的填空题题课程信息页面
       async  getTopicFinishFill({commit},token){
        let result= await resGetTopicFinishFill(token);
        //    console.log(result);
           if(result.code==200){
            commit('GETTOPICHISTORY',result.data) 
           return 'ok'
              }
       },
       
       
       //获取已完成的计算题课程信息页面
       async  getTopicFinishOperate({commit},token){
        let result= await resGetTopicFinishOperate(token);
        //    console.log(result);
           if(result.code==200){
            commit('GETTOPICHISTORY',result.data) 
           return 'ok'
              }
       },
// 根据时间和token获取对应选择题课程的题目
async  getTopicByTokenTime({commit},data){
    // let result= await  resGetTopicByTokenTime(JSON.stringify(data));
    let result= await  resGetTopicByTokenTime(data);

    //    console.log(result);
       if(result.code==200){
        commit('GETTOPICBYTOKENTIME',result.data) 
       return 'ok'
          }
   },

   // 根据时间和token获取对应填空题课程的题目
async  getTopicFillByTokenTime({commit},data){
    let result= await  resGetTopicFillByTokenTime(data);
       if(result.code==200){
        commit('GETTOPICBYTOKENTIME',result.data) 
       return 'ok'
          }
   },
  // 根据时间和token获取对应计算课程的题目
  async  getTopicOperateByTokenTime({commit},data){
    let result= await  resGetTopicOperateByTokenTime(data);
       if(result.code==200){
        commit('GETTOPICBYTOKENTIME',result.data) 
       return 'ok'
          }
   },
     //查询数据库中的收藏状态，根据时间、token、topicid查询收藏状态
// async  getTopicCollect({commit},data){
    // console.log(data);
    // let result= await  resGetTopicCollect(data);
// console.log(result);
    //    if(result.code==200){
    //    return result.data[0]

        //   }
//    },

    };
    

const getters={};
export default{
    state,
    mutations,
    actions,
    getters
}