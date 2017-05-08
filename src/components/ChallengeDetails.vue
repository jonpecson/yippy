<template>
<div id="page-challenge-details">
	<div v-if="page == 'main'">
		<div class="header">
				<a href="#" class="icon" v-on:click.prevent="back">
					<i class=" icon-yipp_back"></i>
				</a>
				<div class="title">{{ label.challenge_details_title }}</div>
		</div>

		<div class="wrap">
			<div class="details">
				<span class="set" v-for="details of challenges.details">
					<i class="icon-yipp_notification_line"></i>
					{{ details.reminder_time }}
					| <i class="icon-yipp_repeat_line"></i>
					{{ details.repeat_type }}
				</span>
				
				<table width="100%" border="0">
					<tbody>
						<tr v-for="content of challenges.content">
							<td>
								<p>{{ replaceChildName(content.title) }}</p>
								<p>{{ replaceChildName(content.description) }}</p>
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
				<input v-bind:data-id="fd.id" type="hidden" role="uploadcare-uploader" name="uploadedfile" id="uploadPic" />
			</div>

			<h4>{{ label.evaluation_text }}</h4>
				
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
			
			<a href="#" v-on:click.prevent="submitEval(fd.id)" class="btn">{{ label.done_btn }}<span v-if="loading" class="loading"></span></a>
		</div>

	</div>

	<div v-else-if="page == 'done'">
		<section class="resultCard">
		
			<i class="icon-yipp_check_full"></i>
			
			<h3>{{ label.challenge_done_title }}</h3>
			<p>{{ label.challenge_done_msg }}</p>
			
			<div class="bottom">
				<a href="javascript:void(0);" v-on:click.prevent="showResult" class="btn mid white">{{ label.challenge_result_btn }}</a>
				<a href="javascript:void(0);" v-on:click.prevent="resetChallenge" class="btn big">{{ label.restart_challenge_btn }}</a>
			</div>

		</section>
	</div>
	
	<div v-else-if="page == 'result'">
		<section id="collage">
			
			<div class="header" v-for="content of result.content">
				<a href="#" v-on:click="page = 'done'">X</a> {{ replaceChildName(content.title) }}
				<h3>{{ replaceChildName(content.description) }}</h3>
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
        <h3 slot="header">{{ label.challenge_restart_popup_title }}</h3>
        <p slot="body">{{ label.challenge_restart_popup_msg }}</p>
        
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
import locale from '../api/locale'
import {router} from '../index'
import config from '../config'
import auth from '../api/auth'
import cheatsheet from '../api/cheatsheet'
import card from '../api/card'
import feedback from '../api/feedback'
import $ from 'jquery'
import Storage from '../storage'
import uploadcare from 'uploadcare-widget';

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
            	feedbacks: [],
            	content: {}
            },
            activeFeedback: {},
            lastFeedback: {},
            resetChallengeModal: false,
            result: {},
            loading: false,

            label: {},

            child: {},
            childName: ''
        }
    },
    created: function() {
    	this.loadLabels();

        auth.check();
        if (!auth.authenticated) {
            this.redirectGuest();
        }

        this.child = auth.user.data.child;
        this.childName = this.child.get('name')

        this.currentChallenge = this.$route.params.id;
        this.userID = auth.user.get('id');

        this.currentChallenge = 51;
        this.userID = 32;

        // this.getContent();
        this.showResult();
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
        getContent: function () {
            this.page = 'main';
            var that = this;

            feedback.details(this, this.currentChallenge, function (response) {
                that.challenges = response;
                that.activeFeedback = response.feedbacks[0];
                that.initUploader();

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

        	var fd = this.getActiveFeedback(id);
        	if (fd) {
        		that.activeFeedback = fd.value;
    			that.initUploader();
        	}
        },
        initUploader: function () {
        	var that = this;
        	setTimeout(function(){
                var input = $('[role=uploadcare-uploader]');
                var widget = uploadcare.Widget(input);
                
                widget.onChange(function(file) {
                	if (file) {
						file.done(function(info) {
							var fd = that.getActiveFeedback(that.activeFeedback.id);

							if (fd) {
								that.challenges.feedbacks[fd.index].src_url = info.originalUrl;
			        			that.challenges.feedbacks[fd.index].src_id = info.uuid;
							}
						});
					};
				});

            }, 1);
        },
        submitEval: function (id) {
        	this.loading = true;
        	var that = this;

        	var fd = this.getActiveFeedback(id);

        	if (!fd) {
        		return;
        	}

        	var data = {
				feedback_id: fd.value.id,
				src_url: fd.value.src_url ? fd.value.src_url : '',
				src_id: fd.value.src_id ? fd.value.src_id : '',
				evaluation: fd.value.evaluation,
				icon: fd.value.icon,
				notes: fd.value.notes
			};

			var that = this;
			feedback.submit(that, data, function (response) {
				that.loading = false;
				that.challenges.feedbacks[fd.index].is_done = true;

				if (id == that.lastFeedback.id) {
					that.doneFeedback();
	            } else {
	            	that.activeFeedback = that.challenges.feedbacks[fd.index + 1]
	            }
            }, function (msg, response) {
                that.logError(msg);
            });
        },
        iconMark: function (id, selected) {
        	var that = this;
        	var fd = this.getActiveFeedback(id);
        	console.log(id)
        	if (fd) {
        		this.challenges.feedbacks[fd.index].icon = selected;
        	}
        },
        doneFeedback: function () {
        	this.page = 'done';
        },
        showResult: function() {
        	this.page = 'result';

        	var that = this;
        	feedback.result(this, this.userID, this.currentChallenge, function (response) {
        		that.result = response;
	        }, function (msg, response) {
	            that.logError(msg);
	        });
        },
        redirectGuest: function()
        {
            this.$router.push('login');
        },
        back: function () {
        	this.$router.push('cheatsheet-' + this.challenges.details.content_id);
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
	    	this.activeFeedback = this.challenges.feedbacks[0];
	    },
	    getActiveFeedback(id) {
	    	var result = false;
	    	$.each(this.challenges.feedbacks, function (index, value) {
        		if (value.id == id) {
        			result = {
        				index: index,
        				value: value
        			}
        		}
        	})

        	return result;
	    },
	    replaceChildName: function (str) {
            return str.replace(/\[child_name\]/g, this.childName);
        }
    },

    components: { 
        Modal 
    },
}
</script>

