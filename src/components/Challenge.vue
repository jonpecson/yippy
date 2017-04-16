<template>
	<div id="container">
	
		<div class="header">

			<router-link :to="{ name: 'timeline'}" class="icon">
				<i class="icon-yipp_profile_line"></i>
			</router-link>

			<div class="title">xChallenge</div>

		</div>

		
		<div class="content">
		
			<div class="panel">
			Lorem Ipsum is simply dummy text of the printing and typesetting industry.
			</div>
			
			<a href="" class="btn">Explore training</a>
		
		</div>

			<ul class="blockList">
				<li>
					<span class="set">
					<i class="icon-yipp_notification_line"></i>
					14:00
					| <i class="icon-yipp_repeat_line"></i>
					Every day
					</span>
					<p>Lorem Ipsum</p>
					
					<i class="arrow icon-yipp_forward"></i>
					
				</li>
				<li>
				<span class="set">
					<i class="icon-yipp_notification_line"></i>
					14:00
					| <i class="icon-yipp_repeat_line"></i>
					Every day
					</span>
					<p>Lorem Ipsum</p>
					
						<i class="arrow icon-yipp_forward"></i>
				</li>
			</ul>		

		<a href="" class="link">Show finished challenges</a>

			<ul class="blockList2">
				<li>
					<p>Lorem Ipsum</p>
					
					<i class="arrow icon-yipp_forward"></i>
					
				</li>
				<li>
					<p>Lorem Ipsum</p>
					
						<i class="arrow icon-yipp_forward"></i>
				</li>
			</ul>

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
import '../../assets/css/challenge.css';
import '../../assets/css/app.css';

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
            child: {},
            page: 'lessons',
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

        this.child = auth.user.data.child;
        this.showTimeline();
    },
    methods: {
        toggle: function() {
            if (this.page == 'lessons') {
                this.showLevels();
            } else {
                this.showTimeline();
            }
        },
        showTimeline: function() {
            this.lessons = [
                {
                    id: 1,
                    counter: 1,
                    description: 'Nutrition fruit & vegetable',
                    icon: 'icon-yipp_check_full'
                }
            ];

            this.page = 'lessons';
            
            // timeline.lessons(this, 1, function (response) {
            //     console.log(response)
            // }, function (msg, response) {

            // });
        },
        showLevels: function() {
            this.levels = [
                {
                    id: 3,
                    counter: 1,
                    description: '7 - 12',
                    active: 'active'
                },
                {
                    id: 2,
                    counter: 2,
                    description: '8',
                    active: ''
                }
            ];

            this.page = 'levels';
        },
        setCurrentLevel: function (e) {
            var id = e.target.getAttribute('data-id');
            this.currentLevel = id;
            this.toggle();
        },
        goTodo: function (e) {
            var id = e.target.getAttribute('data-id');
            console.log('goto todo/' + id);
            this.$router.push('challenge/content');   
        },
        redirectGuest: function()
        {
            this.$router.push('login');
        }
    },

    components: { 
        Modal 
    },
}

</script>