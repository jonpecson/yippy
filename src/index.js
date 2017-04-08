import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource);

import $ from 'jquery';
import Slider from '../assets/js/zSlider.js';

// import auth from './auth'

var API = {
	'endpoint': 'http://dev.fedvas.com/cms/api.dsuite/yipp',
	'lang': 'en'
}

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
		}
	},
	methods: {
		load: function() {

		},
		showSignupForm: function () {

		},
		showLoginForm: function () {
			
		},
		showResetForm: function () {
			
		},
		back: function () {

		},
		register: function () {

		}
	}
});

loadingScreen.onLoad();

// $( document ).ready(function() {
//     
// });


