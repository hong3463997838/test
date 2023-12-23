<template>
  <div class="contain">
 <div class="top">
<p>
  <span><</span>
  <span @click="toBack()">返回</span>
</p>
<p>
  {{questionList[0].categoryname}}练习解析
</p>

</div> 
<div class="content">  
    <!-- 选择题 -->
  <div v-show="isShowSelect" >
    <div v-for="(q,index) in questionList" :key="q.topicid">
<p :class="q.selected==q.correct?'active':'noactive'">{{index+1}}.{{q.content}}</p>
<p>A.{{q.optiona}}</p>
<p>B.{{q.optionb}}</p>
<p>C.{{q.optionc}}</p>
<p>D.{{q.optiond}}</p>
<p class="daan"><span>你的答案：<span :class="q.selected==q.correct?'active':'noactive'">{{q.selected}}</span></span><span>正确答案 ：<span class="active">{{q.correct}}</span></span></p>
<p>解析：<br>
<span style="color:#00a476">{{q.analyze}}</span>
</p>
    </div>
  </div>
  <!-- 填空题 -->
<div v-show="isShowFill">
 <div v-for="(q,index) in questionList" :key="q.topicid">
<p>{{index+1}}.{{q.content}}</p>
<p class="daan"><span>正确答案 ：<span class="active">{{q.correct}}</span></span></p>
<p style="color:#00a476">解析：
  <br>
  {{q.analyze}}
</p>
</div>
</div>
<!-- 操作题 -->
<div v-show="isShowOperate">
 <div v-for="(q,index) in questionList" :key="q.topicid">
<p>{{index+1}}.{{q.content}}</p>
<p class="daan"><span>正确答案 ：<span class="active">{{q.correct}}</span></span></p>
<p style="color:#00a476">解析：
  <br>
  {{q.analyze}}
</p>
</div>
</div>
</div>
  </div>
</template>

<script>
export default {
name:'Analyze',
created() {
    this.$emit("header", false);
    this.$emit("footer", false);
  },
  data(){
    return{
      questionList:'',
      orderIndex:0,
      isShowSelect:false,
      isShowFill:false,
      isShowOperate:false,
    }
  },
  methods:{
    // 返回
    toBack(){
this.$router.push({name:'questionBank'},()=>{},()=>{})
},
//题目页面，获取填空题目及对应的课程信息
async getFillQuestion(){
  let result=await this.$store.dispatch('getTopicFillQuestion',{cid:this.$route.params.cid,cateid:this.$route.params.cateid})
  if(result=='ok'){
    this.questionList=this.$store.state.topic.fillquestionList
  }
},
//题目页面，获取计算题目及对应的课程信息
async getOperateQuestion(){
  let result=await this.$store.dispatch('getTopicOperateQuestion',{cid:this.$route.params.cid,cateid:this.$route.params.cateid})
  if(result=='ok'){
    this.questionList=this.$store.state.topic.operatequestionList
  }
}
 
  },
  mounted(){
     if(this.$route.path.includes('select')){
      this.isShowSelect=true
      this.isShowFill=false
      this.isShowOperate=false
        // console.log(JSON.parse(localStorage.getItem('QUESTIONLIST')));
    this.questionList=JSON.parse(localStorage.getItem('QUESTIONLIST'))
    }else if(this.$route.path.includes('fill')){
       this.isShowSelect=false
      this.isShowFill=true
      this.isShowOperate=false
//题目页面，获取填空题目及对应的课程信息
  this.getFillQuestion()
    }else if(this.$route.path.includes('operate')){
       this.isShowSelect=false
      this.isShowFill=false
      this.isShowOperate=true
    this.getOperateQuestion()
    }
  
  }
}
</script>

<style scoped>
.contain{
    width: 1150px;
    height: 100%;
    margin-left: 180px;
    /* background-color: rosybrown; */
}
.top{
    width: 1150px;
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
.daan span{
margin-right: 30px;
}
.active{
    color: #00a476;
}
.noactive{
    color: red;
}
</style>