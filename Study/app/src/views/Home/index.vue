<template>
  <div class="contain">
    <Carousel :list="bannerList"></Carousel>
    <Recommend :courseList="courseDataList"></Recommend>
    <Teacher :teacherList="teacherDataList"></Teacher>
    <div class="teacher-top">
			课程学习
			<a href="">更多》</a>
			</div>
    <Course :coursecategoryList="coursecategoryList1"></Course>
    <Course :coursecategoryList="coursecategoryList2"></Course>
    <Course :coursecategoryList="coursecategoryList3"></Course>
    <Course :coursecategoryList="coursecategoryList4"></Course>
    <Course :coursecategoryList="coursecategoryList5"></Course>
    <Course :coursecategoryList="coursecategoryList6"></Course>
    <Course :coursecategoryList="coursecategoryList7"></Course>
    <Course :coursecategoryList="coursecategoryList8"></Course>

  </div>
</template>

<script>
import Teacher from "./component/Teacher.vue";
import Recommend from "./component/Recommend.vue";
import Course from "./component/Course.vue";
import { mapState } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      // 推荐课程数据
      courseDataList: "",
      // 名师教学老师的数据
      teacherDataList: "",
      // 课程分类的数据
      coursecategoryList1: "",
      coursecategoryList2: "",
      coursecategoryList3: "",
      coursecategoryList4: "",
      coursecategoryList5: "",
      coursecategoryList6: "",
      coursecategoryList7: "",
      coursecategoryList8: "",
    };
  },
  components: {
    Teacher,
    Recommend,
    Course,
  },
  methods: {
    // 获取用户数据
    async getUser() {
      await this.$store.dispatch("getUserMessage");
    },
    // 获取首页推荐课程数据
    async getCourse() {
      let result = await this.$store.dispatch("getHomeCourse");
      console.log(result);
      if (result == "ok") {
        this.courseDataList = this.$store.state.home.courseList;
      }
    },

    // 获取首页名师教学的老师
    async getTeacher() {
      let result = await this.$store.dispatch("getHomeTeacher");
      console.log(result);
      if (result == "ok") {
        this.teacherDataList = this.$store.state.home.teacherList;
      }
    },

    // 获取首页课程分类的数据
    async getCourseCategory1(cid) {
 
        let result = await this.$store.dispatch("getHomeCourseCategory1", cid);
        console.log(result);
        if (result == "ok") {
          this.coursecategoryList1 = this.$store.state.home.categoryList1;
        }
    },
	    async getCourseCategory2(cid) {
 
        let result = await this.$store.dispatch("getHomeCourseCategory2", cid);
        console.log(result);
        if (result == "ok") {
          this.coursecategoryList2 = this.$store.state.home.categoryList2;
        }
    },
	    async getCourseCategory3(cid) {
 
        let result = await this.$store.dispatch("getHomeCourseCategory3", cid);
        console.log(result);
        if (result == "ok") {
          this.coursecategoryList3 = this.$store.state.home.categoryList3;
        }
    },
	    async getCourseCategory4(cid) {
 
        let result = await this.$store.dispatch("getHomeCourseCategory4", cid);
        console.log(result);
        if (result == "ok") {
          this.coursecategoryList4 = this.$store.state.home.categoryList4;
        }
    },
	    async getCourseCategory5(cid) {
 
        let result = await this.$store.dispatch("getHomeCourseCategory5", cid);
        console.log(result);
        if (result == "ok") {
          this.coursecategoryList5 = this.$store.state.home.categoryList5;
        }
    },
	    async getCourseCategory6(cid) {
 
        let result = await this.$store.dispatch("getHomeCourseCategory6", cid);
        console.log(result);
        if (result == "ok") {
          this.coursecategoryList6 = this.$store.state.home.categoryList6;
        }
    },
	    async getCourseCategory7(cid) {
 
        let result = await this.$store.dispatch("getHomeCourseCategory7", cid);
        console.log(result);
        if (result == "ok") {
          this.coursecategoryList7 = this.$store.state.home.categoryList7;
        }
    },
	    async getCourseCategory8(cid) {
 
        let result = await this.$store.dispatch("getHomeCourseCategory8", cid);
        console.log(result);
        if (result == "ok") {
          this.coursecategoryList8 = this.$store.state.home.categoryList8;
        }
    },
  },
  mounted() {
  
    // 获取推荐课程数据
    this.getCourse();
    // 获取首页名师教学的老师
    this.getTeacher();
    // 获得计算机课程分类的数据
    this.getCourseCategory1(1);
    // 获得计算机课程分类的数据
    this.getCourseCategory2(2);
    this.getCourseCategory3(3);
    this.getCourseCategory4(4);
    this.getCourseCategory5(5);
    this.getCourseCategory6(6);
    this.getCourseCategory7(7);
    this.getCourseCategory8(8);

    //    登录后获取用户数据
    if (this.$store.state.user.token) {
      this.getUser();
    }
    // 获取底部数据
    this.$store.dispatch("getBannerList");
  },
  computed: {
    ...mapState({
      bannerList: (state) => {
        return state.home.bannerList;
      },
    }),
  },
   created () {
 
            this.$emit('header', true);
            this.$emit('footer', true);
 
        },
};
</script>

<style scoped>
.contain {
  width: 1450px;
}
	.teacher-top{
		width: 1250px;
		height: 40px;
		color: #00a476;
		font-weight: bold;
		font-size: 24px;
    margin-left: 130px;
    margin-top: 20px;
    margin-bottom: -18px;
		/* background-color: rebeccapurple; */
		}
		.teacher-top a{
			text-decoration: none;
			color: black;
			margin-left: 1080px;
			font-size: 17px;
		}
</style>