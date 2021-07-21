import { App } from 'vue'
import {
  locale,
  ElButton,
  ElMessage,
  ElNotification,
  ElMessageBox,
  ElMenu,
  ElMenuItem,
  ElSubmenu,
  ElCol,
  ElBreadcrumb,
  ElBreadcrumbItem
} from 'element-plus'
import lang from 'element-plus/lib/locale/lang/zh-cn'
import 'element-plus/lib/theme-chalk/index.css'
// import locale from 'element-plus/lib/locale'
import 'dayjs/locale/zh-cn'

export type Size = 'default' | 'medium' | 'small' | 'mini'
export default (app: App) => {
  locale(lang)
  const components = [
    ElButton,
    ElMessage,
    ElNotification,
    ElMessageBox,
    ElMenu,
    ElMenuItem,
    ElSubmenu,
    ElCol,
    ElBreadcrumb,
    ElBreadcrumbItem
  ]
  components.forEach(component => {
    app.component(component.name, component)
  })
  app.config.globalProperties.$message = ElMessage
  app.config.globalProperties.$notify = ElNotification
  app.config.globalProperties.$confirm = ElMessageBox.confirm
  app.config.globalProperties.$alert = ElMessageBox.alert
  app.config.globalProperties.$prompt = ElMessageBox.prompt

  app.config.globalProperties.$ELEMENT = {
    size: 'medium'
  }
}
