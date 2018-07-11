
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, formValueSelector, FormSection } from 'redux-form';
import { Select, Radio, Input, Integer } from '@exzeo/core-ui/lib/Input';
import { validation } from '@exzeo/core-ui/lib/InputLifecycle';
import { getAgency, updateAgency } from '../../../state/actions/agencyActions';
import { getEditModalInitialValues } from '../../../state/selectors/agency.selector';
import Address from './Address';
import ContactFields from './ContactFields';
import PrincipalFields from './PrincipalFields';

const statusAnswers = [
  { answer: 'Active', label: 'Active' },
  { answer: 'InActive', label: 'InActive' }
];

const okToPayAnswers = [
  { answer: false, label: 'No' },
  { answer: true, label: 'Yes' }
];

export class AgencyModal extends Component {
  saveAgency = async (data, dispatch, props) => {
    await props.updateAgency(data);
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
      sameAsMailingValue,
      submitting,
      pristine
    } = this.props;

    return (
      <form onSubmit={handleSubmit(this.saveAgency)}>
        <h4>Details</h4>
        <section className="agency-details">
          <div className="agency-id">
            <Field
              label="Agency ID"
              styleName="agencyCode"
              name="agencyCode"
              dataTest="agencyCode"
              component={Input}
              validate={validation.isRequired}
              disabled={!!initialValues.agencyCode}
            />
            <Field
              label="Agency Name"
              styleName="agencyName"
              name="displayName"
              dataTest="displayName"
              component={Input}
              validate={validation.isRequired}
            />
            <Field
              label="Entity Name"
              styleName="entityName"
              name="legalName"
              dataTest="legalName"
              component={Input}
              validate={validation.isRequired}
            />
          </div>
          <div className="agency-description">
            <Field
              id="status"
              name="status"
              dataTest="status"
              styleName="status"
              label="Status"
              component={Select}
              validate={validation.isRequired}
              answers={statusAnswers}
            />
            <Field
              label="TPAID"
              styleName="tpaid"
              name="tpaid"
              dataTest="tpaid"
              component={Integer}
              validate={[validation.isRequired, validation.isNumbersOnly]}
            />
            <Field
              name="okToPay"
              dataTest="okToPay"
              styleName="okToPay-wrapper"
              label="Ok to Pay"
              component={Radio}
              segmented
              answers={okToPayAnswers}
            />
            <Field
              label="Tier"
              styleName="tier"
              name="tier"
              dataTest="tier"
              component={Input}
              validate={[validation.isRequired, validation.isNumbersOnly]}
            />
            <Field
              label="Web Address"
              styleName="webAddress"
              name="websiteUrl"
              dataTest="websiteUrl"
              component={Input}
            />
            {/* web address validaiton */}
          </div>
        </section>
        <section className="agency-address">
          <div className="agency-mailing-address">
            <h4>Mailing Address</h4>
            <FormSection name="mailingAddress" component={Address} isMailing />
          </div>
          <div className="agency-physical-address">
            <h4>
                  Physical Address
              <Field
                normalize={this.handleSameAsMailing}
                name="sameAsMailing"
                dataTest="sameAsMailing"
                id="sameAsMailing"
                component="input"
                type="checkbox"
              />
              <label htmlFor="sameAsMailing">Same as Mailing Address</label>
            </h4>
            <FormSection name="physicalAddress" component={Address} sameAsMailingValue={sameAsMailingValue} />
          </div>
        </section>
        <section className="agency-contact">
          <h4>Contact</h4>
          <div className="flex-form">
            <ContactFields />
          </div>
        </section>
        <section className="agency-principal">
          <h4>Principal</h4>
          <div className="flex-form">
            <PrincipalFields />
          </div>
        </section>
        <div className="basic-footer btn-footer">
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
            disabled={submitting || pristine}
          >
              Save
          </button>
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
