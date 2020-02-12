import React from 'react';
import { Form, Button } from '@exzeo/core-ui';

import AgencyDetails from './AgencyDetails';

export const AgencyModal = ({ closeModal, updateAgency, initialValues }) => {
  const saveAgency = async data => {
    data.branches = data.branches.filter(b => String(b.branchCode) !== '0');
    await updateAgency(data);
    closeModal();
  };
  return (
    <div className="modal agency-crud">
      <Form
        id="AgencyDetails"
        initialValues={initialValues}
        onSubmit={saveAgency}
        subscription={{ submitting: true }}
      >
        {({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit}>
            <div className="card">
              <div className="card-header">
                <h4>
                  <i className="fa fa-address-book" /> Edit Agency Details
                </h4>
              </div>
              <div className="card-block">
                <section className="agency-details">
                  <AgencyDetails />
                </section>
              </div>
              <div className="card-footer">
                <div className="btn-footer">
                  <Button
                    className={Button.constants.classNames.secondary}
                    data-test="cancel-modal"
                    onClick={closeModal}
                  >
                    Cancel
                  </Button>
                  <Button
                    className={Button.constants.classNames.primary}
                    type="submit"
                    data-test="submit-modal"
                    disabled={submitting}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </form>
        )}
      </Form>
    </div>
  );
};

export default AgencyModal;
