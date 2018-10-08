import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, formValueSelector, FormSection } from 'redux-form';
import { validation, Button, Select, Input } from '@exzeo/core-ui';

import { getAgency, updateAgency } from '../../../state/actions/agencyActions';
import { getEditModalInitialValues } from '../../../state/selectors/agency.selector';

import Address from '../components/Address';
import Contact from './Contact';
import Details from './Details';
import Principal from './Principal';

const taxClassificationAnswers = [
  { answer: 'LLC', label: 'LLC' },
  { answer: 'Corporation', label: 'Corporation' }
];

export class AgencyModal extends Component {
  saveAgency = async (data, dispatch, props) => {
    await props.updateAgency(data);
  };

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
      initialValues,
      sameAsMailingValue,
      submitting,
      pristine,
      change
    } = this.props;

    return (
      <form onSubmit={handleSubmit(this.saveAgency)}>
        <h4>Details</h4>
        <section className="agency-details">
          <Details agencyCodeDisabled={!!initialValues.agencyCode} />
          {/* web address validaiton */}
        </section>
        <section className="agency-address">
          <div className="agency-mailing-address">
            <h4>Mailing Address</h4>
            <FormSection name="mailingAddress">
              <Address
                sameAsMailingValue={sameAsMailingValue}
                changeField={change}
                mailingAddress />
            </FormSection>

            <Field
              label="Tax ID"
              styleName="taxId"
              name="taxIdNumber"
              dataTest="taxIdNumber"
              component={Input}
              validate={validation.isRequired} />
            <Field
              id="taxClassification"
              name="taxClassification"
              dataTest="taxClassification"
              styleName="taxClassification"
              label="Tax Classification"
              component={Select}
              validate={validation.isRequired}
              answers={taxClassificationAnswers} />
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
                sectionDisabled={sameAsMailingValue}
                showCounty />
            </FormSection>
          </div>
        </section>
        <section className="agency-contact">
          <h4>Contact</h4>
          <Contact />
        </section>
        <section className="agency-principal">
          <h4>Principal</h4>
          <Principal />
        </section>
        <div className="basic-footer btn-footer">
          <Button baseClass="secondary" onClick={this.resetForm}>Cancel</Button>
          <Button baseClass="primary" type="submit" disabled={submitting || pristine}>Save</Button>
        </div>
      </form>
    );
  }
}

const selector = formValueSelector('AgencyModal');
const mapStateToProps = state => ({
  initialValues: getEditModalInitialValues(state),
  sameAsMailingValue: selector(state, 'sameAsMailing')
});

export default connect(mapStateToProps, {
  getAgency, updateAgency
})(reduxForm({
  form: 'AgencyModal',
  enableReinitialize: true
})(AgencyModal));
