<template>
     <!-- 商品分类导航 -->
     <div class="type-nav">
            <div class="container">
                <div @mouseleave="leaveIndex" @mouseenter="entershow">
                    <h2 class="all" >全部商品分类</h2>
                  <!-- 二级联动 -->
                  <!-- 过渡动画 -->
                <transition name="sort">
                    <div class="sort" v-show="show">
                        <!-- 事件委托：即将@click="goSearch"委托为父组件，使得所有子组件有@click="goSearch"属性，这样做的原因是，子组件中有三个a标签都要使用@click="goSearch"，可以减少代码，增加复用性 -->
                    <div class="all-sort-list2" @click="goSearch">
                        <div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId" :class="{cur:currentIndex===index}">
                            <h3 @mouseenter="changeIndex(index)">
                                <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}---{{index}}</a>
                            </h3>
                            <!-- 二、三级分类 -->
                            <div class="item-list clearfix" :style="{display:currentIndex===index?'block':'none'}">
                                <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                                    <dl class="fore">
                                        <dt>
                                            <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                                        </dt>
                                        <dd>
                                            <em v-for=" c3 in c2.categoryChild" :key="c3.categoryId">
                                                <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                                            </em>
                                          
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                     
                    </div>
                </div>
                </transition>
                </div>
                
                <nav class="nav">
                    <a href="###">服装城</a>
                    <a href="###">美妆馆</a>
                    <a href="###">尚品汇超市</a>
                    <a href="###">全球购</a>
                    <a href="###">闪购</a>
                    <a href="###">团购</a>
                    <a href="###">有趣</a>
                    <a href="###">秒杀</a>
                </nav>
                
            </div>
        </div>
</template>

<script>
// 引入方式：把lodash全部功能函数引入
// import _ from 'lodash'
// 最好的方式：按需引入
import throttle from "lodash/throttle"
import { mapState } from 'vuex';
export default {
name:'TypeNav',
data() {
    return {
        // 存储用户鼠标移上哪一个一级分类
        currentIndex:-1,
        show:true
    }
},
// 组件挂载完毕后向服务器发请求
mounted(){
    // 通知Vuex发送请求，获取数据，存储于仓库
    // this.$store.dispatch('categoryList');
    // 当组件挂载完毕后，且路径是search是，将控制显示或隐藏TypeNav 的组件show进行修改
    if(this.$route.path==='/search'){
        this.show=false
    }
},
computed:{
    ...mapState({
        categoryList:(state)=>{
            return state.home.categoryList;
        }
    })
},
methods:{
    // 鼠标进入修改响应式数据currentIndex属性
    // 由于会因为用户行为过快，浏览器反应不过来，特别是当前回调函数中有大量业务，就可能会出现卡顿现象，
    // 节流  throttle别用箭头函数，会出现this问题
    changeIndex:throttle(function(index){
         // index为一级分类的索引值
        this.currentIndex=index

    },50),
  
    // 鼠标移除和鼠标移除后显示和隐藏
    // 在search页面中才有显示和隐藏，即在search页面中才有移除，而在home页面中不用隐藏
    // 所以要根据路由路径来判断
    leaveIndex(){
        this.currentIndex=-1;
        // 路径判断
        if(this.$route.path==='/search'){
            this.show=false
        }
        if(this.$route.name==='detail'){
            this.show=false
        }
    },
    entershow(){
        this.show=true
    },
    // 事件委托：但会遇到两个问题，1，因为需求是只有点击a标签的时候才会跳转到search页面，而事件委托会使所有子组件都有@click="goSearch"，所以不能确定是否点击的为a标签
    // 2.三个a标签跳转时，会携带一级、二级、三级对应的不同参数，无法确定点击的是哪一级的参数
    // 解决方法：给三个a标签定义自定义属性，根据是否有自定义属性来判断
    goSearch(event){
        // event可以获取当前触发的是那个子节点
        let element=event.target;
        // console.log(element);
        // 节点有一个属性dataset属性，可以获取节点的自定义属性和属性值
        // console.log(element.dataset);
        // 如果标签身上有categoryname，则一定是a标签
        let {categoryname,category1id,category2id,category3id}=element.dataset;
        if(categoryname){
            // 整理路由跳转的参数
            
            let location={name:'search'};
            let query={categoryName:categoryname} ;

            // 判断一级、二级、三级分类
            if(category1id){
                query.category1id=category1id
            }else if(category2id){
                query.category2id=category2id
            }else{
                query.category3id=category3id
            }
            // 整理参数，合并对象
            if(this.$route.params){
            location.params=this.$route.params;
                location.query=query
            // 路由跳转
            this.$router.push(location)
            }
            
        }
    }
}
}
</script>

<style scoped lang="less">
    .type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                            }
                        }

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }

                        // &:hover {
                        //     .item-list {
                        //         display: block;
                        //     }
                        // }
                    }
                    .cur{
                        background-color: skyblue;
                    }
                }
            }
            // 过渡动画样式
            // 开始： 进入和离开样式
            .sort-enter,.sort-leave-to{
                height: 0px;
            }
            // 结束： 进入和离开样式
            .sort-enter-to,.sort-leave{
                height: 461px;
            }
            .sort-enter-active,.sort-leave-active{
                transition: all 0.5s linear;
            }
        }
    }
</style>