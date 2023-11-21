import { createApp } from 'vue'
import App from './App.vue'
import './css/main.css';

createApp(App).mount('#app')

if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
} else {
    document.documentElement.classList.remove('dark')
}
