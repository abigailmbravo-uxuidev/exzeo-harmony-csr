import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import classNames from 'classnames';
import { Button } from '@exzeo/core-ui';

import { useUser } from '../../../context/user-context';
import Header from '../../../components/Header';
import { BULK_MORTGAGE_TYPE, BULK_TYPE_LABEL } from '../constants';
import ByPolicy from './ByPolicy';
import ByJobTab from './ByJob';

const BulkMortgage = ({ errorHandler }) => {
  const [selectedTab, setSelectedTab] = useState(BULK_MORTGAGE_TYPE.policy);
  const userProfile = useUser();

  return (
    <div className="app-wrapper csr">
      <Helmet>
        <title>Bulk Mortgage</title>
      </Helmet>
      <Header />
      <main role="document" className="bulk-mortgage-main">
        <div className="content-wrapper scroll">
          <div className="bulk-mortgagee-wrapper">
            <div className="title">Bulk Mortgagee</div>
            <section>
              <div className="btn-tabs">
                <div className="filter-tabs">
                  <Button
                    dataTest="by-policy"
                    type="button"
                    className={classNames('btn', 'btn-tab', {
                      selected: selectedTab === BULK_MORTGAGE_TYPE.policy
                    })}
                    onClick={() => setSelectedTab(BULK_MORTGAGE_TYPE.policy)}
                  >
                    {BULK_TYPE_LABEL.policy}
                  </Button>
                  <Button
                    dataTest="by-job"
                    type="button"
                    className={classNames('btn', 'btn-tab', {
                      selected: selectedTab === BULK_MORTGAGE_TYPE.job
                    })}
                    onClick={() => setSelectedTab(BULK_MORTGAGE_TYPE.job)}
                  >
                    {BULK_TYPE_LABEL.job}
                  </Button>
                </div>
                {selectedTab === BULK_MORTGAGE_TYPE.policy && (
                  <ByPolicy errorHandler={errorHandler} />
                )}
                {selectedTab === BULK_MORTGAGE_TYPE.job && (
                  <ByJobTab
                    errorHandler={errorHandler}
                    userProfile={userProfile}
                  />
                )}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

BulkMortgage.propTypes = {
  errorHandler: PropTypes.func.isRequired
};

export default BulkMortgage;
