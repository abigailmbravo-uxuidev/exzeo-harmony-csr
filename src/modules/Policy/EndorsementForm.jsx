import React, { useState, useEffect } from 'react';
import _get from 'lodash/get';
import _isEqual from 'lodash/isEqual';

import {
  OnChangeListener,
  Form,
  Field,
  Date,
  Currency,
  validation,
  Loader,
  FormSpy,
  Button,
  date
} from '@exzeo/core-ui';

import CustomNavigationPrompt from '../../components/CustomNavigationPrompt';
import { setEndorsementDate } from '../../utilities/endorsementModel';

import { rateEndorsement, formatEndorsementData } from './utilities';

const getDirtyFieldValues = (dirtyFields, values) => {
  const map = {};

  Object.keys(dirtyFields).map(p => {
    if (_get(dirtyFields, p)) {
      map[p] = _get(values, p);
    }
    return p;
  });

  return map;
};

const initialState = {
  originalInitial: {},
  reviewPending: false,
  rating: null,
  endorsementDate: null,
  instanceId: null,
  hasEndorsementDateChanged: false,
  newBillPlan: undefined
};

const EndorsementForm = ({
  policyFormData,
  parentFormInstance,
  timezone,
  setAppError,
  history
}) => {
  let formInstance;
  const [disableReview, setDisableReview] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [endorsementState, setCalculateRate] = useState(initialState);

  const {
    pristine: parentPristine,
    dirtyFields,
    values: formValues
  } = parentFormInstance.getState();

  const initialValues = {
    ...policyFormData,
    endorsementDate: endorsementState.endorsementDate
      ? endorsementState.endorsementDate
      : setEndorsementDate(
          policyFormData.effectiveDate,
          policyFormData.endDate
        ),
    rating: endorsementState.rating,
    instanceId: endorsementState.instanceId
  };

  const setFormInstance = form => {
    formInstance = form;
  };

  async function calculateEndorsementRate({ endorsementDate }) {
    const {
      values: formValues,
      initialValues,
      dirtyFields,
      invalid
    } = parentFormInstance.getState();

    if (invalid) {
      parentFormInstance.submit();
      return;
    }

    setSubmitting(true);
    const originalInitial = getDirtyFieldValues(
      { ...endorsementState.dirtyFields, ...dirtyFields },
      initialValues._TEMP_INITIAL_VALUES
    );

    const formattedData = formatEndorsementData(
      { ...formValues, endorsementDate },
      timezone
    );

    const { rating, instanceId, billPlan } = await rateEndorsement(
      formattedData,
      setAppError
    );

    setSubmitting(false);
    if (!rating) return;
    parentFormInstance.initialize({ ...formValues, rating, instanceId });
    setCalculateRate(state => ({
      ...state,
      dirtyFields: { ...state.dirtyFields, ...dirtyFields },
      rating,
      endorsementDate,
      instanceId,
      originalInitial,
      reviewPending: true,
      hasEndorsementDateChanged: false,
      newBillPlan: billPlan === formValues.billPlan ? null : billPlan
    }));
  }

  const resetEndorsementForm = () => {
    setCalculateRate(initialState);
    parentFormInstance.initialize(policyFormData);
    if (formInstance) formInstance.reset();
    setDisableReview(false);
  };

  useEffect(() => {
    if (!endorsementState.reviewPending) return;

    const newModifed = getDirtyFieldValues(
      { ...endorsementState.dirtyFields, ...dirtyFields },
      formValues
    );

    if (_isEqual(newModifed, endorsementState.originalInitial)) {
      setDisableReview(true);
    } else {
      setDisableReview(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dirtyFields]);

  useEffect(() => {
    if (!parentPristine && endorsementState.rating) {
      setCalculateRate(state => ({
        ...state,
        rating: null,
        endorsementDate: endorsementState.endorsementDate
      }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentPristine]);

  const handleSaveEndorsement = async data => {
    setSubmitting(true);
    const { values: formValues } = parentFormInstance.getState();

    const endorsementDate = date.formatToUTC(
      date.formatDate(data.endorsementDate, date.FORMATS.SECONDARY),
      timezone
    );

    await parentFormInstance.submit({ ...formValues, endorsementDate });

    setTimeout(formInstance.reset);
    setCalculateRate(initialState);
    setSubmitting(false);
  };

  const isEffectiveDateRange = validation.isDateRange(
    date.formatDate(initialValues.effectiveDate, date.FORMATS.SECONDARY),
    date.formatDate(initialValues.endDate, date.FORMATS.SECONDARY)
  );

  const inSaveState =
    endorsementState.rating &&
    parentPristine &&
    !endorsementState.hasEndorsementDateChanged;

  return (
    <Form
      keepDirtyOnReinitialize
      initialValues={initialValues}
      onSubmit={inSaveState ? handleSaveEndorsement : calculateEndorsementRate}
      subscription={{ values: true }}
    >
      {({ handleSubmit }) => (
        <React.Fragment>
          {!endorsementState.rating && submitting && <Loader />}
          <form
            id="EndorsePolicy"
            className="endorse-policy"
            onSubmit={handleSubmit}
          >
            <div className="endo-results-calc">
              {endorsementState.newBillPlan && (
                <div className="bill-plan title">
                  Your Bill Plan Will Be Changed To{' '}
                  {endorsementState.newBillPlan} Due To This Endorsement
                </div>
              )}
              <div className="flex-parent">
                <div className="form-group endorsement-date-wrapper">
                  <Field name="endorsementDate" validate={isEffectiveDateRange}>
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
                    <Currency
                      input={input}
                      meta={meta}
                      name="rating.endorsementAmount"
                      label="New End Amount"
                      disabled
                      dataTest="endorsementAmount"
                    />
                  )}
                </Field>
                <Field name="rating.newCurrentPremium">
                  {({ input, meta }) => (
                    <Currency
                      input={input}
                      meta={meta}
                      label="New End Premium"
                      disabled
                      dataTest="newCurrentPremium"
                    />
                  )}
                </Field>
                <Field name="rating.newAnnualPremium">
                  {({ input, meta }) => (
                    <Currency
                      input={input}
                      meta={meta}
                      label="New Annual Premium"
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
                  whenValue={endorsementState.reviewPending}
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
                    submitting ||
                    (parentPristine && !endorsementState.reviewPending) ||
                    (!parentPristine && disableReview)
                  }
                  data-test="modal-submit"
                >
                  {inSaveState ? 'Save' : 'Review'}
                </Button>
              </div>
            </div>
            <OnChangeListener name="endorsementDate">
              {() => {
                if (endorsementState.rating) {
                  setCalculateRate(state => ({
                    ...state,
                    rating: null,
                    hasEndorsementDateChanged: true
                  }));
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
