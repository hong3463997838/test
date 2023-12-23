<template>
   	<!-- 推荐视频 -->
    <div class="recommend">  
        <div class="recommend-top">
            <div class="recommend-top-left">
                推荐课程
			<a href="">更多》</a>

            </div>
            <!-- <div class="recommend-top-right">
                <ul>
                    <li v-for="s in courseList" :key="s.sid"><a >{{s.sname}}</a></li>
                 
                </ul>
            </div> -->
        </div>
        <div class="recommend-buttom">
            <!-- <div class="recommend-buttom-left">
                <img src="@/assets/33.jpg" alt="">
                <a href="">2023最新前端开发html5+css3视频</a>
            </div>
            <div class="recommend-buttom-right">
                    <div class="recommend-tupian" v-for="c in courseList" :key="c.categoryid">
                    <img :src="c.categoryimg" alt="">
                    <a>{{c.categoryname}}</a>
                    </div>
                    
            </div> -->
			  <!-- <div class="recommend-buttom-left">
                <img src="@/assets/33.jpg" alt="">
                <a href="">2023最新前端开发html5+css3视频</a>
            </div> -->
            <div class="recommend-buttom-right">
                    <div class="recommend-tupian" v-for="s in courseList" :key="s.sid">
                    <img :src="s.simg" alt="">
                    <a>{{s.sname}}</a>
                    </div>
                    
            </div>
        </div>
    </div>
</template>

<script>
    export default {
       name:'Recommend' ,
	   props:['courseList']
    }
</script>

<style  scoped>
.recommend-top-left{
		width: 1250px;
		height: 40px;
		color: #00a476;
		font-weight: bold;
		font-size: 24px;
		/* background-color: rebeccapurple; */
		}
		.recommend-top-left a{
			text-decoration: none;
			color: black;
			margin-left: 1080px;
			font-size: 17px;
		}
	.recommend{
			width: 1250px;
			height: 350px;
			margin-left: 132px;
			
		}
		.recommend-top{
			position: relative;
			width: 1250px;
			height: 40px;
            margin-bottom: 20px;
			/* background-color: greenyellow; */
		}
		.recommend-top-left{
			position: absolute;
			height: 40px;
			line-height: 40px;
			
			color: #00a476;
			font-weight: bold;
            /* background-color: red; */
		}
        .recommend-top-left p{
            margin-top: 15px;
            /* position: absolute; */
			height: 20px;
			line-height: 20px;
			font-size: 25px;
			color: #00a476;
			font-weight: bold;
            /* background-color: red; */
        }
		.recommend-top-right{
			position: absolute;
            /* background-color: #00a476; */
		}
		.recommend-top-right ul{
			margin-left: 100px;
		}
		.recommend-top-right ul li{
			list-style-type: none;
			display: inline;
			height: 20px;
			line-height: 20px;
			margin-left: 20px;
			padding: 4px 10px;
			border: #b7b7b7 1px solid;
			border-radius: 6px;
			background-color: #e5e5ea ;
		}
		.recommend-top-right ul li a{
			text-decoration: none;
			color: black;
		}
		.recommend-top-right ul li a:hover{
			color: #00a476;
		}
		.recommend-buttom{
			height: 300px;
			width: 1250px;
			/* position: relative; */
			margin-top: 10px;
			margin-left: -17px;
			/* background-color: rosybrown; */
		}
        .recommend-buttom a{
			height: 35px;
			width: 362px;
            text-decoration: none;
            color: black;
			/* background-color: magenta; */
		}
        .recommend-buttom a:hover{
            color: #00a476;
			/* background-color: magenta; */
		}
		/* .recommend-buttom-left{
			position: absolute;
			height: 300px;
			width: 362px;
	
		}
		.recommend-buttom-left img{
			height: 260px;
			width: 362px;
			background-color: red; 
		} */
	
		.recommend-buttom-right{
			/* position: absolute; */
			width: 1250px;
			height: 300px;
			/* margin-left: 368px; */
			/* background-color: red; */
		}
		
		.recommend-tupian{
			float: left;
			margin-left: 20px;
			width: 225px;
			height:200px ;
			/* margin-bottom: px; */
			/* background-color: dodgerblue; */
		}
		/* .recommend-tupian:nth-child(1){
			height: 300px;
			width: 362px;
		}
			.recommend-tupian img:nth-child(1){
			height: 300px;
			width: 362px;
		} */
		.recommend-tupian img{
			/* position: absolute; */
			width: 225px;
			height:160px ;
		}
    
</style>