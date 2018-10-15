import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Select, Radio, Input, validation } from '@exzeo/core-ui';

import { createBranch } from '../../state/actions/agencyActions';
import { getEditModalInitialValues } from '../../state/selectors/agency.selector';
import history from '../../history';

const statusAnswers = [
  { answer: 'Active', label: 'Active' },
  { answer: 'InActive', label: 'InActive' }
];

const mailAnswers = [
  { answer: false, label: 'No' },
  { answer: true, label: 'Yes' }
];


export class AddBranch extends Component {
  addBranch = async (data, dispatch, props) => {
    const branch = await props.createBranch(data, props.agencyCode);
    history.push(`/agency/${props.agencyCode}/branch/${branch.branchCode}`);
    props.closeModal();
  };

  render() {
    const {
      closeModal,
      handleSubmit,
      submitting
    } = this.props;

    return (
      <div className="modal agency-crud" style={{ overflow: 'scroll', display: 'block' }}>
        <form onSubmit={handleSubmit(this.addBranch)}>
          <div className="card">
            <div className="card-header">
              <h4>
                <i className="fa fa-address-book" /> Add Branch
              </h4>
            </div>
            <div className="card-block">
              <section className="agency-details">
                <div className="agency-contact">
                  <Field
                    name="branchName"
                    dataTest="branchName"
                    styleName="branchName flex-item"
                    label="Branch Name"
                    validate={validation.isRequired}
                    component={Input} />
                  <Field
                    id="status"
                    name="status"
                    dataTest="status"
                    styleName="status flex-item"
                    label="Status"
                    component={Select}
                    validate={validation.isRequired}
                    answers={statusAnswers} />

                </div>
                <div className="agency-web-address">
                  <Field
                    label="Web Address"
                    styleName="webAddress flex-item"
                    name="webAddress"
                    dataTest="webAddress"
                    component={Input}
                    validate={validation.isRequired} />
                </div>
                <div className="agemcny-mail">
                  <Field
                    name="mailCommissionChecksToBranch"
                    dataTest="mailCommissionChecksToBranch"
                    styleName="mailCommissionChecksToBranch flex-item"
                    label="Mail Commision Checks to this Branch"
                    component={Radio}
                    validate={validation.isRequired}
                    segmented
                    answers={mailAnswers} />
                  <Field
                    name="mailPolicyDocsToBranch"
                    dataTest="mailPolicyDocsToBranch"
                    styleName="mailPolicyDocsToBranch flex-item"
                    label="Mail Policy Docs to this Branch"
                    component={Radio}
                    validate={validation.isRequired}
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

const mapStateToProps = state => ({
  initialValues: getEditModalInitialValues(state)
});

export default connect(mapStateToProps, {
  createBranch
})(reduxForm({
  form: 'AddBranch',
  enableReinitialize: true
})(AddBranch));
