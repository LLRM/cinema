module.exports = {
    // publicPath: '/maoyan',
    devServer: {
        proxy: {
            '/dianying': {
                target: 'https://m.maoyan.com',
                //是否开启跨域
                changeOrigin: true, 
                //https请求需要该设置
                secure: false
            },
            '/ajax': {
                target: 'https://m.maoyan.com',
                changeOrigin: true,
                secure: false
            }
        }
    }
}