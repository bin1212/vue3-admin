import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store, { key } from './store'
import 'normalize.css/normalize.css'
import installElementPlus from './plugins/element'
// import installElementPlus from 'element-plus'
import { ElMessageBox, ElMessage, ElNotification } from 'element-plus'

import '@/styles/index.scss'
import initSvgIcon from '@/icons/index'

const size = store.state.app.size
const app = createApp(App)
app
  .use(store, key)
  .use(router)
  .use(installElementPlus,{ size })
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