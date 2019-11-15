import React from 'react';
import PropTypes from 'prop-types';
import { Form, Loader, Field, Button, Modal, validation } from '@exzeo/core-ui';

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
              <div>
                <Field
                  name="approval"
                  label="Giggity"
                  component="input"
                  type="checkbox"
                  validate={validation.isRequired}
                />
              </div>
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
