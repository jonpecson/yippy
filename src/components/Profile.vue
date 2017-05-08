<template>
<div id="page-profile">
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
				<li v-for="content of profile.challenges">{{ content.title }}</li>
				<li class="semi">2</li>
				<li>3</li>
				<li>4</li>
				<li>5</li>
				<li>6</li>
				<li>7</li>
				<li>8</li>
				<li>9</li>
				<li>10</li>
			</ul>
		
		</div>
		
		<ul class="challenges">
		
			<li v-for="content of profile.challenges">
				<i class="icon-yipp_water_badge"></i>
				<strong>{{ content.title }}</strong>
				<p>{{ content.description }}</p>
			</li>
		
		</ul>
		
		<!-- <a href="" class="btn">Won item's <span class="notify">1</span></a> -->
		
		<div class="mTitle"><span>Titel</span></div>
		
		<div class="place">
		
			<i class="icon-yipp_supermom_full"></i>
		
			<div class="right">
				
				<span>level 1</span>
				
				<strong>
				Beginnende <br>
				mama
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


</div>
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
    },

    components: { 
        Modal 
    },
}
</script>

