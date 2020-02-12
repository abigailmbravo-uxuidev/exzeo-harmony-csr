import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Integer,
  Field,
  Form,
  Button,
  SelectTypeAhead,
  validation
} from '@exzeo/core-ui';

export class AgentModal extends Component {
  handleSave = async data => {
    await this.props.handleSaveAgent(data);
  };

  render() {
    const {
      closeModal,
      handleSubmit,
      isEditing,
      submitting,
      licenseValue,
      change,
      sameAsMailingValue,
      listAnswersAsKey,
      handleSaveAgent
    } = this.props;

    return (
      <div className="modal agent-crud">
        <Form
          id="AgentDetails"
          onSubmit={handleSaveAgent}
          subscription={{ submitting: true, values: true, dirty: true }}
        >
          {({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit}>
              <div className="card">
                <div className="card-header">
                  <h4>
                    <i className="fa fa-address-book" />{' '}
                    {isEditing ? 'Edit' : 'Save'} Agent
                  </h4>
                </div>
                <div className="card-block">
                  <section className="agent-details">
                    <h3 data-test="agent-details">Details</h3>
                    <div className="agent-name">
                      <Field
                        name="agentCode"
                        validate={validation.isNumbersOnly}
                      >
                        {({ input, meta }) => (
                          <Integer
                            input={input}
                            meta={meta}
                            label="Agent ID"
                            styleName="agentCode"
                            dataTest="agentCode"
                            placeholder="Generated if left blank"
                            thousandSeparator={false}
                            disabled={isEditing}
                          />
                        )}
                      </Field>
                      {/* <Field
                        name="firstName"
                        label="First Name"
                        component={Input}
                        dataTest="firstName"
                        styleName="firstName"
                        validate={validation.isRequired}
                      />
                      <Field
                        name="lastName"
                        label="Last Name"
                        component={Input}
                        dataTest="lastName"
                        styleName="lastName"
                        validate={validation.isRequired}
                      />
                    </div>
                    <div className="agent-phone">
                      <Field
                        name="primaryPhoneNumber"
                        label="Primary Phone"
                        component={Phone}
                        dataTest="primaryPhoneNumber"
                        styleName="primaryPhoneNumber"
                        validate={validation.isRequired}
                      />
                      <Field
                        name="primaryPhoneNumberExtension"
                        label="Primary Phone Extension"
                        component={Input}
                        dataTest="primaryPhoneNumberExtension"
                        styleName="primaryPhoneNumberExtension"
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
                        styleName="faxNumber"
                      /> */}
                    </div>
                    <div className="agent-status-email">
                      {/* <Field
                        name="status"
                        label="Status"
                        component={Select}
                        dataTest="status"
                        styleName="status"
                        validate={validation.isRequired}
                        answers={STATUS}
                      />
                      <Field
                        name="emailAddress"
                        label="Email Address"
                        component={Input}
                        dataTest="emailAddress"
                        styleName="emailAddress"
                        validate={[validation.isRequired, validation.isEmail]}
                      /> */}
                    </div>
                  </section>
                  {/* <AddressGroup
                sameAsMailingValue={sameAsMailingValue}
                changeField={change}
                dataTest="agent"
                isOptional
              /> */}
                  {/* <section className="agent-license">
                <h3 data-test="agent-license">Licenses</h3>
                <FieldArray
                  name="licenses"
                  stateAnswers={listAnswersAsKey.US_states}
                  component={License}
                  licenseValue={licenseValue}
                  isAgency={false}
                />
              </section> */}
                </div>
                <div className="card-footer">
                  <div className="btn-footer">
                    <Button
                      className={Button.constants.classNames.secondary}
                      data-test="cancel-modal"
                      onClick={closeModal}
                    >
                      Cancel
                    </Button>
                    <Button
                      className={Button.constants.classNames.primary}
                      type="submit"
                      data-test="submit-modal"
                      disabled={submitting}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </Form>
      </div>
    );
  }
}

// const selector = getFormValues(FORM_NAME);
// const defaultArr = [];
// const mapStateToProps = state => ({
//   licenseValue: selector(state, 'license') || defaultArr,
//   sameAsMailingValue: selector(state, 'sameAsMailing'),
//   listAnswersAsKey: getListAnswersAsKey(state)
// });

export default AgentModal;
