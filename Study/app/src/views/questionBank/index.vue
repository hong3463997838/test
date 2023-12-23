<template>
  <div class="contain">
    <div class="top">
      <ul>
        <li class="li">
          <h3>
            {{ courseName }}
            <span>></span>
            <ul class="ul">
              <li
                class="lili"
                v-for="c in courseList"
                :key="c.id"
                @mouseenter="onCourse(c.id)"

              >
                <span>{{ c.cname }}</span>
                <span>></span>
                <ul class="ulul">
                <li v-for="(cate,index) in coursecategoryList" :key="cate.categoryid" :class="coursecatecurrentIndex==index?'active':''"
                 @click="onCategory(cate.categoryid,cate.categoryname,index)">{{cate.categoryname}}</li>
                <!-- <li>css</li>
                <li>javascript</li>
                <li>c语言</li>
                <li>python</li>
                <li>java</li>
                <li>vue</li>
                <li>node</li> -->
                </ul>
              </li>
            </ul>
          </h3>
        </li>
      </ul>
      <!-- <div>
        {{cate.categoryname}}
        @click="onCategory(cate.categoryid,index)"
         :class="coursecatecurrentIndex==index?'active':''"
      </div> -->
      <div class="nav">
        <ul>
          <!-- <span>分类：</span> -->
          <li
            class="active"
          
          >
            {{  courseName }}
          </li>
          <li  class="record" @click="toRecord()">查看答题记录</li>
         
        </ul>
      </div>
    </div>
   
    <div class="content">
      <div class="select">
        <svg
          t="1701674963752"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="964"
          width="16"
          height="16"
        >
          <path
            d="M348.820645 532.48L443.953548 627.612903c8.588387 8.588387 21.80129 
            9.249032 31.710968 1.981936l222.637419-175.070968c10.570323-7.927742 11.891613-23.122581 
            3.963871-33.692903-7.927742-10.570323-23.122581-11.891613-33.692903-3.963871L463.112258
             578.725161 382.513548 498.126452c-9.249032-9.249032-24.443871-9.249032-33.692903 0-9.249032 
             9.909677-9.249032 24.443871 0 34.353548z"
            p-id="965"
          ></path>
          <path
            d="M247.741935 197.532903l6.606452
              23.783226h524.552258c13.212903 0 23.783226 10.570323 23.783226 23.783226v524.552258c0 13.212903-10.570323 
              23.783226-23.783226 23.783226H254.348387c-13.212903 0-23.783226-10.570323-23.783226-23.783226V245.099355c0-13.212903
               10.570323-23.783226 23.783226-23.783226l6.606452-23.783226-6.606452-23.783226c-39.63871 0-71.349677 31.710968-71.349677 
               71.349678v524.552258c0 39.63871 31.710968 71.349677 71.349677 71.349677h524.552258c39.63871 0 71.349677-31.710968 
        71.349678-71.349677V245.099355c0-39.63871-31.710968-71.349677-71.349678-71.349678H254.348387v23.783226h-6.606452z"
            p-id="966"
          ></path>
        </svg>
        <h4>选择题</h4>
        <button @click="toSelect()">快速练习</button>
      </div>
      <div class="select">
        <svg
          t="1701674849647"
          class="icon"
          viewBox="0 0 1047 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="934"
          width="16"
          height="16"
        >
          <path
            d="M626.126208 165.639795a24.697783 24.697783 0 0 1 35.774364 0l130.299513 
            138.008215a24.697783 24.697783 0 0 1 0 35.774364l-485.573373 475.32005a23.200947 23.200947
             0 0 1-17.887182 7.484177H145.642075a25.595884 25.595884 0 0 1-25.521042-25.521042V653.383579a23.200947 23.200947 
             0 0 1 7.484177-17.887182z m89.810118-76.637968l74.093348-74.093347a2.469778 2.469778 0 0 0 2.54462-2.54462 52.389236
              52.389236 0 0 1 71.548727 5.08924l91.98053 104.778471a48.721989 48.721989 0 0 1-5.08924 69.004107l-79.25743 
              71.548728-155.895397-173.782579zM0 924.310769h1047.784713v99.689231H0z"
            fill="#999999"
            p-id="935"
          ></path>
        </svg>
        <h4>填空题</h4>
        <button @click="toFill()">快速练习</button>
      </div>
      <div class="select">
        <svg
          t="1701675184447"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4052"
          width="16"
          height="16"
        >
          <path
            d="M52.5056 240.64v740.6848H971.52V42.6752H284.5696V0H1024v1024H0V240.64h52.5056z"
            fill="#bfbfbf"
            p-id="4053"
          ></path>
          <path
            d="M57.6 187.2384l172.8512-140.4416L288.8192 0v234.6752H0z"
            fill="#bfbfbf"
            p-id="4054"
          ></path>
          <path
            d="M758.7584 373.888c-8.3968 9.8048-24.4992 23.808-45.4912 43.392a52.5056 52.5056
              0 0 1-77.7216 0 51.072 51.072 0 0 1 0-77.6704c19.6096-20.992 42.7008-46.848 42.0096-46.848a163.84 163.84 0 0 0-186.1888
               33.536 165.76 165.76 0 0 0-39.9104 170.0352l-193.8944 193.1008a73.7024 73.7024 0 0 0 0.6912 104.2688 73.7792 73.7792 0
                0 0 104.2944-0.7168l193.92-193.1008a164.5568 164.5568 0 0 0 175.1808-45.6448 164.352 164.352 0 0 
                0 27.1104-178.944v-1.408zM301.1584 789.3248a37.9904 37.9904 0 0 1-27.7248-10.9056c-15.36-15.7952-15.36-40.9088 
                0-56.704l218.8032-218.112-7.296-21.0944a137.088 137.088 0 0 1 32.8192-139.5968 133.6832 133.6832 0 0 
                1 94.8224-39.9872h5.8368l-3.6352 3.6352a89.2928 89.2928 0 0 0-27.7248 63.2576 91.4688 91.4688 0 0 0 
                28.4416 67.6096c17.152 18.432 41.1648 28.9536 66.3808 29.0816a94.208 94.208 0 0 0 66.3552-29.0816 
                132.096 132.096 0 0 1-37.9136 96.6912 135.168 135.168 0 0 1-96.256 39.2704 131.6608 131.6608 0 0 
                1-43.776-7.2704l-21.1456-7.2704-218.8032 218.112c-7.7056 7.808-18.2016 12.2368-29.184 12.3648z"
            fill="#bfbfbf"
            p-id="4055"
          ></path>
        </svg>
        <h4>计算题</h4>
        <button @click="toOperate()">快速练习</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "questionBank",
  data() {
    return {
      courseName: "html",
      courseList: "",
      coursecategoryList: "",
    coursecatecurrentIndex: -1,
    };
  },
  methods: {
    // 点击查看历史记录
    toRecord(){
      // this.$router.push({name:'topicRecord',params:{cid:this.$route.params.cid||1,cateid:this.$route.params.cateid||1001}},()=>{},()=>{})
      this.$router.push({name:'topicRecord'},()=>{},()=>{})

    },
    // 获取课程数据
    async getCourseList() {
      let result = await this.$store.dispatch("getCourse");
      if (result == "ok") {
        this.courseList = this.$store.state.teacher.courseList;
      }
    },
    // 获取课程分类数据
    async getCourseCategoryList(cid) {
      let result = await this.$store.dispatch("getCategoryCourse", cid);
      console.log(result);
      if (result == "ok") {
        // this.courseName =
        //   this.$store.state.resource.coursecategoryList[0].cname;
        this.coursecategoryList = this.$store.state.resource.coursecategoryList;
      }
    },
    // 点击课程，根据总课程的id获取课程分类
    async onCourse(cid) {
      this.coursecatecurrentIndex=-1
      // 改变路由
      this.$router.push({name:'questionBank',params:{cid:cid}},()=>{},()=>{})
      // 发起请求
      this.getCourseCategoryList(cid);
    },  
    // 点击课程分类
  async onCategory(cateid,catename,index) {
    this.courseName=catename
       // 改变路由
      this.$router.push({name:'questionBank',params:{cid:this.$route.params.cid,cateid:cateid}})
    // 改变样式
    this.coursecatecurrentIndex = index;
  },
// 点击去选择题页面
toSelect(){
  if(!this.$route.params.cid && !this.$route.params.cateid){
    this.$route.params.cid=1
    this.$route.params.cateid=1001
  }else if(this.$route.params.cid && !this.$route.params.cateid){
  this.$router.push({name:'questionBank'},()=>{},()=>{})
  alert('请选择课程')
  return false
  }
  this.$router.push({name:'Select',params:{cid:this.$route.params.cid,cateid:this.$route.params.cateid}},()=>{},()=>{})
},
// 点击去填空题页面
toFill(){
    if(!this.$route.params.cid && !this.$route.params.cateid){
    this.$route.params.cid=1
    this.$route.params.cateid=1001
  }else if(this.$route.params.cid && !this.$route.params.cateid){
  this.$router.push({name:'questionBank'},()=>{},()=>{})
  alert('请选择课程')
  return false
  }
  this.$router.push({name:'Fill',params:{cid:this.$route.params.cid,cateid:this.$route.params.cateid}},()=>{},()=>{})
},
// 点击去填空题页面
toOperate(){
    if(!this.$route.params.cid && !this.$route.params.cateid){
    this.$route.params.cid=1
    this.$route.params.cateid=1001
  }else if(this.$route.params.cid && !this.$route.params.cateid){
  this.$router.push({name:'questionBank'},()=>{},()=>{})
  alert('请选择课程')
  return false
  }
  this.$router.push({name:'Operate',params:{cid:this.$route.params.cid,cateid:this.$route.params.cateid}},()=>{},()=>{})
}

  },
  created() {
    this.$emit("header", true);
    this.$emit("footer", true);
  },
  mounted() {
    this.getCourseList();
    this.getCourseCategoryList(1);
  },
};
</script>

<style scoped>
.contain {
  background-color: #f5f7fa;
}
.top {
  width: 1150px;
  height: 70px;
  margin-top: 30px;
  margin-left: 180px;
}
.top ul {
  position: relative;
}
.top ul .li {
  width: 120px;
  height: 30px;
  /* background-color: red; */
}
ul li {
  list-style: none;
}
.top ul li .ul {
  display: none;
  width: 100px;
  height: 400px;
  z-index: 999;
  margin-top: 10px;
  font-weight: normal;
  margin-left: -20px;
  background-color: #ffffff;
  position: absolute;
}
.top ul li .ul .lili:nth-child(1) {
  margin-top: 10px;
}
.top ul li .ul .lili {
  /* width: 100px; */
  /* padding-right:45px ; */
  /* margin-right: 20px; */
  /* background-color: royalblue; */
  margin-top: 20px;
}
.top ul li .ul .lili span:hover {
  color: #00a476;
}
.top ul li h3 {
  height: 35px;
  /* background-color: red; */
}
.top ul li h3:hover ul {
  display: block;
}
.active {
  color: #00a476;
}
.ulul{
  display: none !important;
    width: 950px;
    height: 30px;
    line-height: 24px;
     z-index: 999;
    background-color: #ffffff;
    position:absolute;
    margin-left: 100px;
    margin-top: -27px;
}
.lili:hover .ulul{
    display: block !important;
}
.top .ulul li{
  
  margin-right: 30px; 
 display: inline-block;
  /* float:left; */
  }
.top .ulul li:nth-child(1){
  margin-left: -15px;
}
.top .ulul li:hover{
  color: #00a476;
}
.top .nav ul {
  display: flex;
  list-style: none;
  margin-left: -20px;
}
.top .nav ul li {
  margin-left: 24px;
}

.top .nav ul span {
  margin-left: 20px;
}
.content {
  width: 1150px;
  height: 300px;
  margin-left: 180px;
  /* background-color: royalblue; */
}
.select {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  float: left;
  width: 250px;
  height: 260px;
  margin-right: 30px;
  border: 1px solid white;
  border-radius: 15px;
  background-color: #ffffff;
}
svg {
  width: 80px;
  height: 100px;
  padding-left: 80px;
  padding-top: 25px;
  margin-bottom: -10px;
}
h4 {
  margin-left: 95px;
}
button {
  border: 1px solid white;
  border-radius: 10px;
  width: 100px;
  height: 30px;
  margin-left: 70px;
  color: white;
  background-color: #00a476;
}
.record{
  border: 1px solid white;
  border-radius: 10px;
  width: 100px;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  padding-left: 15px;
  margin-left: 70px;
  color: white;
  margin-left: 590px !important;
  background-color:#00a476;
}
</style>