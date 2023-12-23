<template>
  <div class="contain">
<div class="top">
<p>
  <span><</span>
  <span @click="toBack()">退出</span>
</p>
<p>
 练习历史
</p>

</div>
 <table border="1">
<th>快速导航</th>
<tr @click="onSelect()" :class="$route.path.includes('select')?'active':''">选择题</tr>
<tr @click="onFill()" :class="$route.path.includes('fill')?'active':''">填空题</tr>
<tr @click="onOperate()" :class="$route.path.includes('operate')?'active':''">计算题</tr>
  </table>
<router-view></router-view>
  </div>
</template>

<script>
export default {
name:'topicRecord',
 created() {
    this.$emit("header", false);
    this.$emit("footer", false);
  },
  data(){
    return{
      topichistoryList:'',

    }
  },
  methods:{
    // 点击选择题
onSelect(){
this.$router.push({name:'topicrecordSelect'},()=>{},()=>{})

},
    // 点击填空题
onFill(){
this.$router.push({name:'topicrecordFill'},()=>{},()=>{})

},
    // 点击计算题
onOperate(){
this.$router.push({name:'topicrecordOperate'},()=>{},()=>{})

},
   

    // 退出
toBack(){
this.$router.push({name:'questionBank'},()=>{},()=>{})
},
//题目页面，获取练习历史
async getTopicHistoryData(){
    let result=await this.$store.dispatch('getTopicHistory',localStorage.getItem('TOKEN'))
    if(result=='ok'){
      this.topichistoryList=this.$store.state.topic.topichistoryList
    }
},

  },
  mounted(){
//题目页面，获取练习历史
    this.getTopicHistoryData()
  }

}
</script>

<style scoped>
.active{
  background-color: #00a476;
  color: #fff !important;
}
table{
  float: left;
  width: 200px;
  height: 100px;
  margin-left: 10px;
  margin-top: 30px;
}
table tr{
  text-align: center;
  border: 1px solid white;
  height: 30px;
  line-height: 30px;
}
.contain{
  width: 1470px;
  height: 100%;
  background-color: #f5f7fa;
}
.top{
  width: 1470px;
  height: 50px;
  line-height: 17px;
background-color: #00a476;
display: flex;

}
.top p{
  /* margin-left: 195px; */
  color: white;
  flex: 1;
}
/* .content{
   width: 1000px;
    height: 100%;

  margin:0 auto;
  background-color: #f5f7fa;

}
.nav{
padding-top: 5px;
padding-bottom: 20px;
  margin-top: 15px;
   width: 1000px;
height: 50px;
background-color: white;
}
.nav ul{
  display: flex;
}
.nav ul li{
  width: 80px;
  height: 30px;
  padding-top: 5px;
  padding-left: 15px;
  border-radius: 10px;
  color: black;
  border: 1px solid #00a476;
  list-style: none;
  margin-right: 60px;
} */
.content-buttom{
  width: 1000px;
    height: 1000px;

  margin:0 auto;

}
/* .buttom{
  margin-top: -10px;
   width: 1000px;
height: 850px;
background-color: white ;
z-index: 999;
}
.topic{
   width: 1000px;
height: 50px;

display: flex;

}
.topic p{
  margin-left: 50px;
  flex: 1;
}
hr{
  z-index: 999;
  width: 950px;
  margin-left: 50px;
  background-color: #fff;
  border: 1px solid #f2f2f5 !important;
} */
</style>