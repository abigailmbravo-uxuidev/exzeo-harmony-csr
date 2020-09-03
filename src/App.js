import React from 'react';
import { Loader } from '@exzeo/core-ui';
import { useAuth0 } from './context/auth-context';
import { useHistory } from 'react-router-dom';

const AuthenticatedApp = React.lazy(() => import('./AuthenticatedApp'));
const UnauthenticatedApp = React.lazy(() => import('./UnauthenticatedApp'));
// leave these here for easy debugging during development
// import AuthenticatedApp from './AuthenticatedApp';
// import UnauthenticatedApp from './UnauthenticatedApp';

function App() {
  const { isAuthenticated, loading } = useAuth0();
  // super hacky thing we need to programmatically navigate during Cypress tests
  const history = useHistory();
  if (window.Cypress) {
    window.__rrHistory = history;
  }
  return (
    <React.Suspense fallback={<Loader />}>
      {loading ? (
        <Loader />
      ) : isAuthenticated ? (
        <AuthenticatedApp />
      ) : (
        <UnauthenticatedApp />
      )}
    </React.Suspense>
  );
}

export default App;
