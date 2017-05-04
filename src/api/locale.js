import config from '../config';
import user from '../entities/user';
import Storage from '../storage'

export default {

    label(context, language, successCallback, errorCallback) {
        var that = this;

        var cache = localStorage.getItem('localelabel');
        if (cache) {
            var response = JSON.parse(cache);
            if (response) {
                successCallback.call(this,response);    
                return;
            }
        }

        context.$http.get(config.api.url + '/labels/' + language).then(response => {
            if (response.body.status == 'OK') {
                var result = response.body.result.label;
                localStorage.setItem('localelabel', JSON.stringify(result));
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