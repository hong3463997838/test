// 导入mock模块
import Mock from 'mockjs'
// 导入json数据
// 注意：webpack默认对外暴露：图片、JSON格式
import banner from './banner.json'
import floor from './floor.json'
// mockServe.js是js文件，所以需要在入口文件使用，使其有数据
// mock 数据库，第一个参数为请求地址，第二个参数为请求数据
Mock.mock("/mock/banner",{code:200,data:banner});
Mock.mock("/mock/floor",{code:200,data:floor});
