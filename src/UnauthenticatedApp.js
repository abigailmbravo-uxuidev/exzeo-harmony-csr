import React, { useEffect } from 'react';

import { useAuth0 } from './context/auth-context';
import AccessDenied from './components/AccessDenied';

const UnauthenticatedApp = () => {
  const { loginWithRedirect, error } = useAuth0();

  useEffect(() => {
    const targetUrl = window.location.pathname;

    const fn = async () => {
      await loginWithRedirect({
        appState: { targetUrl }
      });
    };

    if (!error && !targetUrl.includes('accessDenied')) {
      fn();
    }
  }, [loginWithRedirect, error]);

  return <>{error && <AccessDenied />}</>;
};

export default UnauthenticatedApp;
