import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource);

import $ from 'jquery';
import Slider from '../assets/js/zSlider.js';

import auth from './auth'
import config from './config'

var loadingScreen = new Vue({
	el: '#loadingScreen',
	data: {
		explanations: [],
		visible: true,
	},
	methods: {
		onLoad: function () {
			var that = this;
			$.ajax({
			    type: "GET",
			    url: API.endpoint + '/explanation/' + API.lang,
			    error: function (response, ajaxOptions, thrownError) {
			        alert('Error ' + response.status + ': ' + response.statusText);
			    },
			}).done(function(data) {
				if (data.status == 'OK') {
					$.each(data.result.data, function(x, y) {
						y.icon = 'icon ' + y.icon;
						y.background = 'background-image: url("'+y.image+'")';
						// y.background = 'background-image: url("img/slider-1.jpg")';
						that.explanations.push(y);	
					});

					// need this to add a little delay
					setTimeout(function(){
						var slider = new Slider('#slider1', '.z-slide-item');
					}, 1);
				}
			});
		},
		skip: function () {
			this.visible = false;
			signUp.visible = true;
			signUp.load();
			return false;
		}
	},
	components: {
    },
});

var signUp = new Vue({
	el: '#signUp',
	data: {
		visible: false,
		step: 1,
		signup: {
			parent_name: '',
			parent_gender: '',
			parent_email: '',
			parent_password: '',
			child_name: '',
			child_gender: '',
			child_bday_d: '',
			child_bday_m: '',
			child_bday_y: ''
		},
		login: {
			email: '',
			password: ''
		}
	},
	methods: {
		load: function() {
			auth.checkAuth();
			if (auth.user.authenticated) {
				this.step = 9;
			} else {
				this.step = 1;
			}
		},
		showSignupForm: function () {
			console.log(localStorage.getItem('token'));
			console.log(localStorage.getItem('user_id'));
			this.step = 5;
		},
		showLoginForm: function () {
			this.step = 2;	
		},
		showResetForm: function () {
			this.step = 3;
		},
		back: function () {
			this.step = 1;
		},
		register: function () {
			this.signup.parent_gender = 'mother';

			var credentials = {
	          	name: this.signup.parent_name,
	          	email: this.signup.parent_email,
	          	parent_type: this.signup.parent_gender,
	          	password: this.signup.parent_password,
	          	service_id: 2
	        }

	        auth.signup(this, credentials)
		},
		login: function () {
			var credentials = {
	          	Email: this.login.email,
	          	Password: this.login.password
	        }

	        auth.login(this, credentials)
		},
		logout: function () {
			auth.logout();
		}
	}
});

// loadingScreen.onLoad();
loadingScreen.skip();
signUp.logout();
