import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Radio, Input, Phone } from '@exzeo/core-ui/lib/Input';
import { validation } from '@exzeo/core-ui/lib/InputLifecycle';

const radioAnswers = [
  { answer: false, label: 'No' },
  { answer: true, label: 'Yes' }
];

const radioStatusAnswers = [
  { answer: 'Inactive', label: 'Inactive' },
  { answer: 'Active', label: 'Active' }
];

export class AgentModal extends Component {
  saveAgent = async (data, dispatch, props) => {
    const { createdBy, createdAt, ...agent } = data;
    await props.updateAgent(agent, props.agency);
    props.toggleModal('')();
  };

  render() {
    const {
      toggleModal,
      handleSubmit,
      editType,
      submitting
    } = this.props;

    return (
      <div className="modal agent-crud">
        <form onSubmit={handleSubmit(this.saveAgent)}>
          <div className="card">
            <div className="card-header">
              <h4>
                <i className="fa fa-address-book" /> {editType === 'Edit' ? 'Edit ' : 'New '}
            Agent
              </h4>
            </div>
            <div className="card-block">
              <section className="agent-details">
                <h4>Agent Information</h4>

                <div className="flex-form">
                  <Field
                    label="Agent ID"
                    styleName="agentCode"
                    name="agentCode"
                    component={Input}
                    validate={validation.isRequired}
                    disabled
                  />
                  <Field
                    label="License Number"
                    styleName="licenseNumber"
                    name="license[0].licenseNumber"
                    component={Input}
                    validate={validation.isRequired}
                  />
                  <Field
                    label="State"
                    styleName="state"
                    name="license[0].state"
                    component={Input}
                    validate={validation.isRequired}
                  />
                </div>
                <div className="flex-form">
                  <Field
                    label="First Name"
                    styleName="firstName"
                    name="firstName"
                    component={Input}
                    validate={validation.isRequired}
                  />
                  <Field
                    label="Last Name"
                    styleName="lastName"
                    name="lastName"
                    component={Input}
                    validate={validation.isRequired}
                  />
                </div>
                <div className="flex-form">
                  <Field
                    label="Primary Phone"
                    styleName="primaryPhoneNumber"
                    name="primaryPhoneNumber"
                    component={Phone}
                    validate={validation.isRequired}
                  />
                  <Field
                    label="Secondary Phone"
                    styleName="secondaryPhoneNumber"
                    name="secondaryPhoneNumber"
                    component={Phone}
                  />
                  <Field
                    label="Fax Number"
                    styleName="faxNumber"
                    name="faxNumber"
                    component={Phone}
                  />
                </div>
                <div className="flex-form">
                  <Field
                    label="Status"
                    styleName="status"
                    name="status"
                    component={Radio}
                    segmented
                    answers={radioStatusAnswers}
                  />
                  <Field
                    label="Email Address"
                    styleName="emailAddress"
                    name="emailAddress"
                    component={Input}
                    validate={[validation.isRequired, validation.isEmail]}
                  />
                </div>
              </section>
              <section className="agent-address">
                <div className="agent-mailing-address">
                  <h4>Mailing Address</h4>
                  <Field
                    label="Address 1"
                    styleName="mailingAddress1"
                    name="mailingAddress.address1"
                    component={Input}
                    validate={validation.isRequired}
                  />
                  <Field
                    label="Address 2"
                    styleName="mailingAddress2"
                    name="mailingAddress.address2"
                    component={Input}
                  />
                  <div className="flex-form">
                    <Field
                      label="City"
                      styleName="mailingCity"
                      name="mailingAddress.city"
                      component={Input}
                      validate={validation.isRequired}
                    />
                    <Field
                      label="State"
                      styleName="mailingState"
                      name="mailingAddress.state"
                      component={Input}
                      validate={validation.isRequired}
                    />
                    <Field
                      label="Zip Code"
                      styleName="mailingZip"
                      name="mailingAddress.zip"
                      component={Input}
                      validate={[validation.isRequired, validation.isZipCode]}
                    />
                  </div>
                </div>
              </section>
            </div>
            <div className="card-footer">
              <div className="btn-footer">
                <button
                  tabIndex="0"
                  className="btn btn-secondary"
                  type="button"
                  onClick={toggleModal()}
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


export default reduxForm({ form: 'AgentModal', enableReinitialize: true })(AgentModal);
