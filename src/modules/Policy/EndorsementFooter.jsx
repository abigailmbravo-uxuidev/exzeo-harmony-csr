import React, { useState, useEffect } from 'react';
import { FormSpy, Button, date } from '@exzeo/core-ui';
import EndorsementForm from './EndorsementForm';
import { rateEndorsement, formatEndorsementData } from './utilities';
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
  const [endorsementState, setCalculateRate] = useState({});
  const [instanceId, setInstanceId] = useState(null);

  const {
    values: policy,
    pristine: parentPristine,
    submitSucceeded: parentSubmitSuceeded
  } = parentFormInstance.getState();
  const initialValues = {
    ...policy,
    endorsementDate: endorsementState.endorsementDate
      ? endorsementState.endorsementDate
      : date.formatDate(policy.effectiveDate, date.FORMATS.SECONDARY),
    rating: endorsementState.rating,
    instanceId
  };

  const setFormInstance = form => {
    formInstance = form;
  };

  const calculateEndorsementRate = async ({ endorsementDate }) => {
    const { values: formValues } = parentFormInstance.getState();

    const formattedData = formatEndorsementData(
      { ...formValues, endorsementDate },
      timezone
    );

    const { rating, instanceId } = await rateEndorsement(
      formattedData,
      setAppError
    );
    if (!rating) return;
    parentFormInstance.initialize({ ...formValues, rating, instanceId });
    setCalculateRate({ rating, endorsementDate });
    setInstanceId(instanceId);
  };

  const resetEndorsementForm = () => {
    setCalculateRate({});
    setInstanceId(null);
    parentFormInstance.initialize(policyFormData);
  };

  useEffect(() => {
    if (!parentPristine && endorsementState.rating) {
      setCalculateRate({});
      setInstanceId(null);
    }
    if (parentSubmitSuceeded) {
      setTimeout(formInstance.reset);
      setCalculateRate({});
      setInstanceId(null);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentPristine, parentSubmitSuceeded]);

  const handleSaveEndorsement = async data => {
    const { values: formValues } = parentFormInstance.getState();

    const endorsementDate = date.formatToUTC(
      date.formatDate(data.endorsementDate, date.FORMATS.SECONDARY),
      timezone
    );

    await handlePrimaryClick({ ...formValues, endorsementDate });
  };

  return (
    <EndorsementForm
      initialValues={initialValues}
      handleSubmit={
        endorsementState.rating && parentPristine
          ? handleSaveEndorsement
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
            disabled={
              (parentPristine && !endorsementState.rating) || submitting
            }
            data-test="modal-submit"
          >
            {endorsementState.rating && parentPristine ? 'Save' : 'Review'}
          </Button>
        </React.Fragment>
      )}
    </EndorsementForm>
  );
};

export default EndorsementFooter;
