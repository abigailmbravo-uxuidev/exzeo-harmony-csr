import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Select, AutoCompleteChips, Radio } from '@exzeo/core-ui/lib/Input';
import { validation } from '@exzeo/core-ui/lib/InputLifecycle';
import Button from '@exzeo/core-ui/lib/Button'

const radioDefaultAnswers = [
  { answer: 'true', label: 'Yes' },
  { answer: 'false', label: 'No' }
];

export class ExistingAgentModal extends Component {
  handleSave = async (data, dispatch, props) => {
    const { addAgentToAgency, toggleModal } = props;
    await addAgentToAgency(data, props);
    toggleModal();
  };

  render() {
    const {
      agencyLicenseArray,
      existsInAgencyLicense,
      handleSubmit,
      listOfAgents,
      submitting,
      toggleModal
    } = this.props;

    return (
      <div className="modal existing-agent-modal">
        <div className="card">
          <form onSubmit={handleSubmit(this.handleSave)}>
            <div className="card-header">
              <h4> <i className="fa fa-address-book" /> Existing Agent</h4>
            </div>
            <div className="card-block">
              <section className="existing-agent-details">
                <div className="flex-form">
                  <Field
                    label="Agents"
                    styleName="selectedAgent"
                    name="selectedAgent"
                    dataTest="selectedAgent"
                    component={Select}
                    validate={validation.isRequired}
                    answers={listOfAgents}
                  />
                </div>
                <div className="flex-form">
                  <Field
                    label="Agency License"
                    styleName="agencyLicense"
                    name="agencyLicense"
                    dataTest="agencyLicense"
                    placeholder="Add license"
                    autoSuggest={agencyLicenseArray}
                    component={AutoCompleteChips}
                    validate={[validation.isRequiredArray, existsInAgencyLicense]}
                  />
                </div>
                <div className="flex-form">
                  <Field
                    label="Agent Of Record"
                    styleName="agentOfRecord"
                    name="agentOfRecord"
                    dataTest="agentOfRecord"
                    component={Radio}
                    segmented
                    answers={radioDefaultAnswers}
                    validate={validation.isRequired}
                  />
                  <Field
                    label="Appointed"
                    styleName="appointed"
                    name="appointed"
                    dataTest="appointed"
                    component={Radio}
                    segmented
                    answers={radioDefaultAnswers}
                    validate={validation.isRequired}
                  />
                </div>
              </section>
            </div>
            <div className="card-footer">
              <div className="btn-footer">
                <Button
                  baseClass="secondary"
                  dataTest="modal-cancel"
                  onClick={toggleModal}
                >Cancel</Button>
                <Button
                  baseClass="primary"
                  type="submit"
                  dataTest="modal-submit"
                  disabled={submitting}
                >Save</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}


export default reduxForm({
  form: 'ExistingAgentModal',
  enableReinitialize: true
})(ExistingAgentModal);
