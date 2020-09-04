import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { http } from '@exzeo/core-ui';
import createAuth0Client from '@auth0/auth0-spa-js';

const DEFAULT_REDIRECT_CALLBACK = (appState, history) => {
  history.replace({}, document.title, window.location.pathname);
};

export const Auth0Context = React.createContext();

// Used in class components
export const Auth0Consumer = Auth0Context.Consumer;

// Used in function components
export function useAuth0() {
  const context = useContext(Auth0Context);
  if (!context) {
    throw new Error(`useAuth0 must be used within a Auth0Provider`);
  }
  return context;
}

// Provider
export function Auth0Provider({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
}) {
  const [auth0Client, setAuth0] = useState();
  const [error, setError] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const [userProfile, setUserProfile] = useState({});
  const history = useHistory();

  useEffect(() => {
    const initAuth0 = async () => {
      try {
        const auth0FromHook = await createAuth0Client(initOptions);
        setAuth0(auth0FromHook);

        if (window.location.search.includes('code=')) {
          const { appState } = await auth0FromHook.handleRedirectCallback();
          onRedirectCallback(appState, history);
        }

        const isAuthenticated = await auth0FromHook.isAuthenticated();

        setIsAuthenticated(isAuthenticated);

        if (isAuthenticated) {
          const user = await auth0FromHook.getUser();
          setUser(user);

          const accessToken = await auth0FromHook.getTokenSilently();

          // TODO this should come back 'mainUserProfile' but currently does not. Will need to update falcon/exframe security
          const claims = await auth0FromHook.getIdTokenClaims();
          if (
            !claims['https://heimdall.security/groups']?.some(
              group => group.isCSR
            )
          ) {
            setError('Not Authorized');
            return;
          }

          // this way of setting the auth header is specific to Axios.
          http.defaults.headers.common.authorization = `bearer ${accessToken}`;

          // get user profile
          const profileResponse = await http
            .get(`${process.env.REACT_APP_API_URL}/mainUserProfile`, {
              headers: { authorization: `bearer ${accessToken}` }
            })
            .catch(error => {
              setError(
                error.errorDescription || error.message || 'Not Authorized'
              );
            });

          if (!(profileResponse || '').data) {
            auth0FromHook.logout({ returnTo: window.location.origin });
          } else {
            setUserProfile({ ...profileResponse.data, accessToken });
          }
        }
      } catch (error) {
        setError(error.errorDescription || error.message || 'Not Authorized');
      } finally {
        setLoading(false);
      }
    };
    initAuth0();
    // eslint-disable-next-line
  }, []);

  return (
    <Auth0Context.Provider
      value={{
        error,
        isAuthenticated,
        user,
        userProfile,
        setUserProfile,
        loading,
        getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
        loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
        getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
        getTokenWithPopup: (...p) => auth0Client.getTokenWithPopup(...p),
        logout: (...p) => auth0Client.logout(...p)
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
}
