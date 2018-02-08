import auth0 from 'auth0-js';
import jwtDecode from 'jwt-decode';
import _ from 'lodash';
import history from './history';

export default class Auth {
  auth0 = new auth0.WebAuth({
    audience: process.env.REACT_APP_AUTH0_AUDIENCE,
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
          const payload = jwtDecode(authResult.idToken);
          // check to see if the user exists in a CSR group
          if(_.some(_.union([], _.get(payload, 'https://heimdall.security/groups')), 'isCSR')){
            this.setSession(authResult);
            history.replace('/');
          }
          else{
          history.replace(`/accessDenied?error=${'Not Authorized'}`);
          }
      } else if (err) {
        history.replace(`/accessDenied?error=${err.errorDescription}`);
      }
    });
  }

  setSession = (authResult) => {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    const payload = jwtDecode(authResult.idToken);
    const profile = {
      name: payload.name,
      given_name: payload['https://heimdall.security/given_name'],
      family_name: payload['https://heimdall.security/family_name'],
      email: payload.email,
      sub: payload.sub,
      username: payload.username,
      groups: payload['https://heimdall.security/groups'],
      roles: payload['https://heimdall.security/roles'],
    };
      localStorage.setItem('user_profile', JSON.stringify(profile));
      localStorage.setItem('access_token', authResult.accessToken);
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('expires_at', expiresAt);
      localStorage.removeItem('csr_loggedOut');
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

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('id_token');
    localStorage.removeItem('user_profile');
    localStorage.setItem('csr_loggedOut', true);
    this.userProfile = null;
    this.auth0.logout({ returnTo: `${process.env.REACT_APP_AUTH0_PRIMARY_URL}/loggedOut`, clientID: process.env.REACT_APP_AUTH0_CLIENT_ID, federated: true });
  }

  isAuthenticated = () => {
    // Check whether the current time is past the
    // access token's expiry time
    const idToken = localStorage.getItem('id_token');
    if (!idToken) {
      return false;
    }
    const payload = jwtDecode(idToken);
    return Math.floor(Date.now() / 1000) < payload.exp;
  }

}
