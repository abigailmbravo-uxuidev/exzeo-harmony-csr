import React, { useState } from 'react';
import classNames from 'classnames';
import { BULK_MORTGAGE_TYPE, BULK_TYPE_LABEL } from '../constants';
import { Button } from '@exzeo/core-ui';
import { BUTTON_CLASS } from '@exzeo/core-ui/src/Button/Button';
import { fetchMortgageesFromPolicies } from '../data';
import ByPolicyTab from './ByPolicyTab';
import QueuedMortgagees from './QueuedMortgagees';
import { formatMortgagees } from '../utilities';

const BulkMortgagee = ({ errorHandler }) => {
  const [selectedTab, setSelectedTab] = useState(BULK_MORTGAGE_TYPE.policy);
  const [queuedMortgagees, setQueuedMortgagees] = useState([]);
  const [mortgageeResults, setMortgageeResults] = useState([]);
  const [showPolicySearchLoader, setShowPolicySearchLoader] = useState(false);

  const handleSearchByPolicy = async data => {
    try {
      setShowPolicySearchLoader(true);
      const { policyNumber, propertyAddress, lastName, product } = data;

      const results = await fetchMortgageesFromPolicies({
        product,
        policyNumber,
        propertyAddress,
        lastName,
        latestTerm: true
      });
      setMortgageeResults(formatMortgagees(results, queuedMortgagees));
    } catch (ex) {
      errorHandler(ex);
    } finally {
      setShowPolicySearchLoader(false);
    }
  };
  const addToQueue = mortgagee => {
    const existingMortgagee = queuedMortgagees.some(
      m => m._id === mortgagee._id
    );
    if (!existingMortgagee) {
      setQueuedMortgagees([mortgagee, ...queuedMortgagees]);
      const filterMortgagees = mortgageeResults.filter(
        m => m._id !== mortgagee._id
      );
      setMortgageeResults(filterMortgagees);
    }
  };

  const removeFromQueue = mortgagee => {
    const filterMortgagees = queuedMortgagees.filter(
      m => m._id !== mortgagee._id
    );
    setQueuedMortgagees(filterMortgagees);
    setMortgageeResults([mortgagee, ...mortgageeResults]);
  };

  const removeAllFromQueue = () => {
    setMortgageeResults([...queuedMortgagees, ...mortgageeResults]);
    setQueuedMortgagees([]);
  };

  const handleBulkUpdateSubmit = async () => {
    /*
    // TODO: need to grab AI data from the form then grab all policyNumbers and place in array
     */
  };

  return (
    <React.Fragment>
      <div className={classNames('content-wrapper', 'scroll')}>
        <div className="bulk-mortgagee-wrapper">
          <div className="title">Bulk Mortgagee</div>
          <section>
            <div className="btn-tabs">
              <div className="filter-tabs">
                <button
                  type="button"
                  className={classNames('btn btn-tab', {
                    selected: selectedTab === BULK_MORTGAGE_TYPE.policy
                  })}
                  onClick={() => setSelectedTab(BULK_MORTGAGE_TYPE.policy)}
                >
                  {BULK_TYPE_LABEL.policy}
                </button>
                <button
                  type="button"
                  className={classNames('btn btn-tab', {
                    selected: selectedTab === BULK_MORTGAGE_TYPE.mortgagee
                  })}
                  onClick={() => setSelectedTab(BULK_MORTGAGE_TYPE.mortgagee)}
                >
                  {BULK_TYPE_LABEL.mortgagee}
                </button>
              </div>
              {selectedTab === BULK_MORTGAGE_TYPE.policy && (
                <ByPolicyTab
                  errorHandler={errorHandler}
                  handleSearchByPolicy={handleSearchByPolicy}
                  showPolicySearchLoader={showPolicySearchLoader}
                  mortgageeResults={mortgageeResults}
                  addToQueue={addToQueue}
                  handleBulkUpdateSubmit={handleBulkUpdateSubmit}
                />
              )}
              {selectedTab === BULK_MORTGAGE_TYPE.mortgagee && (
                <div>{BULK_TYPE_LABEL.mortgagee}</div>
              )}
            </div>
          </section>
          <QueuedMortgagees
            queuedMortgagees={queuedMortgagees}
            removeFromQueue={removeFromQueue}
            removeAllFromQueue={removeAllFromQueue}
            setQueuedMortgagees={setQueuedMortgagees}
          />
          <section className="btn-footer">
            <Button
              dataTest="bulk-mortgage-submit"
              className={BUTTON_CLASS.primary}
              type="submit"
              form="BulkMortgagee"
              disabled={!queuedMortgagees.length}
            >
              Update
            </Button>
          </section>
        </div>
      </div>
    </React.Fragment>
  );
};

export default BulkMortgagee;
