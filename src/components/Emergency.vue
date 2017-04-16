<template>
	<div id="page-emergency">
		<section class="emergency" v-if="page == 1">
			<header class="normal-header">
				<router-link :to="{ name: 'timeline'}"><span class="icon-close" style="font-weight: normal">X</span></router-link>
				<h2>Emergency</h2>
			</header>

			<ul id="list-image">
				<li v-on:click.prevent="view" style="background-image: url(assets/img/slider-1.jpg);"><h3>{title here}</h3></li>
				<li v-on:click.prevent="view" style="background-image: url(assets/img/slider-2.jpg);"><h3>{title here}</h3></li>
				<li v-on:click.prevent="view" style="background-image: url(assets/img/slider-3.jpg);"><h3>{title here}</h3></li>
				<li v-on:click.prevent="view" style="background-image: url(assets/img/slider-4.jpg);"><h3>{title here}</h3></li>
			</ul>
		</section>
		
		<section class="imageContent" v-if="page == 2">
			<div id="headerImage" v-on:click.prevent="back" style="background-image: url(assets/img/slider-1.jpg);">
			</div>

			<div id="content">
				<h3>{Title Text}</h3>
					<ol>
						<li class="item">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis, fugiat.</li>
						<li class="item">Rerum quis voluptatem eligendi consequatur, ipsum, ducimus reiciendis hic amet.</li>
						<li class="item">Unde doloribus ipsam cum. Fuga quod illum voluptates voluptatum nulla.</li>
						<li class="item">Fugit ipsam, aliquam laudantium reiciendis repellendus illo! Eaque doloremque, veritatis!</li>
					</ol>
			</div>
		</section>
	
	</div>
</template>

<script>
import {router} from '../index'
import config from '../config'
import auth from '../api/auth'
import timeline from '../api/timeline'
import $ from 'jquery'

export default {
    data() {
        return {
            page: '1',
        }
    },
    created: function() {
        
    },
    methods: {
        view: function() {
            this.page = 2;
        },
        back: function () {
        	this.page = 1;
        }
    },
}

</script>