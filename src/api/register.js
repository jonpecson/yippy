import config from '../config';
import user from '../entities/user';
import auth from '../api/auth';

export default {

    signup(context, creds, successCallback, errorCallback) {
        var that = this;

        context.$http.post(config.api.url + '/parentregister', creds).then(response => {
            var result = response.body.result;

            if (response.body.status == 'OK') {
                result.status = 'pending';
                result.name = creds.name;
                result.email = creds.email;
                result.parent_type = creds.parent_type;
                user.save(result);

                auth.saveToken(result.token);
                auth.saveUser(user);
                successCallback.call(this, result);
            } else if (errorCallback) {
                console.log('error in line 42');
                errorCallback.call(this, result.message, response);
            }
        }, response => {

            if (errorCallback) {
                errorCallback.call(this, response.body.result.error, response);
            }

        });
    },

    addChild(context, creds, successCallback, errorCallback) {
        var that = this;

        context.$http.post(config.api.url + '/childregister', creds).then(response => {
            var result = response.body.result;

            if (response.body.status == 'OK') {
                successCallback.call(this, result);
            } else if (errorCallback) {
                console.log('error in line 42');
                errorCallback.call(this, result.message, response);
            }
        }, response => {

            if (errorCallback) {
                errorCallback.call(this, response.body.result.error, response);
            }

        });
    },

    addPhoto(context, creds, successCallback, errorCallback) {
        var that = this;

        context.$http.post(config.api.url + '/uploadavatar', creds).then(response => {
            console.log('addPhoto api', response);
            var result = response.body.result;

            if (response.body.status == 'OK') {
                successCallback.call(this, result);
            } else if (errorCallback) {
                console.log('error in line 42');
                errorCallback.call(this, result.message, response);
            }
        }, response => {

            if (errorCallback) {
                errorCallback.call(this, response.body.result.error, response);
            }

        });
    },

    
}