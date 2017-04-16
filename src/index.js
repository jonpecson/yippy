import Vue from 'vue'
import Home from './components/Home.vue'
import Auth from './components/Auth.vue'
import Logout from './components/Logout.vue'
import Register from './components/Register.vue'
import Timeline from './components/Timeline.vue'
import Emergency from './components/Emergency.vue'
import Lesson from './components/Lesson.vue'
import Challenge from './components/Challenge.vue'
import ChallengeNew from './components/ChallengeNew.vue'
import ChallengeContent from './components/ChallengeContent.vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import VueCookie from 'vue-cookie'
Vue.use(VueCookie);

const routes = [
  { path: '/', component: Home, name: 'home' },
  { path: '/login', component: Auth, name: 'login' },
  { path: '/logout', component: Logout, name: 'logout' },
  { path: '/register', component: Register, name: 'register' },
  { path: '/timeline', component: Timeline, name: 'timeline' },
  { path: '/emergency', component: Emergency, name: 'emergency' },
  { path: '/lesson-:id', component: Lesson, name: 'lesson' },
  { path: '/challenge', component: Challenge, name: 'challenge' },
  { path: '/challenge-new', component: ChallengeNew, name: 'challenge_new' },
  { path: '/challenge-:id', component: ChallengeContent, name: 'challenge_content' }
]

const router = new VueRouter({
  routes
})

const app = new Vue({
  router
}).$mount('#app')
