<template>
  	<div class="footer">
		<div class="footer-left">
			<p>合作伙伴：
			<a href="">淘宝网</a>
			<span>|</span>
			<a href="">人才网</a>
			<span>|</span>
			<a href="">外语派</a>
			</p>
			<p>友情链接：
			<a href="">教师听课网</a>
			<span>|</span>
			<a href="">七彩学科网</a>
			<span>|</span>
			<a href="">哔哔哩哩</a>
			<span>|</span>
			<a href="">微课网</a>
			</p>
			<p>关于本站：
			<a href="">网站生命</a>
			<span>|</span>
			<a href="">帮助中心</a>
			<span>|</span>
			<a href="">联系我们</a>
			<span>|</span>
			<a href="">意见反馈</a>
			</p>
		</div>
	</div>
</template>

<script>
export default {
name:'Footer',
}
</script>

<style scoped>

/* 底部 */
.footer{
	margin-top: 20px;
    margin-left: 5px;
    width: 1450px;
    height:150px;
    background-color: #00a476;
	/* bottom:0; */
    /* position:fixed; */
 
}
.footer-left{
    float: left;
    margin-left: 100px;
    margin-top: 10px;
}
.footer-left p{
    font-size: 14px;
    color: white;
    margin-top: 10px;
}
.footer-left p a{
    color: white;
    text-decoration: none;
    padding: 0px 5px
}

</style>