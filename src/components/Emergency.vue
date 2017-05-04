<template>
	<div id="page-emergency">
		<section class="emergency" v-if="page == 1">
			<header class="normal-header">
				<router-link :to="{ name: 'timeline'}"><span class="icon-close" style="font-weight: normal">X</span></router-link>
				<h2>Emergency</h2>
			</header>

			<ul id="list-image">
				<li v-on:click.prevent="view(item.id)" v-for="item of content">
					<img v-bind:src="item.Contents.src_url" v-if="item.Contents.src_type == 'ext_image'">
					<h3>{{ item.Contents.title }}</h3>
				</li>
			</ul>
		</section>
		
		<section class="imageContent" v-if="page == 2">
			<div id="headerImage" v-on:click.prevent="back" style="height: 200px; overflow: hidden;">
				<img v-bind:src="activeContent.Contents.src_url" v-if="activeContent.Contents.src_type == 'ext_image'">
			</div>

			<div id="content">
				<h3>{{ activeContent.Contents.title }}</h3>
				{{ activeContent.Contents.details }}
			</div>
		</section>
	
	</div>
</template>

<script>
import locale from '../api/locale'
import {router} from '../index'
import config from '../config'
import auth from '../api/auth'
import emergency from '../api/emergency'
import $ from 'jquery'

export default {
    data() {
        return {
            page: '1',
            label: {},
            content: [],
            activeContent: {}
        }
    },
    created: function() {
        this.loadLabels();
        auth.check();
        if (!auth.authenticated) {
            this.redirectGuest();
        }

        this.getContent();
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
        getContent: function () {
        	var that = this;
        	emergency.get(this, config.api.lang, function (response) {
                that.content = response;
            }, function (msg, response) {
                that.logError(msg);
            });
        },
        view: function (id) {
        	var that = this;
        	$.each(this.content, function (index, value) {
        		if (value.id == id) {
        			that.activeContent = value;
        			that.page = 2;
        		}
        	})
        },
        back: function () {
        	this.page = 1;
        }
    },
}

</script>