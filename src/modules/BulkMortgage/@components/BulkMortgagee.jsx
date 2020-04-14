import React, { useState } from 'react';
import classNames from 'classnames';
import { BULK_TYPE, BULK_TYPE_LABEL } from '../constants';
import MortgageeForm from './MortgageeForm';
import { Button, noop } from '@exzeo/core-ui';
import SearchByPolicy from './SearchByPolicy';
import PolicyResults from './PolicyResults';
import { BUTTON_CLASS } from '@exzeo/core-ui/src/Button/Button';
import QueuedMortgageeCard from './QueuedMortgageeCard';
import { fetchMortgagees } from '../data';

const BulkMortgagee = ({ errorHandler }) => {
  const [selectedTab, setSelectedTab] = useState(BULK_TYPE.policy);
  const [queuedMortgagees, setQueuedMortgagees] = useState([]);
  const [mortgageeResults, setMortgageeResults] = useState([]);
  const [showPolicySearchLoader, setShowPolicySearchLoader] = useState(false);

  const handleSearchByPolicy = async data => {
    try {
      setShowPolicySearchLoader(true);
      const { policyNumber, propertyAddress, lastName } = data;

      const results = await fetchMortgagees({
        policyNumber,
        propertyAddress,
        lastName
      });
      setMortgageeResults(results);

      // setMortgageeResults([
      //   {
      //     currentBillTo: 'No',
      //     policyNumber: '12-100050-12',
      //     _id: '34340345043504350350',
      //     active: true,
      //     name1: 'BANK OF AMERICA, NA',
      //     name2: 'ISAOA/ATIMA',
      //     mailingAddress: {
      //       address1: '1234 Main Street',
      //       address2: '',
      //       city: 'FORT WORTH',
      //       state: 'TX',
      //       zip: '76161',
      //       country: {
      //         code: 'USA',
      //         displayText: 'United States of America'
      //       }
      //     },
      //     policyHolderName: 'John Smith',
      //     propertyAddress: {
      //       address1: '1234 Main Street',
      //       address2: '',
      //       city: 'FORT WORTH',
      //       state: 'TX',
      //       zip: '76161',
      //       country: {
      //         code: 'USA',
      //         displayText: 'United States of America'
      //       }
      //     },
      //     order: 0,
      //     type: ''
      //   },
      //   {
      //     currentBillTo: 'YES',
      //     policyNumber: '12-100055-12',
      //     _id: '5555540345043504350350',
      //     active: true,
      //     name1: 'BANK OF AMERICA, NA',
      //     name2: 'ISAOA/ATIMA',
      //     mailingAddress: {
      //       address1: '1234 Main Street',
      //       address2: '',
      //       city: 'FORT WORTH',
      //       state: 'TX',
      //       zip: '76161',
      //       country: {
      //         code: 'USA',
      //         displayText: 'United States of America'
      //       }
      //     },
      //     policyHolderName: 'John Smith',
      //     propertyAddress: {
      //       address1: '1234 Main Street',
      //       address2: '',
      //       city: 'FORT WORTH',
      //       state: 'TX',
      //       zip: '76161',
      //       country: {
      //         code: 'USA',
      //         displayText: 'United States of America'
      //       }
      //     },
      //     order: 2,
      //     type: ''
      //   }
      // ]);
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
      setQueuedMortgagees([...queuedMortgagees, mortgagee]);
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
                <div
                  className="bm-wrapper by-policy form-group survey-wrapper"
                  role="group"
                >
                  <section className="bm-byPolicy mortgagee-wrapper">
                    <MortgageeForm
                      handleFormSubmit={noop}
                      errorHandler={errorHandler}
                    />
                  </section>
                  <section className="bm-byPolicy search-results-wrapper">
                    <SearchByPolicy handleSearch={handleSearchByPolicy} />

                    <PolicyResults
                      showLoader={showPolicySearchLoader}
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
          <div className="queue-header">
            <div className="title">
              Queued For Update&nbsp;
              <span className="queue-count">
                ({queuedMortgagees.length} queued)
              </span>
            </div>
            {queuedMortgagees.length > 0 && (
              <Button
                dataTest="queue-mortgagee"
                className={BUTTON_CLASS.link}
                type="button"
                onClick={() => setQueuedMortgagees([])}
              >
                <i className="fa fa-remove" />
                Remove All
              </Button>
            )}
          </div>
          <section className="policy-list">
            {queuedMortgagees.map(m => {
              return (
                <QueuedMortgageeCard
                  key={m._id}
                  mortgagee={m}
                  handleRemove={() => removeFromQueue(m)}
                />
              );
            })}
          </section>
          <section className="btn-footer">
            {queuedMortgagees.length > 0 && (
              <Button
                dataTest="bulk-mortgage-submit"
                className={BUTTON_CLASS.primary}
                type="button"
                onClick={handleBulkUpdateSubmit}
              >
                Update
              </Button>
            )}
          </section>
        </div>
      </div>
    </React.Fragment>
  );
};

export default BulkMortgagee;
