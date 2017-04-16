import config from '../config';
import user from '../entities/user';
import Storage from '../storage'

export default {

    authenticated: false,
    token: '',
    user: null,

    // Send a request to the login URL and save the returned JWT
    login(context, creds, successCallback, errorCallback) {
        var that = this;

        context.$http.post(config.api.url + '/login', creds).then(response => {
            var result = response.body.result;
            console.log('api', result);
            
            if (response.body.status == 'OK') {
                user.save(result);

                that.saveToken(result.token);
                that.saveUser(user);
                successCallback.call(result);

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

    logout() {
        Storage.delete('token');
        localStorage.removeItem('user');
        this.authenticated = false
        this.user = null;
        this.token = null;
    },

    saveToken(token) {
        Storage.save('token', token, 1);
        this.token = token;
    },

    saveUser(user) {
        var userStr = JSON.stringify(user);
        // console.log('auth.saveUser debug');
        // console.log(user)
        // console.log(userStr);
        
        localStorage.setItem('user', userStr);
        this.authenticated = true;
        this.user = user;
    },

    check() {
        // var token = localStorage.getItem('token');
        var token = Storage.get('token');
        var user_local = localStorage.getItem('user');

        if (token && user_local) {
            this.authenticated = true
            this.token = token;
            user.loadFromCache(JSON.parse(user_local))
            this.user = user;

            // console.log('auth.check debug')
            // console.log(user_local)
            // console.log(user)
        }
        else {
            this.authenticated = false            
        }
    },
}