import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Route } from 'react-router-dom';

import Header from '../../components/Common/Header';
import NotFoundPage from '../../containers/NotFound';
import SideNav from './@components/SideNav';
import BulkPayments from './@components/BulkPayments';

const Finance = ({ auth, ...opts }) => {
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
          render={props => <BulkPayments {...props} />}
        />
      </main>
    </div>
  );
};

Finance.propTypes = {
  auth: PropTypes.object.isRequired
};

export default Finance;
