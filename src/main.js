import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import BootstrapVue3 from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  legacy: false,
  locale: 'zh-TW',
  fallbackLocale: 'en-US',
  messages: {
    'zh-TW': require('./locales/zh-TW.json'),
    'en-US': require('./locales/en-US.json'),
  },
})
const app = createApp(App)
app.use(store)
app.use(router)
app.use(BootstrapVue3)
app.use(ElementPlus)
app.use(i18n)
app.mount('#app')
