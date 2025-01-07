import { createApp } from 'vue'
import { createPinia } from 'pinia';
import './styles/index.css'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
const pinia = createPinia();
const app = createApp(App)
app.use(pinia)
app.use(Antd)
app.mount('#app')