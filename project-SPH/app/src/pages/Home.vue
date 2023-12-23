<template>
  <div>
    <!-- 全局组件 -->
    <TypeNav/>
    <ListContainer/>
    <Recommend/>
    <Rank/>
    <Like/>
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor"/>
    
    <Brand/>
  </div>
  
</template>

<script>
import ListContainer from '../pages/ListContainer.vue'
import Recommend from '../pages/Recommend.vue'
import Rank from '../pages/Rank.vue'
import Like from '../pages/Like.vue'
import Floor from '../pages/Floor.vue'
import Brand from '../pages/Brand.vue'
import { mapState } from 'vuex'

export default {
name:'Home',
components:{
  ListContainer,
  Recommend,
  Rank,
  Like,
  Floor,
  Brand,
},

mounted(){
  // 获取底部数据
  this.$store.dispatch('getFloorList')
},
computed:{
  ...mapState({
        floorList:(state)=>{
            return state.home.floorList;
        }
    }),
    ...mapState({
      user:(state)=>{
        return state.user.userInfo||{}
      }
    })
}
}
</script>

<style>

</style>