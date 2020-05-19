import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, FormSpy, date } from '@exzeo/core-ui';

import EffectiveDateForm from './EffectiveDateForm';
import { rateEffectiveDateChange } from './utilities';

const EffectiveDateModal = ({
  initialValues,
  closeModal,
  effectiveDateReasons,
  errorHandler,
  zipCodeSettings
}) => {
  const [premiumChange, setPremiumChange] = useState(null);
  const [instanceId, setInstanceId] = useState(null);
  const [formInstance, setFormInstance] = useState(null);

  const changeEffectiveDateSubmit = async data => {};
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
    setPremiumChange(premiumChange);

    console.log(formInstance.getState());
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
        {({ submitting, pristine }) => (
          <div className="card-footer">
            <FormSpy subscription={{}}>
              {({ form }) => {
                if (!formInstance) {
                  setFormInstance(form);
                }
                return null;
              }}
            </FormSpy>
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
              disabled={submitting || pristine}
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
