<template>
<div id="page-challenge-details">
	<div v-if="page == 'main'">
		<div class="header">
				<a href="" class="icon">
				<i class=" icon-yipp_back"></i>
				</a>
				<div class="title">Challenge Details</div>
		</div>

		<div class="wrap">
			<div class="details">
				<span class="set">
					<i class="icon-yipp_notification_line"></i>
					{{ challenges.details.reminder_time }}
					| <i class="icon-yipp_repeat_line"></i>
					{{ challenges.details.repeat_type }}
				</span>
				
				<table width="100%" border="0">
					<tbody>
						<tr>
							<td>
								<p>Eating more vegetable</p>
								<p>1. Broco</p>
							</td>
							<td>
							<a href="" class="edit"><i class="icon-yipp_pencil_line"></i></a>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>

		<div class="steps">
			<ul>
				<li v-for="fd of challenges.feedbacks" v-bind:class="fd.id == activeFeedback.id ? 'active' : ''" v-on:click="next(fd.id)">
					<i class="icon-yipp_check_full" v-if="fd.is_done"></i>
					<span v-if="fd.is_done == false">{{ fd.repeat_number }}</span>
				</li>
			</ul>
			<hr>
		</div>

		<div class="form" v-for="fd of challenges.feedbacks" v-if="fd.id == activeFeedback.id">
			<div class="pic" style="height: 200px; overflow: hidden;">
				<img style="width: 100%;" v-if="fd.src_url" v-bind:src="fd.src_url">
			</div>

			<h4>Evaluation</h4>
				
			<textarea v-model="fd.evaluation"></textarea>
			
			<ul class="selection">
				<li>
					<a href="#" v-bind:class="fd.icon == 'sad' ? 'active' : ''" v-on:click.prevent="iconMark(fd.id, 'sad')">
						<i class="icon-yipp_emoticon_sad"></i>
					</a>
				</li>
				<li>
					<a href="#" v-bind:class="fd.icon == 'neutral' ? 'active' : ''" v-on:click.prevent="iconMark(fd.id, 'neutral')">
						<i class="icon-yipp_emoticon_neutral"></i>
					</a>
				</li>
				<li>
					<a href="#" v-bind:class="fd.icon == 'happy' ? 'active' : ''" v-on:click.prevent="iconMark(fd.id, 'happy')">
						<i class="icon-yipp_emoticon_happy"></i>
					</a>
				</li>
			</ul>

			<input type="hidden" name="icon" v-model="fd.icon">
			
			<h4>Notes</h4>
			
			<textarea v-model="fd.notes"></textarea>
			
			<a href="#" v-on:click.prevent="submitEval(fd.id)" class="btn">Done</a>
		</div>

	</div>

	<div v-else-if="page == 'done'">
		<section class="resultCard">
		
			<i class="icon-yipp_check_full"></i>
			
			<h3>You can do it!</h3>
			<p>We made a beautiful photo collage of this week check it out!</p>
			
			<div class="bottom">
				<a href="javascript:void(0);" v-on:click.prevent="showResult" class="btn mid white">See result</a>
				<a href="javascript:void(0);" v-on:click.prevent="resetChallenge" class="btn big">Restart challenge</a>
			</div>

		</section>
	</div>
	
	<div v-else-if="page == 'result'">
		<section id="collage">
		
			<div class="header">
				<a href="#" v-on:click="page = 'done'">X</a> Photo Collage
				<h3>Fruit and Vegetables</h3>
			</div>
		
			<ul>
				<li v-for="fd of result.feedbacks">
					<div class="pic" style="height: 200px; overflow: hidden;">
						<img style="width: 100%;" v-if="fd.src_url" v-bind:src="fd.src_url">
					</div>
					
					<div class="elements">
						<div class="day">Day {{ fd.repeat_number }}</div>
						<i v-bind:class="'icon-yipp_emoticon_' + fd.icon" class="icon "></i>
					</div>

					<div class="data">
						<p>{{ fd.evaluation }}</p>
					</div>	
				
				</li>
			</ul>
		
		</section>
		
		<div class="restart">
			<a href="javascript:void(0);" v-on:click.prevent="resetChallenge" class="btn big">Restart challenge</a>
		</div>
	</div>
	
	<modal v-if="resetChallengeModal" @close="resetChallengeModal = false">
        <h3 slot="header">Are you sure?</h3>
        <p slot="body">Do you want to restart the challenge?</p>
        
        <div slot="footer">
          <button class="form-button-small" @click="restartChallenge">
            Restart challenge
          </button>
          <button class="form-button-small" @click="resetChallengeModal = false">
            Cancel
          </button>
        </div>
    </modal>
</div>

	
</template>

<script>
import {router} from '../index'
import config from '../config'
import auth from '../api/auth'
import cheatsheet from '../api/cheatsheet'
import card from '../api/card'
import feedback from '../api/feedback'
import $ from 'jquery'
import Storage from '../storage'

import Modal from '../components/Modal.vue'

export default {
    data() {
        return {
            userID: 0,
            currentChallenge: 0,
            page: 'main',
            challenges: {
            	list: [],
            	details: [],
            	feedbacks: []
            },
            activeFeedback: {},
            lastFeedback: {},
            resetChallengeModal: false,
            result: {}
        }
    },
    created: function() {
        auth.check();
        if (!auth.authenticated) {
            this.redirectGuest();
        }

        this.currentChallenge = this.$route.params.id;
        this.currentChallenge = 51;
        this.userID = auth.user.get('id');

        // this.currentLesson = 6;
        // this.userID = 32; // hard coded

        // this.getContent();
        this.showResult();
    },
    methods: {
        getContent: function () {
            this.page = 'main';
            var that = this;

            feedback.details(this, this.currentChallenge, function (response) {
                that.challenges = response;
                that.activeFeedback = response.feedbacks[0];

                var length = response.feedbacks.length;
                if (length > 1) {
                	that.lastFeedback = response.feedbacks[length - 1];
                } else {
                	that.lastFeedback = that.activeFeedback;
                }
            }, function (msg, response) {
                that.logError(msg);
            });
        },
        next: function (id) {
        	var that = this;
        	$.each(that.challenges.feedbacks, function (index, value) {
        		if (value.id == id) {
        			that.activeFeedback = value;
        		}
        	})
        },
        submitEval: function (id) {
        	var that = this;

        	$.each(this.challenges.feedbacks, function (index, value) {
        		if (value.id == id) {
        			var data = {
        				feedback_id: value.id,
        				src_url: '',
        				src_id: '',
        				evaluation: value.evaluation,
        				icon: value.icon,
        				notes: value.notes
        			};

        			feedback.submit(that, data, function (response) {
        				that.challenges.feedbacks[index].is_done = true;

        				if (id == that.lastFeedback.id) {
        					that.doneFeedback();
			            }
		            }, function (msg, response) {
		                that.logError(msg);
		            });
        		}
        	})
        },
        iconMark: function (id, selected) {
        	var that = this;
        	$.each(this.challenges.feedbacks, function (index, value) {
        		if (value.id == id) {
        			that.challenges.feedbacks[index].icon = selected;
        		}
        	})
        },
        doneFeedback: function () {
        	this.page = 'done';
        },
        showResult: function() {
        	this.page = 'result';

        	var that = this;
        	feedback.result(this, 1, 51, function (response) {
        		that.result = response;
	        }, function (msg, response) {
	            that.logError(msg);
	        });
        },
        redirectGuest: function()
        {
            this.$router.push('login');
        },
        logError(msg) {
            this.loading = false;
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
        resetChallenge: function () {
	    	this.resetChallengeModal = true;
	    },
	    restartChallenge: function () {
	    	this.resetChallengeModal = false;
	    	this.page = 'main';
	    },
    },

    components: { 
        Modal 
    },
}
</script>

