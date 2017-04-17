<template>
<div id="page-lesson">

	<div  class="panel" id="start" v-if="page == 'start'">
		<router-link :to="{ name: 'timeline'}" class="back">
			<i class="icon-back"></i>
		</router-link>

		<div id="popUp">
			<i class="big icon-yipp_apple_full"></i>
			<h3>Lesson 2: Screentime</h3>
			<p>TestIn this lesson, we will help to start the first practice appetizers</p>
			<hr>
			<span><i class="icon-yipp_check_full"></i> 5min</span>
		</div>
			
		<a href="#" v-on:click.prevent="startLesson" class="btn bottom white">Start</a>
	</div>

	<div class="panel" id="cards" v-if="page == 'cards'">
		<a v-on:click.prevent="back('start')" class="back">
			<i class="icon-yipp_check_full"></i>
		</a>
		<div class="bar">
			<span class="bar-inner"></span>
		</div>
		<router-link :to="{ name: 'timeline'}" class="home">
			<i class="icon-yipp_home_full-"></i>
		</router-link>

		<div id="knowledge-cards">
			<div id="paper-1" class="paper">

				<h3>Why?</h3>

				<p>Door een ‘als-dan’ plan te gebruiken, beschrijf je je heel specifiek welk gedrag je gaat uitvoeren in welke situatie. In plaats van een vage afspraak zoals “meer te bewegen”, maak je een specifieke afspraak met jezelf hoe en wanneer je dit gedrag gaat uitvoeren. Dit maakt de kans veel groter dat het je lukt om je doel te bereiken!</p>

				<i class="heart icon-yipp_check_full"></i>

				<div id="paper_foo1">
					<div id="paper_foo2"></div>
				</div>
			</div>

			<div id="paper-2" class="paper">

				<h3>Why?2</h3>

				<p>Door een ‘als-dan’ plan te gebruiken, beschrijf je je heel specifiek welk gedrag je gaat uitvoeren in welke situatie. In plaats van een vage afspraak zoals “meer te bewegen”, maak je een specifieke afspraak met jezelf hoe en wanneer je dit gedrag gaat uitvoeren. Dit maakt de kans veel groter dat het je lukt om je doel te bereiken!</p>

				<i class="heart icon-yipp_check_full"></i>

				<div id="paper_foo1">
					<div id="paper_foo2"></div>
				</div>
			</div>
		</div>

	</div>
		
	<div class="panel" id="stack" v-if="page == 'stack'">
		<a v-on:click.prevent="back('cards')" class="back">
			<i class="icon-yipp_check_full"></i>
		</a>
		<div class="bar">
			<span class="bar-inner"></span>
		</div>
		<router-link :to="{ name: 'timeline'}" class="home">
			<i class="icon-yipp_home_full-"></i>
		</router-link>

		<div class="content" v-on:click.prevent="next('complete')">
			
			<p class="text-center">Te weinig slapen vergroot de kans op overgewicht bij kinderen, omdat:</p>
			
			<ul>
				
				<li>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </li>
				<li>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </li>
				<li>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </li>
				<li>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </li>
				
			</ul>

		</div>

	</div>
			
	<div class="panel" id="complete" v-if="page == 'complete'">
		<a v-on:click.prevent="back('stack')" class="back">
			<i class="icon-yipp_check_full"></i>
		</a>
		<div class="bar">
			<span class="bar-inner"></span>
		</div>
		<router-link :to="{ name: 'timeline'}" class="home">
			<i class="icon-yipp_home_full-"></i>
		</router-link>

		<div class="content">
		
			<h1>Les compleet!</h1>
			
			<i class="biggest icon-yipp_check_full"></i>
			
			<p class="text-center">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.</p>
			
			
			<div class="bottom">
				<router-link :to="{ name: 'challenge'}" class="btn white">
				Start Challenge
				</router-link>

				<br>
				<a href="" v-on:click.prevent="back('start')" class="btn white">Reset Lesson</a>
			</div>
		
		</div>

	</div>

	<modal v-if="showModal" @close="showModal = false">
        <h3 slot="header">Lorem Ipsum</h3>
        <p slot="body">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
    </modal>

</div>
	
</template>

<script>
import {router} from '../index'
import config from '../config'
import auth from '../api/auth'
import timeline from '../api/timeline'
import $ from 'jquery'

import Modal from '../components/Modal.vue'

import 'hammerjs/hammer.js'

// http://dev.fedvas.com/cms/api.dsuite/yipp/todos/37/en

import Vue from 'vue'
var VueTouch = require('vue-touch')
Vue.use(VueTouch, {name: 'v-touch'})

export default {
    data() {
        return {
            child: {},
            page: 'start',
            levels: [],
            lessons: [],
            showModal: false,
            currentLesson: 1
        }
    },
    created: function() {
        auth.check();
        if (!auth.authenticated) {
            this.redirectGuest();
        }
	    
	    this.currentLesson = 37;
	    this.getLesson();
    },
    methods: {
    	getLesson: function () {
            var that = this;

            timeline.lesson(this, this.currentLesson, function (response) {
                console.log(response)

                var counter = 0;
                $.each(response.todos.todos, function (index, content) {
                    switch (content.card_type) {
                    	case 'knowledge':

                    	break;

                    	case 'multiple_choice':

                    	break;

                    	case 'list_field':

                    	break;

                    	case 'sliders':

                    	break;
                    }
                });
            }, function (msg, response) {
                that.logError(msg);
            });
        },
    	startLesson: function () {
    		this.page = 'cards';

    		var that = this;
    		setTimeout(function(){
    			$('#knowledge-cards .paper').css('display', 'none');
	        	$('#knowledge-cards .paper:first-child').css('display', 'block');

    			$('#knowledge-cards .paper').each(function () {
    				var stage = $(this);
    				that.initSwipe(this);
    			});
	        }, 1);
    	},
    	initSwipe: function (elem) {
    		var that = this;
    		var swipeSpeedDelay = 700;
    		var swipeSpeedFadeIn = 400;

    		// var stage = elem;
    		var mc = new Hammer.Manager(elem);
    		mc.add( new Hammer.Swipe({ event: 'swipe' }) );

    		var object = $(elem);
    		mc.on('swipe', function(event){
        		console.log(event)
			    event.preventDefault();
			    var item = $(event.target);

			    if (event.direction == 4) { // swipe to the right
			    	item.addClass('rotate-left').delay(swipeSpeedDelay).fadeOut(1);
			    }

			    if (event.direction == 2) { // swipe to the left
			    	item.addClass('rotate-right').delay(swipeSpeedDelay).fadeOut(1);
			    }

			    if ( item.is(':last-child') ) {
					setTimeout(function(){
		    			that.next('complete')
			        }, swipeSpeedDelay);
				} else {
					item.next().removeClass('rotate-left rotate-right').fadeIn(swipeSpeedFadeIn);
				} 
			});
    	},
    	back: function (page) {
    		this.page = page;
    	},
    	next: function (page) {
    		this.page = page;
    	},
      	redirectGuest: function()
        {
        	this.$router.push('login');
        }  
    },

    watch: {
		'$route' (to, from) {
			console.log(to);
	  		this.currentLesson = to;
		}
	},

    components: { 
        Modal 
    },
}

</script>