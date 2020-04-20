import React, { useState } from 'react';
import classNames from 'classnames';
import { BULK_TYPE, BULK_TYPE_LABEL } from '../constants';
import MortgageeForm from './MortgageeForm';
import { Button, noop } from '@exzeo/core-ui';
import SearchByPolicy from './SearchByPolicy';
import MortgageeResults from './MortgageeResults';
import { BUTTON_CLASS } from '@exzeo/core-ui/src/Button/Button';
import QueuedMortgageeCard from './QueuedMortgageeCard';
import { fetchMortgageesFromPolicies } from '../data';
import ByPolicyTab from './ByPolicyTab';
import QueuedMortgagees from './QueuedMortgagees';

const BulkMortgagee = ({ errorHandler }) => {
  const [selectedTab, setSelectedTab] = useState(BULK_TYPE.policy);
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
      setMortgageeResults(results);
    } catch (ex) {
      errorHandler(ex);
    } finally {
      setShowPolicySearchLoader(false);
    }
  };
  const addToQueue = mortgagee => {
    const existingMortgagee = queuedMortgagees.find(
      m => m._id === mortgagee._id
    );
    if (!existingMortgagee) {
      setQueuedMortgagees([mortgagee, ...queuedMortgagees]);
    }
  };

  const removeFromQueue = mortgagee => {
    const filterMortgagees = queuedMortgagees.filter(
      m => m._id !== mortgagee._id
    );
    setQueuedMortgagees(filterMortgagees);
  };

  const handleBulkUpdateSubmit = () => {
    /*
    // TODO: need to grab AI data from the form then grab all policyNumbers and place in array
     */
  };

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
                <ByPolicyTab
                  errorHandler={errorHandler}
                  handleSearchByPolicy={handleSearchByPolicy}
                  showPolicySearchLoader={showPolicySearchLoader}
                  mortgageeResults={mortgageeResults}
                  addToQueue={addToQueue}
                />
              )}
              {selectedTab === BULK_TYPE.mortgagee && (
                <div>{BULK_TYPE_LABEL.mortgagee}</div>
              )}
            </div>
          </section>
          <QueuedMortgagees
            queuedMortgagees={queuedMortgagees}
            removeFromQueue={removeFromQueue}
            setQueuedMortgagees={setQueuedMortgagees}
          />
          <section className="btn-footer">
            <Button
              dataTest="bulk-mortgage-submit"
              className={BUTTON_CLASS.primary}
              type="button"
              onClick={handleBulkUpdateSubmit}
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
