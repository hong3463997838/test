<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for=" cart in  cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cart.isChecked==1" @click="modifyChecked(cart)">
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl">
            <div class="item-msg">{{cart.skuName}}</div>
          </li>
         
          <li class="cart-list-con4">
            <span class="price">{{cart.skuPrice}}.00</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handler('minus',-1,cart)">-</a>
            <input autocomplete="off" type="text" :value="cart.skuNum" minnum="1" class="itxt" @change="handler('change',$event.target.value*1,cart)">
            <a href="javascript:void(0)" class="plus" @click="handler('add',-1,cart)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuPrice *cart.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a  class="sindelet" @click="deleteCart(cart)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllChecked && cartInfoList.length>0" @change="AllChecked">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCartChecked">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{ isCheckedNum }}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="goTrade">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
// 节流
import throttle from "lodash/throttle"

  export default {
    name: 'ShopCart',
    mounted(){
      // 获取购物车的数据
      this.getData();
    },
    methods:{
      getData(){
        // 派发请求
        this.$store.dispatch('getCartList')
      },
      // 处理产品数量的修改，加或减
      // 传递三个参数
      // 1.type类型，因为+、-或输入框，这三者做的事情是一样的，即就是修改购物车的数字发送请求等，所以用同一个函数handler来写
      // 为了区分点击的是谁，所以点击的时候加上type参数
      // 2.disNum,变化量，正数表示+，负数表示减，因为接口的相关，所以用变化量来进行，而+用+1，-用-1表示
      // 3.cart是购物车的相关数据，里面有对应的点击的id

      // 使用节流，防止操作太快
      // 两者都是函数，使用key-value写法

      handler:throttle(async function(type,disNum,cart){
    // 1.根据类型判断
    switch(type){
          case 'add':
            disNum=1;
          break;
          case 'minus':
            disNum=cart.skuNum>1?-1:0
            break;
          case 'change':
            if(isNaN(disNum)|| disNum<1){
              disNum=0
            }else{
              // 当前的值减去原本购物车的值等于变化的值
            disNum=parseInt(disNum)-cart.skuNum
            }
            break;
        }
        // 发送请求---修改购物车数据的请求，即加入购物车的请求，将修改的数据发给购物车连接
        // 在根据请求成功与否，再来判断是否发送获取修改后的购物车的数据
        // 因为addOrUpdateShopCart在仓库中已经写过Promise的成功或失败的返回值，
        try {
          await   this.$store.dispatch('addOrUpdateShopCart',{skuId:cart.skuId,skuNum:disNum})
          // 请求发送获取修改后的购物车的数据，即更新页面数据
          this.getData();

        } catch (error) {
          console.log(Promise.reject(new Error('faile')));
        }

    },1000),


      // 删除购物车数据
      async  deleteCart(cart){
        // 判断成功与否
        try {
        await this.$store.dispatch('deleteCart',cart.skuId)
             // 请求发送获取删除后的购物车的数据，即更新页面数据
             this.getData();
        } catch (error) {
          alert(error.message)
        }
      },
      // 修改勾选框的状态
      modifyChecked(cart){
        if(cart.isChecked==1){
          cart.isChecked=0
        }else{
          cart.isChecked=1
        }
      },
        // 点击全选
        AllChecked(){
          // this.isAllChecked是下面computed 中计算出来的，就是看每个数据中的isChecked是否为1
          if(this.isAllChecked){
              this.cartInfoList.forEach(item=>{
          item.isChecked=0
        })
          }else{
            this.cartInfoList.forEach(item=>{
          item.isChecked=1
        })
          }
      },
      // 删除被选中的产品
     async deleteAllCartChecked(){
        // try catch 判断成功与否
        try {
       await this.$store.dispatch('deleteAllCartChecked')
          this.getData()
        } catch (error) {
          alert(error.message)
        }
      },
      // 去结算页面
      goTrade(){
        this.$router.push('/trade')
      }
    },
    computed:{
      ...mapGetters(['cartList']),
      // 购物车数据
      cartInfoList(){
        return this.cartList.cartInfoList||[]
      },
      // 是否全选
      isAllChecked(){
        // 通过数据every遍历每个ischecked,若每个都为1，则返回值为true，反之为flase
       return  this.cartInfoList.every(item=>item.isChecked==1)
      },
    
            // 总价
      totalPrice(){
        let sum=0;
        this.cartInfoList.forEach(item => {
          // 勾选的产品才回去计算总价
          if(item.isChecked==1){
           sum+=item.skuNum*item.skuPrice
          }
    
        });
        return sum
      },
      // 已选商品个数，根据isChecked的数量
      isCheckedNum(){
        let sum=0;
        this.cartInfoList.forEach(item=>{
          if(item.isChecked==1){
            sum++
          }
        });
        return sum
      }
    }
      }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          .cart-list-con4 {
            width: 10%;

          }

          .cart-list-con5 {
            width: 17%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 13%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>