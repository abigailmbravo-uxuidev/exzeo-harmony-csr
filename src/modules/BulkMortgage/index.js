import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Route } from 'react-router-dom';
import Header from '../../components/Common/Header';
import BulkMortgagee from './@components/BulkMortgagee';

const BulkMortgage = ({ auth, errorHandler, userProfile }) => {
  return (
    <div className="app-wrapper csr">
      <Helmet>
        <title>Bulk Mortgage</title>
      </Helmet>
      <Header auth={auth} />
      <main role="document" className="bulk-mortgage-main">
        <Route
          exact
          path="/bulkMortgage"
          render={() => (
            <BulkMortgagee
              errorHandler={errorHandler}
              auth={auth}
              userProfile={userProfile}
            />
          )}
        />
      </main>
    </div>
  );
};

BulkMortgage.propTypes = {
  auth: PropTypes.object.isRequired,
  errorHandler: PropTypes.func.isRequired
};

export default BulkMortgage;
