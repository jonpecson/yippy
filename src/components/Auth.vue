<template>
<div id="signUp">
	<div id="onBoarding" class="panel" v-if="step == 1">
		<div id="companyLogo"></div>
		<div class="bottom-area">
			<router-link :to="{ name: 'register'}" class="button-red-big">{{ label.sign_up }}</router-link>
			<a href="javascript:void(0);" v-on:click.prevent="showLoginForm">{{ label.had_account }}</a>
		</div>
	</div>
	
	<div id="login1" class="panel" v-else-if="step == 2">
		<div class="titleBar"><a href="javascript:void(0);" v-on:click="back" class="back yipp-yipp_back"></a> {{ label.header_login }}</div>
		<form action="" method="post" class="middle-area full" v-on:submit.prevent="logMeIn">
			<div class="placer middle">
				<div class="error" v-if="error_message">{{ error_message }}</div>
				<input name="login_email" type="email" v-bind:placeholder="label.email_placeholder" v-model="login_email">
				<input name="login_pw" type="password" v-bind:placeholder="label.password_placeholder" v-model="login_pw">
			</div>
				
			<div class="bottom-area">
				<button class="button-red-big">Login<span v-if="loading" class="loading"></span></button>
				<a href=""><router-link :to="{ name: 'register'}">I don't have an account</router-link></a>
				<br>
				<a href="javascript:void(0);" v-on:click="showResetForm">Forgot password</a>
			</div>
		</form>
	</div>
			
	<div id="reset" class="panel" v-else-if="step == 3">
		<div class="titleBar"><a href="javascript:void(0);" v-on:click="back" class="back yipp-yipp_back"></a> {{ label.header_reset }}</div>
		<form action="" method="post" class="middle-area full" v-on:submit.prevent="resetPassword">
			<div class="placer middle">
				<div class="error" v-if="error_message">{{ error_message }}</div>
				<div class="success" v-if="success_message">{{ success_message }}</div>
				<p>{{ label.pass_reset_msg }}</p>
				<input type="email" placeholder="E-mailadres" v-model="pw_email">
			</div>
			<div class="bottom-area">
				<button class="button-red-big">Reset<span v-if="loading" class="loading"></span></button>
			</div>
		</form>
	</div>	
	
	<div id="renew" class="panel" v-else-if="step == 4">
		<div class="titleBar"><a href="javascript:void(0);" v-on:click="back" class="back yipp-yipp_back"></a> {{ label.header_reset }}</div>
		<form action="" method="post" class="middle-area full" v-on:submit.prevent="newPassword">
			<div class="placer middle">
				<div class="error" v-if="error_message">{{ error_message }}</div>
				<div class="success" v-if="success_message">{{ success_message }}</div>
				<input type="password" placeholder="New password" v-model="pw_newpassword">
				<input type="password" placeholder="Repeat password" v-model="pw_code">
			</div>
			<div class="bottom-area">
				<button class="button-red-big">Confirm<span v-if="loading" class="loading"></span></button>
			</div>
		</form>
	</div>	
</div>
</template>


<script>
import locale from '../api/locale'
import {router} from '../index'
import config from '../config'
import auth from '../api/auth'
import $ from 'jquery'

export default {
    data() {
        return {
            step: 1,
            success_message: '',
            error_message: '',
			login_email: '',
			login_pw: '',
			loading: false,
			pw_newpassword: '',
			pw_code: '',
			pw_email: '',
			label: {}
        }
    },
    created: function() {
    	this.loadLabels();
    	auth.check();
    	if (auth.authenticated) {
    		this.redirectAuth();
		}

		if (this.$route.path == '/newpassword') {
			this.showNewPasswordForm();
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
        showLoginForm: function () {
        	this.resetError();
			this.step = 2;
		},
		showResetForm: function () {
			this.resetError();
			this.step = 3;
		},
		showNewPasswordForm: function () {
			this.resetError();
			this.step = 4;
		},
		back: function () {
			this.resetError();
			this.step = 1;
		},
		logMeIn: function () {
			this.loading = true;
			var credentials = {
	          	email: this.login_email,
	          	password: this.login_pw
	        }

	        var that = this;
	        auth.login(this, credentials, function() {
	        	that.loading = false;
	        	that.redirectAuth();
	        }, function (msg, response) {
	        	that.loading = false;
	        	that.logError(msg)
	        })
		},
		redirectAuth: function()
		{
			if (auth.user.hasChild()) {
    			this.$router.push('timeline');
    		} else {
    			this.$router.push('register');	
    		}
		},
		resetPassword: function () {
			this.loading = true;
			var credentials = {
	          	email: this.pw_email
	        }

	        var that = this;
	        auth.resetPassword(this, credentials, function(response) {
	        	that.loading = false;
	        	that.showMessage(response.message);
	        }, function (msg, response) {
	        	that.loading = false;
	        	that.logError(msg)
	        })
		},
		newPassword: function () {
			this.loading = true;
			var credentials = {
	          	password: this.pw_newpassword,
	          	code: this.pw_code
	        }

	        var that = this;
	        auth.newPassword(this, credentials, function(response) {
	        	that.loading = false;
	        	that.showMessage(response.message);
	        }, function (msg, response) {
	        	that.loading = false;
	        	that.logError(msg)
	        })
		},
		resetError: function () {
			this.error_message = '';
			this.success_message = '';
		},
		logError(msg) {
			this.success_message = '';
	        this.error_message = msg;
	    },
	    showMessage(msg) {
	    	this.error_message = '';
	    	this.success_message = msg;
	    }
    },
}
</script>