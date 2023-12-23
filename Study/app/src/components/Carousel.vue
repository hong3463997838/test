<template>
  <div class="Carousel">
    <div class="swiper-container" id="floor1Swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="c in list" :key="c.id">
          <img :src="c.imgUrl" />
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>

      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
    <div class="Carousel-middle" v-if="!userDataList.uid">
      <h3>快速登录/注册</h3>

      <p><input type="text" placeholder="手机号" v-model="phone" /></p>

      <p><input type="password" placeholder="密码" v-model="password" /></p>

      <!-- <p><input type="text" placeholder="验证码" class="yanzheng" v-model="yanzheng" /></p> -->

      <p>
        <button @click="onLogin">立即登录</button>
        <router-link to="/register"> <button>还没注册?</button></router-link>
      </p>
    </div>
    <div class="Carousel-middle" v-else>
      <div class="uimg">
        <el-upload
          class="avatar-uploader"
          action="/api/unloadImg"
          :show-file-list="false"
          name="test"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <p><img :src="userDataList.uimgUrl" class="avatar" /></p>
          <!-- <i  class="el-icon-plus avatar-uploader-icon"></i> -->
        </el-upload>
        <p><label>账号</label>{{ userDataList.uid }}</p>
      </div>
     <router-link to="/my"><button class="uimgbtn">个人中心</button></router-link> 
    </div>
    <div class="Carousel-right">
      <p @click="onHelp()">帮助</p>
      <p @click="onContact()">客服</p>
      <p>顶部</p>
    </div>
  </div>
</template>

<script>
// 引入swiper
import { mapState } from "vuex";

import Swiper from "swiper";
export default {
  name: "Carousel",
  data() {
    return {
      phone: "",
      password: "",
      //  yanzheng:''
    };
  },
  props: ["list"],
  methods: {
    // 头像上传成功
    async handleAvatarSuccess(res, file) {
      let uimgUrl = res.data;
      let uid = this.userDataList.uid;
      let result = await this.$store.dispatch("updateUserImg", {
        uimgUrl,
        uid,
      });
      if (result == "ok") {
        this.userDataList.uimgUrl = res.data;
      }
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
    // 点击登录
    async onLogin() {
      // 后面会进行表单验证
      // console.log(this.agree==true);
      // && this.agree==true
      if (this.uid == "" && this.upassword == "") {
        alert("账号或密码不为空");
        return false;
      } else {
        let uid = this.phone;
        let upassword = this.password;
        try {
          const result = await this.$store.dispatch("onLogin", {
            uid,
            upassword,
          });
          // 刷新页面
          location.reload();
          this.phone = "";
          this.password = "";
        } catch (error) {
          alert("账号或密码错误");
          this.phone = "";
          this.password = "";
          console.log("未填写完");
        }
      }
    },
    // 点击帮助
    onHelp(){
      this.$router.push({path:'/help/introduction'},()=>{},()=>{})
    },
    // 点击客服
    onContact(){
      this.$router.push({path:'/help/contact'},()=>{},()=>{})

    }
  },
  computed: {
    // 从仓库中获取user数据
    ...mapState({
      userDataList: (state) => {
        return state.user.userList;
      },
    }),
  },
  watch: {
    list: {
      // 立即监听：因为这里的list数据并不是请求来的，而是父组件给的，所以不能监听到数据的变化，因为给过来的数据没有发生变化，所以使用立即监听
      immediate: true,
      handler(newValue, oldValue) {
        this.$nextTick(() => {
          var mySwiper = new Swiper(".swiper-container", {
            // 自动旋转
            autoplay: {
              stopOnLastSlide: true,
            },
            // 分页器
            pagination: {
              el: ".swiper-pagination",
              // 点击按钮
              clickable: true,
            },

            // 无线循环
            loop: true,
            // 上下按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            // 滚动条
            scrollbar: {
              el: ".swiper-scrollbar",
            },
          });
        });
      },
    },
  },
};
</script>

<style>
/*  轮播图 */
.Carousel {
  margin-left: 2px;
  margin-top: 21px;
  width: 1380px;
  height: 440px;
  position: relative;
}
.Carousel .swiper-container {
  width: 700px;
  height: 413px;
  position: absolute;
  margin-left: 333px;
}
.swiper-slide img {
  width: 700px;
  height: 413px;
}

.Carousel-middle {
  position: absolute;
  width: 255px;
  height: 413px;
  border: 1px solid black;

  margin-left: 1035px;
}
.Carousel-middle h3 {
  padding-top: 20px;
  padding-left: 30px;
}
.Carousel-middle p {
  padding-left: 30px;
  padding-top: 10px;
}
.yanzheng {
  width: 80px !important;
  height: 30px !important;
  border: 1px solid black !important;
  border-radius: 5px !important;
}
.Carousel-middle p input {
  width: 180px;
  height: 30px;
  line-height: 30px;
  border: 1px solid black;
  border-radius: 5px;
}
.Carousel-middle p button {
  width: 180px;
  height: 30px;
  margin-top: 20px;
  padding: 0px 5px;
  border: 1px solid black;
  border-radius: 5px;
}
.Carousel-right {
  position: fixed;
  left: 1390px;
  top: 300px;
  /* position: absolute; */
  width: 60px;
  height: 413px;
  /* margin-top: 100px;
  margin-left: 1380px; */
}
.Carousel-right p {
  border-radius: 3px;
  border: 1px #00a476 solid;
  color: white;
  padding-top: 12px;
  padding-left: 12px;
  width: 35px;
  font-size: 13px;
  margin-top: 5px;
  height: 35px;
  background-color: #00a476;
}
/* 用户头像 */
.uimg {
  margin-right: 25px;
  margin-bottom: 20px;
  text-align: center;
}
.uimg img {
   border: white 1px solid;
  border-radius: 60px;
  width: 120px !important;
  height: 120px !important;
}
.uimgbtn {
  margin-left: 30px;
  margin-top: 50px;
  background-color: #00a476;
  width: 200px;
  border-radius: 10px;
  height: 40px;
  border: 1px solid #00a476;
  color: white;
}
</style>