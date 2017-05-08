<template>
<div id="page-lesson">

	<div  class="panel" id="start" v-if="page == 'start'">
		<router-link :to="{ name: 'timeline'}" class="back">
			<i class="icon-back"></i>
		</router-link>

		<div id="popUp">
			<i class="big icon-yipp_apple_full"></i>
			<h3>{{ lessonInfo.counter }}. {{ lessonInfo.title }}</h3>
			<p>{{ lessonInfo.description }}</p>
			<hr>
			<span><i class="icon-yipp_check_full"></i> {{lessonInfo.duration}} min</span>
		</div>
			
		<a href="#" v-on:click.prevent="startLesson" class="btn bottom white" v-if="start">{{ label.lesson_btn_start }}</a>
	</div>

	<div class="panel" v-if="page == 'page_lesson'">
		<a v-on:click.prevent="prevLesson" class="back">
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
			<div id="knowledge-cards" v-for="knowledgeCard in knowledgeCards">
                <div class="paper" v-bind:id="knowledgeCard.Contents.id" >
					<h3>{{ knowledgeCard.Contents.title }}</h3>
                    <img v-bind:data-id="knowledgeCard.Contents.id" v-if="knowledgeCard.Contents.src_type == 'ext_image'" v-bind:src="knowledgeCard.Contents.src_url" style="width: 50%;">
					<p>{{ knowledgeCard.Contents.details }}</p>

					<i class="heart icon-yipp_check_full" v-if="knowledgeCard.is_favorite"
						v-on:click.prevent="markFavorite" v-bind:data-id="knowledgeCard.Contents.id"
					></i>
					<i class="heart icon-yipp_check_line" v-if="knowledgeCard.is_favorite == false"
						v-on:click.prevent="markFavorite" v-bind:data-id="knowledgeCard.Contents.id"
					></i>
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

		<div class="content" v-else-if="lessonType == 'chance_no'">
			<h3 style="text-align: center;">{{ currentCardContent.Contents.title }}</h3>
			<p>{{ currentCardContent.Contents.details }}</p>
			
			<div class="slider">
				<!-- <input type="range" min="0" max="10" value="0" step="2"> -->
			</div>

			<div class="bottom">
				<a href="" v-on:click.prevent="nextLesson" class="button-medium white btn-next-card">{{ label.next_btn }}</a>
			</div>
		</div>

		<div class="content" v-else-if="lessonType == 'challenge_no'">
			<h3 style="text-align: center;">{{ currentCardContent.Contents.title }}</h3>
			<p>{{ currentCardContent.Contents.details }}</p>
			<div class="challenge-boxes">
				<div v-for="challenge in currentCardContent.Challenges" class="challenge-box">
					<input type="text" name="challenge[]" v-model="challenge.Challenge.message" v-bind:placeholder="challenge.Blocks.title" v-bind:data-id="challenge.Challenge.id">
					<a href="#" v-bind:data-id="challenge.Challenge.id" v-on:click.prevent="removeChallenge" v-if="!challenge.Blocks.id">Delete</a>
				</div>
			</div>

			<a href="#" v-on:click.prevent="addFieldChallenge">Add</a>

			<div class="bottom">
				<a href="" v-on:click.prevent="updateChallenge" class="button-medium white btn-next-card">{{ label.next_btn }}</a>
			</div>
		</div>

		<div class="content" v-else-if="lessonType == 'challenge_no_next'">
			<h3 style="text-align: center;">{{ currentCardContent.Contents.title }}</h3>
			<p>{{ currentCardContent.Contents.details }}</p>
			<ul>
				<li v-for="challenge in currentCardContent.Challenges">{{ challenge.Challenge.message }}</li>
			</ul>

			<a href="#" v-on:click.prevent="addReminder">{{ label.goal_reminder_btn }}</a>

			<div class="bottom">
				<a href="" v-on:click.prevent="doneChallengeNoType" class="button-medium white btn-next-card">{{ label.next_btn }}</a>
			</div>
		</div>

		<div class="content" v-else-if="lessonType == 'other'">
			<h3 style='text-align: center;'>{{ currentCardContent.Contents.title }}</h3>
			<p>{{ currentCardContent.Contents.details }}</p>
			
			<div class="bottom">
				<a href="" v-on:click.prevent="nextLesson" class="button-medium white btn-next-card">{{ label.next_btn }}</a>
			</div>
		
		</div>
	</div>
			
	<div class="panel" v-if="page == 'page_complete'">
		<a v-on:click.prevent="prevLesson" class="back">
			<i class="icon-yipp_check_full"></i>
		</a>
		<div class="bar"> 
			<span class="bar-inner" style='width: 100%'></span>
		</div>
		<router-link :to="{ name: 'timeline'}" class="home">
			<i class="icon-yipp_home_full-"></i>
		</router-link>

		<div class="content">
		
			<h1>{{ label.lesson_finish_title }}</h1>
			<i class="biggest icon-yipp_check_full"></i>
			
			<p class="text-center">{{ label.lesson_finish_msg }}</p>
			
			<div class="bottom">
				<router-link :to="{ name: 'timeline'}" class="btn white">
					{{ label.lesson_finish_start }}
				</router-link>
				<br>
				<a href="" v-on:click.prevent="resetLesson" class="btn white">{{ label.lesson_finish_restart }}</a>
			</div>
		
		</div>

	</div>

	<modal v-if="showModal" @close="modalClose">
        <h3 slot="header">{{ modalContent.title }}</h3>
        <p slot="body">{{ modalContent.message }}</p>
    </modal>

    <modal v-if="resetLessonModal" @close="resetLessonModal = false">
        <h3 slot="header">Are you sure?</h3>
        <p slot="body">Do you want to restart the challenge?</p>
        
        <div slot="footer">
          <button class="form-button-small" @click="restartLesson">
            {{ label.lesson_finish_restart }}
          </button>
          <button class="form-button-small" @click="resetLessonModal = false">
            Cancel
          </button>
        </div>

    </modal>

</div>
	
</template>

<script>
import locale from '../api/locale'
import {router} from '../index'
import config from '../config'
import auth from '../api/auth'
import timeline from '../api/timeline'
import card from '../api/card'
import cardAnswer from '../api/cardAnswer'
import cardChallenge from '../api/cardChallenge'
import cardMyChallenge from '../api/cardMyChallenge'
import cardChance from '../api/cardChance'
import $ from 'jquery'
import 'jquery-ui'
require('jquery-ui/ui/core');
require('jquery-ui/ui/keycode');
require('jquery-ui/ui/widget'); 
require('jquery-ui/ui/version');
require('jquery-ui/ui/widgets/mouse');
import slider from 'jquery-ui/ui/widgets/slider';

import '../../assets/js/jquery-ui-extensions/ui/jquery.ui.labeledslider.js'

import Modal from '../components/Modal.vue'
import Storage from '../storage'

const Swing = require('swing')

const stack = Swing.Stack({
  throwOutConfidence: (xOffset, yOffset, element) => {
    const xConfidence = Math.min(Math.abs(xOffset) / element.offsetWidth, 1);
    const yConfidence = Math.min(Math.abs(yOffset) / element.offsetHeight, 1);

    var distance = Math.max(xConfidence, yConfidence);

    if (distance > .5) {
        return 1;
    }

    return 0;
  },
  isThrowOut: () => {
    return 1;
  }
});

export default {
    data() {
        return {
            page: 'start',
            lessons: [],
            showModal: false,
            resetLessonModal: false,
            lessonInfo: {},
            currentLesson: 1,
            cards: [],
            currentCardContent: {},
            currentCardCount: 0,
            lessonType: '',
            bar_length: '',
            bar_max: 0,
            userID: 0,
            start: false,
            lastChallengeID: 0,
            error_message: '',
            myLessonID: 0,
            stackCard: {},
            knowledgeCards: [],
            label: {}
        }
    },
    created: function() {
        this.loadLabels();
        auth.check();
        if (!auth.authenticated) {
            this.redirectGuest();
        }

        this.currentLesson = this.$route.params.id;
        this.userID = auth.user.get('id');
	    
	    // this.currentLesson = 36;
        // this.userID = 32;
	    
	    this.getLesson();
	    this.bar_length = 'width: 0%';

        this.getLessonTitle();
    },
    methods: {
        loadLabels: function () {
            var that = this;
            locale.label(this, config.api.lang, function (response) {
                that.label = response;
            }, function (msg, response) {
                that.logError(msg);
            });
        },
    	getLessonTitle: function () {
            var str = Storage.get('active_lesson');
            if (!str) {
                this.$router.push('timeline');
            }

            this.lessonInfo = JSON.parse(str);
            
            if (this.currentLesson != this.lessonInfo.id) {
                // this.$router.push('timeline');
            }
        },
    	getLesson: function () {
    		this.resetError();
            var that = this;

            card.lesson(this, this.currentLesson, this.userID, config.api.lang, function (response) {
            	
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
    		
    		var that = this;
    		var data = {
    			lesson_id: this.currentLesson,
    			user_id: this.userID
    		}

    		card.startLesson(this, data, function (response) {
    			that.myLessonID = response;
            	that.nextLesson();
            }, function (msg, response) {
                that.logError(msg);
            });
    	},
    	endLesson: function () {
    		this.resetError();
    		
    		var data = {
    			lesson_id: this.currentLesson,
    			user_id: this.userID,
    			my_lesson_id: this.myLessonID
    		}

            var that = this;
    		card.endLesson(this, data, function (response) {
    			that.page = 'page_complete';
            	// none
            	// that.modalShow(value.Chances.title, value.Chances.details)
            }, function (msg, response) {
                that.logError(msg);
            });
    	},
    	prevLesson: function () {
    		this.resetError();
    		if (this.currentCardCount <= 1) {
    			this.restartLesson();
    			return;
    		}

    		if (this.cards) {
    			this.currentCardCount -= 1;
    			this.showCard();
    		}
    	},
    	nextLesson: function () {
    		this.resetError();
    		this.page = 'page_lesson';

            if (this.currentCardCount >= this.bar_max) {
                // console.log('endLesson:', this.currentCardContent.id)
    			this.endLesson();
    			return;
    		}

    		this.currentCardCount += 1;
            // console.log('nextLesson:', this.currentCardContent.id, '-', this.currentCardCount + '/' + this.bar_max)
            this.showCard();
    	},
    	showCard: function () {
			var ctr = this.currentCardCount - 1;
            var card = this.cards[ctr];
            this.updateBarStep(this.currentCardCount)

            this.currentCardContent = card;
            // console.log('currentCard:', card.Contents.card_id, '-', card.Contents.card_style + '_' + card.Contents.card_type);
            
    		var that = this;

    		if (card.Contents.card_style == 'card' && card.Contents.card_type == 'knowledge') {
    			this.lessonType = 'knowledge_card';
                this.knowledgeCards.push(this.currentCardContent);

                setTimeout(function(){
                    var e = $('#knowledge-cards .paper');
                    var cnt = e.length - 1;
                    var stackCard = stack.createCard(e[cnt]);

                    stackCard.on('throwout', (event) => {
                        that.nextLesson();
                        $(event.target).remove();
                    });
                }, 1);
                    
    		} else if (card.Contents.card_style == 'no' && card.Contents.card_type == 'sliders') {
                $.each(card, function (index, value) {

                });
    			setTimeout(function(){

                    $('.slider').labeledslider({ 
                        max: 10, 
                        step: 2, 
                        min: 0, 
                        slide: function ( event, ui ) {
                            that.updateChanceAnswer(ui.value);
                        } 
                    });
		        }, 2);

    			this.lessonType = 'chance_no';
    		} else if (card.Contents.card_style == 'no' && card.Contents.card_type == 'multiple_choice') {
    			this.lessonType = 'quiz_no';
    		} else if (card.Contents.card_style == 'no' && card.Contents.card_type == 'list_field') {
    			this.lessonType = 'challenge_no';
    		} else {
    			this.lessonType = 'other';
    		}
    		
    		// console.log(card.Contents.card_style, ' ', card.Contents.card_type)
    	},
    	resetLesson: function () {
	    	this.resetLessonModal = true;
	    },
	    restartLesson: function () {
	    	this.resetLessonModal = false;

            var that = this;
            card.restartLesson(this, this.currentLesson, this.userID, function (response) {
                that.page = 'start';
                that.currentCardCount = 0;
                that.currentCardContent = null;
                that.getLesson();
            }, function (msg, response) {
                that.logError(msg);
            });
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
        		'lesson_id': this.currentLesson
        	};

        	this.modalShow(title, details)
        	// return;

        	var that = this;
        	cardAnswer.update(this, data, function (response) {
            	// console.log('api response',response);
            	
            }, function (msg, response) {
                that.logError(msg);
            });
    	},
    	back: function (page) {
    		this.page = page;
    	},
    	redirectGuest: function()
        {
        	this.$router.push('login');
        },
        modalShow(title, body) {
            console.log(title)
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
        updateChanceAnswer: function (selected) {
        	var that = this;
        	var isError = false;

            $.each(this.currentCardContent.Chances, function (index, value) {
            	if (value.chance == selected) {
        			// update
	        		var data = {
		        		'user_id': that.userID,
		        		'content_id': parseInt(value.Chances.id),
		        		'block_id': parseInt(value.id),
		        		'lesson_id': that.currentLesson
		        	};

		        	that.modalShow(value.Chances.title, value.Chances.details)

		        	cardChance.update(that, data, function (response) {
		            	// none
		            	// that.modalShow(value.Chances.title, value.Chances.details)
		            }, function (msg, response) {
		                that.logError(msg);
		            });

		            return;
        		}
        	});
        },
        addFieldChallenge: function () {
        	this.lastChallengeID++;

        	this.currentCardContent.Challenges.push({
        		Blocks: {
        			id: null,
        			title: ''
        		},
        		Challenge: {
        			id: 'new-' + this.lastChallengeID,
        			new: true,
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

        		if (value.Challenge.new) {
        			// create
	        		var data = {
		        		'user_id': that.userID,
		        		'content_id': parseInt(that.currentCardContent.Contents.id),
		        		'block_id': value.Blocks.id,
		        		'message': value.Challenge.message,
		        		'lesson_id': that.currentLesson
		        	};

		        	cardChallenge.create(that, data, function (response) {
		            	// none
		            }, function (msg, response) {
		            	isError = true
		                that.logError(msg);
		            });
        		} else if (value.Challenge.id) {
        			// console.log(value.Challenge)
					// update
	        		var data = {
	        			'message': value.Challenge.message,
		        		'my_challenge_id': value.Challenge.id
		        	};

		        	cardChallenge.update(that, data, function (response) {
		            	// none
		            }, function (msg, response) {
		            	isError = true
		                that.logError(msg);
		            });        			
        		}
        	});

        	if (!isError) {
        		this.lessonType = 'challenge_no_next';
        	}
        },
        removeChallenge: function (e) {
        	var that = this;

        	var id = e.target.getAttribute('data-id');
        	$.each(this.currentCardContent.Challenges, function (index, value) {
        		if (value.Challenge.id == id) {
        			that.currentCardContent.Challenges.splice(index, 1);
        			// console.log('remove found', id);

        			var data = {
		        		'my_challenge_id': parseInt(value.Challenge.id)
		        	};

		        	cardChallenge.delete(that, data, function (response) {
		            	// None
		            }, function (msg, response) {
		            	isError = true
		                that.logError(msg);
		            });
        		}
        	});
        },
        doneChallengeNoType: function () {
        	this.nextLesson();
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
	    markFavorite: function(e) {
	    	var id = e.target.getAttribute('data-id');
	    	
	    	var that = this;

	    	var data = {
	    		user_id: this.userID,
	    		content_id: parseInt(id),
	    		lesson_id: this.currentLesson
	    	}
	    	card.favorite(that, data, function (response) {
            	// console.log('favorite ok')
            }, function (msg, response) {
            	isError = true
                that.logError(msg);
            });

	    	if (this.currentCardContent.is_favorite) {
	    		this.currentCardContent.is_favorite = false;
	    	} else {
	    		this.currentCardContent.is_favorite = true;
	    	}
	    }
    },

    components: { 
        Modal 
    },
}

</script>