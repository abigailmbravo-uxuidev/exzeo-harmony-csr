import React from 'react';
import { Button, Form } from '@exzeo/core-ui/src';

import Contact from './Contact';

export const AgencyContactModal = ({
  closeModal,
  agency,
  branchCode,
  section,
  header,
  updateAgency,
  initialValues
}) => {
  const onHandleSaveAgency = async data => {
    if (Number(branchCode) > 0) {
      const selectedBranch = agency.branches.filter(
        b => String(b.branchCode) === String(branchCode)
      );
      selectedBranch[0][section] = data[section];
      agency.branches = agency.branches.filter(
        b => String(b.branchCode) !== '0'
      );
      await updateAgency(agency);
    } else {
      agency[section] = data[section];
      agency.branches = agency.branches.filter(
        b => String(b.branchCode) !== '0'
      );
      await updateAgency(agency);
    }
    closeModal();
  };
  return (
    <div className="modal edit-contact">
      <Form
        id="AgentContact"
        initialValues={initialValues}
        onSubmit={onHandleSaveAgency}
        subscription={{ submitting: true }}
      >
        {({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit}>
            <div className="card">
              <div className="card-header">
                <h4>
                  <i className="fa fa-address-card" /> {header}
                </h4>
              </div>
              <div className="card-block">
                <section className="agency-details">
                  <Contact
                    fieldPrefix={section}
                    showTitle={section === 'contact'}
                  />
                </section>
              </div>
              <div className="card-footer">
                <div className="btn-footer">
                  <Button
                    className={Button.constants.classNames.secondary}
                    data-test="modal-cancel"
                    onClick={closeModal}
                  >
                    Cancel
                  </Button>
                  <Button
                    className={Button.constants.classNames.primary}
                    type="submit"
                    data-test="modal-submit"
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

export default AgencyContactModal;
