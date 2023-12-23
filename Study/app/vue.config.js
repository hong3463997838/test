const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({

 transpileDependencies: true,
 lintOnSave:false,
 // 代理跨域
 devServer:{
   proxy:{
     '/api':{
       target:'http://localhost:3000',
       ws:true,
       changOrigin: true//允许跨域
    
     },
   
   }
 }
});

