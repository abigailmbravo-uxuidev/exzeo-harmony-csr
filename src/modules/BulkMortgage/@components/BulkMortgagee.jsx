import React, { useState } from 'react';
import classNames from 'classnames';
import { BULK_MORTGAGE_TYPE, BULK_TYPE_LABEL } from '../constants';
import ByPolicy from './ByPolicy';

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
                <button
                  type="button"
                  className={classNames('btn', 'btn-tab', {
                    selected: selectedTab === BULK_MORTGAGE_TYPE.policy
                  })}
                  onClick={() => setSelectedTab(BULK_MORTGAGE_TYPE.policy)}
                >
                  {BULK_TYPE_LABEL.policy}
                </button>
              </div>
              {selectedTab === BULK_MORTGAGE_TYPE.policy && (
                <ByPolicy errorHandler={errorHandler} />
              )}
            </div>
          </section>
        </div>
      </div>
    </React.Fragment>
  );
};

export default BulkMortgagee;
