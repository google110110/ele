module.exports = {
    devServer: {
      proxy: {
        '/api':{
            target:'http//196.128.6.23',
            changeOrigin:true
        }
      }
    },
    //项目根路径问题
<<<<<<< HEAD
    // publicPath:'/ele'
    publicPath:'./',
=======
    publicPath:'/ele'
    // publicPath:'./',
>>>>>>> bug
    // baseUrl: './',
  }