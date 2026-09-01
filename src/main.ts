import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import './assets/main.css'

// ---------------------------------------------------------------------------
// Router — routes are pre-configured (Day 2D exercise)
// ---------------------------------------------------------------------------
import HomeView from './views/HomeView.vue'
import ProjectsView from './views/ProjectsView.vue'
import ContactView from './views/ContactView.vue'
import NotFoundView from './views/NotFoundView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomeView },
    { path: '/projects', component: ProjectsView },
    { path: '/contact', component: ContactView },
    //  Day 2D: add 404 catch-all route
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundView }
  ]
})

// ---------------------------------------------------------------------------
// App
// ---------------------------------------------------------------------------
createApp(App).use(router).mount('#app')
