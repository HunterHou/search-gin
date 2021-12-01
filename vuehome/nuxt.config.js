
export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  server: {
    port: 8000, // default: 3000
    host: '0.0.0.0', // default: localhost
    },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'vuehome',
    htmlAttrs: {
      lang: 'zh-cn'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'element-ui/lib/theme-chalk/index.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios', "@nuxtjs/proxy"
  ],


  axios: {
    proxyHeaders: true,
    proxy:true,  // 表示开启代理
    // prefix:'/api',// 表示给请求url加个前缀 /api
    withCredentials: true,
    headers: { 'Content-Type': 'application/json', 'crossDomain': true },
    timeout: 5000,

  },

  proxy:{
    '/api': {
      target: "http://localhost:80", // 目标服务器
      pathRewrite: {
        '^/api': '/api' ,// 把 /api 替换成 /api
      },
      changeOrigin: true, // 表示是否跨域
    }
  },
  router:{
    base:'/'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
  }
}
