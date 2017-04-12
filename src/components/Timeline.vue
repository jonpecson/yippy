<template>
<div id="timeline-container">
    <header>
        <div class="title-area">
            <a href="javascript:void(0);"><i class="icon-yipp_profile_line"></i></a>
            <span>Trainingen</span>
            <router-link :to="{ name: 'emergency'}"><i class="icon-yipp_notification_line2"></i></router-link>
        </div>

        <div class="user-area">
            <div class="child-name">{{ child.get('name') }}</div>
            <ul class="months-level">
                <li>
                    <span>{{ child.get('age') }}</span>  
                    <span>Maanden</span>
                </li>
                <li>
                    <span>1</span>
                    <span>Level</span>
                </li>
                <li>
                    <a href="#" v-on:click.prevent="toggle" v-if="page == 'lessons'"><i class="icon-yipp_down"></i></a>
                    <a href="#" v-on:click.prevent="toggle" v-if="page == 'levels'"><i class="icon-yipp_up"></i></a>
                </li>
            </ul>

            <div class="photo"></div>
            
        </div>
    </header>
        
        <section class="traingen" v-if="page == 'lessons'">
            <ul id="list-icons">
                <li v-for="lesson in lessons">
                    <a href="#" v-bind:data-id="lesson.id" v-on:click.prevent="goTodo">
                        <span class="icon big active" v-bind:class="lesson.icon"></span> {{ lesson.counter }}. {{ lesson.description }}
                    </a>
                </li>
            </ul>
        </section>
        
            
        <section class="traingen2" v-if="page == 'levels'">
                    
            <ul id="list-text">
        
            <li>
                <a href="" class="active"><span class="level">Level 1</span> <span class="months">7 - 12 months</span></a>
            </li>

            <li>
                <a href=""><span class="level">Level 2</span> <span class="months">12 - 12 months</span></a>
            </li>
        
            </ul>
        
        </section>
        
        <footer>
            <ul>
                <li><a href="javascript:void(0);" class="active"><span class="icon-yipp_home_full-"></span>Training</a></li>
                <li><router-link :to="{ name: 'challenge'}"><span class="icon-yipp_challenge_line"></span>Challenge</router-link></li>
            </ul>
        </footer>
</div>
</template>

<script>
import {router} from '../index'
import config from '../config'
import $ from 'jquery'
import auth from '../api/auth'
import timeline from '../api/timeline'

export default {
    data() {
        return {
            child: {},
            page: 'lessons'
        }
    },
    created: function() {
        auth.check();
        if (!auth.authenticated) {
            this.redirectGuest();
        }

        console.log(auth.user.data)

        this.child = auth.user.data.child;
        this.getTimeline();
    },
    methods: {
        toggle: function() {
            if (this.page == 'lessons') {
                this.page = 'levels';    
            } else {
                this.page = 'lessons';
            }
        },
        getTimeline: function() {
            this.lessons = [
                {
                    id: 1,
                    counter: 1,
                    description: 'Nutrition fruit & vegetable',
                    icon: 'icon-yipp_check_full'
                }
            ];

            // timeline.lessons(this, 1, function (response) {
            //     console.log(response)
            // }, function (msg, response) {

            // });
        },
        goTodo: function (e) {
            var id = e.target.getAttribute('data-id');
            console.log('goto todo/' + id);
        },
        redirectGuest: function()
        {
            this.$router.push('login');
        }
    }
}
</script>

