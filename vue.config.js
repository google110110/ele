module.exports = {
    devServer: {
      proxy: {
        '/api':{
            target:'http//196.128.6.23',
            changeOrigin:true
        }
      }
    },
    // publicPath:'/ele'
    // publicPath:'./',
    // publicPath:'./',
    // baseUrl: './',
  }