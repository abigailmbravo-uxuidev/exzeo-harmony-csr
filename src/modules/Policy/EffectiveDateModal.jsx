import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from '@exzeo/core-ui/src';

import EffectiveDateForm from './EffectiveDateForm';

const EffectiveDateModal = ({
  initialValues,
  closeModal,
  changeEffectiveDateSubmit,
  effectiveDateReasons
}) => {
  return (
    <Modal
      size={Modal.sizes.large}
      className="effective-date"
      header={<h4>Edit Effective Date</h4>}
    >
      <EffectiveDateForm
        initialValues={initialValues}
        handleSubmit={changeEffectiveDateSubmit}
        effectiveDateReasons={effectiveDateReasons}
        className="card-block"
      >
        {({ submitting }) => (
          <div className="card-footer">
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
              Send
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
