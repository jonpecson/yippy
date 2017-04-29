import config from '../config';
import auth from '../api/auth';
import Vue from 'vue'

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

    lessons(context, level, userID, successCallback, errorCallback) {
        var that = this;

        var url = config.api.url + '/lessons/' + userID;
        if (level > 0) {
            url += '/' + level;
        }

        context.$http.get(url).then(response => {
            console.log(response)
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

    lesson(context, lesson, userID, language, successCallback, errorCallback) {
        var that = this;

        context.$http.get(config.api.url + '/cards/' + lesson + '/' + userID + '/' + language).then(response => {
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

    endLesson(context, data, successCallback, errorCallback) {
        var that = this;

        Vue.http.options.emulateJSON = true;
        
        context.$http.post(config.api.url + '/lessondone', data).then(response => {
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

    favorite(context, contentID, userID, successCallback, errorCallback) {
        var that = this;

        Vue.http.options.emulateJSON = true;

        var data = {
            user_id: userID,
            content_id: contentID
        };

        context.$http.post(config.api.url + '/favorite', data).then(response => {
            var result = response.body.result;

            if (response.body.status == 'OK') {
                successCallback.call(this, result.status);
            } else if (errorCallback) {
                errorCallback.call(this, result.message, response);
            }
        }, response => {

            if (errorCallback) {
                errorCallback.call(this, response.body.result.error, response);
            }

        });
    },
    
}