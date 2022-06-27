import { createApp } from 'vue'
import elementPlus from 'element-plus'
import { createPinia} from 'pinia'

import App from './App.vue'
import router from './route/router'

import './style/init.scss'
import '@/style/monaco-style.scss'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(router)
app.use(elementPlus)
app.use(createPinia())

app.mount('#app')

