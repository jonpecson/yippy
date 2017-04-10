import Vue from 'vue'
import Home from './components/Home.vue'
import Auth from './components/Auth.vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import $ from 'jquery';
import Slider from '../assets/js/zSlider.js';

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Auth }
]

const router = new VueRouter({
  routes // short for routes: routes
})

const app = new Vue({
  router
}).$mount('#app')