import React, { useState, useEffect } from 'react';
import { Field, Date, validation, Currency, Button } from '@exzeo/core-ui';
import EndorsementForm from './EndorsementForm';
import { rateEndorsement } from './utilities';

const EndorsementFooter = ({
  getPolicy,
  parentFormInstance,
  handlePrimaryClick,
  timezone
}) => {
  const [calculatedRate, setCalculateRate] = useState(null);
  const {
    values: policy,
    pristine: parentPristine
  } = parentFormInstance.getState();
  const initialValues = {
    ...policy,
    rating: calculatedRate
  };

  const clacluateEndorsementRate = async () => {
    const rating = await rateEndorsement(policy, timezone);
    parentFormInstance.initialize(policy);
    setCalculateRate(rating, timezone);
  };

  const resetEndorsementForm = () => {
    setCalculateRate(null);
    getPolicy(policy.policyNumber);
  };

  useEffect(() => {
    if (!parentPristine && calculatedRate) {
      setCalculateRate(null);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentPristine]);

  return (
    <EndorsementForm
      initialValues={initialValues}
      handleSubmit={
        calculatedRate && parentPristine
          ? handlePrimaryClick
          : clacluateEndorsementRate
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
            onClick={
              calculatedRate && parentPristine
                ? handlePrimaryClick
                : clacluateEndorsementRate
            }
            disabled={null}
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
