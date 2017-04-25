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
                <a href="javascript:void(0);" v-if="item.rev_title == false" class="skip" v-on:click.prevent="skip">Skip</a>
                <a href="javascript:void(0);" v-if="item.rev_title == true" class="start-button" v-on:click.prevent="skip">Let' start</a>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
import {router} from '../index'
import config from '../config'
import $ from 'jquery'
import Slider from '../../assets/js/zSlider.js'

import Storage from '../storage'

export default {
    data() {
        return {
            explanations: [],
            visible: true,
        }
    },
    created: function() {
        var skip = Storage.get('skip');
        
        if (skip) {
            this.skip();
            return;
        }

        var that = this;
        this.$http.get(config.api.url + '/explanation/' + config.api.lang).then(response => {
            var result = response.body.result;
            if (response.body.status == 'OK') {
                $.each(result.data, function(x, y) {
                    y.icon = 'icon ' + y.icon;
                    y.background = 'background-image: url("'+y.image+'")';
                    that.explanations.push(y);  
                });

                // need this to add a little delay
                setTimeout(function(){
                    var slider = new Slider('#slider1', '.z-slide-item', {
                        interval: 6,
                        duration: 1
                    });
                }, 1);
            }

        }, response => {
          // console.log(response.body.result)
        });

    },
    methods: {
        skip: function () {
            Storage.save('skip', 1, 1)
            this.$router.push('login');
        }
    }
}
</script>

