import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Route } from 'react-router-dom';

import Header from '../../components/Common/Header';
import NotFoundPage from '../../containers/NotFound';
import SideNav from './@components/SideNav';
import BulkPayments from './@components/BulkPayments';

const Finance = ({ auth, errorHandler }) => {
  return (
    <div className="app-wrapper csr">
      <Helmet>
        <title>Finance</title>
      </Helmet>
      <Header auth={auth} />
      <main role="document" className="policy-advanced">
        <SideNav />
        <Route
          exact
          path="/finance/payments"
          render={props => <BulkPayments errorHandler={errorHandler} />}
        />
      </main>
    </div>
  );
};

Finance.propTypes = {
  auth: PropTypes.object.isRequired,
  errorHandler: PropTypes.func.isRequired
};

export default Finance;
