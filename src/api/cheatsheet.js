import config from '../config';
import auth from '../api/auth';
import Vue from 'vue'

export default {

    content(context, lesson, userID, successCallback, errorCallback) {
        var that = this;

        context.$http.get(config.api.url + '/cheatsheet/' + lesson + '/' + userID).then(response => {
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