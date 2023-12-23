<template>
   <div>
    <!-- 已登录 -->
    <!-- 这个前端的名字name="test"要与后端的一致 upload.single('test') -->
    <div v-show="$store.state.user.token">
       
     <div class="content">
        <label>手机号:</label>
        <span class="text">{{userDataList.uid}}</span>
      </div>
      <div class="content">
        <label>原密码:</label>
        <input type="text" class="input" placeholder="请输入原密码" v-model="prepassword"/>
      </div>
    <div class="content">
        <label>新密码:</label>
        <input type="text" class="input" placeholder="请输入新密码" v-model="newpassword"/>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input type="text" class="input" placeholder="请再次输入密码" v-model="repassword"/>
      </div>
      <div class="btn">
        <button class="submit" @click="submit">提交</button>
         <button class="reset" @click="reset">重置</button>
      </div>
    
    </div>
    <!-- 未登录 -->
    <div v-show="!$store.state.user.token">
      <div class="noLogin">
       <p>你还没有登录 <router-link to="/login" class="roulink"><span>去登录</span></router-link></p>
      </div>
     
    </div>
  </div>
</template>

<script >
export default {
name:'modifyPassword',
data(){
    return{
        userDataList:{},
        prepassword:'',
        newpassword:'',
        repassword:'',
    }
},
methods:{
   // 根据token获取数据，因为在请求拦截器中已经在请求头中设置token，所以不用传递tokenn参数
    async getUser() {
      let result = await this.$store.dispatch("getUserMessage");
    //   console.log(result);
      if (result == "ok") {
        this.userDataList=this.$store.state.user.userList
      }
    },
    // 重置
    reset(){
        this.prepassword='',
        this.newpassword='',
        this.repassword=''
    },

    // 点击提交按钮，修改密码
async submit(){
    // 表单校验
    // 原来密码要与数据库中的密码相同，新密码与确认密码相同
if(this.prepassword!=this.userDataList.upassword ){
 alert('原密码不正确')
}else if (this.newpassword!=this.repassword){
    alert('新密码与确认密码不相等')
}else{
    // 调用修改密码的接口
    let upassword=this.newpassword
    let uid=this.userDataList.uid
  let result=await  this.$store.dispatch('updateUserPassword',{upassword,uid})
//   console.log(result);
    if(result=='ok'){
        this.$router.push('/my')
        alert('修改密码成功')
    }else{
        alert('修改密码失败')
    }
}
}
},
 mounted() {
    if (this.$store.state.user.token) {
      this.getUser();
    }
  },
 
}
</script>

<style scoped>
.content {
  display: flex;
  padding-left: 90px;
  margin-bottom: 35px;
}

.content:nth-child(1) {
  padding-top: 40px;
}

.content label {
  font-size: 16px;
  width: 96px;
  text-align: right;
  display: inline-block;
}

.content .input {
  width: 270px;
  height: 38px;
  padding-left: 8px;
  box-sizing: border-box;
  margin-left: 10px;
  outline: none;
  border: 1px solid #999;
  border-radius: 8px;
  font-size: 16px;
}
.content .text {
  padding-left: 8px;
}

.content textarea {
  font-size: 16px;

  padding-left: 8px;
  box-sizing: border-box;
  margin-left: 10px;
  outline: none;
  border: 1px solid #999;
  border-radius: 8px;
}
.btn {
  margin-left: 200px;
  line-height: 36px;
}
.btn button {
  width: 100px;
  height: 40px;
  border-radius: 10px;
  font-size: 16px;
  margin-top: 20px;
}
.btn .submit{
  background: #00a476;
  border: 1px solid #00a476;
margin-right: 25px;
color: white;
}
.btn .reset{
  background: #d9dde1;
  border: 1px solid #d9dde1;
color: black;
}
/* 未登录样式 */
.noLogin{
  font-style: italic;
  font-size: 24px;
  font-weight: 200;
  margin-top: 150px;
margin-left: 400px;
color: #e1e2e5;
text-decoration: none;
}
.noLogin .roulink{
  text-decoration: none;

}
.noLogin span{
  color: #00a476;
}
</style>