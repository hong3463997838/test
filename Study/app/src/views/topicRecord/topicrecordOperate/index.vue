<template>
<div class="content">
 
<div class="nav">
  
<ul>
 <li @click="onHistory()" :class="$route.path.includes('history')?'active':''">练习历史</li>
  <li @click="onCollect()" :class="$route.path.includes('collect')?'active':''">我的收藏</li>
</ul>
</div>
<!-- 练习历史 -->
<div class="buttom" v-show="isShowHistory">
  <hr>
  <div class="topic" v-for="h in topichistoryList" :key="h.answerid" @click="onCategoryHistory($event, h.cid,h.cateid)">
<p>{{h.categoryname}}练习</p>
<p>{{h.time}}</p>
</div>
<hr>

</div>

<!-- 收藏 -->
<div class="buttom" v-show="isShowCollect">
  <hr>
  <div class="topic" v-for="h in topichistoryList" :key="h.answerid" @click="onCategoryCollect($event, h.cid,h.cateid)">
<p>{{h.categoryname}}练习</p>
<p style="color:#00a476">收藏{{h.collectedtotal}}道题</p>
<p>{{h.time}}</p>
</div>
<hr>

</div>
</div>
</template>

<script>
export default {
name:'topicrecordOperate',
created() {
    this.$emit("header", false);
    this.$emit("footer", false);
  },
  data(){
    return{
      topichistoryList:'',
      isShowHistory:true,
     
      isShowCollect:false

    }
  },
  methods:{
        // 点击课程  根据时间和token获取对应课程的题目
  async  onCategoryHistory(e,cid,cateid){
      // console.log(e.currentTarget.innerText.split('练习\n\n')[1]);
      // 根据时间和token获取对应课程的题目
    await  this.getTopicByTokenTimeData(e.currentTarget.innerText.split('练习\n\n')[1],cid,cateid)
// console.log(e.currentTarget.innerText.split('练习\n\n')[0]);
// 路由跳转
this.$router.push({name:'recordOperateHistory'},()=>{},()=>{})
    },
     async   onCategoryCollect(e,cid,cateid){
      // console.log(e.currentTarget.innerText.split('练习\n\n')[1]);
      // 根据时间和token获取对应课程的题目
  await    this.getTopicByTokenTimeData(e.currentTarget.innerText.split('\n\n')[2],cid,cateid)
// console.log(e.currentTarget.innerText.split('练习\n\n')[0]);
// 路由跳转
this.$router.push({name:'recordOperateCollect'},()=>{},()=>{})
    },
    // 根据时间和token获取对应填空题课程的题目
async getTopicByTokenTimeData(time,cid,cateid){
    let result=await this.$store.dispatch('getTopicOperateByTokenTime',{time:time,token:localStorage.getItem('TOKEN'),cid:cid,cateid:cateid})
    console.log(result);
    if(result=='ok'){
      localStorage.setItem('topicList',JSON.stringify(this.$store.state.topic.topicList))
      // 解析的题目，要通过localStorage传递
      // console.log(this.$store.state.topic.topicList);
    }
},
    // 点击练习历史
    onHistory(){
this.isShowHistory=true,
this.isShowError=false,
this.isShowCollect=false
this.$router.push({name:'operateHistory'},()=>{},()=>{})
    },

        // 点击我的收藏
    onCollect(){
this.isShowHistory=false,
this.isShowError=false,
this.isShowCollect=true
this.$router.push({name:'operateCollect'},()=>{},()=>{})

    },
//题目页面，获取填空题目
async getTopicHistoryData(){
    let result=await this.$store.dispatch('getTopicFinishOperate',localStorage.getItem('TOKEN'))
    if(result=='ok'){
      this.topichistoryList=this.$store.state.topic.topichistoryList
    }
},
  },
    mounted(){
//题目页面，获取填空题目
    this.getTopicHistoryData()
  }

}
</script>

<style scoped>
.active{
  background-color: #00a476;
  color: #fff !important;
}
.content{
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
}
.buttom{
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
}
</style>