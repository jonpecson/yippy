import config from '../config';
import auth from '../api/auth';
import Vue from 'vue'

export default {

    update(context, data, successCallback, errorCallback) {
        var that = this;

        Vue.http.options.emulateJSON = true;
        
        context.$http.post(config.api.url + '/updatechallenge', data).then(response => {
            var result = response.body.result;

            if (response.body.status == 'OK') {
                successCallback.call(this, result);
            } else if (errorCallback) {
                console.log('error in api.timeline');
                errorCallback.call(this, result.message, response);
            }
        }, response => {

            if (errorCallback) {
                errorCallback.call(this, response.body.result.error, response);
            }

        });
    },

    create(context, data, successCallback, errorCallback) {
        var that = this;

        Vue.http.options.emulateJSON = true;

        context.$http.post(config.api.url + '/challenge', data).then(response => {
            var result = response.body.result;

            if (response.body.status == 'OK') {
                successCallback.call(this, result);
            } else if (errorCallback) {
                console.log('error in api.timeline');
                errorCallback.call(this, result.message, response);
            }
        }, response => {

            if (errorCallback) {
                errorCallback.call(this, response.body.result.error, response);
            }

        });
    },

    delete(context, data, successCallback, errorCallback) {
        var that = this;

        Vue.http.options.emulateJSON = true;

        context.$http.post(config.api.url + '/removechallenge', data).then(response => {
            var result = response.body.result;

            if (response.body.status == 'OK') {
                successCallback.call(this, result);
            } else if (errorCallback) {
                console.log('error in api.timeline');
                errorCallback.call(this, result.message, response);
            }
        }, response => {

            if (errorCallback) {
                errorCallback.call(this, response.body.result.error, response);
            }

        });
    }
    
}