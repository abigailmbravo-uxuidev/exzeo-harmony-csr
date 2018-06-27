import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Select, AutocompleteChips } from '@exzeo/core-ui/lib/Input';
import { validation } from '@exzeo/core-ui/lib/InputLifecycle';


export class ExistingAgentModal extends Component {
  saveAgent = async (data, dispatch, props) => {
    const { agency } = props;
    data.agencyLicense.forEach((l) => {
      const license = agency.license.find(li => li.licenseNumber === l);
      const selectedAgent = license && license.agent ? license.agent.find(a => a.agentCode === data.agentCode) : null;

      if (license && license.agent && !selectedAgent) {
        license.agent.push({
          agentCode: Number(data.selectedAgent),
          appointed: true,
          agentOfRecord: true
        });
        const licenseIndex = agency.license.findIndex(li => li.licenseNumber === l);
        agency.license.splice(licenseIndex, 1, license);
      }
    });
    const { createdAt, createdBy, ...selectedAgency } = agency;
    await props.updateAgency(selectedAgency);
    props.toggleModal();
  }

  render() {
    const {
      toggleModal,
      handleSubmit,
      submitting,
      listOfAgents,
      agencyLicenseArray
    } = this.props;

    return (
      <div className="modal agent-crud">
        <form onSubmit={handleSubmit(this.saveAgent)}>
          <div className="card">
            <div className="card-header">
              <h4>
                <i className="fa fa-address-book" />
            Existing Agent
              </h4>
            </div>
            <div className="card-block">
              <section className="agent-details">
                <div className="flex-form">
                  <Field
                    label="Agents"
                    styleName="selectedAgent"
                    name="selectedAgent"
                    component={Select}
                    validate={validation.isRequired}
                    answers={listOfAgents}
                  />
                  <Field
                    label="Agency License"
                    styleName="agencyLicense"
                    name="agencyLicense"
                    autoSuggest={agencyLicenseArray}
                    component={AutocompleteChips}
                    validate={validation.isRequiredArray}
                  />
                </div>
              </section>
            </div>
            <div className="card-footer">
              <div className="btn-footer">
                <button
                  tabIndex="0"
                  className="btn btn-secondary"
                  type="button"
                  onClick={toggleModal}
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


export default reduxForm({ form: 'ExistingAgentModal', enableReinitialize: true })(ExistingAgentModal);
