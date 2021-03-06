import React from 'react';
import {
  Field,
  Form,
  Button,
  SelectTypeAhead,
  validation,
  Loader
} from '@exzeo/core-ui';

export const ExistingAgentModal = ({
  handleSelection,
  listOfAgents,
  onToggleModal,
  header,
  isOptional
}) => {
  return (
    <div className="modal existing-agent-modal">
      <Form
        id="ExistingAgentModal"
        onSubmit={handleSelection}
        subscription={{ submitting: true }}
      >
        {({ handleSubmit, submitting }) => (
          <React.Fragment>
            {submitting && <Loader />}
            <form onSubmit={handleSubmit}>
              <div className="card">
                <div className="card-header">
                  <h4>
                    {' '}
                    <i className="fa fa-address-book" /> {header}
                  </h4>
                </div>
                <div className="card-block">
                  <section className="existing-agent-details">
                    <div className="flex-form">
                      <Field
                        name="selectedAgentCode"
                        validate={isOptional ? null : validation.isRequired}
                      >
                        {({ input, meta }) => (
                          <SelectTypeAhead
                            input={input}
                            meta={meta}
                            label="Agents"
                            styleName="selectedAgentCode"
                            dataTest="selectedAgentCode"
                            optionValue="agentCode"
                            optionLabel="displayText"
                            component={SelectTypeAhead}
                            validate={validation.isRequired}
                            answers={listOfAgents}
                          />
                        )}
                      </Field>
                    </div>
                  </section>
                </div>
                <div className="card-footer">
                  <div className="btn-footer">
                    <Button
                      className={Button.constants.classNames.secondary}
                      dataTest="modal-cancel"
                      onClick={onToggleModal}
                    >
                      Cancel
                    </Button>
                    <Button
                      className={Button.constants.classNames.primary}
                      type="submit"
                      dataTest="modal-submit"
                      disabled={submitting}
                    >
                      Select
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

export default ExistingAgentModal;
