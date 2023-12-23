<template>
  <div class="contain">
 <div class="top">
<p>
  <span><</span>
  <span @click="toBack()">返回</span>
</p>
<p>
  <!-- {{questionList[0].categoryname}}练习解析
   -->
 练习解析

</p>

</div> 
<!-- <div class="nav">
   <ul>
        <li>分类：</li>
        <li @click="toSelect()"><a>选择题</a></li>
				<li @click="toFill()"><a>填空题</a></li>
				<li @click="toOperate()"><a>计算题</a></li>
      </ul>

</div> -->
<div class="content">
  
<router-view :questionList="questionList"></router-view>

</div>

  

  </div>
</template>

<script>
export default {
name:'detailRecord',
created() {
    this.$emit("header", false);
    this.$emit("footer", false);
  },
  data(){
    return{
      questionList:'',
     
    }
  },
  methods:{
    // 返回
    toBack(){
this.$router.push({name:'topicRecord'},()=>{},()=>{})
    },
// 点击选择题
toSelect(){
  this.$router.push({name:'recordSelect'},()=>{},()=>{})
},
// 点击填空题
toFill(){
  this.$router.push({name:'recordFill'},()=>{},()=>{})

},
// 计算题
toOperate(){
  this.$router.push({name:'recordOperate'},()=>{},()=>{})

}
},
  mounted(){
    this.questionList=JSON.parse(localStorage.getItem('topicList'))
   
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