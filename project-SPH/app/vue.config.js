const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // 不要打包后的js中的map文件
  productionSourceMap:false,
  transpileDependencies: true,
  lintOnSave:false,
  // 代理跨域
  devServer:{
    proxy:{
      '/api':{
        target:'http://gmall-h5-api.atguigu.cn',
        ws:true,
        // target:'http://localhost:3000',
        changOrigin: true,//允许跨域
        

       
        
      }
    }
  }
})
