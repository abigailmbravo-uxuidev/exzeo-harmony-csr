import React, { useState } from 'react';
import classNames from 'classnames';
import { BULK_TYPE, BULK_TYPE_LABEL } from '../constants';
import MortgageeForm from './MortgageeForm';
import { Button, noop } from '@exzeo/core-ui';
import SearchByPolicy from './SearchByPolicy';
import SearchByPolicyResults from './SearchByPolicyResults';
import { BUTTON_CLASS } from '@exzeo/core-ui/src/Button/Button';
import MortgageeCard from './MortgageeCard';
import QueuedMortgageeCard from './QueuedMortgageeCard';

const BulkMortgagee = ({ errorHandler }) => {
  const [selectedTab, setSelectedTab] = useState(BULK_TYPE.policy);
  const [queuedMortgagees, setQueuedMortgagees] = useState([]);
  const [mortgageeResults, setMortgageeResults] = useState([]);

  const handleSearchMortgagee = () => {
    setMortgageeResults([
      {
        currentBillTo: 'No',
        policyNumber: '12-100050-12',
        _id: '34340345043504350350',
        active: true,
        name1: 'BANK OF AMERICA, NA',
        name2: 'ISAOA/ATIMA',
        mailingAddress: {
          address1: '1234 Main Street',
          address2: '',
          city: 'FORT WORTH',
          state: 'TX',
          zip: '76161',
          country: {
            code: 'USA',
            displayText: 'United States of America'
          }
        },
        policyHolderName: 'John Smith',
        policyHolderMailingAddress: {
          address1: '1234 Main Street',
          address2: '',
          city: 'FORT WORTH',
          state: 'TX',
          zip: '76161',
          country: {
            code: 'USA',
            displayText: 'United States of America'
          }
        },
        order: 0,
        type: ''
      },
      {
        currentBillTo: 'YES',
        policyNumber: '12-100055-12',
        _id: '5555540345043504350350',
        active: true,
        name1: 'BANK OF AMERICA, NA',
        name2: 'ISAOA/ATIMA',
        mailingAddress: {
          address1: '1234 Main Street',
          address2: '',
          city: 'FORT WORTH',
          state: 'TX',
          zip: '76161',
          country: {
            code: 'USA',
            displayText: 'United States of America'
          }
        },
        policyHolderName: 'John Smith',
        policyHolderMailingAddress: {
          address1: '1234 Main Street',
          address2: '',
          city: 'FORT WORTH',
          state: 'TX',
          zip: '76161',
          country: {
            code: 'USA',
            displayText: 'United States of America'
          }
        },
        order: 2,
        type: ''
      }
    ]);
  };
  const addToQueue = mortgagee => {
    const existingMortgagee = queuedMortgagees.find(
      m => m._id === mortgagee._id
    );
    if (!existingMortgagee) {
      setQueuedMortgagees([...queuedMortgagees, mortgagee]);
    }
  };

  const removeFromQueue = mortgagee => {
    const filterMortgagees = queuedMortgagees.filter(
      m => m._id !== mortgagee._id
    );
    setQueuedMortgagees(filterMortgagees);
  };

  const handleBulkUpdateSubmit = () => {};

  return (
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
              <div
                className="bm-wrapper form-group survey-wrapper"
                role="group"
              >
                <section className="bm-byPolicy mortgagee-wrapper">
                  <MortgageeForm
                    handleFormSubmit={noop}
                    errorHandler={errorHandler}
                  />
                </section>
                <section className="bm-byPolicy search-results-wrapper">
                  <SearchByPolicy
                    handleSearchMortgagee={handleSearchMortgagee}
                  />
                  <SearchByPolicyResults
                    mortgageeResults={mortgageeResults}
                    handleQueue={addToQueue}
                  />
                </section>
              </div>
            )}
            {selectedTab === BULK_TYPE.mortgagee && (
              <div>{BULK_TYPE_LABEL.mortgagee}</div>
            )}
          </div>
        </section>
        <div className="title">
          Queued For Update&nbsp;
          <span className="queue-count">
            ({queuedMortgagees.length} queued)
          </span>
          <Button
            dataTest="queue-mortgagee"
            className={BUTTON_CLASS.link}
            type="button"
            onClick={() => setQueuedMortgagees([])}
          >
            Remove All
          </Button>
        </div>
        <div className="policy-list">
          {queuedMortgagees.map(m => {
            return (
              <QueuedMortgageeCard
                key={m._id}
                mortgagee={m}
                handleRemove={() => removeFromQueue(m)}
              />
            );
          })}
        </div>
        {queuedMortgagees.length > 0 && (
          <section>
            <Button
              dataTest="bulk-mortgage-submit"
              className={BUTTON_CLASS.primary}
              type="button"
              onClick={handleBulkUpdateSubmit}
            >
              Update
            </Button>
          </section>
        )}
      </div>
    </div>
  );
};

export default BulkMortgagee;
