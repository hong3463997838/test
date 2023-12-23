<template>
  <div>
    <div class="top">
        <span>个人中心</span>>
        <span>帮助中心</span>>
        <span class="title">留言反馈</span>
    </div>
    <div class="content">
        
  <textarea name="" id="" cols="50" rows="12" placeholder="请输入你的留言" v-model="message"></textarea>


    </div>
    <button  @click="leaveMessage">提交</button>


  </div>
</template>

<script>
export default {
name:'leaveMessage',
data(){
    return{
        message:'',
        uid:'',
    }
},
 
methods:{
      // 根据token获取数据，因为在请求拦截器中已经在请求头中设置token，所以不用传递tokenn参数
    async getUser() {
      let result = await this.$store.dispatch("getUserMessage");
      console.log(result);
      if (result == "ok") {
    this.uid=this.$store.state.user.userList.uid
      }
    },
 async  leaveMessage(){
    let umessage=this.message
    let uid=this.uid
    if(umessage){
  let result=await  this.$store.dispatch('onUserLeaveMessage',{uid,umessage})
if(result=='ok'){
    alert('留言成功')
    this.message=''
    this.$router.push('/help')
  }
    }else{
      alert('你还未有任何留言')
    }
  
   }
},
 mounted() {
    if (this.$store.state.user.token) {
      this.getUser();
    }
  }
}
</script>

<style  scoped>
.top{
    color: #666691;
    width: 700px;
    height: 30px;
    margin-top: 10px;
    margin-left: 10px;
    background-color: #f9fafc;
}
.top .title{
    font-weight:bold;
    color:#00a476;
}
.content{
    margin-top: 20px;
    margin-left: 10px;
    line-height: 30px;
}

textarea{
    border: black 1px solid;
    border-radius: 15px;
}
button{
    width: 200px;
    height: 38px;
    background-color: #00a476;
    color: white;
    border: 1px #00a476 solid;
    border-radius: 10px;
    margin-top: 30px;
    margin-left: 100px;
    font-size: 20px;
}
</style>>

