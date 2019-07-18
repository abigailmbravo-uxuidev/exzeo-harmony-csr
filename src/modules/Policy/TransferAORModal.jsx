import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from '@exzeo/core-ui/src';

import TransferAORForm from './TransferAORForm';

const TransferAORModal = ({
  initialValues,
  formValues,
  closeModal,
  submitTransferAOR
}) => {
  return (
    <Modal
      size={Modal.sizes.large}
      className="transfer-aor fade-in"
      header={
        <h4>
          <i className="fa fa-share-alt" /> Transfer AOR
        </h4>
      }
    >
      <TransferAORForm
        initialValues={initialValues}
        formValues={formValues}
        handleSubmit={submitTransferAOR}
        className="card-block"
      >
        {({ submitting }) => (
          <div className="card-footer">
            <Button
              className={Button.constants.classNames.secondary}
              onClick={closeModal}
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
      </TransferAORForm>
    </Modal>
  );
};

TransferAORModal.propTypes = {
  handleCancel: PropTypes.func,
  onSubmit: PropTypes.func
};

export default TransferAORModal;
