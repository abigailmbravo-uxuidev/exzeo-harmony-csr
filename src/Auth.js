import auth0 from 'auth0-js';
import _ from 'lodash';

import history from './history';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
    redirectUri: `${process.env.REACT_APP_AUTH0_PRIMARY_URL}/callback`,
    responseType: 'token id_token',
    scope: 'openid email profile name username groups roles',
    sso: true
  });

  renewInterval;

  userProfile;

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.checkAuth = this.checkAuth.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getProfile = this.getProfile.bind(this);

    const csrLoggedOut = localStorage.getItem('csr_loggedOut');
    // check if the user is actually logged out from another sso site
    if (!csrLoggedOut) {
      this.renewInterval = setInterval(() => { this.checkAuth(); }, 5000);
    }
  }

  login() {
    this.auth0.authorize();
  }

  checkAuth() {
    console.log(this.renewInterval);
    if (this.isAuthenticated()) {
      return;
    }
    const csrLoggedOut = localStorage.getItem('csr_loggedOut');
    if (csrLoggedOut) {
      clearInterval(this.renewInterval);
    }
    
    this.logout();
  }

  handleAuthentication() {
    this.auth0.parseHash(window.location.hash, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        history.replace('/');
      } else if (err) {
        history.replace(`/accessDenied?error=${err.errorDescription}`);
      }
    });
  }

  setSession = (authResult) => {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.removeItem('csr_loggedOut');
  }

  checkIfCSRGroup() {
    const groups = this.userProfile.groups;
    if (!groups) {
      return false;
    }
    const csrGroup = _.chain(groups).flatten().filter(item => (item.name === 'TTICCSR' && item.companyCode === 'TTIC')).value();
    return (csrGroup && csrGroup.length > 0);
  }

  getIdToken = () => {
    const idToken = localStorage.getItem('id_token');
    if (!idToken) {
      throw new Error('No id token found');
    }
    return idToken;
  }

  getAccessToken = () => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('No access token found');
    }
    return accessToken;
  }

  getProfile(cb) {
    const accessToken = this.getAccessToken();
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile;
        this.userProfile.groups = profile['https://heimdall.security/groups'];
        this.userProfile.roles = profile['https://heimdall.security/roles'];
        this.userProfile.username = profile['https://heimdall.security/username'];
        delete this.userProfile['https://heimdall.security/groups'];
        delete this.userProfile['https://heimdall.security/roles'];
        delete this.userProfile['https://heimdall.security/username'];
      }
      cb(err, profile);
    });
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('id_token');
    localStorage.setItem('csr_loggedOut', true);
    this.userProfile = null;
    this.auth0.logout({ returnTo: `${process.env.REACT_APP_AUTH0_PRIMARY_URL}/loggedOut`, clientID: process.env.REACT_APP_AUTH0_CLIENT_ID, federated: true });
  }

  isAuthenticated = () => {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

}
