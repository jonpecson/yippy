import config from '../config';
import auth from '../api/auth';
import Vue from 'vue'

export default {

    details(context, challengeID, successCallback, errorCallback) {
        var that = this;

        context.$http.get(config.api.url + '/challengedetails/' + challengeID).then(response => {
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

    result(context, feedbackID, challengeID, successCallback, errorCallback) {
        var that = this;

        context.$http.get(config.api.url + '/feedbacks/' + feedbackID + '/' + challengeID).then(response => {
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

    submit(context, data, successCallback, errorCallback) {
        var that = this;

        Vue.http.options.emulateJSON = true;

        context.$http.post(config.api.url + '/feedbackdone', data).then(response => {
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
}