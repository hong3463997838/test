<template>
  <div>
    <Header v-if="header_show"></Header>

    <router-view v-on:header="header" v-on:footer="footer"></router-view>
  
    <Footer v-if="footer_show"></Footer>
  </div>
</template>

<script>

import Header from '@/components/Header.vue'
import Footer from '@/components/Footer'
export default {
  name: 'App',
  components:{
    Header,
    Footer
  },
   data(){
      return {
          header_show:true,
          footer_show:true,
      }
  },
    methods:{
      //是否显示头部
      header:function (bool) {
        this.header_show = bool;
      },
      //是否显示底部
      footer:function (bool) {
          this.footer_show = bool;
      }
  }
  

}
</script>

<style scoped>



</style>
