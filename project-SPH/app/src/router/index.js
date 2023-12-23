// 配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'
// 使用插件
Vue.use(VueRouter)
// 引入路由组件

import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import store from '@/store'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import myOrder from '@/pages/Center/myOrder'
import groupOrder from '@/pages/Center/groupOrder'


// 配置路由
const router = new VueRouter({
    routes:[
        {
            path:'/center',
            name:'center',
            component:()=>import('@/pages/Center'),
            // component:Center,
            meta:{
                show:true
            },
            children:[
                {
                    path:'/center/myorder',
                    name:'myOrder',
                        component:()=>import('@/pages/Center/myOrder'),

                    // component:myOrder,
                },
                {
                    path:'/center/groupOrder',
                    name:'groupOrder',
                    component:()=>import('@/pages/Center/groupOrder'),

                    // component:groupOrder,
                },
                // 重定向
                {
                    path:'/center',
                    redirect:'/center/myOrder'
                },
            ]
        },
        {
            path:'/paysuccess',
            name:'paysuccess',
            component:()=>import('@/pages/PaySuccess'),

            // component:PaySuccess,
            meta:{
                show:true
            }
        },
        {
            path:'/pay',
            name:'pay',
            component:()=>import('@/pages/Pay'),

            // component:Pay,
              // 路由独立守卫
              beforeEnter: (to, from, next) => {
                if(from.path =='/trade'||'/pay'){
                    next()
                }else{
                    // 中断当前的路由，即当手动切换到下一个路由时，会返回到原来的路由，即从哪里来到哪里去
                    next(false);
                }
            },
            meta:{
                show:true
            }
        },
        {
            path:'/trade',
            name:'trade',
            component:()=>import('@/pages/Trade'),

            // component:Trade,
            // 路由独立守卫
            beforeEnter: (to, from, next) => {
                if(from.path=='/shopcart'||'/trade'){
                    next()
                }else{
                    // 中断当前的路由，即当手动切换到下一个路由时，会返回到原来的路由，即从哪里来到哪里去
                    next(false);
                }
            },
            meta:{
                show:true
            }
        },
        {
            path:'/shopcart',
            name:'shopcart',
            component:()=>import('@/pages/ShopCart'),

            // component:ShopCart,
            meta:{
                show:true
            }
        },
        {
            path:'/addcartsuccess',
            name:'addcartsuccess',
            component:()=>import('@/pages/AddCartSuccess'),
            // component:AddCartSuccess,
            meta:{
                show:true
            }
        },
        {
            path:'/detail/:skuId',
            name:'detail',
            component:()=>import('@/pages/Detail'),
            // component:Detail,
            meta:{
                show:true
            }
        },
        {
            path:'/home',
            // 路由懒加载，即当路由被访问的时候才会加载对应的组件，使其更高效
                // component:Home,
            component:()=>import('@/pages/Home'),
            meta:{
                show:true
            }
        },
        {
            name:'search',
            // 如果路由要求传递params参数，但是你不传params参数，就会发现浏览器url有问题
            //所以指定params参数： 在占位符后面加个?表示参数可以传，或者不传
            path:'/search/:keyword?',
            component:Search,
            meta:{
                show:true
            },
            // 路由组件能不能传递props数据
            // 1.布尔值写法，但只适用params传参
            // props:true,//在search页面接受写：props：['keyword'],直接获取参数keyword
            // 2.对象写法：额外的给路由组价传递一些props
            // props:{a:1,b:2}
            // 3.函数写法
            props:($route)=>{
                return {keyword:$route.params.keyword,k:$route.query.k}
            }
        },
        {
            path:'/login',
            component:Login,
            meta:{
                show:false
            }
        },
        {
            path:'/register',
            component:Register,
            meta:{
                show:false
            }
        },
        {
            // 重定向
            path:'/',
            redirect:'/home'
        },
    ],
    // 滚动行为
    scrollBehavior(to,from,savedPosition){
    //    表示滚动条距离顶部的位置
        return {y:0};
    }
})

// 全局守卫，全局前置路由
router.beforeEach(async(to,from,next)=>{
    // 用户登录了才会有token，没登录就没有
    let token=store.state.user.token;
   let name=store.state.user.userInfo.name;
    if(token){
        // 用户登录了，就不能再去login页面，停留在homeyemin
        if(to.path=='/login'||to.path=='/register'){
            next('/home')
        }else{
            // 登录了，去的不是login页面
            // 但要注意，要判断是否派发了根据token获取用户数据的方法
            // 即看state中的userInfo的数据有没有，如果派发了，当前页面才会获取根据不同的token获取的不同数据，
            // 所以要判断
            if(name){
                next();
            }else{
                // 没有用户数据，则派发
               try {
                
                 // 根据token获取用户信息数据
                await store.dispatch('getUserMessage')
                // 获取用户信息成功
                next()
               } catch (error) {
                // alert(error.message)
                // token 失效，清除token数据，重新登录
                await store.dispatch('userLogout');
                next('/login')
               }
               
            }
        }
    }else{
        // 未登录时
        let topath=to.path;
        if(topath.indexOf('/trade')!=-1||topath.indexOf('/pay')!=-1||topath.indexOf('/paysuccess')!=-1||topath.indexOf('/center')!=-1){
            next('/login?redirect='+topath);
        }else{
            next();
        }


    }
})
export default router