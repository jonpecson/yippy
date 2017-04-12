<template>
<div id="signUp">
	<div id="parent" class="panel" v-if="step == 1">

		<div class="titleBar"><a href="javascript:void(0);" v-on:click="back" class="back"></a> Sign up parent</div>
		
		<form action="" method="post" class="middle-area semi" v-on:submit.prevent="register">
		
			<div class="selection-group">
				<input type="radio" id="father"  name="parents" value="father" v-model="parent_gender">
				<label for="father" class="rLeft">Father</label>
				<input type="radio" id="mother"  name="parents" value="mother" v-model="parent_gender">
				<label for="mother" class="rRight">Mother</label>
			</div>

			<div class="placer bottom">
				<div class="error" v-if="error_message">{{ error_message }}</div>
				<label>Naam</label>
				<input type="text" placeholder="your name" v-model="parent_name">

				<label>E-mailadres</label>
				<input type="email" placeholder="name@mail.nl" v-model="parent_email">

				<label>Wachwoord</label>
				<input type="password" placeholder="******" v-model="parent_password">
			
			</div>
			
			<div class="bottom-area">
				<button class="form-button-medium">Next<span v-if="loading" class="loading"></span></button>
			</div>
			
		</form>

	</div>

	<div id="child" class="panel" v-else-if="step == 2">

		<div class="titleBar"><a href="javascript:void(0);" v-on:click="back" class="back"></a> Sign up child</div>
		
		<form action="" method="post" class="middle-area semi" v-on:submit.prevent="addChild">
		
			<div class="selection-group">
				<input type="radio" id="son"  name="child" value="son" v-model="child_gender">
				<label for="son" class="rLeft">Son</label>
				<input type="radio" id="daughter"  name="child" value="daughter" v-model="child_gender">
				<label for="daughter" class="rRight">Daughter</label>
			</div>

			<div class="placer middle">
				
					<div class="error" v-if="error_message">{{ error_message }}</div>
				<label>Naam van jouw kind</label>
				<input type="text" placeholder="your name" v-model="child_name">

				<label>Wanneer is jouw kind geboren?</label>
				<ul id="date-group">
					<li><input type="tel" placeholder="DD" class="date-group" v-model="child_bday_d"></li>
					<li><input type="tel" placeholder="MM" class="date-group" v-model="child_bday_m"></li> 
					<li><input type="tel" placeholder="YYYY" class="date-group" v-model="child_bday_y"></li>
				</ul>
			
			</div>
			
			<div class="bottom-area">
				<button class="form-button-medium">Next<span v-if="loading" class="loading"></span></button>
			</div>
			
		</form>


	</div>
	
	<div id="photo" class="panel" v-else-if="step == 3">

		<div class="titleBar"><a href="javascript:void(0);" v-on:click="back" class="back"></a> Add photo</div>

		<form action="" method="post" enctype="multipart/form-data" v-on:submit.prevent="addPicture">
			<div class="error" v-if="error_message">{{ error_message }}</div>
			<input type="file" name="uploadedfile" id="uploadPic" accept="image/*" capture>
			<label for="uploadPic" class="uploadPic">+</label>

			<h3>Choose a nice picture of <br> you and {{ child_name }}!</h3>

			<div class="bottom-area">
				<input type="submit" value="next" class="form-button-medium">
				<a href="javascript:void(0);" v-on:click="showLastStep" >Continue without picture</a>
			</div>
			
		</form>

	</div>
						
	<div id="photoAdded" class="panel" v-else-if="step == 4">

		<div class="titleBar"><a href="javascript:void(0);" v-on:click="back" class="back"></a> Add photo</div>

		<div class="picHolder"></div>
			
		<h3>What a nice picture! <br> Do you also like?</h3>
		<a href="javascript:void(0);">Choose another picture</a>

		<div class="bottom-area">
			<a href="javascript:void(0);" class="button-medium">next</a>
		</div>
	</div>
	
	<div id="starten" class="panel" v-else-if="step == 5">
				
			<div class="placer middle">
						
				<p>Become a Supermom for <span>Lisa</span> with <strong>Yipp app!</strong></p>		
						
			</div> 							
			
			<div class="bottom-area">
				<router-link :to="{ name: 'timeline'}" class="button-medium white"">Begin!</router-link>
			</div>
							
	</div>
								
</div>
</template>


<script>
import {router} from '../index'
import config from '../config'
import auth from '../api/auth'
import register from '../api/register'
import $ from 'jquery'

export default {
    data() {
        return {
            step: 1,
            error: false,
			error_message: '',
			parent_name: '',
			parent_gender: '',
			parent_email: '',
			parent_password: '',
			child_name: '',
			child_gender: '',
			child_bday_d: '',
			child_bday_m: '',
			child_bday_y: '',
			loading: false
        }
    },
    created: function() {
    	auth.check();
    	if (auth.user) {
			if (auth.user.child) {
				this.showAddChildPhoto();
			} else {
				this.showAddChild();
			}
		}
    },
    methods: {
    	showParentForm: function () {
    		this.resetError();
			this.step = 1;
    	},
        showAddChild: function () {
        	if (!auth.user) {
        		this.showParentForm();
        		return;
        	}

        	if (auth.user.data.child) {
        		this.showAddChildPhoto();
        		return;
        	}

        	this.resetError();
			this.step = 2;
    	},
    	showAddChildPhoto: function () {
    		if (!auth.user.data.child) {
        		this.showAddChild();
        		return;
        	}

    		this.resetError();
			this.step = 3;
    	},
        showLastStep: function () {
        	if (!auth.user) {
        		this.showParentForm();
        		return;
        	}

        	if (!auth.user.data.child) {
        		this.showAddChild();
        		return;
        	}

			this.resetError();
			this.step = 5;
		},
		back: function () {
			this.resetError();
			this.step = 1;
		},
		register: function () {
			var credentials = {
	          	name: this.parent_name,
	          	email: this.parent_email,
	          	parent_type: this.parent_gender,
	          	password: this.parent_password,
	          	service_id: 2
	        }

	        var that = this;
	        register.signup(this, credentials, function(msg, response) {
	        	that.showAddChild();
	        }, function(msg, response) {
	        	that.logError(msg);
	        })
		},
		addChild: function () {
			this.loading = true;
			var credentials = {
	          	child_name: this.child_name,
	          	child_birthday: this.child_bday_y + '-' + this.child_bday_m + '-' + this.child_bday_d,
	          	child_type: this.child_gender,
	          	user_id: auth.user.data.id
	        }

	        var that = this;
	        register.addChild(this, credentials, function(msg, response) {
	        	auth.user.addChild(credentials);
                auth.saveUser(auth.user);
	        	that.showAddChildPhoto();
	        }, function(msg, response) {
	        	that.logError(msg);
	        })
		},
		addPhoto: function () {
			this.loading = true;
			var credentials = {
	          	image: this.child_name,
	          	image_id: this.child_bday_y + '-' + this.child_bday_m + '-' + this.child_bday_d,
	          	user_id: auth.user.user_id
	        }

	        var that = this;
	        // auth.addChild(this, credentials, function() {
	        // 	this.resetError();
	        // })
		},
		resetError: function () {
			this.loading = false;
			this.error_message = '';
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
    }
}
</script>