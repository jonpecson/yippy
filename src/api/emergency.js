import config from '../config';
import user from '../entities/user';
import Storage from '../storage'

export default {

    get(context, language, successCallback, errorCallback) {
        var that = this;

        context.$http.get(config.api.url + '/emergency/' + language).then(response => {
            if (response.body.status == 'OK') {
                var result = response.body.result.emergency;
                successCallback.call(this,result);
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