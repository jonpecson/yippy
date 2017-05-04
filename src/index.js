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
import ChallengeDetails from './components/ChallengeDetails.vue'
import Cheatsheet from './components/Cheatsheet.vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import VueCookie from 'vue-cookie'
Vue.use(VueCookie);

var VueTouch = require('vue-touch')
Vue.use(VueTouch, {name: 'v-touch'})

const routes = [
  { path: '/', component: Home, name: 'home' },
  { path: '/login', component: Auth, name: 'login' },
  { path: '/newpassword', component: Auth, name: 'newpassword' },
  { path: '/logout', component: Logout, name: 'logout' },
  { path: '/register', component: Register, name: 'register' },
  { path: '/timeline', component: Timeline, name: 'timeline' },
  { path: '/emergency', component: Emergency, name: 'emergency' },
  { path: '/lesson-:id', component: Lesson, name: 'lesson' },
  { path: '/challenge', component: Challenge, name: 'challenge' },
  { path: '/challenge-new', component: ChallengeNew, name: 'challenge_new' },
  { path: '/cheatsheet-:id', component: Cheatsheet, name: 'cheatsheet' },
  { path: '/feedback-:id', component: ChallengeDetails, name: 'feedback' }
]

const router = new VueRouter({
  routes
})

const app = new Vue({
  router
}).$mount('#app')
