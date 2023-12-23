// 配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'
// 使用插件
Vue.use(VueRouter)
import Home from '@/views/Home'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Logout from '@/views/Logout'
import My from '@/views/My'
import Help from '@/views/Help'
import Teacher from '@/views/Teacher'
import teacherIntroduction from '@/views/teacherIntroduction'
import Resource from '@/views/Resource'
import resourcePdf from '@/views/resourcePdf'
import famousTeach from '@/views/famousTeach'
import questionBank from '@/views/questionBank'
import Select from '@/views/questionBank/component/Select'
import submitPaper from '@/views/questionBank/component/submitPaper'
import Analyze from '@/views/questionBank/component/Analyze'
import topicRecord from '@/views/topicRecord'



// 配置路由路径
const router=new VueRouter({
    routes:[
        {
            path:'/coursevideo/:sid?',
            name:'courseVideo',
            component:()=>import ('@/views/courseStudy/courseVideo'),
            children:[
                {
                    path:'/coursevideo/:sid?/detail',
                    name:'courseDetail',
                    component:()=>import('@/views/courseStudy/courseVideo/courseDetail')
                },
                {
                    path:'/coursevideo/:sid?/assess',
                    name:'courseAssess',
                    component:()=>import('@/views/courseStudy/courseVideo/courseAssess')
                },
            ]
        },
        {
            path:'/coursestudy/:cid?/:categoryid?',
            name:'courseStudy',
            component:()=>import ('@/views/courseStudy')
        },
        {
            path:'/recordOperate/history',
            name:'recordOperateHistory',
            component:()=>import('@/views/topicRecord/recordOperate'),
            
        },
        {
            path:'/recordOperate/collect',
            name:'recordOperateCollect',
            component:()=>import('@/views/topicRecord/recordOperate'),
            
        },
        {
            path:'/recordFill/history',
            name:'recordFillHistory',
            component:()=>import('@/views/topicRecord/recordFill'),
            
        },
        {
            path:'/recordFill/collect',
            name:'recordFillCollect',
            component:()=>import('@/views/topicRecord/recordFill'),
            
        },
        {
            path:'/recordSelect/history',
            name:'recordSelectHistory',
            component:()=>import('@/views/topicRecord/recordSelect'),
            
        },
        {
            path:'/recordSelect/error',
            name:'recordSelectError',
            component:()=>import('@/views/topicRecord/recordSelect'),
            
        },
        {
            path:'/recordSelect/collect',
            name:'recordSelectCollect',
            component:()=>import('@/views/topicRecord/recordSelect'),
            
        },
        {
            path:'/topicrecord',
            name:'topicRecord',
            // 组件懒加载
            component:()=>import('@/views/topicRecord'),
           
         redirect:'/topicrecord/select',
          
            children:[
                {
                    path:'/topicrecord/select',
                    name:'topicrecordSelect',
                    component:()=>import('@/views/topicRecord/topicrecordSelect'),
                   redirect:'/topicrecord/select/history',
                   children:[
                    {
                        path:'/topicrecord/select/history',
                        name:'selectHistory',
                    component:()=>import('@/views/topicRecord/topicrecordSelect'),

                    },
                    {
                        path:'/topicrecord/select/error',
                        name:'selectError',
                    component:()=>import('@/views/topicRecord/topicrecordSelect'),

                    },
                    {
                        path:'/topicrecord/select/collect',
                        name:'selectCollect',
                    component:()=>import('@/views/topicRecord/topicrecordSelect'),

                    },
                   ]
                },
                {
                    path:'/topicrecord/fill',
                    name:'topicrecordFill',
                    component:()=>import('@/views/topicRecord/topicrecordFill'),
                   redirect:'/topicrecord/fill/history',
                   children:[
                    {
                        path:'/topicrecord/fill/history',
                        name:'fillHistory',
                    component:()=>import('@/views/topicRecord/topicrecordFill'),

                    },
                    {
                        path:'/topicrecord/fill/collect',
                        name:'fillCollect',
                    component:()=>import('@/views/topicRecord/topicrecordFill'),

                    },
                   ]
                },
                {
                    path:'/topicrecord/operate',
                    name:'topicrecordOperate',
                    component:()=>import('@/views/topicRecord/topicrecordOperate'),
                    redirect:'/topicrecord/operate/history',
                    children:[
                     {
                         path:'/topicrecord/operate/history',
                         name:'operateHistory',
                     component:()=>import('@/views/topicRecord/topicrecordOperate'),
 
                     },
                     {
                         path:'/topicrecord/operate/collect',
                         name:'operateCollect',
                     component:()=>import('@/views/topicRecord/topicrecordOperate'),
 
                     },
                    ]
                },
               
               
               
            ]
        },
        {
            path:'/analyze/select/:cid/:cateid',
            name:'AnalyzeSelect',
            // 组件懒加载
            component:()=>import('@/views/questionBank/component/Analyze')
        },
        {
            path:'/analyze/fill/:cid/:cateid',
            name:'AnalyzeFill',
            // 组件懒加载
            component:()=>import('@/views/questionBank/component/Analyze')
        },
        {
            path:'/analyze/operate/:cid/:cateid',
            name:'AnalyzeOperate',
            // 组件懒加载
            component:()=>import('@/views/questionBank/component/Analyze')
        },
        {
            path:'/submitpaper/operate/:cid/:cateid',
            name:'submitPaperOperate',
            // 组件懒加载
            component:()=>import('@/views/questionBank/component/submitPaper')
        },
        {
            path:'/submitpaper/fill/:cid/:cateid',
            name:'submitPaperFill',
            // 组件懒加载
            component:()=>import('@/views/questionBank/component/submitPaper')
        },
        {
            path:'/submitpaper/select/:cid/:cateid',
            name:'submitPaperSelect',
            // 组件懒加载
            component:()=>import('@/views/questionBank/component/submitPaper')
        },
        {
            path:'/fill/:cid?/:cateid?',
            name:'Fill',
            // 组件懒加载
            component:()=>import('@/views/questionBank/component/Select')
        },
        {
            path:'/operate/:cid?/:cateid?',
            name:'Operate',
            // 组件懒加载
            component:()=>import('@/views/questionBank/component/Select')
        },
        {
            path:'/select/:cid?/:cateid?',
            name:'Select',
            // 组件懒加载
            component:()=>import('@/views/questionBank/component/Select'),
            //   // 3.函数写法
            // props:($route)=>{
            //     return {keyword:$route.params.keyword,k:$route.query.k}
            // }
        },
        {
            path:'/questionbank/:cid?/:cateid?',
            name:'questionBank',
            // 组件懒加载
            component:()=>import('@/views/questionBank'),
         
        },
        {
            path:'/famousteach/:cid?/:tid?',
            name:'famousTeach',
            // 组件懒加载
            component:()=>import('@/views/famousTeach'),
         
        },
        {
            path:'/resourcepdf/:rid',
            name:'resourcePdf',
            // 组件懒加载
            component:()=>import('@/views/resourcePdf'),
        },
        {
            path:'/resource/:cid?/:categoryid?',
            name:'Resource',
            // 组件懒加载
            component:()=>import('@/views/Resource')
        },
        {
            name:'Teacher',
            // 如果路由要求传递params参数，但是你不传params参数，就会发现浏览器url有问题
            //所以指定params参数： 在占位符后面加个?表示参数可以传，或者不传
            path:'/teacher/:cid?',
            component:()=>import('@/views/Teacher'),
         
            // 路由组件能不能传递props数据
            // 1.布尔值写法，但只适用params传参
            // props:true,//在search页面接受写：props：['keyword'],直接获取参数keyword
            // 2.对象写法：额外的给路由组价传递一些props
            // props:{a:1,b:2}
            // 3.函数写法
            // props:($route)=>{
            //     return {keyword:$route.params.keyword,k:$route.query.k}
            // }
        },
        {
            path:'/teacherintroduction/:tid',
            name:'teacherIntroduction',
            // 组件懒加载
            component:()=>import('@/views/teacherIntroduction')
        },
        {
            path:'/my',
            name:'My',
            // 组件懒加载
            component:()=>import('@/views/My'),
            children:[
                {
                    path:'/my/mymessage',
                    name:'myMessage',
                    component:()=>import('@/views/My/myMessage'),
                },
                {
                    path:'/my/modifypassword',
                    name:'modifyPassword',
                    component:()=>import('@/views/My/modifyPassword'),
                },
                {
                    path:'/my/privacy',
                    name:'Privacy',
                    component:()=>import('@/views/My/Privacy'),
                },
               
                // 重定向
                {
                    path:'/my',
                    redirect:'/my/mymessage'
                },
            ]
        },
        {
            path:'/home',
            name:'Home',
            // 组件懒加载
            component:()=>import('@/views/Home')
        },
       
        {
            path:'/help',
            name:'Help',
            // 组件懒加载
            component:()=>import('@/views/Help'),
            children:[
                {
                    path:'/help/introduction',
                    name:'Introduction',
                    component:()=>import('@/views/Help/Introduction'),
                },
                {
                    path:'/help/declare',
                    name:'Declare',
                    component:()=>import('@/views/Help/Declare'),
                },
                {
                    path:'/help/agreement',
                    name:'Agreement',
                    component:()=>import('@/views/Help/Agreement'),
                },
                {
                    path:'/help/notice',
                    name:'Notice',
                    component:()=>import('@/views/Help/Notice'),
                },
                {
                    path:'/help/lostpassword',
                    name:'lostPassword',
                    component:()=>import('@/views/Help/lostPassword'),
                },
                {
                    path:'/help/contact',
                    name:'Contact',
                    component:()=>import('@/views/Help/Contact'),
                },
                {
                    path:'/help/register',
                    name:'helpRegister',
                    component:()=>import('@/views/Help/helpRegister'),
                },
                {
                    path:'/help/leavemessage',
                    name:'leaveMessage',
                    component:()=>import('@/views/Help/leaveMessage'),
                },
                // 重定向
                {
                    path:'/help',
                    redirect:'/help/introduction'
                },
            ]
        },
        {
            path:'/login',
            name:'Login',
            // 组件懒加载
            component:()=>import('@/views/Login')
        },
        {
            path:'/logout',
            name:'Logout',
            // 组件懒加载
            component:()=>import('@/views/Logout')
        },
        {
            path:'/register',
            name:'Register',
            // 组件懒加载
            component:()=>import('@/views/Register')
        },
       
        // 重定向
        {
            path:'/',
            redirect:'/home'
        }
    ],
      // 滚动行为
      scrollBehavior(to,from,savedPosition){
        console.log(to.path);
        if(to.path.includes('coursevideo') && to.path.includes('detail')){
            return{y:600}
        }else if(to.path.includes('coursevideo') && to.path.includes('assess')){
            return{y:600}

        }else{
            //    表示滚动条距离顶部的位置
            return {y:0};
        }
        
        }
})

export default router