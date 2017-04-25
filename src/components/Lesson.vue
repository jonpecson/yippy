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

	<div class="panel" v-if="page == 'page_lesson'">
		<a v-on:click.prevent="back('start')" class="back">
			<i class="icon-yipp_check_full"></i>
		</a>
		<div class="bar">
			<!-- <span class="bar-inner"></span> -->
			<input id="bar-input" type="range" v-bind:min="bar_min" v-bind:max="bar_max" v-bind:value="bar_current" step="0" >
		</div>
		<router-link :to="{ name: 'timeline'}" class="home">
			<i class="icon-yipp_home_full-"></i>
		</router-link>

		<div v-if="lessonType == 'knowledge_card'">
			<div id="knowledge-cards"  v-for="card in cards">
				<div class="paper">
					<h3>{{ card.title }}</h3>
					<p>{{ card.details }}</p>

					<i class="heart icon-yipp_check_full"></i>
					<div class="paper_foo1">
						<div class="paper_foo2"></div>
					</div>
				</div>
			</div>
		</div>

		<div class="content" v-else>
			<h1>{{ currentTodoContent.title }}</h1>
			<i class="biggest icon-yipp_check_full"></i>
			<p class="text-center">{{ currentTodoContent.details }}</p>
			
			<div class="bottom">
				<router-link :to="{ name: 'challenge'}" class="btn white">
					Start Challenge
				</router-link>

				<br>
				<a href="" v-on:click.prevent="nextLesson" class="btn white">Next Lesson</a>
			</div>
		
		</div>
	</div>
		
	<!-- <div class="panel stack" id="" v-if="page == 'stack'">
		<a v-on:click.prevent="back('cards')" class="back">
			<i class="icon-yipp_check_full"></i>
		</a>
		<div class="bar">
			<input type="range" min="0" max="5" value="1" step="1" disabled>
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

	</div> -->
			
	<div class="panel" v-if="page == 'complete'">
		<a v-on:click.prevent="back('stack')" class="back">
			<i class="icon-yipp_check_full"></i>
		</a>
		<div class="bar">
			<!-- <span class="bar-inner"></span> -->
			<!-- <input type="range" min="0" max="5" value="5" step="1" disabled> -->
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
import rangesliderJs from 'rangeslider-js';

export default {
    data() {
        return {
            child: {},
            page: 'start',
            levels: [],
            lessons: [],
            showModal: false,
            currentLesson: 1,
            cards: [],
            todos: [],
            currentTodoContent: {},
            currentTodoCount: 0,
            lessonType: '',
            bar_min: 0,
            bar_max: 0,
            bar_current: 0,
            slider: '',
        }
    },
    created: function() {
        auth.check();
        if (!auth.authenticated) {
            this.redirectGuest();
        }
	    
	    this.currentLesson = 6;
	    this.getLesson();
    },
    methods: {
    	initSlider: function () {
    		var that = this;
    		setTimeout(function(){
    			slider = document.querySelectorAll('#bar-input');
    			that.slider = rangesliderJs.create(slider);
	    		
	        }, 2);
    	},
    	getLesson: function () {
            var that = this;

            timeline.lesson(this, this.currentLesson, config.api.lang, function (response) {
            	var counter = 0;
            	that.todos = response.todos;
            	that.bar_max = response.todos.length;
            	/*
                $.each(response.todos, function (index, content) {
                	console.log(content.Contents.card_style, content.Contents.card_type)
                	if (content.Contents.card_style == 'card' && content.Contents.card_type == 'knowledge') {
                		that.cards.push(content.Contents);
                		// console.log(that.cards)
                	} else {
                		
                	}
                    // switch (content.card_type) {
                    // 	case 'knowledge':

                    // 	break;

                    // 	case 'multiple_choice':

                    // 	break;

                    // 	case 'list_field':

                    // 	break;

                    // 	case 'sliders':

                    // 	break;
                    // }
                });
                */
            }, function (msg, response) {
                that.logError(msg);
            });
        },
    	startLesson: function () {
    		this.initSlider();
    		this.page = 'page_lesson';
    		this.nextLesson();
    	},
    	nextLesson: function () {
    		if (this.currentTodoCount == this.bar_max) {
    			return;
    		}

    		console.log('next lesson', this.currentTodoCount)
    		var ctr = 0;
    		var todo = '';
    		var that = this;
    		
    		$.each(this.todos, function (index, content) {
    			if (ctr == that.currentTodoCount) {
    				that.bar_current = ctr;
    				var inputRange = $(that.slider);
    				inputRange.val(ctr).change()

    				that.otherType(content);

    		// 		console.log(content.Contents.card_style)
	    	// 		if (content.Contents.card_style == 'card' && content.Contents.card_type == 'knowledge') {
						// that.knowledgeCardType(content);
	    	// 		} else {
	    	// 			that.otherType(content);
	    	// 		}
    			
    				that.currentTodoCount++;
    				return false;
    			}

    			ctr++;
    		}); 
    	},
    	knowledgeCardType: function (content) {
    		this.lessonType = 'knowledge_card';
    		this.cards = [];
    		this.cards = [
				content.Contents
			]; 

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
    	otherType: function (content) {
    		console.log('other')
    		this.lessonType = 'other';
    		this.currentTodoContent = content.Contents;
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
		    			that.next('stack')
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
    		this.nextLesson();
    		// this.page = page;
    	},
      	redirectGuest: function()
        {
        	this.$router.push('login');
        }  
    },

    watch: {
		'$route' (to, from) {
			this.currentLesson = to;
		}
	},

    components: { 
        Modal 
    },
}

</script>