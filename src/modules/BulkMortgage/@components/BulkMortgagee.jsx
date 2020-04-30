import React, { useState } from 'react';
import classNames from 'classnames';
import { BULK_MORTGAGE_TYPE, BULK_TYPE_LABEL } from '../constants';
import ByPolicyTab from './ByPolicyTab';
import { Button } from '@exzeo/core-ui';

const BulkMortgagee = ({ errorHandler }) => {
  const [selectedTab, setSelectedTab] = useState(BULK_MORTGAGE_TYPE.policy);
  return (
    <React.Fragment>
      <div className="content-wrapper scroll">
        <div className="bulk-mortgagee-wrapper">
          <div className="title">Bulk Mortgagee</div>
          <section>
            <div className="btn-tabs">
              <div className="filter-tabs">
                <Button
                  type="button"
                  className={classNames('btn', 'btn-tab', {
                    selected: selectedTab === BULK_MORTGAGE_TYPE.policy
                  })}
                  onClick={() => setSelectedTab(BULK_MORTGAGE_TYPE.policy)}
                >
                  {BULK_TYPE_LABEL.policy}
                </Button>
                <Button
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
                <ByPolicyTab errorHandler={errorHandler} />
              )}
              {selectedTab === BULK_MORTGAGE_TYPE.job && (
                <ByJobTab errorHandler={errorHandler} />
              )}
            </div>
          </section>
        </div>
      </div>
    </React.Fragment>
  );
};

export default BulkMortgagee;
