<template>
<div id="container">
    
    <div class="header">
        <div class="top">
            <router-link :to="{ name: 'timeline'}">X</router-link> Remove
        </div>
        <h1>{{ lessonInfo.title }}</h1>
    </div>

    <section v-if="page == 'knowledge_card'">
        <div class="panel">
            <div style="overflow: hidden;">
                <div class="paper">
                    <h3>{{ currentFavorite.Contents.title }}</h3>
                    <p>{{ currentFavorite.Contents.details }}</p>

                    <i class="heart icon-yipp_check_full"
                        v-on:click.prevent="markFavorite" v-bind:data-id="currentFavorite.Contents.id"
                    ></i>
                </div>
            </div>
        </div>
    </section>

    <section v-if="page == 'cheatsheet'">
        <div class="title">
            <div class="rig">
                <i class="icon-yipp_goal_line"></i> Goal
                <hr>
            </div>
        </div>
        <div class="challenges-wrapper"> 
            <ul v-for="challenge in challenges">
                <li v-on:click.prevent="viewChallenge" v-bind:data-id="challenge.details.id" style="display: block;">
                    <span class="set">
                        <i class="icon-yipp_notification_line"></i>
                        {{ challenge.details.reminder_time }}
                    </span>
                    <ol v-for="list in challenge.list">
                        <li>{{ list.message }}</li>
                    </ol>
                </li>
            </ul>
        </div>

        <div class="title">
            <div class="rig">
                <i class="icon-yipp_heart_line"></i> Favorites
                <hr>
            </div>
        </div>

        <div class="swipe swipe-wrapper">
            <ul class="cards favorites-wrapper" v-for="fave in favorites">
                <li>
                    <h3>{{ fave.Contents.title }}</h3>
                    <a href="#" v-bind:data-id="fave.Contents.id" v-on:click.prevent="showFavorite">
                        <img v-bind:data-id="fave.Contents.id" v-if="fave.Contents.src_type == 'ext_image'" v-bind:src="fave.Contents.src_url" style="width: 50%;">
                    </a>
                    <p>
                        <a href="#" v-bind:data-id="fave.Contents.id" v-on:click.prevent="showFavorite">
                        {{ fave.Contents.details }}
                        </a>
                    </p>
                    <i class="heart icon-yipp_heart_line"></i>
                </li>
            </ul>
        </div>

        <div class="title">
            <div class="rig">
                <i class="icon-yipp_summary_line"></i> Answers
                <hr>
            </div>
        </div>

        <div class="content curved lined">
            <ol class="answer-wrapper" v-for="answer in answers">
                <li>{{ answer.Contents.details }}</li>
            </ol>
        </div>
    </section>

    <div class="restart">
        <a href="#" v-on:click.prevent="resetLesson">Restart lesson</a>
    </div>

    <div class="picImg" >
        <div class="data">
            <h3>Lorem Ipsum</h3>
            <p> Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
            <a href="">Lorem Ipsum</a>
        </div>
    </div>

    <modal v-if="removeFavoriteModal" @close="removeFavoriteModal = false">
        <h3 slot="header">Are you sure?</h3>
        <p slot="body">Do you want to remove this from your favorite?</p>
        
        <div slot="footer">
          <button class="form-button-small" @click="removeFavorite">
            Remove card
          </button>
          <button class="form-button-small" @click="removeFavoriteModal = false">
            Cancel
          </button>
        </div>

    </modal>

    <modal v-if="resetLessonModal" @close="resetLessonModal = false">
        <h3 slot="header">Are you sure?</h3>
        <p slot="body">Do you want to restart the challenge?</p>
        
        <div slot="footer">
          <button class="form-button-small" @click="restartLesson">
            Restart challenge
          </button>
          <button class="form-button-small" @click="resetLessonModal = false">
            {{ label.cancel_btn }}
          </button>
        </div>

    </modal>

</div>
</template>

<script>
import locale from '../api/locale'
import {router} from '../index'
import config from '../config'
import auth from '../api/auth'
import cheatsheet from '../api/cheatsheet'
import card from '../api/card'
import $ from 'jquery'
import Storage from '../storage'

import Modal from '../components/Modal.vue'

export default {
    data() {
        return {
            userID: 0,
            currentLesson: 0,
            lessonInfo: {},
            challenges: [],
            favorites: [],
            answers: [],
            page: 'cheatsheet',
            currentFavorite: {},

            removeFavoriteModal: false,
            resetLessonModal: false,
            label: {}
        }
    },
    created: function() {
        this.loadLabels();
        auth.check();
        if (!auth.authenticated) {
            this.redirectGuest();
        }

        this.currentLesson = this.$route.params.id;
        this.userID = auth.user.get('id');

        // this.currentLesson = 6;
        // this.userID = 32; // hard coded

        this.getLessonTitle();
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
        getLessonTitle: function () {
            var str = Storage.get('active_lesson');
            if (!str) {
                this.redirect('timeline');
            }

            this.lessonInfo = JSON.parse(str);
            
            if (this.currentLesson != this.lessonInfo.id) {
                this.redirect('timeline');
            }
        },
        getContent: function () {
            this.page = 'cheatsheet';
            var that = this;

            this.lessons = [];
            cheatsheet.content(this, this.currentLesson, this.userID, function (response) {
                that.challenges = response.data.challenges;
                that.answers = response.data.answers;
                that.favorites = response.data.favorites;
            }, function (msg, response) {
                that.logError(msg);
            });
        },
        showFavorite: function (e) {
            var id = e.target.getAttribute('data-id');

            var that = this;
            $.each(this.favorites, function (index, value) {
                if (value.Contents.id == id) {
                    that.currentFavorite = value;
                    that.page = 'knowledge_card'
                }
            });
        },
        markFavorite: function (e) {
            this.removeFavoriteModal = true;
        },
        removeFavorite: function (e) {
            var id = e.target.getAttribute('data-id');
            
            var that = this;

            var data = {
                user_id: this.userID,
                content_id: parseInt(this.currentFavorite.Contents.id),
                lesson_id: this.currentLesson
            }

            card.favorite(that, data, function (response) {
                // none
            }, function (msg, response) {
                isError = true
                that.logError(msg);
            });

            this.removeFavoriteModal = false;
            this.getContent();
        },
        redirectGuest: function()
        {
            this.redirect('login');
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
        resetLesson: function () {
            this.resetLessonModal = true;
        },
        restartLesson: function () {
            this.resetLessonModal = false;
            
            var that = this;
            card.restartLesson(this, this.currentLesson, this.userID, function (response) {
                that.redirect('timeline')
            }, function (msg, response) {
                that.logError(msg);
            });
        },
        redirect: function(url) {
            this.$router.push(url);
        },
        viewChallenge: function (e) {
            var id = e.target.getAttribute('data-id');

            this.redirect('feedback-' + id);s
        }
    },

    components: { 
        Modal 
    },
}
</script>

