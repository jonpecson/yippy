var API = {
	'endpoint': 'http://dev.fedvas.com/cms/api.dsuite/yipp',
	'lang': 'en'
}

const vueSwipe = VueSwipe.Swipe;
const vueSwipeItem = VueSwipe.SwipeItem;
vueSwipe.props.speed.default = 1000;
vueSwipe.props.auto.default = 6000;

var loadingScreen = new Vue({
	el: '#loadingScreen',
	data: {
		explanations: [],
		visible: true
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
    	'swipe': vueSwipe,
    	'swipe-item': vueSwipeItem
  	}
});

var signUp = new Vue({
	el: '#signUp',
	data: {
		visible: false,
		step: 1
	},
	methods: {
		load: function() {

		}
	}
});

$( document ).ready(function() {
    loadingScreen.onLoad();
});





			
