import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, formValueSelector, FormSection } from 'redux-form';
import { Input, validation, SelectTypeAhead } from '@exzeo/core-ui';
import { updateAgency } from '../../state/actions/agencyActions';
import { getEditModalInitialValues } from '../../state/selectors/agency.selector';
import Address from './components/Address';
import territoryManagers from './components/territoryManagers';

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

export class AgencyAddressModal extends Component {
  saveAgency = async (data, dispatch, props) => {
    const { agency, branchCode } = this.props;
    if (branchCode > 0) {
      const selectedBranch = agency.branches.filter(b => String(b.branchCode === String(branchCode)));
      selectedBranch.physicalAddress = data.physicalAddress;
      selectedBranch.mailingAddress = data.mailingAddress;
      selectedBranch.territoryManagerId = data.territoryManagerId;
      props.updateAgency(agency);
    } else {
      agency.branches = agency.branches.filter(b => String(b.branchCode) !== '0');
      agency.physicalAddress = data.physicalAddress;
      agency.mailingAddress = data.mailingAddress;
      agency.territoryManagerId = data.territoryManagerId;
      await props.updateAgency(agency);
    }
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
      submitting,
      change
    } = this.props;

    return (
      <div className="modal agency-crud">
        <form onSubmit={handleSubmit(this.saveAgency)}>
          <div className="card">
            <div className="card-header">
              <h4>
                <i className="fa fa-address-book" /> Edit Agency
              </h4>
            </div>
            <div className="card-block">
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
                      normalize={this.handleSameAsMailing}
                      name="sameAsMailing"
                      dataTest="sameAsMailing"
                      id="sameAsMailing"
                      component="input"
                      type="checkbox" />
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

const selector = formValueSelector('AgencyAddressModal');
const mapStateToProps = state => ({
  sameAsMailingValue: selector(state, 'sameAsMailing')
});

export default connect(mapStateToProps, {
  updateAgency
})(reduxForm({
  form: 'AgencyAddressModal',
  enableReinitialize: true
})(AgencyAddressModal));
