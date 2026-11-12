import { createApp } from 'vue'
import App from './App.vue'
import { setIconLoader, createPackLoader } from '@/icons'
import './css/main.css';

// The demo shows icons by name from every set, so it loads each pack on
// first use, as a chunk of its own.
setIconLoader(createPackLoader({
    solid: () => import('@fortawesome/free-solid-svg-icons'),
    regular: () => import('@fortawesome/free-regular-svg-icons'),
    brand: () => import('@fortawesome/free-brands-svg-icons'),
}))

createApp(App).mount('#app')

if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
} else {
    document.documentElement.classList.remove('dark')
}
