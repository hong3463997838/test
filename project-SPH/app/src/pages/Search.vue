<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
           <!-- 分类名 -->
            <li class="with-x" v-if="searchParams.categoryName">{{ searchParams.categoryName }}<i @click="removeCategoryName">×</i></li>
            <!-- 搜索关键字 -->
            <li class="with-x" v-if="searchParams.keyword">{{ searchParams.keyword }}<i @click="removeKeyword">×</i></li>
        <!-- 品牌 -->
        <li class="with-x" v-if="searchParams.trademark">{{ searchParams.trademark.split(":")[1] }}<i @click="removeTrademark">×</i></li>
            <!-- 品牌属性--v-for遍历数组 -->

            <li class="with-x" v-for="(attrValue,index) in searchParams.props" :key="index">{{attrValue.split(":")[1] }}<i @click="removeAttr(index)">×</i></li>
        
          </ul>
        </div>

        <!--selector-->
        <!-- 自定义事件trademarkInfo -->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo"/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active:isOne}" @click="changeOrder('1')">
                  <a>综合<span v-show="isOne" class="iconfont" :class="{'icon-up':isAsc,'icon-up1':isDesc}"></span></a>
                </li>
                <li :class="{active:isTwo}"  @click="changeOrder('2')">
                  <a >价格<span v-show="isTwo" class="iconfont" :class="{'icon-up':isAsc,'icon-up1':isDesc}"></span></a>
                </li>
        
              </ul>
            </div>
          </div>
          <!-- 商品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 声明式路由式跳转，带参数id -->
                    <router-link  :to="`/detail/${good.id}`">
                      <!-- 图片懒加载 -->
                      <img v-lazy="good.defaultImg" />
                    </router-link>
                     
                 
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{good.price}}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">{{good.title}}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
           
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="total" :continues="5" @getPage="getPage"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
  import SearchSelector from './SearchSelector'
  export default {
    name: 'Search',
    components: {
      SearchSelector
    },
    // 组价挂载完毕之前，对发生变化的参数进行修改，然后才带给服务器
    beforeMount(){
      // 即要修改响应式中data的数据
      // 利用 Object.assign，进行整体赋值，即后面两个query参数和params参数都会赋值给serachParams
      Object.assign(this.searchParams,this.$route.query,this.$route.params)
    },
    // 生命周期函数，仅仅只是执行一次
    mounted(){
      // 调用函数
      // searchParams发发生变化时，要把发送请求的参数带给服务器，不能都是原来的初始值

      this.getData();
    },
    data() {
      return {
        // 带给服务器参数
        searchParams:{
          // 一级ID
          category1Id:"",
           // 二级ID
           category2Id:"",
            // 三级ID
          category3Id:"",
          // 分类的名字
          categoryName:"",
          // 关键字
          keyword:"",
          // 排序
          order:"1:desc",
          // 分页器，表示当前是第几页
          pageNo:1,
          // 代表每一个展示的数据个数
          pageSize:3,
          // 平台售卖属性操作带的参数
          props:[],
          // 品牌
          trademark:"",

        }
      }
    },
    computed:{
      // mapgetter直接用数组来接受，因为已经简化过了
      ...mapGetters(['goodsList']),
      // 计算排序样式的属性
      isOne(){
        return this.searchParams.order.indexOf('1')!=-1
      },
      isTwo(){
        return this.searchParams.order.indexOf('2')!=-1
      },
      isAsc(){
      return this.searchParams.order.indexOf('asc')!=-1
      },
      isDesc(){
      return this.searchParams.order.indexOf('desc')!=-1
      },
      // 计算仓库中的search数据的总数
      ...mapState({
      total: (state) => {
        return state.search.searchList.total;
      },
    }),
    },
    methods:{
      // 向服务器发送请求获取search数据，根据不同参数返回不同的数据进行展示
    // 因为发送请求不只是发一次，会根据不同的参数再发，所以把发请求的方法进行封装
      // 且可以进行多次调用
    getData(){
        // 因为会根据不同的内容有不同的参数，即参数是会改变的，所以把参数弄为响应式，即在data里面定义参数
      this.$store.dispatch('getSearchList',this.searchParams)
      },
      //删除分类的名字,并且把id也删除
      removeCategoryName(){
        // 属性值为空的字段还是会带给服务器，
        // 可以把对象当中的属性值变为undifine，这样就可以不用带给服务器
        this.searchParams.categoryName=""
        this.searchParams.category1Id=""
        this.searchParams.category2Id=""
        this.searchParams.category3Id="" 
        // 再次发送请求
        this.getData();
        // 地址栏也需要修改,利用路由跳转
        if(this.$route.params){
          this.$router.push({name:'search',params:this.$route.params})
        }
      },
      // 删除关键字
      removeKeyword(){
        this.searchParams.keyword="",
        this.getData();
        // 因为搜索框里面的关键字是header里面keyword属性
        // 所以删除的时候应该通过全局事件总线去删除
      // 全局事件总线触发事件
        this.$bus.$emit('clear')
           // 地址栏也需要修改,利用路由跳转
           if(this.$route.query){
          this.$router.push({name:'search',query:this.$route.query})
        }
      },
      // 自定义事件回调
      trademarkInfo(trademark){
        // 1.整理品牌的参数："id:品牌名称"
        this.searchParams.trademark=`${trademark.tmId}:${trademark.tmName}`
      // 2.发送请求
      this.getData();
      },
      // 删除品牌
      removeTrademark(){
        this.searchParams.trademark="";
        this.getData();
      },
        // 品牌属性
        attrInfo(attr,attrValue){
        // 格式：[属性id:属性值：属性名]
        let props=`${attr.attrId}:${attrValue}:${attr.attrName}`;
        // 数组去重
        if(this.searchParams.props.indexOf(props)==-1){
          this.searchParams.props.push(props)
        }
        this.getData();
      },
      // 删除品牌属性
    // 因为品牌属性是数组，删除数组中的某个值，可以使用splice方法，但前提是要知道她的索引值
    // 所以点击的时候要传递索引值
      removeAttr(index){
        this.searchParams.props.splice(index,1)
        this.getData();
      },
      // 排序
      changeOrder(flag){
        // flag是判断是综合还是价格，1代表综合，2代表价格
      // 获取开始的状态
      let originOrder=this.searchParams.order;
      let originFlag=this.searchParams.order.split(":")[0];
      let originSort=this.searchParams.order.split(":")[1];
      let newOrder="";
      // 根据点击前的开始的状态判断点击的是综合还是价格
      if(flag==originFlag){
        newOrder=`${originFlag}:${originSort=="desc"?"asc":"desc"}`;

      }else{
        // 点击的是价格后，首先开始的默认是desc，再次点击时，又会把前面的逻辑进行判断
        // 即又会根据点击的跟原始的判断
        newOrder=`${flag}:${"desc"}`;
      }

      this.searchParams.order=newOrder;
      this.getData();

      
      },

      // 分页器
      getPage(pageNo){
        // console.log(pageNo);
        this.searchParams.pageNo=pageNo;
        this.getData();
      }
    
    },
    // 数据监听：监听组件实例身上的属性的属性值变化
    watch:{
      // 监听路由信息是否发生变化，若发生变化，则更新参数信息并重新发起请求
      $route(newValue,oldValue){
      Object.assign(this.searchParams,this.$route.query,this.$route.params)
      
        this.getData();
        // 每次请求完后，应该把相应的1、2、3级分类的ID为空。让他接受下一次相应的1、2、3id
        this.searchParams.category1Id="";
        this.searchParams.category2Id="";
        this.searchParams.category3Id="";
  // console.log(this.searchParams);
      }
    }
  }
</script>

<style lang="less" scoped>
  .main {
    margin: 10px 0;

    .py-container {
      width: 1200px;
      margin: 0 auto;

      .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;

          li {
            display: inline-block;
            line-height: 18px;

            a {
              color: #666;
              text-decoration: none;

              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }

        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;

          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;

            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }

            &:hover {
              color: #28a3ef;
            }
          }
        }
      }

      .details {
        margin-bottom: 5px;

        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;

          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }

                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }

        .goods-list {
          margin: 20px 0;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;

              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;

                  a {
                    color: #666;

                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }

                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: -5px;
                    }
                  }
                }

                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;

                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }

                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;

                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }

                .operate {
                  padding: 12px 15px;

                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }

                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;

                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }

                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;

                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }

        .page {
          width: 733px;
          height: 66px;
          overflow: hidden;
          float: right;

          .sui-pagination {
            margin: 18px 0;

            ul {
              margin-left: 0;
              margin-bottom: 0;
              vertical-align: middle;
              width: 490px;
              float: left;

              li {
                line-height: 18px;
                display: inline-block;

                a {
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  border: 1px solid #e0e9ee;
                  margin-left: -1px;
                  font-size: 14px;
                  padding: 9px 18px;
                  color: #333;
                }

                &.active {
                  a {
                    background-color: #fff;
                    color: #e1251b;
                    border-color: #fff;
                    cursor: default;
                  }
                }

                &.prev {
                  a {
                    background-color: #fafafa;
                  }
                }

                &.disabled {
                  a {
                    color: #999;
                    cursor: default;
                  }
                }

                &.dotted {
                  span {
                    margin-left: -1px;
                    position: relative;
                    float: left;
                    line-height: 18px;
                    text-decoration: none;
                    background-color: #fff;
                    font-size: 14px;
                    border: 0;
                    padding: 9px 18px;
                    color: #333;
                  }
                }

                &.next {
                  a {
                    background-color: #fafafa;
                  }
                }
              }
            }

            div {
              color: #333;
              font-size: 14px;
              float: right;
              width: 241px;
            }
          }
        }
      }
    }
  }
</style>