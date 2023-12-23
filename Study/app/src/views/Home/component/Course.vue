<template>
    		<!-- 课程 -->
		<div class="course">
			<div class="course-left">
				<h2>{{coursecategoryList[0].sname}}</h2>
				<ul>
					<li v-for=" s in coursecategoryList" :key="s.sid" >
						<a href="">{{s.sname}}</a>
					</li>
					<!-- <li><a href="">java</a></li>
					<li><a href="">nodenode</a></li>
					<li><a href="">pythonvue2+vue3</a></li>
					<li><a href="">html+cssvu2+vue3</a></li>
					<li><a href="">javascriptvue2+vue</a></li> -->
				</ul>
			</div>
			<div class="course-middle">
				<img :src="coursecategoryList[coursecategoryList.length-1].simg" alt="">
				<a href="">{{coursecategoryList[coursecategoryList.length-1].sname}}</a>
			</div>
			<div class="course-right">
				<div class="course-tupian" v-for=" s in coursecategoryList.slice (0, 6)" :key="s.sid"  >
				<img :src="s.simg" alt="">
				<a href="">{{s.sname}}</a>
				</div>
			
				
			</div>
		</div>
</template>

<script>
    export default {
        name:'Course',
		props:['coursecategoryList'],
	
    }
</script>

<style  scoped>
	
	/* 课程----编程技术 */
	.course{
		width: 1250px;
		height: 340px;
		margin-top: 30px;
		margin-left: 132px;
		/* background-color: red; */
	}
    .course a{
        color: black;
        text-decoration: none;

    }
    .course a:hover{
        color: #00a476;

    }
	.course-left{
		float: left;
		width:200px;
		height: 340px;
        
		background-color: #f0f0f0;
	}
	.course-left h2{
		text-align: center;
		padding-top: 2px;
	}
	ul li a{
		text-decoration: none;
		color: black;
		
	}
	.course-left ul li a:hover{
		color: #00a476;
	}
	.course-left ul{
        margin-left: -20px;
        width:160px;
        height: 247px;
	    text-align: center;
        /* background-color: red; */
		margin-top: 10px;
	}
	.course-left ul li{
        width:150px;
        height:37px;
		display: inline-block;
		/* padding: 10px 10px; */
        /* background-color: rebeccapurple; */
	}
	.course-middle{
		float: left;
		height: 340px;
		margin-left: 25px;
		width: 380px;
		/* background-color: dodgerblue; */
	}
	.course-middle img{
		height: 310px;
		width: 380px;
		/* background-color:rebeccapurple; */
	}
	.course-right{
		float: left;
		width: 640px;
		height: 340px;
		/* background-color: green; */
	}
	
	.course-tupian{
		float: left;
		margin-left: 20px;
		/* position: absolute; */
		width: 190px;
		height:140px ;
		margin-bottom: 40px;
		/* background-color: dodgerblue; */
	}
	.course-tupian img{
		/* position: absolute; */
		width: 190px;
		height:130px ;
	}
	
</style>