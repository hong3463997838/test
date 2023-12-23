<template>

  <div class="contain">
 
    <button class="btnlable">手机号注册</button>
    <hr />
    <div class="content">
      <label>手机号:</label>
      <input type="text" placeholder="请输入你的手机号" v-model="phone" />
    </div>
    <div class="content">
      <label>用户名:</label>
      <input type="text" placeholder="请输入你的用户名" v-model="username" />
    </div>
    <div class="content">
      <label>登录密码:</label>
      <input type="text" placeholder="请输入登录密码" v-model="password" />
    </div>
    <div class="content">
      <label>确定密码:</label>
      <input
        type="text"
        placeholder="请再次输入登录密码"
        v-model="repassword"
      />
    </div>
    <div class="controls">
      <input type="checkbox" v-model="agree" />
      <span>同意协议并注册《学习网用户协议》</span>
    </div>
    <div class="btn">
      <button @click="onRegister">立即注册</button>
    </div>
    <div class="gologin">
      <span>已有账号，去登录</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      phone: "",
      password: "",
      repassword: "",
      username:'',
      agree: "",
 
    };
  },
  methods: {
    // 点击注册
    async onRegister() {
      // 后面会进行表单验证
      // console.log(this.agree==true);
      // && this.agree==true
      if (this.password == this.repassword && this.agree == true) {
        let uid = this.phone;
        let upassword = this.password;
        let uname=this.username
        // let agree=this.agree
        try {
          // this.$store.dispatch('toRegister',{uid,upassword,agree})
          let result = await this.$store.dispatch("onRegister", { uid, uname,upassword });
          console.log(result);
          if(result==200){
            alert('注册成功')
              //    跳转登录页面
          setTimeout(() => {
            this.$router.push({ name: "Login" });
          }, 1000);
          }
          this.phone = "";
          this.password = "";
          this.repassword = "";
          this.username = "";
          this.agree = "";
        
        } catch (error) {
          alert('注册失败')
          
          console.log(error);
        }
      }
    },

  },

};
</script>

<style scoped>
.contain {
  width: 1250px;
  height: 600px;
  margin-top: 60px;
  margin-left: 140px;
  background-color: #f0f0f0;
}
.btnlable {
  margin: 10px 10px;
  background-color: #00a476;
  border: 1px solid #00a476;
  height: 40px;
  font-size: 22px;
  color: white;
  border-radius: 8px;
}
hr {
  margin-top: 2px;
  margin-bottom: 30px;
  border: 2px solid #00a476;
}
.content {
  padding-left: 390px;
  margin-bottom: 20px;
  position: relative;
}

.content label {
  font-size: 14px;
  width: 96px;
  text-align: right;
  display: inline-block;
}
.content input {
  width: 270px;
  height: 38px;
  padding-left: 8px;
  box-sizing: border-box;
  margin-left: 5px;
  outline: none;
  border: 1px solid #999;
}

.controls {
  text-align: center;
  position: relative;
}
.controls input {
  vertical-align: middle;
}
.btn {
  text-align: center;
  line-height: 36px;
  /* margin: 17px 0 0 55px; */
}
.btn button {
  outline: none;
  width: 200px;
  height: 40px;
  background: #00a476;
  color: #fff !important;
  border-radius: 10px;
  font-size: 16px;
  margin-top: 30px;
  border: 1px solid #00a476;
}
.gologin {
  color: #00a476;
  margin-top: 10px;
  text-align: center;
}
</style>