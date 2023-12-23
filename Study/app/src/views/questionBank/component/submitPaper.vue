<template>
  <div class="contain">
 <div class="top">
<p>
  <span><</span>
  <span @click="toBack()">返回</span>
</p>
<p>
  {{questionList[0].categoryname}}练习
</p>
<!-- <p>
  <button @click="toSubmitPaper()">交卷</button>
</p> -->
</div> 
<div class="content">
<p>{{score}}<span>分</span></p>
<button @click="toAnalyze()">查看解析</button>
</div>
  </div>
</template>

<script>
export default {
name:'submitPaper',
 created() {
    this.$emit("header", false);
    this.$emit("footer", false);
  },
  data(){
    return{
  questionList:'',
  score:localStorage.getItem('SCORE')
    }
  },
  methods:{
    // 查看解析
    toAnalyze(){
            this.$router.push({name:'AnalyzeSelect',params:{cid:this.$route.params.cid,cateid:this.$route.params.cateid}},()=>{},()=>{})
    //      if(this.$route.path.includes('select')){
    //         this.$router.push({name:'AnalyzeSelect',params:{cid:this.$route.params.cid,cateid:this.$route.params.cateid}},()=>{},()=>{})
    // }else if(this.$route.path.includes('fill')){
    //         this.$router.push({name:'AnalyzeFill'},()=>{},()=>{})
    // }else if(this.$route.path.includes('operate')){
    //         this.$router.push({name:'AnalyzeOperate'},()=>{},()=>{})      
    // }
    },
    // 返回
toBack(){
this.$router.push({name:'questionBank'},()=>{},()=>{})
},
    //题目页面，获取题目及对应的课程信息
//  getTopicQuestion
async getSelectQuestion(){
  let result=await this.$store.dispatch('getTopicSelectQuestion',{cid:this.$route.params.cid,cateid:this.$route.params.cateid})
//   console.log(result);
  if(result=='ok'){
    this.questionList=this.$store.state.topic.questionList
  }
},

  },
  mounted(){
    // this.score=this.$route.params.score
    //题目页面，获取题目及对应的课程信息
this.getSelectQuestion()
  }
}
</script>

<style scoped>
.contain{
     width: 1480px;
    height: 700px;
    /* background-color: rosybrown; */
    /* margin-left: 180px; */
}
.top{
     width: 1480px;
  height: 50px;
  line-height: 17px;
background-color: #00a476;
display: flex;

}
.top p{
  /* margin-left: 295px; */
  color: white;
  flex: 1;
} 
.content{
    text-align: center;
    width: 1100px;
    height: 650px;
    /* background-color: red; */
    margin-left: 180px;
}
.content p{
    margin-top: 0px;
    font-size:76px;
    padding-top: 200px;
}
.content p span{
    font-size: 40px !important;
}
.content button{
/* width: 80px;
height: 20px; */
/* padding-top: 15px; */
font-size: 25px;
/* padding-left: 40px; */
border: 1px solid #00a476;
border-radius: 10px;
background-color: white;
color: #00a476;
}
</style>