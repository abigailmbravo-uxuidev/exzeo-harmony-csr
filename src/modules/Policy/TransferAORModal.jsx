import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from '@exzeo/core-ui/src';

import { Form, Loader } from '@exzeo/core-ui';
import { AgencyAgentSelect } from '@exzeo/core-ui/src/@Harmony';

const TransferAORModal = ({ initialValues, closeModal, handleSubmit }) => {
  return (
    <Modal
      size={Modal.sizes.medium}
      className="transfer-aor fade-in"
      header={
        <h4>
          <i className="fa fa-share-alt" /> Transfer AOR
        </h4>
      }
    >
      <Form
        keepDirtyOnReinitialize
        initialValues={initialValues}
        onSubmit={handleSubmit}
        subscription={{ submitting: true, values: true }}
      >
        {({ handleSubmit, submitting, values: formValues }) => (
          <form
            id="TransferAORForm"
            className="application"
            onSubmit={handleSubmit}
          >
            {submitting && <Loader />}
            <div className="card-block aor">
              <AgencyAgentSelect
                initialValues={initialValues}
                formValues={formValues}
                size="12"
                statuses={['Active', 'Service Only', 'Pending']}
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
                disabled={submitting}
                data-test="modal-submit"
              >
                Send
              </Button>
            </div>
          </form>
        )}
      </Form>
    </Modal>
  );
};

TransferAORModal.propTypes = {
  handleCancel: PropTypes.func,
  onSubmit: PropTypes.func
};

export default TransferAORModal;
