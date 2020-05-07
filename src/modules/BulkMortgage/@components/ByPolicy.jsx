import React, { useState } from 'react';
import MortgageeForm from './MortgageeForm';
import SearchByPolicy from './SearchByPolicy';
import MortgageeResults from './MortgageeResults';
import NoResults from './NoResults';
import QueuedMortgagees from './QueuedMortgagees';
import { fetchMortgageesFromPolicies } from '../data';
import { formatMortgagees } from '../utilities';
import { Button } from '@exzeo/core-ui';
import { BUTTON_CLASS } from '@exzeo/core-ui/src/Button/Button';

export const ByPolicy = ({ errorHandler }) => {
  const [queuedMortgagees, setQueuedMortgagees] = useState([]);
  const [mortgageeResults, setMortgageeResults] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearchByPolicy = async data => {
    try {
      setShowLoader(true);
      const { policyNumber, propertyAddress, lastName, product } = data;

      const results = await fetchMortgageesFromPolicies({
        product,
        policyNumber,
        propertyAddress,
        lastName,
        latestTerm: true
      });

      setMortgageeResults(formatMortgagees(results, queuedMortgagees));
      setHasSearched(true);
    } catch (ex) {
      errorHandler(ex);
    } finally {
      setShowLoader(false);
    }
  };
  const addToQueue = mortgagee => {
    setHasSearched(false);
    const existingMortgagee = queuedMortgagees.some(
      m => m._id === mortgagee._id && m.policyNumber === mortgagee.policyNumber
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
  };

  const removeAllFromQueue = () => {
    setQueuedMortgagees([]);
  };

  const handleBulkUpdateSubmit = async () => {
    /*
    // TODO: need to grab AI data from the form then grab all policyNumbers and place in array
     */
  };

  return (
    <React.Fragment>
      <div
        className="bm-wrapper by-policy form-group survey-wrapper"
        role="group"
      >
        <section className="bm-byPolicy mortgagee-wrapper">
          <MortgageeForm
            handleFormSubmit={handleBulkUpdateSubmit}
            errorHandler={errorHandler}
          />
        </section>
        <section className="bm-byPolicy search-results-wrapper">
          <SearchByPolicy handleSearch={handleSearchByPolicy} />
          {hasSearched && mortgageeResults.length === 0 && <NoResults />}
          <MortgageeResults
            showLoader={showLoader}
            results={mortgageeResults}
            handleQueue={addToQueue}
          />
        </section>
      </div>
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
    </React.Fragment>
  );
};

export default ByPolicy;
