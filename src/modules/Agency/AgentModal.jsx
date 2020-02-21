import React from 'react';
import {
  Integer,
  Field,
  Form,
  Button,
  Input,
  Phone,
  Select,
  validation,
  composeValidators,
  FieldArray,
  arrayMutators,
  Loader
} from '@exzeo/core-ui';
import { STATUS } from 'constants/agency';
import AddressGroup from './AddressGroup';
import License from './License';

export const AgentModal = ({
  closeModal,
  isEditing,
  listAnswersAsKey,
  handleSaveAgent,
  initialValues
}) => {
  return (
    <div className="modal agent-crud">
      <Form
        id="AgentDetails"
        initialValues={initialValues}
        onSubmit={handleSaveAgent}
        mutators={{
          ...arrayMutators
        }}
        subscription={{ submitting: true }}
      >
        {({ handleSubmit, submitting }) => (
          <React.Fragment>
            {submitting && <Loader />}
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
                      <Field name="firstName">
                        {({ input, meta }) => (
                          <Input
                            input={input}
                            meta={meta}
                            label="First Name"
                            styleName="firstName"
                            dataTest="firstName"
                          />
                        )}
                      </Field>
                      <Field name="lastName" validate={validation.isRequired}>
                        {({ input, meta }) => (
                          <Input
                            input={input}
                            meta={meta}
                            label="Last Name"
                            styleName="lastName"
                            dataTest="lastName"
                          />
                        )}
                      </Field>
                    </div>
                    <div className="agent-phone">
                      <Field
                        name="primaryPhoneNumber"
                        validate={validation.isRequired}
                      >
                        {({ input, meta }) => (
                          <Phone
                            input={input}
                            meta={meta}
                            label="Primary Phone"
                            styleName="primaryPhoneNumber"
                            dataTest="primaryPhoneNumber"
                          />
                        )}
                      </Field>
                      <Field name="primaryPhoneNumberExtension">
                        {({ input, meta }) => (
                          <Input
                            input={input}
                            meta={meta}
                            label="Primary Phone Extension"
                            styleName="primaryPhoneNumberExtension"
                            dataTest="primaryPhoneNumberExtension"
                          />
                        )}
                      </Field>
                      <Field name="secondaryPhoneNumber">
                        {({ input, meta }) => (
                          <Phone
                            input={input}
                            meta={meta}
                            label="Secondary Phone"
                            styleName="secondaryPhoneNumber"
                            dataTest="secondaryPhoneNumber"
                          />
                        )}
                      </Field>
                      <Field name="faxNumber">
                        {({ input, meta }) => (
                          <Phone
                            input={input}
                            meta={meta}
                            label="Fax Number"
                            styleName="faxNumber"
                            dataTest="faxNumber"
                          />
                        )}
                      </Field>
                    </div>
                    <div className="agent-status-email">
                      <Field name="status" validate={validation.isRequired}>
                        {({ input, meta }) => (
                          <Select
                            input={input}
                            meta={meta}
                            label="Status"
                            dataTest="status"
                            styleName="status"
                            validate={validation.isRequired}
                            answers={STATUS}
                          />
                        )}
                      </Field>
                      <Field
                        name="emailAddress"
                        validate={composeValidators([
                          validation.isRequired,
                          validation.isEmail
                        ])}
                      >
                        {({ input, meta }) => (
                          <Input
                            input={input}
                            meta={meta}
                            label="Email Address"
                            styleName="emailAddress"
                            dataTest="emailAddress"
                          />
                        )}
                      </Field>
                    </div>
                  </section>
                  <section
                    data-test="agent-address-section"
                    className="agent-address"
                  >
                    <AddressGroup
                      mailingAddressPrefix="mailingAddress"
                      physicalAddressPrefix="physicalAddress"
                      listAnswersAsKey={listAnswersAsKey}
                    />
                  </section>

                  <section className="agent-license">
                    <h3 data-test="agent-license">Licenses</h3>
                    <FieldArray
                      name="licenses"
                      stateAnswers={listAnswersAsKey.US_states}
                      component={License}
                    />
                  </section>
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
          </React.Fragment>
        )}
      </Form>
    </div>
  );
};

export default AgentModal;
