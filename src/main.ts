import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'


import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import './config/yup'

const app = createApp(App)

import App from './App.vue'
import router from './router'

app.use(createPinia())
app.use(VueQueryPlugin)
app.use(router)
app.use(Toast);

app.mount('#app')
