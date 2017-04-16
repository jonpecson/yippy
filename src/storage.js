import Vue from 'vue'
import VueCookie from 'vue-cookie'
Vue.use(VueCookie);

import Cookie from 'tiny-cookie'

export default {

	save(key, value, days) {
		Cookie.set(key, value, { expires: days });
	},

	get(key) {
		return Cookie.get(key);
	},

	delete(key) {
		Cookie.remove(key);
	}

}