<template>
    <div class="pagination">
        <h1>{{ startNumAndEnd}}</h1>
        <!-- 上部分 -->
        <button @click="$emit('getPage',pageNo-1)" :disabled="pageNo==1">上一页</button>
        <button v-if="startNumAndEnd.start>1" @click="$emit('getPage',1)" :class="{active:pageNo==1}">1</button>
         <button v-if="startNumAndEnd.start>2">···</button>
        <!-- 中间部分 -->
        <!-- v-for 遍历数字   -->
        <button  v-for="(page,index) in startNumAndEnd.end" :key="index" v-show="page >= startNumAndEnd.start" @click="$emit('getPage',page)" :class="{active:pageNo==page}">{{page}}</button>
        <!-- 下部分 -->
        <button  v-if="startNumAndEnd.end<totalPage-1">···</button>
        <button v-if="startNumAndEnd.end<totalPage" @click="$emit('getPage',totalPage)" :class="{active:pageNo==totalPage}">{{totalPage}}</button>
        <button @click="$emit('getPage',pageNo+1)" :disabled="pageNo==totalPage">下一页</button>

        <button style="margin-left: 30px">共{{total}}条</button>
    </div>
</template>

<script>
    export default {
        name: "Pagination",
        props:['pageNo','pageSize','total','continues'],
        
        computed:{
            // 总共多少页
            totalPage(){
                // 向上取整
                return Math.ceil(this.total/this.pageSize)
            },
            
            // 计算出连续的页码的起始数字与结束数字【连续页码的数字至少是5】
            startNumAndEnd(){
                const {continues,pageNo, totalPage}=this
          let start=0,end=0;
        //   连续页码数字是5，但会有不正常现象。就是所有页数都不够连续页码5页，
        // 不正常现象，就是总页数没有连续页码多
        if(continues>totalPage){
            start=1;
            end=totalPage;
        }else{
            // 正常现象，就是总页数大于连续页码
            // 起始数字
            start=pageNo-parseInt(continues/2);
            // 结束数字
            end=pageNo+parseInt(continues/2);
            // 不正常：当start数字出现0或者负数时
            if(start<1){
                start=1;
                end=continues;
            }
            // 不正常：当end数字大于总页码
            if(end>totalPage){
                end=totalPage;
                start=totalPage-continues+1
            }

        }

        //计算属性要有返回值， return {start,end}返回一个对象给startNumAndEnd，{ "start": 8, "end": 12 }
        return {start,end}
            },
            
        }
    }
</script>

<style lang="less" scoped>
    .pagination {
        text-align: center;
        button {
            margin: 0 5px;
            background-color: #f4f4f5;
            color: #606266;
            outline: none;
            border-radius: 2px;
            padding: 0 4px;
            vertical-align: top;
            display: inline-block;
            font-size: 13px;
            min-width: 35.5px;
            height: 28px;
            line-height: 28px;
            cursor: pointer;
            box-sizing: border-box;
            text-align: center;
            border: 0;

            &[disabled] {
                color: #c0c4cc;
                cursor: not-allowed;
            }

            &.active {
                cursor: not-allowed;
                background-color: #409eff;
                color: #fff;
            }
        }
        .active{
            background-color: skyblue;
        }
    }
</style>