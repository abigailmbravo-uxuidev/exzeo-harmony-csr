import React, { useState } from 'react';
import MortgageeForm from './MortgageeForm';
import SearchByPolicy from './SearchByPolicy';
import MortgageeResults from './MortgageeResults';
import NoResults from './NoResults';
import QueuedMortgagees from './QueuedMortgagees';
import { createBulkMortgageJob, fetchMortgageesFromPolicies } from '../data';
import { formatCreateJob, formatMortgagees } from '../utilities';
import { Button, Loader } from '@exzeo/core-ui';
import { BUTTON_CLASS } from '@exzeo/core-ui/src/Button/Button';
import AlertModal from '@exzeo/core-ui/src/Modal/AlertModal';

export const ByPolicy = ({ errorHandler }) => {
  const [queuedMortgagees, setQueuedMortgagees] = useState([]);
  const [mortgageeResults, setMortgageeResults] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [showPageLoader, setShowPageLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [completedJobId, setCompletedJobId] = useState('');

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
      mortgagee.newBillTo = !!mortgagee.newBillTo;
      setQueuedMortgagees([mortgagee, ...queuedMortgagees]);
      const filterMortgagees = mortgageeResults.filter(
        m =>
          m._id !== mortgagee._id || m.policyNumber !== mortgagee.policyNumber
      );
      setMortgageeResults(filterMortgagees);
    }
  };

  const removeFromQueue = mortgagee => {
    const filterMortgagees = queuedMortgagees.filter(
      m => m._id !== mortgagee._id || m.policyNumber !== mortgagee.policyNumber
    );
    setQueuedMortgagees(filterMortgagees);
  };

  const removeAllFromQueue = () => {
    setQueuedMortgagees([]);
  };

  const handleCreateJobSubmit = async data => {
    try {
      setShowPageLoader(true);
      const { policies, additionalInterest } = formatCreateJob(
        data,
        queuedMortgagees
      );
      const { job } = await createBulkMortgageJob({
        policies,
        additionalInterest
      });

      setCompletedJobId(job._id);
      setShowModal(true);

      setQueuedMortgagees([]);
    } catch (ex) {
      errorHandler(ex);
    } finally {
      setShowPageLoader(false);
    }
  };

  return (
    <React.Fragment>
      {showPageLoader && <Loader />}
      <div
        className="bm-wrapper by-policy form-group survey-wrapper"
        role="group"
      >
        <section className="bm-byPolicy mortgagee-wrapper">
          <MortgageeForm
            handleFormSubmit={handleCreateJobSubmit}
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
          disabled={queuedMortgagees.length === 0}
        >
          Update
        </Button>
      </section>
      {showModal && (
        <AlertModal
          header="Bulk Mortgage Job Submitted"
          headerIcon="fa-circle Mortgagee"
          confirmLabel="OK"
          text={`Job ID: ${completedJobId}`}
          handleConfirm={() => setShowModal(false)}
        />
      )}
    </React.Fragment>
  );
};

export default ByPolicy;
