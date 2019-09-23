// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { FormSpy, Button, date } from '@exzeo/core-ui';
import _get from 'lodash/get';
import _isEqual from 'lodash/isEqual';

import {
  OnChangeListener,
  Form,
  Field,
  Date,
  Currency,
  validation,
  Loader
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
  instanceId: null
};

const EndorsementForm = ({
  policyFormData,
  parentFormInstance,
  timezone,
  setAppError,
  history,
  handlePrimaryClick
}) => {
  let formInstance;
  const [disableReview, setDisableReview] = useState(false);

  const [endorsementState, setCalculateRate] = useState(initialState);

  const {
    pristine: parentPristine,
    dirtyFields,
    values: formValues,
    invalid: parentInvalid
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
      dirtyFields
    } = parentFormInstance.getState();

    const originalInitial = getDirtyFieldValues(
      { ...endorsementState.dirtyFields, ...dirtyFields },
      initialValues._TEMP_INITIAL_VALUES
    );

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
    setCalculateRate(state => ({
      ...state,
      dirtyFields: { ...state.dirtyFields, ...dirtyFields },
      rating,
      endorsementDate,
      instanceId,
      originalInitial,
      reviewPending: true
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
    const { values: formValues } = parentFormInstance.getState();

    const endorsementDate = date.formatToUTC(
      date.formatDate(data.endorsementDate, date.FORMATS.SECONDARY),
      timezone
    );

    await handlePrimaryClick({ ...formValues, endorsementDate });

    setTimeout(formInstance.reset);
    setCalculateRate(initialState);
  };

  const isEffectiveDateRange = validation.isDateRange(
    initialValues.effectiveDate,
    initialValues.endDate
  );

  const checkRemovePhField = () => {
    if (
      initialValues.policyHolders.length === 1 ||
      (_get(formValues, 'removeSecondary') &&
        !_get(formValues, 'policyHolders[1].firstName'))
    ) {
      return true;
    }

    return false;
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
                    parentInvalid ||
                    submitting ||
                    ((parentPristine && !endorsementState.reviewPending) ||
                      (!parentPristine && disableReview))
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
