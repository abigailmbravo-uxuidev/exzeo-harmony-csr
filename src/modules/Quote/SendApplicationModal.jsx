import React from 'react';
import PropTypes from 'prop-types';

import SendApplicationForm from './SendApplicationForm';
import { Modal, Button } from '@exzeo/core-ui/src';

const SendApplicationModal = ({
  initialValues,
  closeModal,
  submitApplication
}) => {
  const isApplicationReady = initialValues.quoteState === 'Application Ready';
  return (
    <Modal
      size={Modal.sizes.large}
      className="quote-summary fade-in"
      header={
        <h4>
          <i className="fa fa-share-alt" /> Congratulations
        </h4>
      }
    >
      <SendApplicationForm
        initialValues={initialValues}
        handleSubmit={submitApplication}
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
              disabled={!isApplicationReady || submitting}
              data-test="modal-submit"
            >
              Send
            </Button>
          </div>
        )}
      </SendApplicationForm>
    </Modal>
  );
};

SendApplicationModal.propTypes = {
  handleCancel: PropTypes.func,
  onSubmit: PropTypes.func
};

export default SendApplicationModal;
