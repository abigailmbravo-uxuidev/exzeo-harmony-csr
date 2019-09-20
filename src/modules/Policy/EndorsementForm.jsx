// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { FormSpy, Button, date } from '@exzeo/core-ui';
import { rateEndorsement, formatEndorsementData } from './utilities';
import CustomNavigationPrompt from '../../components/CustomNavigationPrompt';

import {
  OnChangeListener,
  Form,
  Field,
  Date,
  Currency,
  validation,
  Loader
} from '@exzeo/core-ui';

const EndorsementForm = ({
  policyFormData,
  parentFormInstance,
  timezone,
  setAppError,
  history,
  handlePrimaryClick
}) => {
  let formInstance;
  const [endorsementState, setCalculateRate] = useState({});

  const { pristine: parentPristine, invalid } = parentFormInstance.getState();

  const initialValues = {
    ...policyFormData,
    endorsementDate: endorsementState.endorsementDate
      ? endorsementState.endorsementDate
      : date.formatDate(policyFormData.effectiveDate, date.FORMATS.SECONDARY),
    rating: endorsementState.rating,
    instanceId: endorsementState.instanceId
  };

  const setFormInstance = form => {
    formInstance = form;
  };

  const calculateEndorsementRate = async ({ endorsementDate }) => {
    const { values: formValues, initialValues } = parentFormInstance.getState();

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
    setCalculateRate({ rating, endorsementDate, instanceId });
  };

  const resetEndorsementForm = () => {
    setCalculateRate({});
    parentFormInstance.initialize(policyFormData);
    if (formInstance) formInstance.reset();
  };

  useEffect(() => {
    if (!parentPristine && endorsementState.rating) {
      setCalculateRate({ endorsementDate: endorsementState.endorsementDate });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentPristine]);

  const handleSaveEndorsement = async data => {
    const { values: formValues } = parentFormInstance.getState();

    const endorsementDate = date.formatToUTC(
      date.formatDate(data.endorsementDate, date.FORMATS.SECONDARY),
      timezone
    );

    await handlePrimaryClick({ ...formValues, endorsementDate });

    setTimeout(formInstance.reset);
    setCalculateRate({});
  };

  const validateEndorsementDate = (...args) => {
    // we shouldn't need to do this, waiting for a patch from redux-form
    if (!initialValues) return undefined;
    return (
      validation.isDate(...args) &&
      validation.isDateRange(
        initialValues.effectiveDate,
        initialValues.endDate
      )(...args)
    );
  };

  return (
    <Form
      keepDirtyOnReinitialize
      initialValues={initialValues}
      onSubmit={
        endorsementState.rating && parentPristine
          ? handleSaveEndorsement
          : calculateEndorsementRate
      }
      subscription={{ submitting: true, pristine: true, values: true }}
    >
      {({ handleSubmit, submitting }) => (
        <React.Fragment>
          {!endorsementState.rating && submitting && <Loader />}
          <form
            id="EndorsePolicy"
            className="endorse-policy"
            onSubmit={handleSubmit}
          >
            <div className="endo-results-calc">
              <div className="flex-parent">
                <div className="form-group endorsement-date-wrapper">
                  <Field
                    name="endorsementDate"
                    validate={validateEndorsementDate}
                  >
                    {({ input, meta }) => (
                      <Date
                        input={input}
                        meta={meta}
                        styleName="endorsementDate"
                        dataTest="endorsementDate"
                        label="Endorsement Effective Date"
                      />
                    )}
                  </Field>
                </div>
                <Field name="rating.endorsementAmount">
                  {({ input, meta }) => (
                    <Field
                      name="rating.endorsementAmount"
                      label="New End Amount"
                      component={Currency}
                      disabled
                      dataTest="endorsementAmount"
                    />
                  )}
                </Field>
                <Field name="rating.newCurrentPremium">
                  {({ input, meta }) => (
                    <Field
                      name="rating.newCurrentPremium"
                      label="New End Premium"
                      component={Currency}
                      disabled
                      dataTest="newCurrentPremium"
                    />
                  )}
                </Field>
                <Field name="rating.newAnnualPremium">
                  {({ input, meta }) => (
                    <Field
                      name="rating.newAnnualPremium"
                      label="New Annual Premium"
                      component={Currency}
                      disabled
                      dataTest="newAnnualPremium"
                    />
                  )}
                </Field>
                <FormSpy subscription={{}}>
                  {({ form }) => {
                    setFormInstance(form);
                    return null;
                  }}
                </FormSpy>
                <CustomNavigationPrompt
                  whenValue={endorsementState.instanceId}
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
                    invalid ||
                    (parentPristine &&
                      !endorsementState.hasEndorsementDateChanged &&
                      !endorsementState.rating) ||
                    submitting
                  }
                  data-test="modal-submit"
                >
                  {endorsementState.rating &&
                  (parentPristine &&
                    !endorsementState.hasEndorsementDateChanged)
                    ? 'Save'
                    : 'Review'}
                </Button>
              </div>
            </div>
            <OnChangeListener name="endorsementDate">
              {value => {
                if (endorsementState.rating) {
                  setCalculateRate({ hasEndorsementDateChanged: true });
                }
              }}
            </OnChangeListener>
          </form>
        </React.Fragment>
      )}
    </Form>
  );
};

export default EndorsementForm;
