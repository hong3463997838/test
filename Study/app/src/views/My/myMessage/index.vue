<template>
  <div>
    <!-- 已登录 -->
    <!-- 这个前端的名字name="test"要与后端的一致 upload.single('test') -->
    <div v-show="$store.state.user.token">
        <div class="content">
        <label>头像:</label>
          <el-upload
        class="avatar-uploader"
        action="/api/unloadImg"
        :show-file-list="false"
        name="test"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img :src="imageUrl" class="avatar" />
        <!-- <i  class="el-icon-plus avatar-uploader-icon"></i> -->
      </el-upload>
      </div>
   
      <div class="content">
        <label>用户名:</label>
        <input type="text" class="input" v-model="username" />
      </div>
      <div class="content">
        <label>手机号:</label>
        <span class="text">{{ userDataList.uid }}</span>
      </div>
      <div class="content">
        <label>我的签名:</label>
        <textarea
          type="text"
          rows="7"
          cols="80"
          placeholder="设置你的签名"
          v-model="sign"
        ></textarea>
      </div>
      <div class="content">
        <label>性别:</label>
        <span>
          <input type="radio" value="0" v-model="gender" />男
          <input type="radio" value="1" v-model="gender" />女
        </span>
      </div>

      <div class="block">
        <label>出生日期:</label>
        <el-date-picker
          class="text"
          v-model="birthday"
          type="date"
          placeholder="选择日期"
        >
        </el-date-picker>
      </div>

      <div class="btn">
        <button @click="onSave">保存</button>
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

<script>
export default {
  name: "myMessage",
  data() {
    return {
      username: "",
      //  头像
      imageUrl: "",
      sign: "",
      birthday: "",
      // 性别默认初始值:0表示男，1表示女生
      gender: "",
      userDataList: {},
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
    };
  },
  computed: {},
  methods: {
    // 头像上传成功
    async handleAvatarSuccess(res, file) {
      this.imageUrl = res.data;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 保存数据，即修改数据
    async onSave() {
      let uimgUrl = this.imageUrl;
      let uid = this.userDataList.uid;
      let uname = this.username;
      let sign = this.sign;
      let gender = this.gender;
      let birthday = this.birthday;

      // 调用存储接口
      let result = await this.$store.dispatch("updateUser", {
        uid,
        uname,
        uimgUrl,
        sign,
        gender,
        birthday,
      });
      if (result == "ok") {
        alert("保存成功");
      }
    },
    // 根据token获取数据，因为在请求拦截器中已经在请求头中设置token，所以不用传递tokenn参数
    async getUser() {
      let result = await this.$store.dispatch("getUserMessage");
      console.log(result);
      if (result == "ok") {
        this.userDataList = this.$store.state.user.userList;
        this.username = this.$store.state.user.userList.uname;
        this.birthday = this.$store.state.user.userList.birthday;
        this.sign = this.$store.state.user.userList.sign;
        this.gender = this.$store.state.user.userList.gender;
        this.imageUrl = this.$store.state.user.userList.uimgUrl;
      }
    },
  },

  mounted() {
    if (this.$store.state.user.token) {
      this.getUser();
    }
  },
};
</script>

<style scoped>
.content {
  display: flex;
  padding-left: 80px;
  margin-bottom: 35px;
}
.block {
  display: flex;
  padding-left: 80px;
  margin-bottom: 35px;
}
.content:nth-child(1) {
  padding-top: 30px;
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
  /* text-align: center; */
  margin-left: 200px;
  line-height: 36px;
  /* margin: 17px 0 0 55px; */
}
.btn button {
  outline: none;
  width: 150px;
  height: 40px;
  background: #00a476;
  color: #fff !important;
  border-radius: 10px;
  font-size: 16px;
  margin-top: 20px;
  border: 1px solid #00a476;
}
/* 头像样式 */
.avatar-uploader .el-upload {
  border: 1px dashed red;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
} 
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
 .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px ;
  height: 120px ;
  line-height: 178px;
  text-align: center;
  
} 
.avatar {
  margin-top: -10px;
   margin-left: 20px;
  border-radius: 60px;
  width: 120px !important;
  height: 120px !important;
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