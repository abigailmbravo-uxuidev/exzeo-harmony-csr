import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, FieldArray, formValueSelector, FormSection } from 'redux-form';
import { validation, Button, SelectTypeAhead } from '@exzeo/core-ui';
import { Redirect } from 'react-router-dom';

import history from '../../../history';
import { getAgency, updateAgency, createAgency } from '../../../state/actions/agencyActions';
import { getOrphanedAgentsList } from '../../../state/selectors/agency.selector';
import ExistingAgentModal from '../components/ExistingAgentModal';
import Address from '../components/Address';
import territoryManagers from '../components/territoryManagers';
import License from '../components/License';
import Agent from '../components/FormGroup/Agent';
import Contact from '../components/FormGroup/Contact';
import AgencyDetails from '../components/FormGroup/AgencyDetails';

export class Create extends Component {
  state = {
    showAddExistingAgentModal: false
  }
  createAgency = async (data, dispatch, props) => {
    data.agentOfRecord.status = 'Active';
    data.mailingAddress.country = {
      code: 'USA',
      displayText: 'United States of America'
    };
    data.physicalAddress.country = data.mailingAddress.country;
    await this.props.createAgency(data);
  };

  handleToggleExistingAgentModal = () => {
    this.setState({ showAddExistingAgentModal: !this.state.showAddExistingAgentModal });
  }

  // TODO : Move to utilities
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
    history.push('/agency');
  };

  // TODO : Move to utilities
  applyOrphanedAgent = (data) => {
    const { change, orphans } = this.props;
    const { selectedAgentId } = data;
    const selectedAgent = orphans.filter(a => a._id === selectedAgentId)[0];
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
      orphans
    } = this.props;

    return (
      <div className="route-content-wrapper">
        <div className="route-content">
          <div className="scroll">
            <div className="form-group survey-wrapper" role="group">
              <form id="createAgency" onSubmit={handleSubmit(this.createAgency)}>
                {agency && agency.agencyCode && agency.agencyCode !== 'new' && <Redirect replace to={`/agency/${agency.agencyCode}/0/overview`} />}
                <h3>Details</h3>
                <section className="agency-details">
                  <AgencyDetails />
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
                      label="Territory Managers"
                      name="territoryManagerId"
                      dataTest="territoryManagerId"
                      component={SelectTypeAhead}
                      optionValue="_id"
                      optionLabel="name"
                      answers={territoryManagers}
                      validate={validation.isRequired} />
                  </div>
                </section>
                <h3>Officer</h3>
                <section className="agency-principal">
                  <FormSection name="principal" >
                    <Contact testPrefix="principal" />
                  </FormSection>
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
          <Button dataTest="resetButton" baseClass="secondary" onClick={this.handleResetForm}>Cancel</Button>
          <Button form="createAgency" dataTest="submitButton" baseClass="primary" type="submit" disabled={submitting || pristine}>Save</Button>
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
const selector = formValueSelector('Create');
const mapStateToProps = state => ({
  orphans: getOrphanedAgentsList(state),
  agency: state.agencyState.agency,
  initialValues: {
    mailingAddress: {},
    physicalAddress: {},
    licenses: [{
      state: '', license: '', licenseType: '', licenseEffectiveDate: ''
    }]
  },
  sameAsMailingValue: selector(state, 'sameAsMailing'),
  licenseValue: selector(state, 'licenses')
});

export default connect(mapStateToProps, {
  getAgency, updateAgency, createAgency
})(reduxForm({
  form: 'Create',
  enableReinitialize: true
})(Create));
