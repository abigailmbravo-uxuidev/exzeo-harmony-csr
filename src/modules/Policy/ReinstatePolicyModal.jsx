import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from '@exzeo/core-ui/src';

import { Field, Form, Loader, validation } from '@exzeo/core-ui';
import { postCreateTransaction } from './data';

const ReinstatePolicyModal = ({
  policy,
  getPolicy,
  closeModal,
  errorHandler
}) => {
  const handleSubmit = async () => {
    try {
      const submitData = {
        policyID: policy.policyID,
        policyNumber: policy.policyNumber,
        billingStatus: policy.status.code,
        transactionType: 'Reinstatement'
      };

      await postCreateTransaction(submitData);
      await getPolicy(policy.policyNumber);
    } catch (error) {
      errorHandler(error);
    } finally {
      closeModal();
    }
  };
  return (
    <Modal
      size={Modal.sizes.medium}
      className="reinstate-policy"
      header={<h4>Reinstate Policy</h4>}
    >
      <Form
        onSubmit={handleSubmit}
        subscription={{ submitting: true, pristine: true }}
      >
        {({ handleSubmit, submitting }) => (
          <form
            id="ReinstatePolicyForm"
            className="reinstate-policy"
            onSubmit={handleSubmit}
          >
            {submitting && <Loader />}
            <div className="card-block">
              <h5>Reinstate this policy?</h5>
              <label htmlFor="reinstatePolicy">{`Yes, I want to reinstate policy: ${policy.policyNumber} `}</label>
              <Field
                name="reinstatePolicy"
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
                onClick={handleSubmit}
                onKeyPress={e => e.charCode === 13 && handleSubmit(e)}
                disabled={submitting}
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

ReinstatePolicyModal.propTypes = {
  handleCancel: PropTypes.func,
  onSubmit: PropTypes.func
};

export default ReinstatePolicyModal;
