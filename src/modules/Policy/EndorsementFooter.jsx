import React, { useState, useEffect } from 'react';
import { FormSpy, Button } from '@exzeo/core-ui';
import EndorsementForm from './EndorsementForm';
import { rateEndorsement } from './utilities';
import CustomNavigationPrompt from '../../components/CustomNavigationPrompt';

const EndorsementFooter = ({
  policyFormData,
  parentFormInstance,
  handlePrimaryClick,
  timezone,
  setAppError,
  history
}) => {
  let formInstance;
  const [calculatedRate, setCalculateRate] = useState(null);
  const [instanceId, setInstanceId] = useState(null);

  const {
    values: policy,
    pristine: parentPristine,
    submitSucceeded: parentSubmitSuceeded
  } = parentFormInstance.getState();
  const initialValues = {
    ...policy,
    rating: calculatedRate,
    instanceId
  };

  const setFormInstance = form => {
    formInstance = form;
  };

  const calculateEndorsementRate = async () => {
    const { values: formValues } = parentFormInstance.getState();

    const { rating, instanceId } = await rateEndorsement(
      formValues,
      timezone,
      setAppError
    );
    if (!rating) return;
    parentFormInstance.initialize({ ...formValues, rating, instanceId });
    setCalculateRate(rating, timezone);
    setInstanceId(instanceId);
  };

  const resetEndorsementForm = () => {
    setCalculateRate(null, '');
    setInstanceId(null);
    parentFormInstance.initialize(policyFormData);
  };

  useEffect(() => {
    if (!parentPristine && calculatedRate) {
      setCalculateRate(null, '');
      setInstanceId(null);
    }
    if (parentSubmitSuceeded) {
      setTimeout(formInstance.reset);
      setCalculateRate(null, '');
      setInstanceId(null);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentPristine, parentSubmitSuceeded]);

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
      {({ submitting }) => (
        <React.Fragment>
          <FormSpy subscription={{}}>
            {({ form }) => {
              setFormInstance(form);
              return null;
            }}
          </FormSpy>
          <CustomNavigationPrompt
            whenValue={instanceId}
            history={history}
            confirmNavigationHandler={resetEndorsementForm}
          />
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
            disabled={(parentPristine && !calculatedRate) || submitting}
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
