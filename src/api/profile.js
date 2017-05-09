import config from '../config';
import Vue from 'vue'

export default {

    get(context, userID, successCallback, errorCallback) {
        var that = this;

        Vue.http.options.emulateJSON = true;

        context.$http.post(config.api.url + '/profile/' + userID).then(response => {
            var result = response.body.result;
            console.log(result.data)

            if (response.body.status == 'OK') {
                successCallback.call(this, result.data);
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