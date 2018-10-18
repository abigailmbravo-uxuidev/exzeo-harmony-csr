import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, FieldArray, formValueSelector, FormSection } from 'redux-form';
import { validation, Button, SelectTypeAhead, Input } from '@exzeo/core-ui';
import { Redirect } from 'react-router-dom';

import { getAgency, updateAgency, createAgency, getListOfOrphanedAgents } from '../../../state/actions/agencyActions';
import { getEditModalInitialValues, getOrphanedAgentsList } from '../../../state/selectors/agency.selector';
import ExistingAgentModal from '../components/ExistingAgentModal';
import Address from '../components/Address';
import territoryManagers from '../components/territoryManagers';
import License from '../components/License';
import Agent from '../components/FormGroup/Agent';
import Contact from '../components/FormGroup/Contact';

import Details from './Details';

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
    data.physicalAddress.county = data.mailingAddress.county;
    await props.createAgency(data);
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
      orphans
    } = this.props;

    return (
      <div className="route-content-wrapper">
        <div className="route-content">
          <div className="scroll">
            <div className="form-group survey-wrapper" role="group">
              <form onSubmit={handleSubmit(this.createAgency)}>
                {agency && agency.agencyCode && <Redirect replace to={`/agency/${agency.agencyCode}/overview`} />}
                <h3>Details</h3>
                <section className="agency-details">
                  <Details />
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
                      name="territoryManagerId"
                      dataTest="territoryManagerId"
                      component={SelectTypeAhead}
                      valueKey="_id"
                      labelKey="name"
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
          <Button dataTest="submitButton" baseClass="primary" type="submit" disabled={submitting || pristine}>Save</Button>
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
