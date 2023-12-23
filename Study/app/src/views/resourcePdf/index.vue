<template>
<div>
     <iframe :src=" pdfList.http"  frameborder="0" width="100%" height="800px"></iframe>

</div>
 
</template>

<script>
export default {
    name:'resourcePdf',
    data(){
        return{
            pdfList:''
        }
    },

   methods:{
  async  getPdf(){
       let result=await this.$store.dispatch('getResourcePdf',this.$route.params.rid)
       console.log(result);
       if(result=='ok'){
        this.pdfList=this.$store.state.resource.resourcepdfList
       }
    }
   },
     created () {
 
            this.$emit('header', false);
            this.$emit('footer', false);
 
        },
   mounted(){
    this.getPdf()
   }
    
}
</script>

<style scoped>

</style>