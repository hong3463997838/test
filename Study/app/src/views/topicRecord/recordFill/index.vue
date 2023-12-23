<template>
  <div class="contain">
 <div class="top">
<p>
  <span><</span>
  <span @click="toBack()">返回</span>
</p>
<p>
 练习解析

</p>

</div> 

<div class="content">
  
    <!-- 历史练习-->
  <div v-show="isShowHistory" >
     <div v-for="(q,index) in questionList" :key="q.topicid">
<p>{{index+1}}.{{q.content}}</p>
<p class="daan"><span>正确答案 ：<span class="active">{{q.correct}}</span></span></p>
<p style="color:#00a476">解析：
  <br>
  {{q.analyze}}
</p>
</div>
  </div>

  <!-- 收藏 -->
  <div v-show="isShowCollect">
    <div v-for="(q,index) in questionList" :key="q.topicid" v-show="q.iscollected==1">
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
name:'recordFill',
created() {
    this.$emit("header", false);
    this.$emit("footer", false);
  },
  data(){
    return{
      questionList:'',
      isShowCollect:false,
      isShowHistory:false
      
    }
  },
  methods:{
    // 返回
    toBack(){
this.$router.push({name:'topicrecordFill'},()=>{},()=>{})
    },
 
  },
   mounted(){
    if(this.$route.path.includes('history')){
      this.isShowHistory=true,
      this.isShowCollect=false,
      this.isShowError=false
    }else if(this.$route.path.includes('collect')){
      this.isShowHistory=false,
      this.isShowCollect=true,
      this.isShowError=false
    }
    this.questionList=JSON.parse(localStorage.getItem('topicList'))
   
  }

}
</script>

<style scoped>
.contain{
    width: 1150px;
    height: 100%;
    margin-left: 180px;
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
.nav ul{
  display: flex;
}
.nav ul li{
  list-style: none;
  margin-left:40px;
}
.nav ul li:nth-child(1){
  color: #999999;
  font-weight: 600;
  margin-left: -35px;
  margin-right: -20px;
}
.active{
    color: #00a476;
}
.noactive{
    color: red;
}
.content{
    width: 1150px;
    height: 100%;
/* background-color: rebeccapurple; */
  margin:0 auto;
}
</style>