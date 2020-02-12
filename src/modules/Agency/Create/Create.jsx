import React, { useState } from 'react';

import {
  Button,
  Form,
  arrayMutators,
  FieldArray,
  Loader
} from '@exzeo/core-ui';
import { Redirect } from 'react-router-dom';

import ExistingAgentModal from '../ExistingAgentModal';
import License from '../License';
import Agent from './Agent';
import Contact from '../Contact';
import AgencyDetails from '../AgencyDetails';
import AddressGroup from '../AddressGroup';
import { AppFooter } from '@exzeo/core-ui/src/@Harmony';

export const Create = ({
  listAnswersAsKey,
  licenseValue,
  agency,
  orphans,
  initialValues,
  listOfZipCodes,
  createAgency
}) => {
  const [formInstance, setFormInstance] = useState(null);
  const [showAddExistingAgentModal, setShowAddExistingAgentModal] = useState(
    false
  );

  const createNewAgency = async data => {
    data.agentOfRecord.status = 'Active';
    data.mailingAddress.country = {
      code: 'USA',
      displayText: 'United States of America'
    };
    data.physicalAddress.country = data.mailingAddress.country;
    data.agentOfRecord.mailingAddress = data.mailingAddress;
    await createAgency(data);
  };

  const handleToggleExistingAgentModal = form => {
    setFormInstance(form);
    setShowAddExistingAgentModal(!showAddExistingAgentModal);
  };

  const handleResetForm = () => {
    window.close();
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
        'agentOfRecord.primaryPhoneNumberExtension',
        selectedAgent.primaryPhoneNumberExtension
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

  if (agency && agency.agencyCode && agency.agencyCode !== 'new')
    return <Redirect replace to={`/agency/${agency.agencyCode}/0/contracts`} />;

  return (
    <div className="route-content-wrapper">
      <Form
        keepDirtyOnReinitialize
        initialValues={initialValues}
        onSubmit={createNewAgency}
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
                  <form id="createAgency" onSubmit={handleSubmit}>
                    <h3>Details</h3>
                    <section
                      className="agency-details"
                      data-test="agency-details"
                    >
                      <AgencyDetails />
                    </section>
                    <h3>Address</h3>
                    <section
                      data-test="agency-address-section"
                      className="agency-address"
                    >
                      <AddressGroup
                        mailingAddressPrefix="mailingAddress"
                        physicalAddressPrefix="physicalAddress"
                        showTerritoryManager
                        listAnswersAsKey={listAnswersAsKey}
                      />
                    </section>
                    <h3>Officer</h3>
                    <section
                      className="agency-principal"
                      data-test="agency-principal"
                    >
                      <Contact fieldPrefix="principal" />
                    </section>
                    <h3>Contact</h3>
                    <section
                      className="agency-contact"
                      data-test="agency-contact"
                    >
                      <Contact fieldPrefix="contact" showTitle />
                    </section>
                    <h3>
                      Agent Of Record
                      <button
                        onClick={() => handleToggleExistingAgentModal(form)}
                        type="button"
                        className="btn btn-link btn-sm"
                      >
                        <i className="fa fa-user" />
                        Use Existing Agent
                      </button>
                    </h3>
                    <section className="agency-aor" data-test="agent-of-record">
                      <div className="agent-of-record">
                        <Agent fieldPrefix="agentOfRecord" />
                        <section
                          data-test="aor-address-section"
                          className="agency-address"
                        >
                          <AddressGroup
                            mailingAddressPrefix="agentOfRecord.mailingAddress"
                            physicalAddressPrefix="agentOfRecord.physicalAddress"
                            listOfZipCodes={listOfZipCodes}
                            listAnswersAsKey={listAnswersAsKey}
                          />
                        </section>
                      </div>
                      <div className="agency-license">
                        <FieldArray
                          stateAnswers={listAnswersAsKey.US_states}
                          name="agentOfRecord.licenses"
                          component={License}
                          licenseValue={licenseValue}
                          isAgency
                        />
                      </div>
                    </section>
                  </form>
                </div>
              </div>
            </div>
            <div className="basic-footer btn-footer">
              <AppFooter />
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
                  form="createAgency"
                  data-test="submitButton"
                  type="submit"
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
          header="Exisiting Agent"
        />
      )}
    </div>
  );
};

export default Create;
