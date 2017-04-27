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
			
		<a href="#" v-on:click.prevent="startLesson" class="btn bottom white" v-if="start">Start</a>
	</div>

	<div class="panel" v-if="page == 'page_lesson'">
		<a v-on:click.prevent="back('start')" class="back">
			<i class="icon-yipp_check_full"></i>
		</a>
		<div class="bar"> 
			<span class="bar-inner" v-bind:style='bar_length'></span>
		</div>
		<router-link :to="{ name: 'timeline'}" class="home">
			<i class="icon-yipp_home_full-"></i>
		</router-link>

		<div class="error" v-if="error_message">{{ error_message }}</div>

		<div v-if="lessonType == 'knowledge_card'">
			<div id="knowledge-cards"  v-for="card in cards">
				<div class="paper">
					<h3>{{ currentCardContent.Contents.title }}</h3>
					<p>{{ currentCardContent.Contents.details }}</p>

					<i class="heart icon-yipp_check_full" v-if="currentCardContent.is_favorite"></i>
					<i class="heart icon-yipp_check_line" v-if="currentCardContent.is_favorite == false"></i>
					<div class="paper_foo1">
						<div class="paper_foo2"></div>
					</div>
				</div>
			</div>
		</div>

		<div class="content" v-else-if="lessonType == 'quiz_no'">
			<h3 style="text-align: center;">{{ currentCardContent.Contents.title }}</h3>
			<p>{{ currentCardContent.Contents.details }}</p>
			<ul>
				<li v-for="quiz in currentCardContent.Quiz">
					<a href="javascript:void(0);" style='text-decoration:none; color:#333; display:block;' class='my-answer' data-position='1' v-bind:data-answer-id='quiz.Answer.id' v-bind:data-answer-title='quiz.Answer.title' v-bind:data-answer-details='quiz.Answer.details' @click="quizShowAnswer">
						{{ quiz.question }}
					</a>
				</li>
			</ul>
		</div>

		<div class="content" v-else-if="lessonType == 'challenge_no'">
			<h3 style="text-align: center;">{{ currentCardContent.Contents.title }}</h3>
			<p>{{ currentCardContent.Contents.details }}</p>
			<div class="challenge-boxes">
				<div v-for="challenge in currentCardContent.Challenges" class="challenge-box">
					<input type="text" name="challenge[]" v-model="challenge.Challenge.message" v-bind:placeholder="challenge.placeholder" v-bind:data-id="challenge.id">
					<a href="#" v-bind:data-id="challenge.id" v-if="challenge.deletable" v-on:click.prevent="removeChallenge">Delete</a>
				</div>
			</div>

			<a href="#" v-on:click.prevent="addFieldChallenge">Add</a>

			<div class="bottom">
				<a href="" v-on:click.prevent="updateChallenge" class="button-medium white btn-next-card">Next</a>
			</div>
		</div>

		<div class="content" v-else>
			<h3 style='text-align: center;'>{{ currentCardContent.Contents.title }}</h3>
			<p>{{ currentCardContent.Contents.details }}</p>
			
			<div class="bottom">
				<a href="" v-on:click.prevent="nextLesson" class="button-medium white btn-next-card">Next</a>
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
			
	<div class="panel" v-if="page == 'page_complete'">
		<a v-on:click.prevent="back('stack')" class="back">
			<i class="icon-yipp_check_full"></i>
		</a>
		<div class="bar"> 
			<span class="bar-inner" style='width: 100%'></span>
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

	<modal v-if="showModal" @close="modalClose">
        <h3 slot="header">{{ modalContent.title }}</h3>
        <p slot="body">{{ modalContent.message }}</p>
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
            currentCardContent: {},
            currentCardCount: 0,
            lessonType: '',
            bar_length: '',
            bar_min: 0,
            bar_max: 0,
            bar_current: 0,
            slider: '',
            userID: 0,
            start: false,
            lastChallengeID: 0,
            error_message: ''
        }
    },
    mounted: function() {
        auth.check();
        if (!auth.authenticated) {
            this.redirectGuest();
        }
	    
	    this.currentLesson = 36;
	    this.userID = 32;
	    this.getLesson();

	    this.bar_length = 'width: 20%';
    },
    methods: {
    	getLesson: function () {
    		this.resetError();
            var that = this;

            timeline.lesson(this, this.currentLesson, this.userID, config.api.lang, function (response) {
            	
            	var counter = 0;
            	that.cards = response.cards;
            	that.bar_max = response.cards.length
            	that.updateBarStep(0);

            	that.start = true;

            }, function (msg, response) {
                that.logError(msg);
            });
        },
        updateBarStep: function (index)
        {	
        	var step =  (100 / (this.bar_max + 1)) * index;
        	this.bar_length = 'width: ' + step + '%';
        },
    	startLesson: function () {
    		this.resetError();
    		this.page = 'page_lesson';
    		this.nextLesson();
    	},
    	endLesson: function () {
    		this.resetError();
    		this.page = 'page_complete';
    	},
    	nextLesson: function () {
    		this.resetError();
    		if (this.currentCardCount >= this.bar_max) {
    			this.endLesson();
    			return;
    		}

    		if (this.cards) {
    			this.currentCardCount += 1;
    			// console.log('next lesson: ', this.currentCardCount, ' out of ', this.bar_max);

    			var ctr = this.currentCardCount - 1;
    			var card = this.cards[ctr];
	    		this.updateBarStep(this.currentCardCount)

	    		this.currentCardContent = card;
	    		if (card.Contents.card_style == 'card' && card.Contents.card_type == 'knowledge') {
	    			this.knowledgeCardType(card);
	    		} else if (card.Contents.card_style == 'no' && card.Contents.card_type == 'multiple_choice') {
	    			this.quizNoType(card);
	    		} else if (card.Contents.card_style == 'no' && card.Contents.card_type == 'list_field') {
	    			this.challengeNoType(card);
	    		} else {
	    			this.otherType(card);
	    		}

	    		
	    		console.log(card.Contents.card_style, ' ', card.Contents.card_type)
    		}
    	},
    	knowledgeCardType: function () {
    		this.lessonType = 'knowledge_card';

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
    	quizNoType: function () {
    		this.lessonType = 'quiz_no';
    	},
    	otherType: function () {
    		this.lessonType = 'other';
    	},
    	quizShowAnswer: function (e) {
    		var me = $(e);
    		var id = e.target.getAttribute('data-answer-id');
    		var title = e.target.getAttribute('data-answer-title');
    		var details = e.target.getAttribute('data-answer-details');

    		var data = {
        		'user_id': this.userID,
        		'content_id': parseInt(this.currentCardContent.Contents.id),
        		'block_id': parseInt(id),
        	};

        	console.log('quizShowAnswer', data);

        	this.modalShow(title, details)
        	// return;

        	var that = this;
        	timeline.updateAnswer(this, data, function (response) {
            	console.log('api response',response);
            	
            }, function (msg, response) {
                that.logError(msg);
            });
    	},
    	challengeNoType: function () {
    		this.lessonType = 'challenge_no';
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
        },
        modalShow(title, body) {
        	this.modalContent = {
		    	title: title,
		    	message: body
		    };
		    this.showModal = true;
        },
        modalClose: function () {
        	this.showModal = false;
        	this.nextLesson()
        },
        addFieldChallenge: function () {
        	if (this.lastChallengeID == 0) {
        		this.lastChallengeID = Math.floor((Math.random() * 1000) + 1);
        	} else {
        		this.lastChallengeID++;
        	}

        	this.currentCardContent.Challenges.push({
        		id: this.lastChallengeID,
        		placeholder: '',
        		deletable: 1,
        		new: 1,
        		Challenge: {
        			message: ''
        		}
        	})
        },
        updateChallenge: function () {
        	var that = this;
        	var isError = false;

        	$.each(this.currentCardContent.Challenges, function (index, value) {
        		if (!value.Challenge.message) {
        			return;
        		}

        		if (value.new) {
        			// todo create
        			return;
        		}

        		// update
        		var data = {
	        		'user_id': that.userID,
	        		'content_id': parseInt(that.currentCardContent.Contents.id),
	        		'block_id': parseInt(value.id),
	        		'message': value.Challenge.message
	        	};

	        	timeline.updateChallenge(that, data, function (response) {
	            	isSaved = true;
	            	console.log('api response',response);

	            }, function (msg, response) {
	            	isError = true
	                that.logError(msg);
	            });

        	});

        	if (!isError) {
        		this.nextLesson();
        	}
        },
        addChallenge: function () {
        	// TODO
        },
        removeChallenge: function (e) {
        	var that = this;

        	var id = e.target.getAttribute('data-id');
        	$.each(this.currentCardContent.Challenges, function (index, value) {
        		if (value.id == id) {
        			that.currentCardContent.Challenges.splice(index, 1);
        			console.log('remove found', id);
        		}
        	});

        	// TODO
        },
        resetError: function () {
			this.error_message = '';
		},
		logError(msg) {
			var msgStr = '';
			if (typeof msg == 'string') {
				msgStr = msg;
			} else {
				$.each(msg, function(label, value) {
					msgStr += value + ' ';
				})
			}
	        
	        this.error_message = msgStr;
	    },
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