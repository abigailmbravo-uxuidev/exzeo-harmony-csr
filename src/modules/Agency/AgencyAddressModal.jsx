import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { Input, validation } from '@exzeo/core-ui';
import { updateAgency } from '../../state/actions/agencyActions';
import { getEditModalInitialValues } from '../../state/selectors/agency.selector';

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
  { answer: 'Corporation', label: 'Corporation' }
];

export class AgencyModal extends Component {
  saveAgency = async (data, dispatch, props) => {
    await props.updateAgency(data);
    props.closeModal();
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
      <div className="modal agency-crud" style={{ overflow: 'scroll', display: 'block' }}>
        <form onSubmit={handleSubmit(this.saveAgency)}>
          <div className="card">
            <div className="card-header">
              <h4>
                <i className="fa fa-address-book" /> {isEdit ? 'Edit ' : 'New '}
                Agency
              </h4>
            </div>
            <div className="card-block">
              <section className="agency-address">
                <div className="agency-mailing-address">
                  <h4>Mailing Address</h4>
                  <Field
                    label="Address 1"
                    styleName="mailingAddress1"
                    name="mailingAddress.address1"
                    dataTest="mailingAddress.address1"
                    component={Input}
                    validate={validation.isRequired}
                    normalize={this.resetSameAsMailing} />
                  <Field
                    label="Address 2"
                    styleName="mailingAddress2"
                    name="mailingAddress.address2"
                    dataTest="mailingAddress.address2"
                    component={Input}
                    normalize={this.resetSameAsMailing} />
                  <div className="flex-form">
                    <Field
                      label="City"
                      styleName="mailingCity"
                      name="mailingAddress.city"
                      dataTest="mailingAddress.city"
                      component={Input}
                      validate={validation.isRequired}
                      normalize={this.resetSameAsMailing} />
                    <Field
                      label="State"
                      styleName="mailingState"
                      name="mailingAddress.state"
                      dataTest="mailingAddress.state"
                      component={Input}
                      validate={validation.isRequired}
                      normalize={this.resetSameAsMailing} />
                    <Field
                      label="Zip Code"
                      styleName="mailingZip"
                      name="mailingAddress.zip"
                      dataTest="mailingAddress.zip"
                      component={Input}
                      validate={[validation.isRequired, validation.isZipCode]}
                      normalize={this.resetSameAsMailing} />
                  </div>
                </div>
                <div className="agency-physical-address">
                  <div className="flex-form">
                    <h4>
                  Physical Address
                      <Field
                        normalize={this.handleSameAsMailing}
                        name="sameAsMailing"
                        dataTest="sameAsMailing"
                        id="sameAsMailing"
                        component="input"
                        type="checkbox" />
                      <label htmlFor="sameAsMailing">Same as Mailing Address</label>
                    </h4>
                  </div>
                  <Field
                    label="Address 1"
                    styleName="physicalAddress1"
                    name="physicalAddress.address1"
                    dataTest="physicalAddress.address1"
                    component={Input}
                    validate={validation.isRequired}
                    disabled={sameAsMailingValue} />
                  <Field
                    label="Address 2"
                    styleName="physicalAddress2"
                    name="physicalAddress.address2"
                    dataTest="physicalAddress.address2"
                    component={Input}
                    disabled={sameAsMailingValue} />
                  <div className="flex-form">
                    <Field
                      label="City"
                      styleName="physicalCity"
                      name="physicalAddress.city"
                      dataTest="physicalAddress.city"
                      component={Input}
                      validate={validation.isRequired}
                      disabled={sameAsMailingValue} />
                    <Field
                      label="State"
                      styleName="physicalState"
                      name="physicalAddress.state"
                      dataTest="physicalAddress.state"
                      component={Input}
                      validate={validation.isRequired}
                      disabled={sameAsMailingValue} />
                    <Field
                      label="Zip Code"
                      styleName="physicalZip"
                      name="physicalAddress.zip"
                      dataTest="physicalAddress.zip"
                      component={Input}
                      validate={validation.isRequired}
                      disabled={sameAsMailingValue} />
                  </div>
                  <Field
                    label="County"
                    styleName="county"
                    name="physicalAddress.county"
                    dataTest="physicalAddress.county"
                    component={Input}
                    validate={validation.isRequired} />
                </div>
              </section>
              {/* <section className="agency-csr">
                <h4>CSR Contact Information</h4>
                <CSRFields />
              </section>
              <section className="agency-contact">
                <h4>Contact</h4>
                <ContactFields />
              </section>
              <section className="agency-principal">
                <h4>Principal</h4>
                <PrincipalFields />
              </section>
              */}
            </div>
            <div className="card-footer">
              <div className="btn-footer">
                <button
                  tabIndex="0"
                  className="btn btn-secondary"
                  type="button"
                  onClick={closeModal}>
                Cancel
                </button>
                <button
                  tabIndex="0"
                  className="btn btn-primary"
                  type="submit"
                  disabled={submitting}>
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
const mapStateToProps = state => ({
  initialValues: getEditModalInitialValues(state),
  sameAsMailingValue: selector(state, 'sameAsMailing')
});

export default connect(mapStateToProps, {
  updateAgency
})(reduxForm({
  form: 'AgencyModal',
  enableReinitialize: true
})(AgencyModal));
