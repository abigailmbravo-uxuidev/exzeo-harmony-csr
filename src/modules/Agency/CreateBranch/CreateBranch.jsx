import React, { useState } from 'react';
import {
  Button,
  arrayMutators,
  Form,
  Loader,
  FieldArray
} from '@exzeo/core-ui';

import ExistingAgentModal from '../ExistingAgentModal';
import AddressGroup from '../AddressGroup';
import Agent from '../Agent';
import Contact from '../Contact';
import License from '../License';

import history from '../../../history';
import Footer from '../../../components/Common/Footer';

import BranchDetails from './BranchDetails';
import { DEFAULT_COUNTRY } from '../../../constants/address';

export const CreateBranch = ({
  orphans,
  listAnswersAsKey,
  initialValues,
  createBranch,
  agency,
  match: {
    params: { branchCode }
  }
}) => {
  const [formInstance, setFormInstance] = useState(null);
  const [showAddExistingAgentModal, setShowAddExistingAgentModal] = useState(
    false
  );

  const handleCreateBranch = async data => {
    data.mailingAddress.country = DEFAULT_COUNTRY;
    data.agentOfRecord.status = 'Active';
    data.agentOfRecord.mailingAddress.country = DEFAULT_COUNTRY;
    const branch = await createBranch(data, agency.agencyCode);
    history.push(`/agency/${agency.agencyCode}/${branch.branchCode}/overview`);
  };

  const handleToggleExistingAgentModal = form => {
    setFormInstance(form);
    setShowAddExistingAgentModal(!showAddExistingAgentModal);
  };

  const handleResetForm = () => {
    history.push(`/agency/${agency.agencyCode}/0/overview`);
  };

  // TODO : Move to utilities
  const applyOrphanedAgent = data => {
    const { change, batch } = formInstance;
    const { selectedAgentCode } = data;
    const selectedAgent = orphans.filter(
      a => String(a.agentCode) === String(selectedAgentCode)
    )[0];

    batch(() => {
      change('agentOfRecord.firstName', selectedAgent.firstName);
      change('agentOfRecord.lastName', selectedAgent.lastName);
      change(
        'agentOfRecord.primaryPhoneNumber',
        selectedAgent.primaryPhoneNumber
      );
      change(
        'agentOfRecord.secondaryPhoneNumber',
        selectedAgent.secondaryPhoneNumber
      );
      change('agentOfRecord.faxNumber', selectedAgent.faxNumber);
      change('agentOfRecord.emailAddress', selectedAgent.emailAddress);
      change('agentOfRecord.agentCode', selectedAgent.agentCode);
    });
    handleToggleExistingAgentModal();
  };
  return (
    <div className="route-content-wrapper">
      <Form
        initialValues={initialValues}
        onSubmit={handleCreateBranch}
        mutators={{
          ...arrayMutators
        }}
        subscription={{ submitting: true, pristine: true }}
      >
        {({ form, handleSubmit, submitting, pristine }) => (
          <React.Fragment>
            {submitting && <Loader />}
            <div className="route-content">
              <div className="scroll">
                <div className="form-group survey-wrapper" role="group">
                  {' '}
                  <form id="createBranch" onSubmit={handleSubmit}>
                    <h3>Details</h3>
                    <section className="agency-details">
                      <BranchDetails />
                      {/* web address validaiton */}
                    </section>
                    <h3>Address</h3>
                    <section
                      data-test="agency-address-section"
                      className="agency-address"
                    >
                      <AddressGroup
                        showTerritoryManager
                        mailingAddressPrefix="mailingAddress"
                        physicalAddressPrefix="physicalAddress"
                        listAnswersAsKey={listAnswersAsKey}
                      />
                    </section>

                    <h3>Contact</h3>
                    <section className="agency-contact">
                      <Contact fieldPrefix="contact" showTitle />
                    </section>
                    <h3>
                      Agent Of Record{' '}
                      <button
                        onClick={() => handleToggleExistingAgentModal(form)}
                        className="btn btn-link btn-sm"
                      >
                        <i className="fa fa-user" />
                        Use Existing Agent
                      </button>
                    </h3>
                    <section className="agency-aor">
                      <div className="agent-of-record">
                        <Agent fieldPrefix="agentOfRecord" />
                        <section
                          data-test="aor-address-section"
                          className="agency-address"
                        >
                          <AddressGroup
                            mailingAddressPrefix="agentOfRecord.mailingAddress"
                            physicalAddressPrefix="agentOfRecord.physicalAddress"
                            listAnswersAsKey={listAnswersAsKey}
                          />
                        </section>
                      </div>
                      <div className="agency-license">
                        <FieldArray
                          name="agentOfRecord.licenses"
                          stateAnswers={listAnswersAsKey.US_states}
                          component={License}
                          isAgency
                        />
                      </div>
                    </section>
                  </form>
                </div>
              </div>
            </div>
            <div className="basic-footer btn-footer">
              <Footer />
              <div className="btn-wrapper">
                <Button
                  className={Button.constants.classNames.secondary}
                  data-test="resetButton"
                  onClick={handleResetForm}
                >
                  Cancel
                </Button>
                <Button
                  className={Button.constants.classNames.primary}
                  form="createBranch"
                  type="submit"
                  data-test="submitButton"
                  disabled={submitting || pristine}
                >
                  Save
                </Button>
              </div>
            </div>
          </React.Fragment>
        )}
      </Form>
      {showAddExistingAgentModal && (
        <ExistingAgentModal
          listOfAgents={orphans}
          onToggleModal={handleToggleExistingAgentModal}
          handleSelection={applyOrphanedAgent}
        />
      )}
    </div>
  );
};

export default CreateBranch;
