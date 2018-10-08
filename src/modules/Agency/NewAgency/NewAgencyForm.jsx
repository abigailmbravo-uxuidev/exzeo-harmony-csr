import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, FieldArray, formValueSelector, FormSection } from 'redux-form';
import { validation, Button, Select, Input } from '@exzeo/core-ui';
import { Redirect } from 'react-router-dom';

import { getAgency, updateAgency, createAgency } from '../../../state/actions/agencyActions';
import { getEditModalInitialValues } from '../../../state/selectors/agency.selector';
import ExistingAgentModal from '../components/ExistingAgentModal';
import Address from '../components/Address';

import Contact from './Contact';
import Details from './Details';
import Principal from './Principal';
import AgentOfRecord from './AgentOfRecord';
import License from '../components/License';

export class NewAgencyForm extends Component {
  state = {
    showAddExistingAgentModal: false
  }
  createAgency = async (data, dispatch, props) => {
    await props.createAgency(data);
  };

  toggleExistingAgentModal = () => {
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

  resetForm = () => {
    this.props.reset();
  };

  render() {
    const {
      handleSubmit,
      licenseValue,
      sameAsMailingValue,
      submitting,
      pristine,
      change,
      agency
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
              <Address
                showTerritoryManager
                sectionDisabled={sameAsMailingValue} />
            </FormSection>
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
          <h4>Agent Of Record <a onClick={this.toggleExistingAgentModal} className="btn btn-link btn-xs btn-alt-light no-padding"><i className="fa fa-user" />Use Existing Agent</a></h4>
          <AgentOfRecord />
        </section>
        <section className="agency=license">
          <FieldArray
            name="license"
            component={License}
            licenseValue={licenseValue} />
        </section>
        <div className="basic-footer btn-footer">
          <Button baseClass="secondary" onClick={this.resetForm}>Cancel</Button>
          <Button baseClass="primary" type="submit" disabled={submitting || pristine}>Save</Button>
        </div>
        {this.state.showAddExistingAgentModal &&
          <ExistingAgentModal
            listOfAgents={[]}
            toggleModal={this.toggleExistingAgentModal}
            handleSaveAgent={x => x} />
        }
      </form>
    );
  }
}
const selector = formValueSelector('NewAgencyForm');
const mapStateToProps = state => ({
  initialValues: getEditModalInitialValues(state),
  sameAsMailingValue: selector(state, 'sameAsMailing'),
  licenseValue: selector(state, 'license') || []
});

export default connect(mapStateToProps, {
  getAgency, updateAgency, createAgency
})(reduxForm({
  form: 'NewAgencyForm',
  enableReinitialize: true
})(NewAgencyForm));
