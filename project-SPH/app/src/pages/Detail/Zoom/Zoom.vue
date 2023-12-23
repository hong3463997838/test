<template>
  <div class="spec-preview">
    <img :src="ImgObj.imgUrl" />
    <div class="event" @mousemove="handler"></div>
    <div class="big" >
      <img :src="ImgObj.imgUrl" ref="big"/>
    </div>
    <!-- 屏蔽层 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    props:['skuImageList'],
    data() {
      return {
        currentIndex:0
      }
    },
    computed:{
      ImgObj(){
        return this.skuImageList[this.currentIndex]||{}
      }
    },
    methods:{
      getIndex(index){
        // 利用响应式data去改变展示对应图片的index
        this.currentIndex=index
      },
      // 放大镜
      handler(event){
      let mask=this.$refs.mask;
      let big=this.$refs.big;

      let left=event.offsetX-mask.offsetWidth/2;
      let top=event.offsetY-mask.offsetHeight/2;
      // 约束范围
      if(left<=0) left=0;
      if(left>=mask.offsetWidth) left=mask.offsetWidth;
      if(top<=0) top=0;
      if(top>=mask.offsetHeight) top=mask.offsetHeight;
        // 修改元素的left、top属性值
        mask.style.left=left+'px';
        mask.style.top=top+'px';
        // 放大镜
        // 负数就是放大和方向相反的意思
                big.style.left=-2*left+'px';
               big.style.top=-2*top+'px'

      }
    },
    mounted(){
      // 全局事件总线的回调函数，加收传过来的参数
      this.$bus.$on('getIndex',this.getIndex)
    }
    
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>