import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store, { key } from './store'
import 'normalize.css/normalize.css'
import installElementPlus from './plugins/element'
import { ElMessageBox, ElMessage, ElNotification } from 'element-plus'

import '@/styles/index.scss'
import initSvgIcon from '@/icons/index'
const app = createApp(App)
app
  .use(store, key)
  .use(router)
  .use(installElementPlus)
  .use(initSvgIcon)
  .mount('#app')

  declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
      $message: typeof ElMessage;
      $notify: typeof ElNotification;
      $confirm: typeof ElMessageBox.confirm;
      $alert: typeof ElMessageBox.alert;
      $prompt: typeof ElMessageBox.prompt;
    }
  }