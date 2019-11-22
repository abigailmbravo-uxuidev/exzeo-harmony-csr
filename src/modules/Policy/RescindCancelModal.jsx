import { Button, Field, Form, Loader, Modal, validation } from '@exzeo/core-ui';
import PropTypes from 'prop-types';
import React from 'react';

const RescindCancelModal = ({
  rescindCancelSubmit,
  closeModal,
  policyNumber
}) => {
  return (
    <Modal
      size={Modal.sizes.medium}
      className="reinstate-policy"
      header={<h4>Rescind Cancellation</h4>}
    >
      <Form onSubmit={rescindCancelSubmit}>
        {({ handleSubmit, submitting, pristine }) => (
          <form
            id="rescind-cancel-form"
            className="reinstate-policy"
            onSubmit={handleSubmit}
          >
            {submitting && <Loader />}
            <div className="card-block">
              <h5>Rescind cancellation for this policy?</h5>
              <label htmlFor="approval">{`Yes, I want to rescind cancellation for policy: ${policyNumber} `}</label>

              <Field
                name="approval"
                label="Approval"
                component="input"
                type="checkbox"
                validate={validation.isRequired}
              />
            </div>
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
                disabled={submitting || pristine}
                data-test="modal-submit"
              >
                Update
              </Button>
            </div>
          </form>
        )}
      </Form>
    </Modal>
  );
};

RescindCancelModal.propTypes = {
  handleCancel: PropTypes.func,
  onSubmit: PropTypes.func
};

export default RescindCancelModal;
