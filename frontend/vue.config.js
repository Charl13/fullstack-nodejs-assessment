const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    allowedHosts: process.env.DEV_SERVER_ALLOWED_HOSTS.split(','),
    proxy: {
      '/api': {
        target: process.env.API_URL,
        changeOrigin: true,
      },
    },
  },
})
