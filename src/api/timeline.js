import config from '../config';
import auth from '../api/auth';

export default {

    getAll(context, successCallback, errorCallback) {
        this.levels(context, successCallback, errorCallback);
    },

    levels(context, successCallback, errorCallback) {
        var that = this;

        context.$http.get(config.api.url + '/levels').then(response => {
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

    lessons(context, level, successCallback, errorCallback) {
        var that = this;

        context.$http.get(config.api.url + '/lessons/' + level).then(response => {
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

    lesson(context, lesson, successCallback, errorCallback) {
        var that = this;

        context.$http.get(config.api.url + '/todos/' + lesson + '/en').then(response => {
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