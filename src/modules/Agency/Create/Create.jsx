import React, { Component } from 'react';
import { Button, Form, arrayMutators, FieldArray } from '@exzeo/core-ui';
import { Redirect } from 'react-router-dom';

import ExistingAgentModal from './ExistingAgentModal';
import License from '../components/License';
import Agent from './Agent';
import Contact from './Contact';
import AgencyDetails from './AgencyDetails';
import Footer from '../../../components/Common/Footer';
import AddressGroup from './AddressGroup';

export class Create extends Component {
  state = {
    formInstance: null,
    showAddExistingAgentModal: false
  };
  createAgency = async (data, dispatch, props) => {
    data.agentOfRecord.status = 'Active';
    data.mailingAddress.country = {
      code: 'USA',
      displayText: 'United States of America'
    };
    data.physicalAddress.country = data.mailingAddress.country;
    data.agentOfRecord.mailingAddress = data.mailingAddress;
    await this.props.createAgency(data);
  };

  handleToggleExistingAgentModal = form => {
    this.setState({
      showAddExistingAgentModal: !this.state.showAddExistingAgentModal,
      formInstance: form
    });
  };

  handleResetForm = form => {
    form.reset();
    window.close();
  };

  // TODO : Move to utilities
  applyOrphanedAgent = data => {
    const { orphans } = this.props;
    const { getState, change } = this.state.formInstance;

    const { selectedAgentCode } = data;
    const selectedAgent = orphans.filter(
      a => String(a.agentCode) === String(selectedAgentCode)
    )[0];

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

    this.handleToggleExistingAgentModal();
  };

  render() {
    const {
      listAnswersAsKey,
      licenseValue,
      submitting,
      pristine,
      territoryManagers,
      agency,
      orphans,
      initialValues,
      history,
      listOfZipCodes,
      zipCodeSettings
    } = this.props;

    return (
      <div className="route-content-wrapper">
        <Form
          id="DiaryModal"
          keepDirtyOnReinitialize
          initialValues={initialValues}
          onSubmit={this.createAgency}
          mutators={{
            ...arrayMutators
          }}
          subscription={{ submitting: true, values: true, dirty: true }}
        >
          {({ form, handleSubmit, submitting, values: formValues, dirty }) => (
            <React.Fragment>
              <div className="route-content">
                <div className="scroll">
                  <div className="form-group survey-wrapper" role="group">
                    <form id="createAgency" onSubmit={handleSubmit}>
                      {agency &&
                        agency.agencyCode &&
                        agency.agencyCode !== 'new' && (
                          <Redirect
                            replace
                            to={`/agency/${agency.agencyCode}/0/contracts`}
                          />
                        )}
                      <h3>Details</h3>
                      <section
                        className="agency-details"
                        data-test="agency-details"
                      >
                        <AgencyDetails />
                      </section>
                      <h3>Address</h3>
                      <AddressGroup
                        dataTest="agency"
                        mailingAddressPrefix="mailingAddress"
                        physicalAddressPrefix="physicalAddress"
                        territoryManagers={territoryManagers}
                        formValues={formValues}
                        listAnswersAsKey={listAnswersAsKey}
                      />
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
                          onClick={() =>
                            this.handleToggleExistingAgentModal(form)
                          }
                          type="button"
                          className="btn btn-link btn-sm"
                        >
                          <i className="fa fa-user" />
                          Use Existing Agent
                        </button>
                      </h3>
                      <section
                        className="agency-aor"
                        data-test="agent-of-record"
                      >
                        <div className="agent-of-record">
                          <Agent fieldPrefix="agentOfRecord" />

                          <AddressGroup
                            dataTest="aor"
                            mailingAddressPrefix="agentOfRecord.mailingAddress"
                            physicalAddressPrefix="agentOfRecord.physicalAddress"
                            listOfZipCodes={listOfZipCodes}
                            formValues={formValues}
                            listAnswersAsKey={listAnswersAsKey}
                          />
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
                <Footer />
                <div className="btn-wrapper">
                  <Button
                    className={Button.constants.classNames.secondary}
                    data-test="resetButton"
                    onClick={() => this.handleResetForm(form)}
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
        {this.state.showAddExistingAgentModal && (
          <ExistingAgentModal
            listOfAgents={orphans}
            onToggleModal={this.handleToggleExistingAgentModal}
            handleSelection={this.applyOrphanedAgent}
            header="Exisiting Agent"
          />
        )}
      </div>
    );
  }
}

export default Create;
