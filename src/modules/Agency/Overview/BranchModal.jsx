import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Select, Radio, Input, validation, Phone } from '@exzeo/core-ui';

import { updateAgency } from '../../../state/actions/agency.actions';

const statusAnswers = [
  { answer: 'Active', label: 'Active' },
  { answer: 'InActive', label: 'InActive' }
];

const mailAnswers = [
  { answer: false, label: 'No' },
  { answer: true, label: 'Yes' }
];


export class BranchModal extends Component {
  handleBranchSubmit = async (data, dispatch, props) => {
    const { agency, branchCode } = this.props;

    const selectedBranch = agency.branches.filter(b => String(b.branchCode) === String(branchCode))[0];
    selectedBranch.displayName = data.displayName;
    selectedBranch.status = data.status;
    selectedBranch.primaryPhoneNumber = data.primaryPhoneNumber;
    selectedBranch.secondaryPhoneNumber = data.secondaryPhoneNumber;
    selectedBranch.faxNumber = data.faxNumber;
    selectedBranch.websiteUrl = data.websiteUrl;
    selectedBranch.mailCommissionChecksToBranch = data.mailCommissionChecksToBranch;
    selectedBranch.mailPolicyDocsToBranch = data.mailPolicyDocsToBranch;
    agency.branches = agency.branches.filter(b => String(b.branchCode) !== '0');
    await this.props.updateAgency(agency);
    this.props.closeModal();
  };

  render() {
    const {
      closeModal,
      handleSubmit,
      submitting
    } = this.props;

    return (
      <div className="modal agency-crud" style={{ overflow: 'scroll', display: 'block' }}>
        <form onSubmit={handleSubmit(this.handleBranchSubmit)}>
          <div className="card">
            <div className="card-header">
              <h4>
                <i className="fa fa-address-book" /> Update Branch
              </h4>
            </div>
            <div className="card-block">
              <section className="agency-details">
                <div className="agency-contact">
                  <Field
                    name="displayName"
                    dataTest="displayName"
                    styleName="displayName"
                    label="Branch Name"
                    validate={validation.isRequired}
                    component={Input} />
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
                    name="primaryPhoneNumber"
                    label="Primary Phone"
                    component={Phone}
                    dataTest="primaryPhoneNumber"
                    styleName="primaryPhoneNumber"
                    validate={validation.isRequired} />
                  <Field
                    name="secondaryPhoneNumber"
                    label="Secondary Phone"
                    component={Phone}
                    dataTest="secondaryPhoneNumber"
                    styleName="secondaryPhoneNumber" />
                  <Field
                    name="faxNumber"
                    label="Fax Number"
                    component={Phone}
                    dataTest="faxNumber"
                    validate={[validation.isPhone]}
                    styleName="faxNumber" />
                </div>
                <div className="agency-web-address">
                  <Field
                    label="Web Address"
                    styleName="websiteUrl"
                    name="websiteUrl"
                    dataTest="websiteUrl"
                    component={Input}
                    validate={[validation.isRequired, validation.isWebAddress]} />
                </div>
                <div className="agemcny-mail">
                  <Field
                    name="mailCommissionChecksToBranch"
                    dataTest="mailCommissionChecksToBranch"
                    styleName="mailCommissionChecksToBranch"
                    label="Mail Commision Checks to this Branch"
                    component={Radio}
                    segmented
                    answers={mailAnswers} />
                  <Field
                    name="mailPolicyDocsToBranch"
                    dataTest="mailPolicyDocsToBranch"
                    styleName="mailPolicyDocsToBranch"
                    label="Mail Policy Docs to this Branch"
                    component={Radio}
                    segmented
                    answers={mailAnswers} />

                </div>
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

export default connect(mapStateToProps, { updateAgency })(reduxForm({
  form: 'BranchModal',
  enableReinitialize: true,
  destroyOnUnmount: false
})(BranchModal));
