<template>
  <div class="contain">
<div class="top">
<p>
  <span><</span>
  <span @click="toBack()">退出</span>
</p>
<p>
  {{questionList[orderIndex].categoryname}}练习
</p>
<p>
  <button @click="toSubmitPaper()">交卷</button>
</p>
</div>
<div class="content">
<div class="content-left">
  <!-- 选择题 -->
<div class="answer-sheet" v-show="isShowSelect">
  <p>一、单项选择题</p>
  <div v-for="(q,index) in questionList " :key="q.topicid" :class="(orderIndex+1==index+1) || q.selected?'active':'noactive'" @click="onAnswerSheet(index)">{{index+1}}</div>
 
</div>
<!-- 填空题 -->
<div class="answer-sheet" v-show="isShowFill">
  <p>二、填空题</p>
   <div v-for="(q,index) in questionList " :key="q.topicid" :class="orderIndex+1==index+1?'active':'noactive'" @click="onAnswerSheet(index)">{{index+1}}</div>
</div>
<!-- 操作题 -->
<div class="answer-sheet" v-show="isShowOperate">
  <p>三、操作题</p>
   <div v-for="(q,index) in questionList " :key="q.topicid" :class="orderIndex+1==index+1?'active':'noactive'" @click="onAnswerSheet(index)">{{index+1}}</div>

</div>
</div>
<div class="content-right">
<div class="content-right-top">
  <!-- 选择题 -->
<p v-show="isShowSelect">
  <!-- 1.本试题中共有50个空格，需要全部解答，每个空2分，满分100分。<br> -->
  本题为选择题，共有{{questionList.length}}题，每个空格对应一个序号，有A、B、C、D四个选项，请选择一个最合适的选项作为解答。
</p>
<!-- 填空题 -->
<p v-show="isShowFill">
  本题为填空题，共有{{questionList.length}}题，本题不支持作答，可在交卷后核对答案并查看解析。<br>
</p>
<!-- 操作题 -->
<p v-show="isShowOperate">
  本题为操作题，共有{{questionList.length}}题，本题不支持作答，可在交卷后核对答案并查看解析。<br>
</p>
</div>
<div class="content-right-middle">
  <!-- 选择题 -->
  <div v-show="isShowSelect" >
     <p>{{orderIndex+1}}.{{questionList[orderIndex].content}} 
      <svg  @click="onCollect(orderIndex)" v-show="questionList[orderIndex].collected!=1" t="1702224425413" class="icon" viewBox="0 0 1024 1024"
     version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4223" width="16" height="16"><path d="M512 720.416l232.096 171.904a19.2 19.2 0 0 0 16.864 2.88c9.536-2.88 14.592-12.224 11.84-20.864l-88.96-281.6 237.344-176.96a16.48 16.48 0 0 0 6.816-13.152c0-9.152-7.904-16.928-18.112-16.96l-292-0.448-88.48-277.12a17.568 17.568 0 0 0-11.776-11.264c-9.856-2.976-20.16 2.304-23.04 11.264l-88.48 277.12-292 0.48a18.624 18.624 0 0 0-14.624 6.944 16.096 16.096 0 0 0 3.328 23.136l237.376 176.96-88.992 281.6a15.904 15.904 0 0 0 2.72 14.688c6.048 7.744 17.856 9.312 25.984 3.296L512 720.416z m-194.016 223.36a83.008 83.008 0 0 1-114.56-15.424 79.904 79.904 0 0 1-13.28-73.28l75.296-238.24-200.864-149.76a80.096 80.096 0 0 1-15.424-113.92 82.624 82.624 0 0 1 64.864-31.456l245.312-0.384 74.304-232.672c13.6-42.56 59.52-66.112 102.56-53.024A81.536 81.536 0 0 1 590.4 88.64l74.304 232.64 245.312 0.416c45.184 0.064 82.08 36.16 82.016 81.024a80.48 80.48 0 0 1-32.576 64.352l-200.864 149.76 75.296 238.24c13.568 
    42.976-11.072 88.352-54.496 101.408a83.2 83.2 0 0 
    1-73.344-12.736L512 800.064l-194.016 143.68z" fill="#000000" p-id="4224"></path>
    </svg>
    <svg  @click="cancelCollect(orderIndex)" v-show="questionList[orderIndex].collected==1"  t="1702224913896" class="icon" viewBox="0 0 1024 1024" 
    version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4653" width="16" height="16"><path d="M284.458667 941.397333c-36.437333 15.637333-68.48-7.68-64.896-47.168l22.613333-248.917333-164.394667-188.053333c-26.069333-29.824-13.653333-67.562667 24.789334-76.309334l243.370666-55.381333 127.786667-214.677333c20.288-34.090667 59.946667-34.069333 80.213333 0l127.786667 214.677333 243.370667 55.381333c38.656 8.789333 50.858667 46.485333 24.789333 76.309334l-164.394667 188.053333 22.741334 249.002667c3.605333
     39.509333-28.458667 62.805333-64.896 47.146666l-229.504-98.517333-229.376 98.453333z" fill="#00a476" p-id="4654"></path>
     </svg>
    </p>
      
<p @click="onSelected(orderIndex,'A')" :class="'A'==questionList[orderIndex].selected?'active':'noactive'">A.{{questionList[orderIndex].optiona}}</p>
<p @click="onSelected(orderIndex,'B')" :class="'B'==questionList[orderIndex].selected?'active':'noactive'">B.{{questionList[orderIndex].optionb}}</p>
<p @click="onSelected(orderIndex,'C')" :class="'C'==questionList[orderIndex].selected?'active':'noactive'">C.{{questionList[orderIndex].optionc}}</p>
<p @click="onSelected(orderIndex,'D')" :class="'D'==questionList[orderIndex].selected?'active':'noactive'">D.{{questionList[orderIndex].optiond}}</p>

  </div>
  <!-- 填空题 -->
<div v-show="isShowFill">
  <p>{{orderIndex+1}}.{{questionList[orderIndex].content}}
    <svg   @click="onCollect(orderIndex)" v-show="questionList[orderIndex].collected!=1" t="1702224425413" class="icon" viewBox="0 0 1024 1024"
     version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4223" width="16" height="16"><path d="M512 720.416l232.096 171.904a19.2 19.2 0 0 0 16.864 2.88c9.536-2.88 14.592-12.224 11.84-20.864l-88.96-281.6 237.344-176.96a16.48 16.48 0 0 0 6.816-13.152c0-9.152-7.904-16.928-18.112-16.96l-292-0.448-88.48-277.12a17.568 17.568 0 0 0-11.776-11.264c-9.856-2.976-20.16 2.304-23.04 11.264l-88.48 277.12-292 0.48a18.624 18.624 0 0 0-14.624 6.944 16.096 16.096 0 0 0 3.328 23.136l237.376 176.96-88.992 281.6a15.904 15.904 0 0 0 2.72 14.688c6.048 7.744 17.856 9.312 25.984 3.296L512 720.416z m-194.016 223.36a83.008 83.008 0 0 1-114.56-15.424 79.904 79.904 0 0 1-13.28-73.28l75.296-238.24-200.864-149.76a80.096 80.096 0 0 1-15.424-113.92 82.624 82.624 0 0 1 64.864-31.456l245.312-0.384 74.304-232.672c13.6-42.56 59.52-66.112 102.56-53.024A81.536 81.536 0 0 1 590.4 88.64l74.304 232.64 245.312 0.416c45.184 0.064 82.08 36.16 82.016 81.024a80.48 80.48 0 0 1-32.576 64.352l-200.864 149.76 75.296 238.24c13.568 
    42.976-11.072 88.352-54.496 101.408a83.2 83.2 0 0 
    1-73.344-12.736L512 800.064l-194.016 143.68z" fill="#000000" p-id="4224"></path>
    </svg>
     <svg  @click="cancelCollect(orderIndex)" v-show="questionList[orderIndex].collected==1" t="1702224913896" class="icon" viewBox="0 0 1024 1024" 
    version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4653" width="16" height="16"><path d="M284.458667 941.397333c-36.437333 15.637333-68.48-7.68-64.896-47.168l22.613333-248.917333-164.394667-188.053333c-26.069333-29.824-13.653333-67.562667 24.789334-76.309334l243.370666-55.381333 127.786667-214.677333c20.288-34.090667 59.946667-34.069333 80.213333 0l127.786667 214.677333 243.370667 55.381333c38.656 8.789333 50.858667 46.485333 24.789333 76.309334l-164.394667 188.053333 22.741334 249.002667c3.605333
     39.509333-28.458667 62.805333-64.896 47.146666l-229.504-98.517333-229.376 98.453333z" fill="#00a476" p-id="4654"></path>
     </svg>
  </p>
<p style="margin-top:430px; color:#00a476;font-size:13px">本题不支持作答，可在交卷后核对答案并查看解析</p>
</div>
<!-- 操作题 -->
<div v-show="isShowOperate">
  <p>{{orderIndex+1}}.{{questionList[orderIndex].content}}
    <svg   @click="onCollect(orderIndex)" v-show="questionList[orderIndex].collected!=1" t="1702224425413" class="icon" viewBox="0 0 1024 1024"
     version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4223" width="16" height="16"><path d="M512 720.416l232.096 171.904a19.2 19.2 0 0 0 16.864 2.88c9.536-2.88 14.592-12.224 11.84-20.864l-88.96-281.6 237.344-176.96a16.48 16.48 0 0 0 6.816-13.152c0-9.152-7.904-16.928-18.112-16.96l-292-0.448-88.48-277.12a17.568 17.568 0 0 0-11.776-11.264c-9.856-2.976-20.16 2.304-23.04 11.264l-88.48 277.12-292 0.48a18.624 18.624 0 0 0-14.624 6.944 16.096 16.096 0 0 0 3.328 23.136l237.376 176.96-88.992 281.6a15.904 15.904 0 0 0 2.72 14.688c6.048 7.744 17.856 9.312 25.984 3.296L512 720.416z m-194.016 223.36a83.008 83.008 0 0 1-114.56-15.424 79.904 79.904 0 0 1-13.28-73.28l75.296-238.24-200.864-149.76a80.096 80.096 0 0 1-15.424-113.92 82.624 82.624 0 0 1 64.864-31.456l245.312-0.384 74.304-232.672c13.6-42.56 59.52-66.112 102.56-53.024A81.536 81.536 0 0 1 590.4 88.64l74.304 232.64 245.312 0.416c45.184 0.064 82.08 36.16 82.016 81.024a80.48 80.48 0 0 1-32.576 64.352l-200.864 149.76 75.296 238.24c13.568 
    42.976-11.072 88.352-54.496 101.408a83.2 83.2 0 0 
    1-73.344-12.736L512 800.064l-194.016 143.68z" fill="#000000" p-id="4224"></path>
    </svg>
     <svg  @click="cancelCollect(orderIndex)" v-show="questionList[orderIndex].collected==1"  t="1702224913896" class="icon" viewBox="0 0 1024 1024" 
    version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4653" width="16" height="16"><path d="M284.458667 941.397333c-36.437333 15.637333-68.48-7.68-64.896-47.168l22.613333-248.917333-164.394667-188.053333c-26.069333-29.824-13.653333-67.562667 24.789334-76.309334l243.370666-55.381333 127.786667-214.677333c20.288-34.090667 59.946667-34.069333 80.213333 0l127.786667 214.677333 243.370667 55.381333c38.656 8.789333 50.858667 46.485333 24.789333 76.309334l-164.394667 188.053333 22.741334 249.002667c3.605333
     39.509333-28.458667 62.805333-64.896 47.146666l-229.504-98.517333-229.376 98.453333z" fill="#00a476" p-id="4654"></path>
     </svg>
  </p>
<p style="margin-top:430px; color:#00a476;font-size:13px">本题不支持作答，可在交卷后核对答案并查看解析</p>
</div>
</div>
<div class="content-right-buttom">
<button @click="preTopic()" :disabled="isdisablepre">上一题</button>
<button @click="nextTopic()" :disabled="isdisablenext">下一题</button>
</div>
</div>
</div>
  </div>
</template>

<script>
export default {
name:'Select',
 created() {
    this.$emit("header", false);
    this.$emit("footer", false);
  },
  data(){
    return{
     time: '',
      // 题
      questionList:'',
    //  是否点击交卷，即是否完成题目,0未完成，1已完成
    isfinished:0,
      orderIndex:0,
      isShowSelect:false,
      isShowFill:false,
      isShowOperate:false,
      isdisablepre:true,
      isdisablenext:false,
       sum:0,
      //  是否收藏,0未收藏，1收藏
      // iscollected:0,
      // 错题的数量
      errornumber:0,
      // 收藏的数量
      collectnumber:0
    }
  },

  methods:{
    // 点击收藏
 
 onCollect(orderIndex){
       this.$set(this.questionList[orderIndex],'collected',1) 

 },
//  取消收藏
cancelCollect(orderIndex){
       this.$set(this.questionList[orderIndex],'collected',0) 
// console.log(this.questionList[orderIndex]);

},
    // 计算错题数量
  async  getErrorNumber(){
        let errnumber=0;
    this.questionList.forEach(item => {
        if(item.selected!=item.correct){
          errnumber++
        }
    });
    this.errornumber=errnumber
    // console.log(this.errornumber);
    // 存入数据库
     await  this.$store.dispatch('insertErrorNumber',
        {topicid:this.questionList[this.questionList.length-1].topicid,
        token:localStorage.getItem('TOKEN'),
        time:this.time,
        cid:this.$route.params.cid,
        cateid:this.$route.params.cateid,
        errornumber:this.errornumber
        })
    
    },
    // 计算收藏的数量
    // 将数据存入已完成状态的一行中

 async  getCollectNumber(){
  let collectnumber=0;
    this.questionList.forEach(item => {
        if(item.collected==1){
         collectnumber++
        }
    });
    this.collectnumber=collectnumber
    // console.log(this.collectnumber);
    // 存入数据库
  if(this.$route.path.includes('select')){
    await  this.$store.dispatch('insertCollectNumber',
        {topicid:this.questionList[this.questionList.length-1].topicid,
        token:localStorage.getItem('TOKEN'),
        time:this.time,
        cid:this.$route.params.cid,
        cateid:this.$route.params.cateid,
       collectedtotal:this.collectnumber
        })
  }else if(this.$route.path.includes('fill')){
      await  this.$store.dispatch('insertFillCollectNumber',
        {topicid:this.questionList[this.questionList.length-1].topicid,
        token:localStorage.getItem('TOKEN'),
        time:this.time,
        cid:this.$route.params.cid,
        cateid:this.$route.params.cateid,
       collectedtotal:this.collectnumber
        })
  }else if(this.$route.path.includes('operate')){
      await  this.$store.dispatch('insertOperateCollectNumber',
        {topicid:this.questionList[this.questionList.length-1].topicid,
        token:localStorage.getItem('TOKEN'),
        time:this.time,
        cid:this.$route.params.cid,
        cateid:this.$route.params.cateid,
       collectedtotal:this.collectnumber
        })
        
  }
     
    },
    // 计算分数
getScore(){
    let sum=0
    this.questionList.forEach(item => {
        if(item.selected==item.correct){
          sum=sum+2
        }
       
    }); 
    this.sum=sum
    console.log(sum);
    localStorage.setItem('SCORE',this.sum)
},
    // 点击交卷
   async toSubmitPaper(){
    // 变为已完成
    this.isfinished=1
        
    // 判断类型
    if(this.$route.path.includes('select')){
       // 因为当最后一题时，下一题的按钮时被禁用的，所以只能当你点击交卷的时候，将最后一题选的答案插入数据库中
        if(this.questionList[this.questionList.length-1].selected!=''){
        await  this.$store.dispatch('insertMyAnswer',
        {topicid:this.questionList[this.questionList.length-1].topicid,
        myanswer:this.questionList[this.questionList.length-1].selected,token:localStorage.getItem('TOKEN'),
        time:this.time,isfinished:this.isfinished,
        cid:this.$route.params.cid,cateid:this.$route.params.cateid,
         correct:this.questionList[this.orderIndex].correct,
       iscollected:this.questionList[this.questionList.length-1].collected||0
        })

        //  await  this.$store.dispatch('insertMyAnswer',{myanswer:this.questionList[this.questionList.length-1].selected,topicid:this.questionList[this.questionList.length-1].topicid})
        }else if(this.questionList[0].selected!=''){
 // 同理，第一题时
          
        await  this.$store.dispatch('insertMyAnswer',
        {topicid:this.questionList[0].topicid,
        myanswer:this.questionList[0].selected,token:localStorage.getItem('TOKEN'),
        time:this.time,
        isfinished:this.isfinished,
        cid:this.$route.params.cid,cateid:this.$route.params.cateid,
         correct:this.questionList[this.orderIndex].correct,
        iscollected:this.questionList[0].collected||0
        })
        //  await  this.$store.dispatch('insertMyAnswer',{myanswer:this.questionList[0].selected,topicid:this.questionList[0].topicid})
        }
        // 计算错题数量，并存入已完成的那条数据中，因为后面是解析中，是根据已完成的得出来的课程名称
        // 计算错题数量
       this.getErrorNumber()
// 计算收藏的数量
       this.getCollectNumber()


      // 计算分数
       this.getScore()
      this.$router.push({name:'submitPaperSelect',params:{cid:this.$route.params.cid,cateid:this.$route.params.cateid}})

    } else if(this.$route.path.includes('fill')){
      // 直接跳解析页面
      // this.$router.push({name:'submitPaperFill',params:{cid:this.$route.params.cid,cateid:this.$route.params.cateid}})
           // this.$router.push({name:'AnalyzeFill'},()=>{},()=>{})
        if(this.orderIndex==this.questionList.length-1){
            await  this.$store.dispatch('insertFillMyAnswer',
        {topicid:this.questionList[this.questionList.length-1].topicid,
       token:localStorage.getItem('TOKEN'),
        time:this.time,isfinished:this.isfinished,
        cid:this.$route.params.cid,cateid:this.$route.params.cateid,
       iscollected:this.questionList[this.questionList.length-1].collected||0
        })
        }else if(this.orderIndex==0){
          await  this.$store.dispatch('insertFillMyAnswer',
        {topicid:this.questionList[0].topicid,
      token:localStorage.getItem('TOKEN'),
        time:this.time,
        isfinished:this.isfinished,
        cid:this.$route.params.cid,cateid:this.$route.params.cateid,
        iscollected:this.questionList[0].collected||0
        })
        }
// 计算收藏的数量
       this.getCollectNumber()
            this.$router.push({name:'AnalyzeFill',params:{cid:this.$route.params.cid,cateid:this.$route.params.cateid}},()=>{},()=>{})

    }else if(this.$route.path.includes('operate')){
           if(this.orderIndex==this.questionList.length-1){
            await  this.$store.dispatch('insertOperateMyAnswer',
        {topicid:this.questionList[this.questionList.length-1].topicid,
       token:localStorage.getItem('TOKEN'),
        time:this.time,isfinished:this.isfinished,
        cid:this.$route.params.cid,cateid:this.$route.params.cateid,
       iscollected:this.questionList[this.questionList.length-1].collected||0
        })
        }else if(this.orderIndex==0){
          await  this.$store.dispatch('insertOperateMyAnswer',
        {topicid:this.questionList[0].topicid,
      token:localStorage.getItem('TOKEN'),
        time:this.time,
        isfinished:this.isfinished,
        cid:this.$route.params.cid,cateid:this.$route.params.cateid,
        iscollected:this.questionList[0].collected||0
        })
        }
// 计算收藏的数量
       this.getCollectNumber()
            // this.$router.push({name:'AnalyzeOperate'},()=>{},()=>{})      
            this.$router.push({name:'AnalyzeOperate',params:{cid:this.$route.params.cid,cateid:this.$route.params.cateid}},()=>{},()=>{})

    }
      //  三个路由跳转区分
      // 根据路径是否含有select fill operate进行区分
      // this.$router.push({path:`/submitpaper/${this.$route.params.cid}/${this.$route.params.cateid}`})
    // if(this.$route.path.includes('select')){
    //   this.$router.push({name:'submitPaperSelect',params:{cid:this.$route.params.cid,cateid:this.$route.params.cateid}})
     
    // }else if(this.$route.path.includes('fill')){
    //   this.$router.push({name:'submitPaperFill',params:{cid:this.$route.params.cid,cateid:this.$route.params.cateid}})
       
    // }else if(this.$route.path.includes('operate')){
    //   this.$router.push({name:'submitPaperOperate',params:{cid:this.$route.params.cid,cateid:this.$route.params.cateid}})
      
    // }
    },
    // 点击选项时，改变样式
 onSelected(orderIndex,e){
    // localStorage.setItem('QUESTIONLIST',this.questionList)
      //  this.$set( this.questionList[orderIndex],'selected',e.currentTarget.innerText.substring(0,1)) 
       this.$set( this.questionList[orderIndex],'selected',e) 
      // console.log(e.currentTarget.innerText.substring(0,1));
    localStorage.setItem('QUESTIONLIST',JSON.stringify(this.questionList))

      //  console.log(this.questionList[orderIndex]);
    },

    // 点击答题卡
    onAnswerSheet(index){
      this.orderIndex=index
        // 改变上一题，下一题的样式
      if(index==0){
      this.isdisablepre=true
      this.isdisablenext=false
      }else if(index==this.questionList.length-1){
         this.isdisablepre=false
      this.isdisablenext=true
      }else{
         this.isdisablepre=false
      this.isdisablenext=false
      }
    },
    // 点击下一题// 控制orderIndex++
  async  nextTopic(){

     if(this.$route.path.includes('select')){
    
        await  this.$store.dispatch('insertMyAnswer',
        {topicid:this.questionList[this.orderIndex].topicid,
        myanswer:this.questionList[this.orderIndex].selected,
        token:localStorage.getItem('TOKEN'),
        time:this.time,
        isfinished:this.isfinished,
        cid:this.$route.params.cid,
        cateid:this.$route.params.cateid,
        correct:this.questionList[this.orderIndex].correct,
        iscollected:this.questionList[this.orderIndex].collected||0
        })
     }else if(this.$route.path.includes('fill')){
      
        await  this.$store.dispatch('insertFillMyAnswer',
        {topicid:this.questionList[this.orderIndex].topicid,
        token:localStorage.getItem('TOKEN'),
        time:this.time,
        isfinished:this.isfinished,
        cid:this.$route.params.cid,
        cateid:this.$route.params.cateid,
        iscollected:this.questionList[this.orderIndex].collected||0
        })
     }else if(this.$route.path.includes('operate')){
      
        await  this.$store.dispatch('insertOperateMyAnswer',
        {topicid:this.questionList[this.orderIndex].topicid,
        token:localStorage.getItem('TOKEN'),
        time:this.time,
        isfinished:this.isfinished,
        cid:this.$route.params.cid,
        cateid:this.$route.params.cateid,
        iscollected:this.questionList[this.orderIndex].collected||0
        })
     }
     

      this.orderIndex++
        //查询数据库中的收藏状态，根据时间、token、topicid查询收藏状态
        //  let result=await this.$store.dispatch('getTopicCollect',{time:this.time,token:localStorage.getItem('TOKEN'),topicid:this.questionList[this.orderIndex].topicid})
        //   console.log(result);
  // this.iscollected=0
      this.isdisablepre=false
      if(this.orderIndex==this.questionList.length-1){
      
      this.isdisablenext=!this.isdisablenext
      }
    },
        // 点击上一题
   async preTopic(){

    // 选择题
    if(this.$route.path.includes('select')){
     await  this.$store.dispatch('insertMyAnswer',
     {topicid:this.questionList[this.orderIndex].topicid,
     myanswer:this.questionList[this.orderIndex].selected,
     token:localStorage.getItem('TOKEN'),
     time:this.time,
     isfinished:this.isfinished,
     cid:this.$route.params.cid,
     cateid:this.$route.params.cateid,
      correct:this.questionList[this.orderIndex].correct,
        iscollected:this.questionList[this.orderIndex].collected||0
     })

    }else if(this.$route.path.includes('fill')){
      
        await  this.$store.dispatch('insertFillMyAnswer',
        {topicid:this.questionList[this.orderIndex].topicid,
        token:localStorage.getItem('TOKEN'),
        time:this.time,
        isfinished:this.isfinished,
        cid:this.$route.params.cid,
        cateid:this.$route.params.cateid,
        iscollected:this.questionList[this.orderIndex].collected||0
        })
     }else if(this.$route.path.includes('operate')){
        await  this.$store.dispatch('insertOperateMyAnswer',
        {topicid:this.questionList[this.orderIndex].topicid,
        token:localStorage.getItem('TOKEN'),
        time:this.time,
        isfinished:this.isfinished,
        cid:this.$route.params.cid,
        cateid:this.$route.params.cateid,
        iscollected:this.questionList[this.orderIndex].collected||0
        })
     }

      // 控制orderIndex--
      this.orderIndex--
 //查询数据库中的收藏状态，根据时间、token、topicid查询收藏状态
        //  getTopicCollect
        //  let result=await this.$store.dispatch('getTopicCollect',{time:this.time,token:localStorage.getItem('TOKEN'),topicid:this.questionList[this.orderIndex].topicid})
        //   console.log(result);
 // this.iscollected=0

      this.isdisablenext=false
        if(this.orderIndex==0){
      this.isdisablepre=!this.isdisablepre
      }
    },

// 退出
toBack(){
this.$router.push({name:'questionBank'},()=>{},()=>{})
},
//题目页面，获取选择题目及对应的课程信息
async getSelectQuestion(){
  let result=await this.$store.dispatch('getTopicSelectQuestion',{cid:this.$route.params.cid,cateid:this.$route.params.cateid})
  // console.log(result);
  if(result=='ok'){
    this.questionList=this.$store.state.topic.questionList
  }
},
//题目页面，获取填空题目及对应的课程信息
async getFillQuestion(){
  let result=await this.$store.dispatch('getTopicFillQuestion',{cid:this.$route.params.cid,cateid:this.$route.params.cateid})
  if(result=='ok'){
    this.questionList=this.$store.state.topic.fillquestionList
  }
},

//题目页面，获取计算题目及对应的课程信息
async getOperateQuestion(){
  let result=await this.$store.dispatch('getTopicOperateQuestion',{cid:this.$route.params.cid,cateid:this.$route.params.cateid})
  if(result=='ok'){
    this.questionList=this.$store.state.topic.operatequestionList
  }
},
// 获取日期
 getCurrentTime() {
    　　let yy = new Date().getFullYear();
    　　let mm = new Date().getMonth()+1;
    　　let dd = new Date().getDate();
    　　let hh = new Date().getHours();
    　　let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
    　　let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
    　　this.time = yy+'-'+mm+'-'+dd+' '+hh+':'+mf+':'+ss;
    　　console.log(this.time)  
    }
 
  },
  mounted(){
 // 获取当前时间
     this.getCurrentTime();
    if(this.$route.path.includes('select')){
      this.isShowSelect=true
      this.isShowFill=false
      this.isShowOperate=false
//题目页面，获取选择题目及对应的课程信息
      this.getSelectQuestion()
    }else if(this.$route.path.includes('fill')){
       this.isShowSelect=false
      this.isShowFill=true
      this.isShowOperate=false
//题目页面，获取填空题目及对应的课程信息
      this.getFillQuestion()
    }else if(this.$route.path.includes('operate')){
       this.isShowSelect=false
      this.isShowFill=false
      this.isShowOperate=true
//题目页面，获取计算题目及对应的课程信息
      this.getOperateQuestion()
    }

  }
}
</script>

<style scoped>
svg{
  float: right;
  margin-right: 200px;
 width: 20px;
 height: 20px;
}
.active{
  background-color: #00a476;
  color: white;
}
.noactive{
  background-color: #fff;
}
.contain{
  width: 1460px;
  height: 700px;
  /* background-color: rosybrown; */
}
.top{
  width: 1460px;
  height: 50px;
  line-height: 17px;
background-color: #00a476;
display: flex;

}
.top p{
  margin-left: 195px;
  color: white;
  flex: 1;
}
.content{
  display: flex;
   width: 1460px;
  height: 650px;
  /* background-color: rosybrown; */

}
.content-left{
  flex: 1;
  width: 250px;
  height: 650px;
background-color: #f7f7f7;

}
.answer-sheet{
    width: 250px;
}
.answer-sheet div{
  float: left;
  width: 30px;
  height: 25px;
  /* background-color: #fff; */
  text-align: center;
  /* background-color: red; */
  margin-top: 20px;
  padding-top: 5px;
margin-left: 15px;
border: 1px solid #00a476;
}
.content-right{
   width: 1210px;
  height: 650px;
/* background-color:rebeccapurple; */
}
.content-right-top{
   width: 1200px;
  height: 30px;
  font-weight: bold;
  margin-left: 10px;
  margin-top: -10px;
  margin-bottom: -20px;
  background-color: #f7f7f7;
}
.content-right-middle{
   width: 1200px;
height: 500px;
margin-left: 10px;
   background-color: #fff;
}
.content-right-buttom{
  display: flex;
   width: 1200px;
height: 80px;
margin-left: 10px;
   background-color: #fff;
}
.content-right-buttom button{
  margin-top: 20px;
  width: 80px;
  height: 30px;
  /* padding-left: 5px;
  padding-top: 5px; */
border: 1px solid #00a476;
  margin-left: 40px;
}
</style>