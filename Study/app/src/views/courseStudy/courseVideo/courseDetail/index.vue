<template>
  <div>
    课程详情
  </div>
</template>

<script>
export default {
name:'courseDetail',

  created () {
    this.$emit('header', false);
    this.$emit('footer', false);
  },
}
</script>

<style>

</style>