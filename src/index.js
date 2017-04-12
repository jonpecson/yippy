import Vue from 'vue'
import Home from './components/Home.vue'
import Auth from './components/Auth.vue'
import Logout from './components/Logout.vue'
import Register from './components/Register.vue'
import Timeline from './components/Timeline.vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import $ from 'jquery';
import Slider from '../assets/js/zSlider.js';

const routes = [
  { path: '/', component: Home, name: 'home' },
  { path: '/login', component: Auth, name: 'login' },
  { path: '/logout', component: Logout, name: 'logout' },
  { path: '/register', component: Register, name: 'register' },
  { path: '/timeline', component: Timeline, name: 'timeline' }
]

const router = new VueRouter({
  routes
})

const app = new Vue({
  router
}).$mount('#app')

function url(path) {
	return config.localhost + path;
}