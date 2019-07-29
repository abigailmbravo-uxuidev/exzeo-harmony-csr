import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from '@exzeo/core-ui/src';

import ReinstatePolicyForm from './ReinstatePolicyForm';

const ReinstatePolicyModal = ({
  initialValues,
  closeModal,
  reinstatePolicySubmit,
  policyNumber
}) => {
  return (
    <Modal
      size={Modal.sizes.medium}
      className="reinstate-policy"
      header={<h4>Reinstate Policy</h4>}
    >
      <ReinstatePolicyForm
        initialValues={initialValues}
        handleSubmit={reinstatePolicySubmit}
        policyNumber={policyNumber}
        className="card-block"
      >
        {({ submitting, formValues }) => (
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
              disabled={submitting || !formValues.reinstatePolicy}
              data-test="modal-submit"
            >
              Update
            </Button>
          </div>
        )}
      </ReinstatePolicyForm>
    </Modal>
  );
};

ReinstatePolicyModal.propTypes = {
  handleCancel: PropTypes.func,
  onSubmit: PropTypes.func
};

export default ReinstatePolicyModal;
