module.exports = {
  publicPath: '/',
  productionSourceMap: false,
  devServer: {
    port: 8082,
    disableHostCheck: true,
    // headers: {
    //   'Access-Control-Allow-Origin': 'http://cp2123:8086',
    //   'Access-Control-Allow-Methods': 'HEAD, GET, POST, PUT, PATCH, DELETE',
    //   'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    //   'Access-Control-Allow-Credentials': true,
    // },
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = "Process Creator";
        return args;
      })
    }
};
