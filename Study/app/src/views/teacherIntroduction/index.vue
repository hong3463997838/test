<template>
<div>
    <div class="title">
         <p>教师介绍</p>
    </div>
   
     <div class="contain">
   <!-- <h3>教师介绍</h3> -->
    <div>
        <img :src="teacherMessage.timg">
    </div>
    <div class="content">
        <p>{{teacherMessage.tname}}</p>
        <hr>
        <div class="introduction">
           {{teacherMessage.introduction}}
        </div>
    </div>
  </div>
</div>
 
</template>

<script>
export default {
name:'teacherIntroduction',
data(){
    return{
        teacherMessage:''
    }
},
methods:{
// 根据id获取教师信息

async getMessageList(){
    let tid=this.$route.params.tid
 let result=await  this.$store.dispatch('getTeacherMessage',tid)
 console.log(result);
    if(result=='ok'){
        this.teacherMessage=this.$store.state.teacher.teachermessageList
    }
}
},
mounted(){
        // this.getMessageList()
    console.log(this.$route.params.tid);
     if(this.$route.params.tid){
        this.getMessageList()
     }
}
}
</script>

<style scoped>
.title{
    font-weight:600;
    color: #00a476;
    font-size: 22px;
    margin-top: 30px;
    margin-left: 180px;
}
.contain{
    width: 1150px;
    height: 300px;
    margin-left: 180px;
    display: flex;
    /* margin-top: 50px; */
    /* background-color: royalblue; */
}
   .contain img{
      width: 250px;
      height: 280px;
    }
.content{
    margin-left: 70px;
}
.introduction{
    margin-top: 20px;
    border-radius: 10px;
    color:#888888 ;
    line-height: 26px;
   border: 1px solid #f6f6f6;
   background-color: #f6f6f6;
}
</style>