import config from '../config';

export default {

  // User object will let us check authentication status
  user: {
    authenticated: false
  },

  // Send a request to the login URL and save the returned JWT
  login(context, creds) {
    context.$http.post(config.api.url + '/Login', creds).then(response => {
      var result = response.body.result;

      if (response.body.status == 'OK') {
        localStorage.setItem('token', result.token);
        localStorage.setItem('user_id', result.user_id);
      }  else {
        alert(result.message);
      }
    }, response => {
      // alert(response.result.message);
      console.log(response.body.result)
      $.each(response.body.result.error, function (name, msg) {
        console.log(name + ': ' + msg)
      })
    });
  },

  signup(context, creds) {
    context.$http.post(config.api.url + '/parentregister', creds).then(response => {
      var result = response.body.result;

      if (response.body.status == 'OK') {
        localStorage.setItem('token', result.token);
        localStorage.setItem('user_id', result.user_id);
      }  else {
        alert(result.message);
      }
    }, response => {
      // alert(response.result.message);
      console.log(response.body.result)
      $.each(response.body.result.error, function (name, msg) {
        console.log(name + ': ' + msg)
      })
    });
  },

  // To log out, we just need to remove the token
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    this.user.authenticated = false
  },

  checkAuth() {
    var token = localStorage.getItem('token');
    var user = localStorage.getItem('user_id');

    if(token) {
      this.user.authenticated = true
    }
    else {
      this.user.authenticated = false      
    }
  },

  // The object to be passed as a header for authenticated requests
  getAuthHeader() {
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }
}