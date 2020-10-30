import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Button,
  FormSpy,
  date,
  Field,
  Currency,
  OnChangeListener,
  Form,
  Loader,
  validation,
  Date,
  Select
} from '@exzeo/core-ui';

import { rateEffectiveDateChange, saveEffectiveDateChange } from './utilities';

const EffectiveDateModal = ({
  initialValues,
  closeModal,
  effectiveDateReasons,
  errorHandler,
  zipCodeSettings,
  currentPremium,
  getPolicy
}) => {
  const [instanceId, setInstanceId] = useState(null);
  const [formInstance, setFormInstance] = useState(null);

  const changeEffectiveDateSubmit = async data => {
    await saveEffectiveDateChange(
      {
        instanceId
      },
      errorHandler
    );
    await getPolicy(data.policyNumber);
    closeModal();
  };
  const getRateSubmit = async data => {
    const effectiveDate = date.convertDateToTimeZone(
      data.effectiveDate,
      zipCodeSettings
    );
    const { premiumChange, instanceId } = await rateEffectiveDateChange(
      {
        ...data,
        effectiveDate
      },
      errorHandler
    );

    setInstanceId(instanceId);

    const newAnnualPremium = currentPremium + premiumChange;

    formInstance.initialize({
      ...data,
      premiumChange,
      newAnnualPremium
    });
  };

  const resetPremium = () => {
    setInstanceId(null);
    const { values: formValues } = formInstance.getState();

    formInstance.initialize({
      ...formValues,
      premiumChange: '',
      newAnnualPremium: ''
    });
  };
  return (
    <Modal
      size={Modal.sizes.medium}
      className="effective-date"
      header={<h4>Edit Effective Date</h4>}
    >
      <Form
        initialValues={initialValues}
        onSubmit={instanceId ? changeEffectiveDateSubmit : getRateSubmit}
        subscription={{ submitting: true }}
      >
        {({ handleSubmit, submitting }) => (
          <form
            id="EffectiveDateForm"
            className="effective-date"
            onSubmit={handleSubmit}
          >
            {submitting && <Loader />}
            <div className="card-block unsaved-changes">
              <Field name="effectiveDate" validate={validation.isRequired}>
                {({ input, meta }) => (
                  <Date
                    input={input}
                    meta={meta}
                    styleName="effectiveDate"
                    dataTest="effective-date"
                    label="Effective Date"
                  />
                )}
              </Field>
              <Field
                name="effectiveDateChangeReason"
                validate={validation.isRequired}
              >
                {({ input, meta }) => (
                  <Select
                    input={input}
                    meta={meta}
                    styleName="effectiveDateChangeReason"
                    dataTest="effective-date-change-reason"
                    label="Reason For Change"
                    answers={effectiveDateReasons}
                  />
                )}
              </Field>
            </div>
            <div className="card-footer">
              <div className="endo-results-calc">
                <div className="flex-parent">
                  <FormSpy subscription={{}}>
                    {({ form }) => {
                      if (!formInstance) {
                        setFormInstance(form);
                      }
                      return null;
                    }}
                  </FormSpy>
                  <Field name="premiumChange">
                    {({ input, meta }) => (
                      <Currency
                        input={input}
                        meta={meta}
                        label="New Endorsement Amount"
                        disabled
                        dataTest="premiumChange"
                      />
                    )}
                  </Field>
                  <Field name="newAnnualPremium">
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
                  <OnChangeListener name="effectiveDateChangeReason">
                    {() => {
                      if (instanceId) {
                        resetPremium();
                      }
                    }}
                  </OnChangeListener>
                  <OnChangeListener name="effectiveDate">
                    {() => {
                      if (instanceId) {
                        resetPremium();
                      }
                    }}
                  </OnChangeListener>
                  <Button
                    className={Button.constants.classNames.secondary}
                    onClick={closeModal}
                    disabled={submitting}
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
                    {instanceId ? 'Update' : 'Review'}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        )}
      </Form>
    </Modal>
  );
};

EffectiveDateModal.propTypes = {
  handleCancel: PropTypes.func,
  onSubmit: PropTypes.func
};

export default EffectiveDateModal;
