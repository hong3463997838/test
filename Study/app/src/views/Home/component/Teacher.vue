<template>
		<!-- 名师教学 -->
		<div class="teacher">
			<div class="teacher-top">
			名师教学
			<a href="">更多》</a>
			</div>
			<div class="teacher-buttom">
				<div class="teacher-left" v-for="t in teacherList" :key="t.tid">
				  <div class="teacher-tupian">
				    <a ><img :src="t.timg" alt=""></a>
			      </div>
				<div class="teacher-wenzi">
				   <h3><a >{{t.tname}}</a></h3>
				   <p><a >{{t.categoryname}}</a></p>
			    </div>
				</div>
				
				
			</div>
			
		</div>
</template>

<script>
    export default {
        name:'Teacher',
		props:['teacherList']
    }
</script>

<style scoped>

		/* 名师教学 */
		.teacher{
			
			width: 1250px;
			height: 200px;
			margin-top: 110px;
			margin-left: 132px;
			/* background-color: red; */
		}
		.teacher-top{
		width: 1250px;
		height: 40px;
		color: #00a476;
		font-weight: bold;
		font-size: 24px;
		/* background-color: rebeccapurple; */
		}
		.teacher-top a{
			text-decoration: none;
			color: black;
			margin-left: 1080px;
			font-size: 17px;
		}
		.teacher-buttom{
			width: 1250px;
			height: 150px;
			margin-top: 10px;
			/* background-color: orange; */
		}
		.teacher-left{
			float: left;
			width: 300px;
			margin-right: 12px;
			height: 150px;
			background-color: #f0f0f0;
		}
		.teacher-left a{
			text-decoration: none;
			color: black;
		}
		.teacher-left a:hover{
			color: #00a476;
		}
		.teacher-tupian{
			position: absolute;
			width: 130px;
			height: 150px;
			/* background-color: tomato; */
		}
		.teacher-tupian img{
			position: absolute;
			width: 130px;
			height: 150px;
			
			/* background-color: tomato; */
		}
		.teacher-wenzi{
			/* float: left; */
			width: 150px;
			height: 150px;
			padding-top: 10px;
			margin-left: 150px;
			/* background-color: deepskyblue; */
		}
		.teacher-wenzi p{
			width: 150px;
			padding-top: 10px;
		}
		
</style>