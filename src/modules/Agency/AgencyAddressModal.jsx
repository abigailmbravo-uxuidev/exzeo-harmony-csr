import React from 'react';
import { Form, Button } from '@exzeo/core-ui';
import AddressGroup from './AddressGroup';

export const AgencyAddressModal = ({
  agency,
  branchCode,
  closeModal,
  updateAgency,
  listAnswersAsKey,
  initialValues
}) => {
  const handleSaveAddress = async data => {
    if (Number(branchCode) > 0) {
      const selectedBranch = agency.branches.find(
        b => String(b.branchCode) === String(branchCode)
      );
      selectedBranch.physicalAddress = data.physicalAddress;
      selectedBranch.mailingAddress = data.mailingAddress;
      selectedBranch.territoryManagerId = data.territoryManagerId;
      agency.branches = agency.branches.filter(
        b => String(b.branchCode) !== '0'
      );
      updateAgency(agency);
    } else {
      agency.physicalAddress = data.physicalAddress;
      agency.mailingAddress = data.mailingAddress;
      agency.territoryManagerId = data.territoryManagerId;
      agency.branches = agency.branches.filter(
        b => String(b.branchCode) !== '0'
      );
      await updateAgency(agency);
    }
    closeModal();
  };

  console.log(initialValues);
  return (
    <div className="modal agency-crud">
      <Form
        id="AgencyAddressModal"
        initialValues={initialValues}
        onSubmit={handleSaveAddress}
        subscription={{ submitting: true, values: true, dirty: true }}
      >
        {({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit}>
            <div className="card">
              <div className="card-header">
                <h4>
                  <i className="fa fa-address-book" /> Edit Agency Address
                </h4>
              </div>
              <div className="card-block">
                <section
                  data-test="agency-address-section"
                  className="agency-address"
                >
                  <AddressGroup
                    mailingAddressPrefix="mailingAddress"
                    physicalAddressPrefix="physicalAddress"
                    listAnswersAsKey={listAnswersAsKey}
                    showTerritoryManager
                  />
                </section>
              </div>
              <div className="card-footer">
                <div className="btn-footer">
                  <Button
                    className={Button.constants.classNames.secondary}
                    dataTest="modal-cancel"
                    onClick={closeModal}
                  >
                    Cancel
                  </Button>
                  <Button
                    className={Button.constants.classNames.primary}
                    type="submit"
                    dataTest="modal-submit"
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

export default AgencyAddressModal;
