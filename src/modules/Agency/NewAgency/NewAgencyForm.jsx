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

import Contact from './Contact';
import Details from './Details';
import Principal from './Principal';
import AgentOfRecord from './AgentOfRecord';

export class NewAgencyForm extends Component {
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
      <form onSubmit={handleSubmit(this.createAgency)}>
        {agency && agency.agencyCode && <Redirect replace to={`/agency/${agency.agencyCode}/overview`} />}
        <h4>Details</h4>
        <section className="agency-details">
          <Details />
          {/* web address validaiton */}
        </section>
        <section className="agency-address">
          <div className="agency-mailing-address">
            <h4>Mailing Address</h4>
            <FormSection name="mailingAddress">
              <Address
                sameAsMailingValue={sameAsMailingValue}
                changeField={change}
                showCounty
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
              <Address sectionDisabled={sameAsMailingValue} />
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
        <section className="agency-principal">
          <h4>Officer</h4>
          <Principal />
        </section>
        <section className="agency-contact">
          <h4>Contact</h4>
          <Contact />
        </section>
        <section className="agency-aor">
          <h4>Agent Of Record <a onClick={this.handleToggleExistingAgentModal} className="btn btn-link btn-xs btn-alt-light no-padding"><i className="fa fa-user" />Use Existing Agent</a></h4>
          <AgentOfRecord />
        </section>
        <section className="agency=license">
          <FieldArray
            name="licenses"
            component={License}
            licenseValue={licenseValue} />
        </section>
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
      </form>
    );
  }
}
const selector = formValueSelector('NewAgencyForm');
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
  form: 'NewAgencyForm',
  enableReinitialize: true
})(NewAgencyForm));
