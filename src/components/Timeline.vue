<template>
<div id="container">
    <header>
        <div class="title-area">
            <router-link :to="{ name: 'profile'}"><i class="icon-yipp_profile_line"></i></router-link>
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

            <div class="photo">
                <img class="avatar" v-bind:src="child.get('image')" v-on:click="goToProfile">
            </div>
            
        </div>
    </header>
        
        <section class="traingen" v-if="page == 'lessons'">
            <ul id="list-icons">
                <li v-for="lesson in lessons">
                    <a href="#" v-bind:data-id="lesson.id" v-on:click.prevent="goTodo">
                        <span class="icon big active" v-bind:class="lesson.icon"></span>
                        {{ lesson.counter }}. {{ lesson.title }}
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
                        <span v-bind:data-id="level.id" class="level">{{ level.counter }}</span> 
                        <span v-bind:data-id="level.id" class="months">{{ level.description }}</span>
                    </a>

                    <a href="#" v-if="level.active == ''" 
                        v-bind:data-id="level.id" 
                        v-on:click.prevent=""
                        @click="showModal = true"
                        v-bind:class="level.active">
                        <span v-bind:data-id="level.id" class="level">{{ level.counter }}</span> 
                        <span v-bind:data-id="level.id" class="months">{{ level.description }}</span>
                    </a>
                </li>
            </ul>
        
        </section>
        
        <footer>
            <ul>
                <li><a href="javascript:void(0);" class="active"><span class="icon-yipp_home_full-"></span>Training</a></li>
                <li><router-link :to="{ path: 'challenge'}"><span class="icon-yipp_challenge_line"></span>Challenge</router-link></li>
            </ul>
        </footer>

        <modal v-if="showModal" @close="showModal = false">
            <h3 slot="header">Ooops...</h3>
            <p slot="body">This is not yet available</p>
        </modal>
</div>
</template>

<script>
import locale from '../api/locale'
import {router} from '../index'
import config from '../config'
import auth from '../api/auth'
import timeline from '../api/timeline'
import $ from 'jquery'
import Storage from '../storage'

import Modal from '../components/Modal.vue'

export default {
    data() {
        return {
            child: {},
            page: 'lessons',
            levels: [],
            lessons: [],
            showModal: false,
            currentLevel: 0,
            childAge: 0,
            userID: 0,
            label: {}
        }
    },
    created: function() {
        var tour = Storage.get('tour');
        if (!tour) {
            this.$router.push('tour');
        }

        this.loadLabels();
        auth.check();
        if (!auth.authenticated) {
            this.redirectGuest();
        }

        var level = Storage.get('current_level');
        if (level) {
            this.currentLevel = level;
        }

        this.child = auth.user.data.child;
        this.childAge = this.child.get('age');
        
        this.userID = auth.user.get('id');
        // this.userID = 32; // hard coded

        this.getLevels();
        this.showTimeline();
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
        getLevels: function () {
            var that = this;
            
            this.levels = [];
            timeline.levels(this, function (response) {
                $.each(response.data, function (index, value) {
                    var activeStr = '';
                    if (that.childAge >= parseInt(value.min_month) && that.childAge <= parseInt(value.max_month)) {
                        activeStr = 'active';
                    }

                    // Hard coded
                    activeStr = 'active';

                    that.levels.push({
                        id: value.id,
                        counter: value.title,
                        description: value.description,
                        active: activeStr
                    });
                });
                
            }, function (msg, response) {
                that.logError(msg);
            });
        },
        getLessons: function () {
            var that = this;

            this.lessons = [];
            timeline.lessons(this, this.currentLevel, this.userID, function (response) {
                var counter = 0;
                $.each(response.data, function (index, value) {
                    var active = '';
                    counter++;
                    value.counter = counter;
                    that.lessons.push(value);
                });

            }, function (msg, response) {
                that.logError(msg);
            });
        },
        toggle: function() {
            if (this.page == 'lessons') {
                this.showLevels();
            } else {
                this.showTimeline();
            }
        },
        showTimeline: function() {
            this.page = 'lessons';
            this.getLessons();
        },
        showLevels: function() {
            this.page = 'levels';
        },
        setCurrentLevel: function (e) {
            var id = e.target.getAttribute('data-id');
            this.currentLevel = id;
            this.toggle();

            Storage.save('current_level', id);
        },
        goTodo: function (e) {
            var id = e.target.getAttribute('data-id');

            var that = this;
            $.each(this.lessons, function (index, value) {
                if (value.id == id) {
                    var str = JSON.stringify(value);
                    Storage.save('active_lesson', str, 1);
                    
                    if (value.yippLesson.is_done > 0) {
                        that.$router.push('cheatsheet-' + id);
                    } else {
                        that.$router.push('lesson-' + id);
                    }
                }
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
        goToProfile: function () {
            this.$router.push('profile');
        }
    },

    components: { 
        Modal 
    },
}
</script>

