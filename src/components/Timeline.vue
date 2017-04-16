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
        
        <section class="traingen" v-if="page == 'lessons'">
            <ul id="list-icons">
                <li v-for="lesson in lessons">
                    <a href="#" v-bind:data-id="lesson.id" v-on:click.prevent="goTodo">
                        <span class="icon big active" v-bind:class="lesson.icon"></span> 
                        {{ lesson.counter }}. {{ lesson.description }}
                    </a>
                </li>
            </ul>
        </section>
        
            
        <section class="traingen2" v-if="page == 'levels'">
                    
            <ul id="list-text">
                <li v-for="level in levels">
                    <a href="#" v-if="level.active == 'active'" 
                        v-bind:data-id="level.id" 
                        v-on:click.prevent="setCurrentLevel"
                        v-bind:class="level.active">
                        <span v-bind:data-id="level.id" class="level">Level {{ level.counter }}</span> 
                        <span v-bind:data-id="level.id" class="months">{{ level.description }} months</span>
                    </a>

                    <a href="#" v-if="level.active == ''" 
                        v-bind:data-id="level.id" 
                        v-on:click.prevent=""
                        @click="showModal = true"
                        v-bind:class="level.active">
                        <span v-bind:data-id="level.id" class="level">Level {{ level.counter }}</span> 
                        <span v-bind:data-id="level.id" class="months">{{ level.description }} months</span>
                    </a>
                </li>
            </ul>
        
        </section>
        
        <footer>
            <ul>
                <li><a href="javascript:void(0);" class="active"><span class="icon-yipp_home_full-"></span>Training</a></li>
                <li><router-link :to="{ name: 'challenge'}"><span class="icon-yipp_challenge_line"></span>Challenge</router-link></li>
            </ul>
        </footer>

        <modal v-if="showModal" @close="showModal = false">
            <h3 slot="header">Ooops...</h3>
            <p slot="body">This is not yet available</p>
        </modal>
</div>
</template>

<script>
import {router} from '../index'
import config from '../config'
import auth from '../api/auth'
import timeline from '../api/timeline'
import $ from 'jquery'

import Modal from '../components/Modal.vue'

import '../../assets/css/timeline.css';
import '../../assets/css/app.css';

// http://dev.fedvas.com/cms/api.dsuite/yipp/todos/37/en

export default {
    data() {
        return {
            child: {},
            page: 'lessons',
            levels: [],
            lessons: [],
            showModal: false,
            currentLevel: 1
        }
    },
    created: function() {
        auth.check();
        if (!auth.authenticated) {
            this.redirectGuest();
        }

        this.child = auth.user.data.child;
        this.showTimeline();
    },
    methods: {
        toggle: function() {
            if (this.page == 'lessons') {
                this.showLevels();
            } else {
                this.showTimeline();
            }
        },
        showTimeline: function() {
            this.lessons = [
                {
                    id: 1,
                    counter: 1,
                    description: 'Nutrition fruit & vegetable',
                    icon: 'icon-yipp_check_full'
                }
            ];

            this.page = 'lessons';
            
            // timeline.lessons(this, 1, function (response) {
            //     console.log(response)
            // }, function (msg, response) {

            // });
        },
        showLevels: function() {
            this.levels = [
                {
                    id: 3,
                    counter: 1,
                    description: '7 - 12',
                    active: 'active'
                },
                {
                    id: 2,
                    counter: 2,
                    description: '8',
                    active: ''
                }
            ];

            this.page = 'levels';
        },
        setCurrentLevel: function (e) {
            var id = e.target.getAttribute('data-id');
            this.currentLevel = id;
            this.toggle();
        },
        goTodo: function (e) {
            var id = e.target.getAttribute('data-id');
            console.log('goto todo/' + id);
            this.$router.push('challenge/content');   
        },
        redirectGuest: function()
        {
            this.$router.push('login');
        }
    },

    components: { 
        Modal 
    },
}
</script>

