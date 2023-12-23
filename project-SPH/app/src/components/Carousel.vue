<template>
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
</template>

<script>
// 引入swiper
import Swiper from "swiper";
export default {
  name: "Carousel",
  props: ["list"],
  watch: {
    list: {
        // 立即监听：因为这里的list数据并不是请求来的，而是父组件给的，所以不能监听到数据的变化，因为给过来的数据没有发生变化，所以使用立即监听
        immediate:true,
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
</style>