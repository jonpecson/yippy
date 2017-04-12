<template>
<div id="timeline-container">
    <header>
        <div class="title-area">

            <i class="icon-yipp_profile_line"></i>

            <span>Trainingen</span>

            <i class="icon-yipp_notification_line2"></i>

        </div>

        <div class="user-area">

            <div class="child-name">{{ child.get('name') }}</div>
            <ul class="months-level">
                <li>
                    <span>8</span>  
                    <span>Maanden</span>
                </li>
                <li>
                    <span>1</span>
                    <span>Level</span>
                </li>
                <li>

                </li>
            </ul>

            <div class="photo"></div>
            
        </div>

    </header>
        
        <section class="traingen">

            <ul id="list-icons">
                <li>
                    <a href="">
                    <span class="icon icon-yipp_check_full big active"></span> 1.Nutrition fruit &amp; vegetable
                    </a>
                </li>

                <li>
                    <a href="">
                    <span class="icon icon-yipp_water_full big active"></span> 
                    2.Drinking from a cup
                    </a>
                </li>

                <li>
                    <a href="">
                    <span class="icon icon-yipp_check_line small active"></span> 
                    if the plan
                    </a>
                </li>

                <li>
                    <a href="">
                        <span class="icon icon-yipp_sleep_line big normal"></span> 
                        3.Importance of sleep
                    </a>
                </li>

                <li>
                    <a href="">
                        <span class="icon icon-yipp_apple_line big normal"></span> 
                        4.Practice Food
                    </a>
                </li>

                <li>
                    <a href="">
                    <span class="icon  icon-yipp_camera_line small active"></span> 
                    Offering 10 times
                    </a>
                </li>

                <li>
                    <a href="">
                    <span class="icon icon-yipp_check_full big active"></span> 5.Nutrition fruit &amp; vegetable
                    </a>
                </li>

                <li>
                    <a href="">
                    <span class="icon icon-yipp_water_full big active"></span> 
                    6.Drinking from a cup
                    </a>
                </li>

                <li>
                    <a href="">
                    <span class="icon icon-yipp_check_line small active"></span> 
                    if the plan
                    </a>
                </li>

                <li>
                    <a href="">
                        <span class="icon icon-yipp_sleep_line big normal"></span> 
                        7.Importance of sleep
                    </a>
                </li>

                <li>
                    <a href="">
                        <span class="icon icon-yipp_apple_line big normal"></span> 
                        8.Practice Food
                    </a>
                </li>

                <li>
                    <a href="">
                    <span class="icon icon-yipp_camera_line small active"></span> 
                    Offering 10 times
                    </a>
                </li>
            </ul>
        
        </section>
        
            
        <section class="traingen2">
                    
            <ul id="list-text">
        
            <li>
                <a href="" class="active"><span class="level">Level 1</span> <span class="months">7 - 12 months</span></a>
            </li>

            <li>
                <a href=""><span class="level">Level 2</span> <span class="months">12 - 12 months</span></a>
            </li>
            
            <li>
                <a href=""><span class="level">Level 2</span> <span class="months">15 - 18 months</span></a>
            </li>

            <li>
                <a href=""><span class="level">Level 3</span> <span class="months">18 - 21 months</span></a>
            </li>

            <li>
                <a href=""><span class="level">Level 4</span> <span class="months">21 - 24 months</span></a>
            </li>

            <li>
                <a href=""><span class="level">Level 5</span> <span class="months">24 - 27 months</span></a>
            </li>

            <li>
                <a href=""><span class="level">Level 6</span> <span class="months">12 - 12 months</span></a>
            </li>

            <li>
                <a href=""><span class="level">Level 7</span> <span class="months">12 - 12 months</span></a>
            </li>

            <li>
                <a href=""><span class="level">Level 8</span> <span class="months">12 - 12 months</span></a>
            </li>

            <li>
                <a href=""><span class="level">Level 9</span> <span class="months">12 - 12 months</span></a>
            </li>

            <li>
                <a href=""><span class="level">Level 10</span> <span class="months">12 - 12 months</span></a>
            </li>
        
        </ul>
        
        </section>
        
        <footer>
            <ul>
                <li><a href="" class="active"><span class="icon-yipp_home_full-"></span>Training</a></li>
                <li><a href=""><span class="icon-yipp_challenge_line"></span>Challenge</a></li>
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
            child: {}
        }
    },
    created: function() {
        auth.check();
        if (!auth.authenticated) {
            this.redirectGuest();
        }

        this.child = auth.user.get('child');
        this.getTimeline();
    },
    methods: {
        getTimeline: function() {
            timeline.lessons(this, 1, function (response) {
                console.log(response)
            }, function (msg, response) {

            });
        },
        redirectGuest: function()
        {
            this.$router.push('login');
        }
    }
}
</script>

