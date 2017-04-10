<template>
<div id="loadingScreen" v-if="visible">
    <div class="z-slide-wrap top" id="slider1">
        <ul class="z-slide-content">
            <li v-for="item in explanations" class="z-slide-item" v-bind:style="item.background">
                <div class="content">
                    <h2>{{ item.title }}</h2>
                    <span v-bind:class="item.icon"></span>
                    <p>{{ item.sub_title }}</p>
                </div>
                <a href="#" v-if="item.rev_title == false" v-on:click.prevent="skip" class="skip">Skip</a>
                <a href="#" v-if="item.rev_title == true"  v-on:click.prevent="skip" class="start-button">Let' start</a>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
import config from '../config'
import $ from 'jquery'
import Slider from '../../assets/js/zSlider.js'

export default {
    data() {
        return {
            explanations: [],
            visible: true,
        }
    },
    created: function() {
        var that = this;
        this.$http.get(config.api.url + '/explanation/en').then(response => {
            var result = response.body.result;
            if (response.body.status == 'OK') {
                $.each(result.data, function(x, y) {
                    y.icon = 'icon ' + y.icon;
                    y.background = 'background-image: url("'+y.image+'")';
                    // y.background = 'background-image: url("img/slider-1.jpg")';
                    that.explanations.push(y);  
                });

                // need this to add a little delay
                setTimeout(function(){
                    var slider = new Slider('#slider1', '.z-slide-item');
                }, 1);
            }

        }, response => {
          // console.log(response.body.result)
        });

    },
    methods: {
        skip() {
            this.visible = false;
            signUp.visible = true;
            signUp.load();
            return false;
        }
    }
}
</script>

