<template>
<div id="container">Logging out...</div>
</template>
<script>
import {router} from '../index'
import config from '../config'
import auth from '../api/auth'
import $ from 'jquery'

export default {
    data() {
        return {
            
        }
    },
    created: function() {
    	auth.logout();
    	this.$router.push('login');
    }
}
</script>