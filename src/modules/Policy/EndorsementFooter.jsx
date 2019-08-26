import React, { useState, useEffect } from 'react';
import { Field, Date, validation, Currency, Button } from '@exzeo/core-ui';
import EndorsementForm from './EndorsementForm';
import { rateEndorsement } from './utilities';

const EndorsementFooter = ({
  getPolicy,
  parentFormInstance,
  handlePrimaryClick,
  timezone,
  setAppError
}) => {
  const [calculatedRate, setCalculateRate] = useState(null);
  const [instanceId, setInstanceId] = useState(null);

  const {
    values: policy,
    pristine: parentPristine
  } = parentFormInstance.getState();
  const initialValues = {
    ...policy,
    rating: calculatedRate,
    instanceId
  };

  const calculateEndorsementRate = async () => {
    const { rating, instanceId } = await rateEndorsement(
      policy,
      timezone,
      setAppError
    );
    if (!rating) return;
    parentFormInstance.initialize({ ...policy, rating, instanceId });
    setCalculateRate(rating, timezone);
    setInstanceId(instanceId);
  };

  const resetEndorsementForm = () => {
    setCalculateRate(null);
    setInstanceId(null);
    getPolicy(policy.policyNumber);
  };

  useEffect(() => {
    if (!parentPristine && calculatedRate) {
      setCalculateRate(null);
      setInstanceId(null);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentPristine]);

  return (
    <EndorsementForm
      initialValues={initialValues}
      handleSubmit={
        calculatedRate && parentPristine
          ? handlePrimaryClick
          : calculateEndorsementRate
      }
      className="share-inputs"
    >
      {({ submitting, pristine }) => (
        <React.Fragment>
          <Button
            className={Button.constants.classNames.secondary}
            onClick={resetEndorsementForm}
            data-test="modal-cancel"
          >
            Cancel
          </Button>
          <Button
            className={Button.constants.classNames.primary}
            type="submit"
            disabled={submitting}
            data-test="modal-submit"
          >
            {calculatedRate && parentPristine ? 'Save' : 'Review'}
          </Button>
        </React.Fragment>
      )}
    </EndorsementForm>
  );
};

export default EndorsementFooter;
