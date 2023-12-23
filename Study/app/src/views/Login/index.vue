<template>
  <div class="contain">
    <button class="btnlable">手机号登录</button>
    <hr />
    <div class="content">
      <label>手机号:</label>
      <input type="text" placeholder="请输入你的手机号" v-model="phone" />
    </div>
    <div class="content">
      <label>登录密码:</label>
      <input type="text" placeholder="请输入登录密码" v-model="password" />
    </div>
      <div class="content">
      <label>验证码:</label>
      <input type="text" class="code" placeholder="请输入验证码" v-model="codetext" />
       <div class="span" v-html="code.data"></div>
    </div>
  

    <div class="controls">
      <input type="checkbox" v-model="agree" />
      <span>同意协议并登录《学习网用户协议》</span>
    </div>
    <div class="btn">
      <button @click="onLogin">立即登录</button>
    </div>
    <div class="gologin">
      <span>忘记密码</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      phone: "",
      password: "",
      agree: "",
      codetext:'',
       code:{}
    };
  },
  methods: {
    // 点击登录
    async onLogin() {
         if (this.phone== "" && this.password == "") {
          alert('账号或密码不为空')
        return false;
      }else if (this.agree == true) {
        if(this.codetext!=this.code.text){
           alert('验证码错误')
                 this.phone = "";
          this.password = "";
          this.agree = "";
          this.codetext=''
          // 状态保持清除后刷新页面
            location.reload()
        return false;
        }else{
        let uid = this.phone;
        let upassword = this.password;
        try {
          const result = await this.$store.dispatch("onLogin", { uid, upassword });
          if(result==200){
            // 登录成功把生成的token插入数据库中
           const result = await   this.$store.dispatch('onInsertUserToken',{uid})
         if(result=='ok'){
          const result = await this.$store.dispatch("onLogin", { uid, upassword });
          if(result==200){
              //    跳转首页页面
               alert('登录成功')
            this.$router.push('/home');
           this.phone = "";
          this.password = "";
          this.agree = "";
          this.codetext=''
          
          }
         }
          }
        } catch (error) {
          alert('账号或密码错误')
         this.phone = "";
          this.password = "";
          this.agree = "";
          this.codetext=''
        }
      }
      }else{
          alert('请勾选同意协议')
        return false;
      }
    },
        // 生成图片验证码
 async   getCode(){
   let result=   await this.$store.dispatch('getImgCode')
   console.log(result);
   this.code=result
    }
  },
mounted(){
   // 生成图片验证码
    this.getCode()
}
};
</script>

<style scoped>
.contain {
  width: 1250px;
  height: 600px;
  margin-top: 60px;
  margin-left: 140px;
  /* margin-bottom: 40px; */
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
  margin-bottom: 40px;
  border: 2px solid #00a476;
}
.content {
  padding-left: 390px;
  margin-bottom: 35px;
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
.content .code{
  width: 130px;
  height: 38px;
  margin-right: 20px !important;
}
.content .span{
  margin-top: -38px;
  margin-left:250px;
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