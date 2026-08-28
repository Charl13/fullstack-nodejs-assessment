const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    allowedHosts: (process.env.DEV_SERVER_ALLOWED_HOSTS || 'localhost').split(
      ',',
    ),
  },
})
