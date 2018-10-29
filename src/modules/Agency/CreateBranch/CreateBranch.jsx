import React, { Component } from 'react';
import { Field, FieldArray, FormSection } from 'redux-form';
import { validation, Button, SelectTypeAhead } from '@exzeo/core-ui';

import ExistingAgentModal from '../components/ExistingAgentModal';
import Agent from '../components/FormGroup/Agent';
import Contact from '../components/FormGroup/Contact';
import Address from '../components/Address';
import License from '../components/License';
import territoryManagers from '../components/territoryManagers';
import history from '../../../history';
import Footer from '../../../components/Common/Footer';

import BranchDetails from './BranchDetails';

export class CreateBranch extends Component {
  state = {
    showAddExistingAgentModal: false
  }
  handleCreateBranch = async (data, dispatch, props) => {
    data.mailingAddress.country = {
      code: 'USA',
      displayText: 'United States of America'
    };
    data.agentOfRecord = this.props.agency.agentOfRecord;
    const branch = await this.props.createBranch(data, this.props.agency.agencyCode);
    history.push(`/agency/${this.props.agency.agencyCode}/${branch.branchCode}/overview`);
  };

  handleToggleExistingAgentModal = () => {
    this.setState({ showAddExistingAgentModal: !this.state.showAddExistingAgentModal });
  }

  handleSameAsMailing = (value, previousValue, allValues) => {
    const { change } = this.props;
    const { mailingAddress } = allValues;
    if (!mailingAddress) return value;
    if (value) {
      change('physicalAddress.address1', mailingAddress.address1);
      change('physicalAddress.address2', mailingAddress.address2);
      change('physicalAddress.city', mailingAddress.city);
      change('physicalAddress.state', mailingAddress.state);
      change('physicalAddress.zip', mailingAddress.zip);
    } else {
      change('physicalAddress.address1', '');
      change('physicalAddress.address2', '');
      change('physicalAddress.city', '');
      change('physicalAddress.state', '');
      change('physicalAddress.zip', '');
    }
    return value;
  };

  handleResetForm = () => {
    this.props.reset();
    history.push(`/agency/${this.props.agency.agencyCode}/${this.props.branchCode}/overview`);
  };

  // TODO : Move to utilities
  applyOrphanedAgent = (data) => {
    const { change, orphans } = this.props;
    const { selectedAgentCode } = data;
    const selectedAgent = orphans.filter(a => String(a.agentCode) === String(selectedAgentCode))[0];
    change('agentOfRecord.firstName', selectedAgent.firstName);
    change('agentOfRecord.lastName', selectedAgent.lastName);
    change('agentOfRecord.primaryPhoneNumber', selectedAgent.primaryPhoneNumber);
    change('agentOfRecord.secondaryPhoneNumber', selectedAgent.secondaryPhoneNumber);
    change('agentOfRecord.faxNumber', selectedAgent.faxNumber);
    change('agentOfRecord.emailAddress', selectedAgent.emailAddress);
    change('agentOfRecord.agentCode', selectedAgent.agentCode);

    this.handleToggleExistingAgentModal();
  }

  render() {
    const {
      handleSubmit,
      licenseValue,
      sameAsMailingValue,
      physicalStateValue,
      physicalZipValue,
      submitting,
      pristine,
      change,
      orphans
    } = this.props;

    return (
      <div className="route-content-wrapper new-branch">
        <div className="route-content">
          <div className="scroll">
            <div className="form-group survey-wrapper" role="group">
              <form id="createBranch" onSubmit={handleSubmit(this.handleCreateBranch)}>
                <h3>Details</h3>
                <section className="agency-details">
                  <BranchDetails />
                  {/* web address validaiton */}
                </section>
                <h3>Address</h3>
                <section className="agency-address">
                  <div className="agency-mailing-address">
                    <h4>Mailing Address</h4>
                    <FormSection name="mailingAddress">
                      <Address
                        territoryManagers={territoryManagers}
                        sameAsMailingValue={sameAsMailingValue}
                        changeField={change}
                        section="mailingAddress" />
                    </FormSection>
                  </div>
                  <div className="agency-physical-address">
                    <h4>Physical Address
                      <Field
                        name="sameAsMailing"
                        component="input"
                        id="sameAsMailing"
                        type="checkbox"
                        data-test="sameAsMailing"
                        normalize={this.handleSameAsMailing} />
                      <label htmlFor="sameAsMailing">Same as Mailing Address</label>
                    </h4>
                    <FormSection name="physicalAddress">
                      <Address
                        section="physicalAddress"
                        showCounty
                        territoryManagers={territoryManagers}
                        changeField={change}
                        stateValue={physicalStateValue}
                        zipValue={physicalZipValue}
                        sectionDisabled={sameAsMailingValue} />
                    </FormSection>
                    <Field
                      label="Territory Managers"
                      name="territoryManagerId"
                      styleName="territoryManagerId"
                      dataTest="territoryManager"
                      component={SelectTypeAhead}
                      optionValue="_id"
                      optionLabel="name"
                      answers={territoryManagers}
                      validate={validation.isRequired} />
                  </div>
                </section>
                <h3>Contact</h3>
                <section className="agency-contact">
                  <FormSection name="contact" >
                    <Contact testPrefix="contact" />
                  </FormSection>
                </section>
                <h3>Agent Of Record <button onClick={this.handleToggleExistingAgentModal} className="btn btn-link btn-sm"><i className="fa fa-user" />Use Existing Agent</button></h3>
                <section className="agency-aor">
                  <div className="agent-of-record">
                    <FormSection name="agentOfRecord">
                      <Agent />
                    </FormSection>
                  </div>
                  <div className="agency-license">
                    <FieldArray
                      name="licenses"
                      component={License}
                      licenseValue={licenseValue}
                      isAgency />
                  </div>
                </section>
              </form>
            </div>
          </div>
        </div>
        <div className="basic-footer btn-footer">
          <Footer />
          <div className="btn-wrapper">
            <Button dataTest="resetButton" baseClass="secondary" onClick={this.handleResetForm}>Cancel</Button>
            <Button form="createBranch" dataTest="submitButton" baseClass="primary" type="submit" disabled={submitting || pristine}>Save</Button>
          </div>
        </div>
        {this.state.showAddExistingAgentModal &&
        <ExistingAgentModal
          listOfAgents={orphans}
          onToggleModal={this.handleToggleExistingAgentModal}
          handleSelection={this.applyOrphanedAgent} />
      }
      </div>
    );
  }
}

export default CreateBranch;
