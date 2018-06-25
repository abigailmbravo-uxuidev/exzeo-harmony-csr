import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Select } from '@exzeo/core-ui/lib/Input';
import { validation } from '@exzeo/core-ui/lib/InputLifecycle';


export class ExistingAgentModal extends Component {
  saveAgent = async (data, dispatch, props) => {
    const { agents, agency } = props;
    const selectedAgent = agents.find(a => a.agentCode === Number(data.selectedAgent));
    const { createdBy, createdAt, ...agent } = selectedAgent;
    agent.agencyCode = agency.agencyCode;
    await props.addAgent(agent);
    props.toggleModal();
  };

  render() {
    const {
      toggleModal,
      handleSubmit,
      submitting,
      listOfAgents
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
