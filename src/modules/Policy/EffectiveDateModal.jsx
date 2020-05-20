import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Button,
  FormSpy,
  date,
  Field,
  Currency,
  Input,
  OnChangeListener
} from '@exzeo/core-ui';

import EffectiveDateForm from './EffectiveDateForm';
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
      size={Modal.sizes.small}
      className="effective-date"
      header={<h4>Edit Effective Date</h4>}
    >
      <EffectiveDateForm
        initialValues={initialValues}
        handleSubmit={instanceId ? changeEffectiveDateSubmit : getRateSubmit}
        effectiveDateReasons={effectiveDateReasons}
        className="card-block"
      >
        {({ submitting }) => (
          <div className="card-footer">
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
                <Field
                  name="premiumChange"
                  label="New Endorsement Amount"
                  component={Currency}
                  disabled
                  dataTest="newEndorsementAmount"
                />
              )}
            </Field>
            <Field name="newAnnualPremium">
              {({ input, meta }) => (
                <Field
                  name="newAnnualPremium"
                  label="New Annual Premium"
                  component={Currency}
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
        )}
      </EffectiveDateForm>
    </Modal>
  );
};

EffectiveDateModal.propTypes = {
  handleCancel: PropTypes.func,
  onSubmit: PropTypes.func
};

export default EffectiveDateModal;
