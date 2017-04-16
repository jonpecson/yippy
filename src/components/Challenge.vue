<template>
	<div id="container">
	
		<div class="header">

			<router-link :to="{ name: 'timeline'}" class="icon">
				<i class="icon-yipp_profile_line"></i>
			</router-link>

			<div class="title">Challenge</div>

		</div>

		
		<div class="content" v-if="empty">
		
			<div class="panel">
			Lorem Ipsum is simply dummy text of the printing and typesetting industry.
			</div>
			
			<a href="" class="btn">Explore training</a>
		
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

			<a href="" v-if="isShowDoneChallenges == false" v-on:click.prevent="toggleDoneChallenges" class="link">Show finished challenges</a>
			<a href="" v-if="isShowDoneChallenges" v-on:click.prevent="toggleDoneChallenges" class="link">Hide finished challenges</a>

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
					<router-link :to="{ name: 'timeline'}"><span class="icon-yipp_home_full-"></span>Training</router-link>
				</li>
				<li>
					<a href="javascript:void(0);" class="active"><span class="icon-yipp_challenge_line"></span>Challenge</a>
				</li>
			</ul>
		</footer>
		
	</div>	
</template>

<script>
import {router} from '../index'
import config from '../config'
import auth from '../api/auth'
import timeline from '../api/timeline'
import $ from 'jquery'

import Modal from '../components/Modal.vue'

// http://dev.fedvas.com/cms/api.dsuite/yipp/todos/37/en

export default {
    data() {
        return {
            empty: false,
            isShowDoneChallenges: false,
            page: 'start',
            levels: [],
            lessons: [],
            showModal: false,
            currentLevel: 1
        }
    },
    created: function() {
        auth.check();
        if (!auth.authenticated) {
            this.redirectGuest();
        }
    },
    methods: {
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