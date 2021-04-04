import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//import http from './services/api/service.js'

import './index.css'

const app = createApp(App)

app.use(store)
app.use(router)
app.mount('#app')
