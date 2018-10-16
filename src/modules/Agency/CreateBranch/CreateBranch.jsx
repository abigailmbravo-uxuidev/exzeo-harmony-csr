import React, { Component } from 'react';
import { Field, FormSection } from 'redux-form';
import { validation, Button, SelectTypeAhead } from '@exzeo/core-ui';
import { Redirect } from 'react-router-dom';

import Address from '../components/Address';
import territoryManagers from '../components/territoryManagers';
import Contact from '../components/FormGroup/Contact';
import history from '../../../history';

import BranchDetails from './BranchDetails';

export class CreateBranch extends Component {
  state = {
    showAddExistingAgentModal: false,
    branchCode: null
  }
  createBranch = async (data, dispatch, props) => {
    data.mailingAddress.country = {
      code: 'USA',
      displayText: 'United States of America'
    };
    data.territoryManagerId = data.territoryManager._id;
    data.agentOfRecord = this.props.agency.agentOfRecord;
    const branch = await props.createBranch(data, this.props.agency.agencyCode);
    this.setState({ branchCode: branch.branchCode });
  };

  handleToggleExistingAgentModal = () => {
    this.setState({ showAddExistingAgentModal: !this.state.showAddExistingAgentModal });
  }

  handleSameAsMailing = (value, previousValue, allValues) => {
    const { change } = this.props;
    const { mailingAddress } = allValues;
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
    history.push(`/agency/${this.props.agency.agencyCode}/overview`);
  };

  applyOrphanedAgent = (data) => {
    const { change } = this.props;
    const { selectedAgent } = data;
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
      submitting,
      pristine,
      change,
      agency,
      orphans,
      branchCode
    } = this.props;

    return (
      <div className="route-content-wrapper">
        <div className="route-content">
          <div className="scroll">
            <div className="form-group survey-wrapper" role="group">
              <form onSubmit={handleSubmit(this.createBranch)}>
                {this.state.branchCode && <Redirect replace to={`/agency/${agency.agencyCode}/branch/${this.state.branchCode}`} />}
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
                        sameAsMailingValue={sameAsMailingValue}
                        changeField={change}
                        mailingAddress />
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
                      <Address showCounty sectionDisabled={sameAsMailingValue} />
                    </FormSection>
                    <Field
                      label="Terretory Managers"
                      name="territoryManager"
                      dataTest="territoryManager"
                      component={SelectTypeAhead}
                      valueKey="_id"
                      labelKey="name"
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
                <div className="basic-footer btn-footer">
                  <Button dataTest="resetButton" baseClass="secondary" onClick={this.handleResetForm}>Cancel</Button>
                  <Button dataTest="submitButton" baseClass="primary" type="submit" disabled={submitting || pristine}>Save</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* {this.state.showAddExistingAgentModal &&
        <ExistingAgentModal
          listOfAgents={orphans}
          onToggleModal={this.handleToggleExistingAgentModal}
          handleSelection={this.applyOrphanedAgent} />
      } */}
      </div>
    );
  }
}

export default CreateBranch;
