import React, { Component } from 'react';
import { connect } from 'react-redux';
import {reduxForm, Field, formValueSelector } from 'redux-form';
import { Select, Radio, Input } from '@exzeo/core-ui/lib/Input';
import { validation } from '@exzeo/core-ui/lib/InputLifecycle';
import { getAgency } from '../../state/actions/agencyActions';
import { getEditModalInitialValues } from '../../state/selectors/agency.selector';
import CSRFields from './Overview/CSRFields';
import ContactFields from './Overview/ContactFields';
import PrincipalFields from './Overview/PrincipalFields';

const statusAnswers = [
  { answer: 'Active', label: 'Active' },
  { answer: 'InActive', label: 'InActive' }
];

const okToPayAnswers = [
  { answer: false, label: 'No' },
  { answer: true, label: 'Yes' }
];

const taxClassificationAnswers = [
  { answer: 'LLC', label: 'LLC' },
  { answer: 'Corporation', label: 'Corporation'}
];

export class AgencyModal extends Component {
  saveAgency = (data, dispatch, props) => {
    this.toggleAgencyModal();
  };

  resetSameAsMailing = (value) => {
    const { change, sameAsMailingValue } = this.props;
    if (!sameAsMailingValue) return value;
    change('sameAsMailing', false);
    return value;
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

  render() {
    const {
      closeModal,
      handleSubmit,
      initialValues,
      isEdit,
      sameAsMailingValue,
      submitting
    } = this.props;

    return (
      <div className="modal agency-crud">
        <form onSubmit={handleSubmit(this.saveAgency)}>
          <div className="card">
            <div className="card-header">
              <h4>
                <i className="fa fa-address-book" /> {isEdit ? 'Edit ' : 'New '}
            Agency
              </h4>
            </div>
            <div className="card-block">
              <section className="agency-details">
                <div className="agency-id">
                  <Field
                    label="Agency ID"
                    styleName="agencyCode"
                    name="agencyCode"
                    component={Input}
                    validate={validation.isRequired}
                    disabled={!!initialValues.agencyCode}
                  />
                  <Field
                    label="Agency Name"
                    styleName="agencyName"
                    name="displayName"
                    component={Input}
                    validate={validation.isRequired}
                  />
                  <Field
                    label="Entity Name"
                    styleName="entityName"
                    name="legalName"
                    component={Input}
                    validate={validation.isRequired}
                  />
                </div>
                <div className="agency-description">
                  <Field
                    id="status"
                    name="status"
                    styleName="status"
                    label="Status"
                    component={Select}
                    validate={validation.isRequired}
                    answers={statusAnswers}
                  />
                  <Field
                    label="TPAID"
                    styleName="tPaid"
                    name="tPaid"
                    component={Input}
                    validate={[validation.isRequired, validation.isNumbersOnly]}
                  />
                  <Field
                    name="okToPay"
                    styleName="okToPay"
                    label="Ok to Pay"
                    validate={validation.isRequired}
                    component={Radio}
                    segmented
                    answers={okToPayAnswers}
                  />
                  <Field
                    label="Tier"
                    styleName="tier"
                    name="tier"
                    component={Input}
                    validate={[validation.isRequired, validation.isNumbersOnly]}
                  />
                  <Field
                    label="Web Address"
                    styleName="webAddress"
                    name="websiteUrl"
                    component={Input}
                  />
                  {/* web address validaiton */}
                </div>
              </section>
              <section className="agency-address">
                <div className="agency-mailing-address">
                  <h4>Mailing Address</h4>
                  <Field
                    label="Address 1"
                    styleName="mailingAddress1"
                    name="mailingAddress.address1"
                    component={Input}
                    validate={validation.isRequired}
                    normalize={this.resetSameAsMailing}
                  />
                  <Field
                    label="Address 2"
                    styleName="mailingAddress2"
                    name="mailingAddress.address2"
                    component={Input}
                    normalize={this.resetSameAsMailing}
                  />
                  <div className="flex-form">
                    <Field
                      label="City"
                      styleName="mailingCity"
                      name="mailingAddress.city"
                      component={Input}
                      validate={validation.isRequired}
                      normalize={this.resetSameAsMailing}
                    />
                    <Field
                      label="State"
                      styleName="mailingState"
                      name="mailingAddress.state"
                      component={Input}
                      validate={validation.isRequired}
                      normalize={this.resetSameAsMailing}
                    />
                    <Field
                      label="Zip Code"
                      styleName="mailingZip"
                      name="mailingAddress.zip"
                      component={Input}
                      validate={[validation.isRequired, validation.isZipCode]}
                      normalize={this.resetSameAsMailing}
                    />
                  </div>
                  <div className="tax-detail">
                    <Field
                      label="Tax ID"
                      styleName="taxId"
                      name="taxIdNumber"
                      component={Input}
                      validate={validation.isRequired}
                    />
                    <Field
                      id="taxClassification"
                      name="taxClassification"
                      styleName="taxClassification"
                      label="Tax Classification"
                      component={Select}
                      validate={validation.isRequired}
                      answers={taxClassificationAnswers}
                    />
                  </div>
                </div>
                <div className="agency-physical-address">
                  <div className="flex-form">
                    <h4>
                  Physical Address
                      <Field
                        normalize={this.handleSameAsMailing}
                        name="sameAsMailing"
                        id="sameAsMailing"
                        component="input"
                        type="checkbox"
                      />
                      <label htmlFor="sameAsMailing">Same as Mailing Address</label>
                    </h4>
                  </div>
                  <Field
                    label="Address 1"
                    styleName="physicalAddress1"
                    name="physicalAddress.address1"
                    component={Input}
                    validate={validation.isRequired}
                    disabled={sameAsMailingValue}
                  />
                  <Field
                    label="Address 2"
                    styleName="physicalAddress2"
                    name="physicalAddress.address2"
                    component={Input}
                    validate={validation.isRequired}
                    disabled={sameAsMailingValue}
                  />
                  <div className="flex-form">
                    <Field
                      label="City"
                      styleName="physicalCity"
                      name="physicalAddress.city"
                      component={Input}
                      validate={validation.isRequired}
                      disabled={sameAsMailingValue}
                    />
                    <Field
                      label="State"
                      styleName="physicalState"
                      name="physicalAddress.state"
                      component={Input}
                      validate={validation.isRequired}
                      disabled={sameAsMailingValue}
                    />
                    <Field
                      label="Zip Code"
                      styleName="physicalZip"
                      name="physicalAddress.zip"
                      component={Input}
                      validate={validation.isRequired}
                      disabled={sameAsMailingValue}
                    />
                  </div>
                  <Field
                    label="County"
                    styleName="county"
                    name="physicalAddress.county"
                    component={Input}
                    validate={validation.isRequired}
                  />
                </div>
              </section>
              <section className="agency-csr">
                <h4>CSR Contact Information</h4>
                <CSRFields />
              </section>
              <section className="agency-contact">
                <h4>Agency Contact Information</h4>
                <ContactFields />
              </section>
              <section className="agency-principal">
                <h4>Agency Principal Information</h4>
                <PrincipalFields />
              </section>
            </div>
            <div className="card-footer">
              <div className="btn-footer">
                <button
                  tabIndex="0"
                  className="btn btn-secondary"
                  type="button"
                  onClick={closeModal}
                >
              Cancel
                </button>
                <button
                  tabIndex="0"
                  className="btn btn-primary"
                  type="submit"
                  disabled={submitting}
                >
              Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const selector = formValueSelector('AgencyModal');
const mapStateToProps = state => {
  return {
    initialValues: getEditModalInitialValues(state),
    sameAsMailingValue: selector(state, 'sameAsMailing')
  }
};

export default connect(mapStateToProps, {
  getAgency
})(reduxForm({
  form: 'AgencyModal',
  enableReinitialize: true
})(AgencyModal));
