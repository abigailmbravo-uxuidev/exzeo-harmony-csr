import React, { useState } from 'react';
import classNames from 'classnames';
import { BULK_TYPE, BULK_TYPE_LABEL } from '../constants';
import MortgageeForm from './MortgageeForm';
import { noop } from '@exzeo/core-ui';
import SearchByPolicy from './SearchByPolicy';

const style = {
  display: 'flex',
  overflowX: 'hidden',
  overflowY: 'auto'
};

const BulkMortgagee = ({ errorHandler }) => {
  const [selectedTab, setSelectedTab] = useState(BULK_TYPE.policy);
  return (
    <div className="content-wrapper">
      <div className="scroll view-grid" style={style}>
        <h3>Bulk Mortgagee</h3>
        <section>
          <div className="bulk-mortgagee-wrapper btn-tabs">
            <div className="filter-tabs">
              <button
                type="button"
                className={classNames('btn btn-tab', {
                  selected: selectedTab === BULK_TYPE.policy
                })}
                onClick={() => setSelectedTab(BULK_TYPE.policy)}
              >
                {BULK_TYPE_LABEL.policy}
              </button>
              <button
                type="button"
                className={classNames('btn btn-tab', {
                  selected: selectedTab === BULK_TYPE.mortgagee
                })}
                onClick={() => setSelectedTab(BULK_TYPE.mortgagee)}
              >
                {BULK_TYPE_LABEL.mortgagee}
              </button>
            </div>
            {selectedTab === BULK_TYPE.policy && (
              <div className="form-group survey-wrapper" role="group">
                <section className="view-col-4">
                  <MortgageeForm
                    handleFormSubmit={noop}
                    errorHandler={errorHandler}
                  />
                </section>
                <section className="view-col-8">
                  <SearchByPolicy handleSubmit={noop} />
                </section>
              </div>
            )}
            {selectedTab === BULK_TYPE.mortgagee && (
              <div>{BULK_TYPE_LABEL.mortgagee}</div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default BulkMortgagee;
