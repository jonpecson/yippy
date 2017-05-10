<template>
<div id="portfolio-container"><div id="container">
<section id="profile">

	<header>
        <div class="title-area">
            <router-link :to="{ name: 'timeline'}"><i class="icon-yipp_profile_line"></i></router-link>
            <span>{{ label.header_timeline }}</span>
            <router-link :to="{ name: 'emergency'}"><i class="icon-yipp_notification_line2"></i></router-link>
        </div>

        <div class="user-area">
            <div class="child-name">{{ child.get('name') }}</div>
            <ul class="months-level">
                <li>
                    <span>{{ childAge }}</span>  
                    <span>Maanden</span>
                </li>
                <li>
                    <span>{{ currentLevel }}</span>
                    <span>Level</span>
                </li>
                <li>
                    <a href="#" v-on:click.prevent="toggle" v-if="page == 'lessons'"><i class="icon-yipp_down"></i></a>
                    <a href="#" v-on:click.prevent="toggle" v-if="page == 'levels'"><i class="icon-yipp_up"></i></a>
                </li>
            </ul>

            <div class="photo"><img class="avatar" v-bind:src="child.get('image')"></div>
            
        </div>
    </header>

		<ul class="data">
			<li>
			
			<span class="big">{{ profile.days }}</span>
			
			<span class="small left">
			Je gebruikt<br>
			de app nu<br>
			<strong>dagen</strong>
			</span>
			</li>
			<li>
			<span class="big">{{ profile.completed }}</span>
				<span class="small right">
				<strong>Doel (en)</strong><br>
				behaald
				</span>
			</li>
		</ul>

		<div class="mTitle"><span>Challenges</span></div>
		
		<div class="challenge">
		
			<ul>
				<li v-for="item of profile.items" v-bind:class="item.challenges.level == activeLevel ? 'active' : ''" v-on:click="changeLevel(item.challenges.level)">{{ item.challenges.level  }}</li>
			</ul>
		
		</div>
		
		<ul class="challenges">
		
			<li v-for="c of activeChallenge">
				<i v-bind:class="c.Lesson.icon"></i>
				<strong>{{ c.Lesson.title }}</strong>
				<p>{{ c.Content.title }}</p>
			</li>
		
		</ul>
		
		<!-- <a href="" class="btn">Won item's <span class="notify">1</span></a> -->
		
		<div class="mTitle"><span>Titel</span></div>
		
		<div class="place">
		
			<i class="icon-yipp_supermom_full"></i>
		
			<div class="right">
				<span>{{ profile.my_level }}</span>
                <br/>
				<strong>
				{{ profile.my_level_title }}
				</strong>
			</div>
		
		</div>
		
		<div class="mTitle"><span>Gebruikers</span></div>
		
		<div class="total">
			<strong>{{ profile.total_users }}</strong>
			<div class="right">
			Deze app heeft al <br>
			<strong>getbruikers</strong>
			</div>
		</div>

	</section>


</div></div>
</template>

<script>
import locale from '../api/locale'
import {router} from '../index'
import config from '../config'
import auth from '../api/auth'
import profile from '../api/profile'
import $ from 'jquery'
import Storage from '../storage'

import Modal from '../components/Modal.vue'

export default {
    data() {
        return {
            child: {},
            childAge: 0,
            userID: 0,
            label: {},
            profile: {},
            currentLevel: 0,
            activeChallenge: {},
            activeLevel: 0,
            page: ''
        }
    },
    created: function() {
        this.loadLabels();
        auth.check();
        if (!auth.authenticated) {
            this.redirectGuest();
        }

        this.child = auth.user.data.child;
        this.childAge = this.child.get('age');
        this.userID = auth.user.get('id');
        // this.userID = 32;
        
        this.showContent();
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
        showContent: function () {
        	var that = this;
        	profile.get(this, this.userID, function (response) {
        		that.profile = response;
                if (response.items.length > 0) {
                    that.activeChallenge = response.items[0].challenges.item[0];
                    that.activeLevel = response.items[0].challenges.level;
                }
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
        changeLevel: function (level) {
            var that = this;
            $.each(this.profile.items, function (index, value) {
                if (value.challenges.level == level) {
                    that.activeChallenge = {};
                    if (value.challenges.item) {
                        that.activeChallenge = value.challenges.item[0];
                    }

                    that.activeLevel = level;
                }
            });
        }
    },

    components: { 
        Modal 
    },
}
</script>

