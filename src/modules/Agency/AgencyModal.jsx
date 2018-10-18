import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { Select, Radio, Input, Integer, validation } from '@exzeo/core-ui';
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
    data.branches = data.branches.filter(b => String(b.branchCode) !== '0');
    await props.updateAgency(data);
    props.closeModal();
  };

  render() {
    const {
      closeModal,
      handleSubmit,
      initialValues,
      submitting
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
              <section className="agency-details">
                <Field
                  label="Agency ID"
                  styleName="agencyCode"
                  name="agencyCode"
                  dataTest="agencyCode"
                  component={Input}
                  validate={validation.isRequired}
                  disabled={!!initialValues.agencyCode} />
                <Field
                  label="Agency Name"
                  styleName="agencyName"
                  name="displayName"
                  dataTest="displayName"
                  component={Input}
                  validate={validation.isRequired} />
                <Field
                  label="Entity Name"
                  styleName="entityName"
                  name="legalName"
                  dataTest="legalName"
                  component={Input}
                  validate={validation.isRequired} />
                <Field
                  id="status"
                  name="status"
                  dataTest="status"
                  styleName="status"
                  label="Status"
                  component={Select}
                  validate={validation.isRequired}
                  answers={statusAnswers} />
                <Field
                  label="TPAID"
                  styleName="tpaid"
                  name="tpaid"
                  dataTest="tpaid"
                  component={Integer}
                  validate={[validation.isRequired, validation.isNumbersOnly]} />
                <Field
                  name="okToPay"
                  dataTest="okToPay"
                  styleName="okToPay"
                  label="Ok to Pay"
                  component={Radio}
                  segmented
                  answers={okToPayAnswers} />
                <Field
                  label="Tier"
                  styleName="tier"
                  name="tier"
                  dataTest="tier"
                  component={Input}
                  validate={[validation.isRequired, validation.isNumbersOnly]} />
                <Field
                  label="Web Address"
                  styleName="webAddress"
                  name="websiteUrl"
                  dataTest="websiteUrl"
                  component={Input} />
                {/* web address validaiton */}
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
              </section>
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

const mapStateToProps = state => state;

export default connect(mapStateToProps, {
  updateAgency
})(reduxForm({
  form: 'AgencyModal',
  enableReinitialize: true,
  destroyOnUnmount: false
})(AgencyModal));
