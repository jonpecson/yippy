<template>
	<div id="challenge-container">
	
		<div class="header">

			<router-link :to="{ name: 'timeline'}" class="icon">
				<i class="icon-yipp_profile_line"></i>
			</router-link>

			<div class="title">{{ label.challenge_title }}</div>

		</div>

		
		<div class="content" v-if="empty">
		
			<div class="panel">
			{{ label.challenge_instruction }}
			</div>
			
			<a href="" class="btn">{{ label.challenge_explore_btn }}</a>
		
		</div>

		<div class="content" v-if="empty == false">

			<ul class="blockList">
				<li>
					<span class="set">
					<i class="icon-yipp_notification_line"></i>
					14:00
					| <i class="icon-yipp_repeat_line"></i>
					Every day
					</span>
					<p>Lorem Ipsum</p>
					
					<router-link :to="{ path: 'challenge-1'}">
					<i class="arrow icon-yipp_forward"></i>
					</router-link>
					
				</li>
				<li>
				<span class="set">
					<i class="icon-yipp_notification_line"></i>
					14:00
					| <i class="icon-yipp_repeat_line"></i>
					Every day
					</span>
					<p>Lorem Ipsum</p>
					
					<router-link :to="{ path: 'challenge-2'}">
						<i class="arrow icon-yipp_forward"></i>
					</router-link>
				</li>
			</ul>		

			<a href="" v-if="isShowDoneChallenges == false" v-on:click.prevent="toggleDoneChallenges" class="link">{{ label.challenge_show_finish }}</a>
			<a href="" v-if="isShowDoneChallenges" v-on:click.prevent="toggleDoneChallenges" class="link">{{ label.challenge_close_finish }}</a>

			<ul class="blockList2" v-if="isShowDoneChallenges">
				<li>
					<p>Lorem Ipsum</p>
					
					<i class="arrow icon-yipp_forward"></i>
					
				</li>
				<li>
					<p>Lorem Ipsum</p>
					
						<i class="arrow icon-yipp_forward"></i>
				</li>
			</ul>
		</div>

		<footer>
			<ul>
				<li>
					<router-link :to="{ name: 'timeline'}"><span class="icon-yipp_home_full-"></span>{{ label.header_timeline }}</router-link>
				</li>
				<li>
					<a href="javascript:void(0);" class="active"><span class="icon-yipp_challenge_line"></span>{{ label.challenge_title }}</a>
				</li>
			</ul>
		</footer>
		
	</div>	
</template>

<script>
import locale from '../api/locale'
import {router} from '../index'
import config from '../config'
import auth from '../api/auth'
import timeline from '../api/timeline'
import $ from 'jquery'

import Modal from '../components/Modal.vue'

export default {
    data() {
        return {
            empty: false,
            isShowDoneChallenges: false,
            page: 'start',
            levels: [],
            lessons: [],
            showModal: false,
            currentLevel: 1,
            label: {}
        }
    },
    created: function() {
    	this.loadLabels();
        auth.check();
        if (!auth.authenticated) {
            this.redirectGuest();
        }
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
    	startLesson: function () {
    		this.page = 'cards';
    	},
    	toggleDoneChallenges: function () {
    		if (this.isShowDoneChallenges) {
    			this.isShowDoneChallenges = false;
    		} else {
    			this.isShowDoneChallenges = true;
    		}
    	},
      	redirectGuest: function()
        {
            this.$router.push('login');
        }  
    },

    watch: {
		'$route' (to, from) {
			console.log(to, from);
	  		this.currentLesson = to;
		}
	},

    components: { 
        Modal 
    },
}

</script>