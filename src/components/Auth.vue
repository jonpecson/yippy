<template>
<div id="signUp">
	<div id="onBoarding" class="panel" v-if="step == 1">
		<div id="companyLogo"></div>
		<div class="bottom-area">
			<router-link :to="{ name: 'register'}" class="button-big">Sign up</router-link>
			<a href="javascript:void(0);" v-on:click.prevent="showLoginForm">I already have an account</a>
		</div>
	</div>
	
	<div id="login1" class="panel" v-else-if="step == 2">
		<div class="titleBar"><a href="javascript:void(0);" v-on:click="back" class="back"></a> Log in</div>
		<form action="" method="post" class="middle-area full" v-on:submit.prevent="logMeIn">
			<div class="placer middle">
				<div class="error" v-if="error_message">{{ error_message }}</div>
				<input name="login_email" type="email" placeholder="E-mailadres" v-model="login_email">
				<input name="login_pw" type="password" placeholder="Wachtwoord" v-model="login_pw">
			</div>
				
			<div class="bottom-area">
				<button class="form-button-medium">Login<span v-if="loading" class="loading"></span></button>
				<router-link :to="{ name: 'register'}">I don't have an account</router-link>
				<br>
				<a href="javascript:void(0);" v-on:click="showResetForm">Forgot password</a>
			</div>
		</form>
	</div>
			
	<div id="reset" class="panel" v-else-if="step == 3">
		<div class="titleBar"><a href="javascript:void(0);" v-on:click="back" class="back"></a> Reset password</div>
		<form action="" method="post" class="middle-area full">
			<div class="placer bottom">
				<p>We will send you an email with a link so you can set up a new password</p>
				<input type="email" placeholder="E-mailadres">
			</div>
			<div class="bottom-area">
				<button class="form-button-medium">Reset</button>
			</div>
		</form>
	</div>	
	
	<div id="renew" class="panel" v-else-if="step == 4">
		<div class="titleBar"><a href="javascript:void(0);" v-on:click="back" class="back"></a> Reset password</div>
		<form action="" method="post" class="middle-area full">
			<div class="placer middle">
				<input type="password" placeholder="New password">
				<input type="password" placeholder="Repeat password">
			</div>
			<div class="bottom-area">
				<button class="form-button-medium">Confirm</button>
			</div>
		</form>
	</div>	
</div>
</template>


<script>
import {router} from '../index'
import config from '../config'
import auth from '../api/auth'
import $ from 'jquery'

export default {
    data() {
        return {
            step: 1,
            error_message: '',
			login_email: '',
			login_pw: '',
			loading: false
        }
    },
    created: function() {
    	auth.check();
    	if (auth.authenticated) {
    		this.redirectAuth();
		}
    },
    methods: {
        showLoginForm: function () {
        	this.resetError();
			this.step = 2;
		},
		showResetForm: function () {
			this.resetError();
			this.step = 3;
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
		resetError: function () {
			this.error_message = '';
		},
		logError(msg) {
	        this.error_message = msg;
	    },
    }
}
</script>