import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Select, Radio, Input, validation, Phone } from '@exzeo/core-ui';

import { updateAgency } from '../../../state/actions/agency.actions';

import { STATUS } from '../../../constants/agency';

const mailAnswers = [
  { answer: false, label: 'No' },
  { answer: true, label: 'Yes' }
];

export class BranchModal extends Component {
  handleBranchSubmit = async (data, dispatch, props) => {
    const { agency, branchCode } = this.props;

    const selectedBranch = agency.branches.filter(
      b => String(b.branchCode) === String(branchCode)
    )[0];
    selectedBranch.displayName = data.displayName;
    selectedBranch.status = data.status;
    selectedBranch.primaryPhoneNumber = data.primaryPhoneNumber;
    selectedBranch.secondaryPhoneNumber = data.secondaryPhoneNumber;
    selectedBranch.faxNumber = data.faxNumber;
    selectedBranch.websiteUrl = data.websiteUrl;
    selectedBranch.mailCommissionChecksToBranch =
      data.mailCommissionChecksToBranch;
    selectedBranch.mailPolicyDocsToBranch = data.mailPolicyDocsToBranch;
    agency.branches = agency.branches.filter(b => String(b.branchCode) !== '0');
    await this.props.updateAgency(agency);
    this.props.closeModal();
  };

  render() {
    const { closeModal, handleSubmit, submitting } = this.props;

    return (
      <div className="modal agency-crud branch-agency-crud">
        <form onSubmit={handleSubmit(this.handleBranchSubmit)}>
          <div className="card branch">
            <div className="card-header">
              <h4>
                <i className="fa fa-address-book" /> Edit Agency Details
              </h4>
            </div>
            <div className="card-block">
              <section className="agency-details">
                <Field
                  name="displayName"
                  dataTest="displayName"
                  styleName="displayName branchName branch"
                  label="Branch Name"
                  validate={validation.isRequired}
                  component={Input}
                />
                <Field
                  id="status"
                  name="status"
                  dataTest="status"
                  styleName="status branch-status"
                  label="Status"
                  component={Select}
                  validate={validation.isRequired}
                  answers={STATUS}
                />
                <Field
                  name="mailCommissionChecksToBranch"
                  dataTest="mailCommissionChecksToBranch"
                  styleName="mailCommissionChecksToBranch"
                  label="Mail Commission Checks to this Branch"
                  component={Radio}
                  segmented
                  answers={mailAnswers}
                />
                <Field
                  name="mailPolicyDocsToBranch"
                  dataTest="mailPolicyDocsToBranch"
                  styleName="mailPolicyDocsToBranch"
                  label="Mail Policy Docs to this Branch"
                  component={Radio}
                  segmented
                  answers={mailAnswers}
                />
                <Field
                  label="Web Address"
                  styleName="webAddress branch"
                  name="websiteUrl"
                  dataTest="websiteUrl"
                  component={Input}
                  validate={[validation.isRequired, validation.isWebAddress]}
                />
                <hr />
                <Field
                  name="primaryPhoneNumber"
                  label="Primary Phone"
                  component={Phone}
                  dataTest="primaryPhoneNumber"
                  styleName="primaryPhoneNumber"
                  validate={validation.isRequired}
                />
                <Field
                  name="secondaryPhoneNumber"
                  label="Secondary Phone"
                  component={Phone}
                  dataTest="secondaryPhoneNumber"
                  styleName="secondaryPhoneNumber"
                />
                <Field
                  name="faxNumber"
                  label="Fax Number"
                  component={Phone}
                  dataTest="faxNumber"
                  validate={[validation.isPhone]}
                  styleName="faxNumber"
                />
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

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { updateAgency }
)(
  reduxForm({
    form: 'BranchModal',
    enableReinitialize: true,
    destroyOnUnmount: false
  })(BranchModal)
);
