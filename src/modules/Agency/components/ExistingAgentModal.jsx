import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { validation, Button, SelectTypeAhead } from '@exzeo/core-ui';

const radioDefaultAnswers = [
  { answer: 'true', label: 'Yes' },
  { answer: 'false', label: 'No' }
];

export class ExistingAgentModal extends Component {
  render() {
    const {
      handleSelection,
      handleSubmit,
      listOfAgents,
      submitting,
      onToggleModal,
      header
    } = this.props;

    return (
      <div className="modal existing-agent-modal">
        <form onSubmit={handleSubmit(handleSelection)}>
          <div className="card">
            <div className="card-header">
              <h4> <i className="fa fa-address-book" /> {header}</h4>
            </div>
            <div className="card-block">
              <section className="existing-agent-details">
                <div className="flex-form">
                  <Field
                    label="Agents"
                    styleName="selectedAgent"
                    name="selectedAgent"
                    dataTest="selectedAgent"
                    valueKey="_id"
                    labelKey="displayText"
                    component={SelectTypeAhead}
                    validate={validation.isRequired}
                    answers={listOfAgents} />
                </div>
              </section>
            </div>
            <div className="card-footer">
              <div className="btn-footer">
                <Button
                  baseClass="secondary"
                  dataTest="modal-cancel"
                  onClick={onToggleModal}>Cancel
                </Button>
                <Button
                  baseClass="primary"
                  type="submit"
                  dataTest="modal-submit"
                  disabled={submitting}>Select
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}


export default reduxForm({
  form: 'ExistingAgentModal',
  enableReinitialize: true
})(ExistingAgentModal);
