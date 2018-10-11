import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, FormSection } from 'redux-form';
import { Select, Radio, Input, Integer, validation } from '@exzeo/core-ui';
import { updateAgency } from '../../state/actions/agencyActions';
import { getEditModalInitialValues } from '../../state/selectors/agency.selector';

export class AgencyContactModal extends Component {
  saveAgency = async (data, dispatch, props) => {
    await props.updateAgency(data);
    props.closeModal();
  };

  render() {
    const {
      closeModal,
      handleSubmit,
      submitting,
      section,
      header
    } = this.props;

    return (
      <div className="modal agency-crud" style={{ overflow: 'scroll', display: 'block' }}>
        <form onSubmit={handleSubmit(this.saveAgency)}>
          <div className="card">
            <div className="card-header">
              <h4>
                <i className="fa fa-address-book" /> {header}
              </h4>
            </div>
            <div className="card-block">
              <section className="agency-details">
                <FormSection name={section} >
                  <div className="agency-contact">
                    <Field
                      name="title"
                      dataTest="title"
                      styleName="title"
                      label="Title"
                      component={Input} />
                    <Field
                      label="First Name"
                      styleName="firstName flex-item"
                      name="firstName"
                      dataTest="firstName"
                      component={Input}
                      validate={validation.isRequired} />
                    <Field
                      label="Last Name"
                      styleName="lastName flex-item"
                      name="lastName"
                      dataTest="lastName"
                      component={Input}
                      validate={validation.isRequired} />
                    <Field
                      label="Email Address"
                      styleName="emailAddress"
                      name="emailAddress"
                      dataTest="emailAddress"
                      component={Input}
                      validate={validation.isRequired} />
                  </div>
                </FormSection>
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
  updateAgency
})(reduxForm({
  form: 'AgencyContactModal',
  enableReinitialize: true
})(AgencyContactModal));
