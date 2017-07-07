import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Form, propTypes, change } from 'redux-form';
import _ from 'lodash';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import SelectField from '../Form/inputs/SelectField';
import * as serviceActions from '../../actions/serviceActions';

const handleGetPolicy = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  if (!taskData) return {};
  const policyData = _.find(taskData.model.variables, { name: 'retrievePolicy' }) ? _.find(taskData.model.variables, { name: 'retrievePolicy' }).value[0] : {};
  return policyData;
};

const handleClose = (appState, actions) => {
  actions.appStateActions.setAppState(appState.modelName, appState.instanceId, { ...appState.data, showPolicyholderAgentModal: false });
};

const populateAgentData = (state) => {
  if (state.cg && state.cg.getAgency && state.cg.getAgency.data &&
    state.cg.getAgency.data.model && state.cg.getAgency.data.model.variables) {
    const agentData = _.filter(state.cg.getAgency.data.model.variables, item => item.name === 'getAgentsByCode');
    if (agentData.length > 0) {
      const data = agentData[0].value.result;
      return data;
    }
  }
  return [];
};

export class PolicyholderAgent extends Component {

  componentDidMount = () => {
    this.handleAgencyChange(this.props.quoteData.agencyCode, true);
  }

  handleAgencyChange = (agencyCode, isInit) => {
    if (!isInit) {
      this.props.dispatch(change('Coverage', 'agencyCode', agencyCode));
      this.props.dispatch(change('Coverage', 'agentCode', ''));
    }

    const { quoteData } = this.props;
    const startModelData = {
      agencyCode,
      companyCode: quoteData.companyCode,
      state: quoteData.state
    };

    this.props.actions.cgActions.startWorkflow('getAgency', startModelData, false);
  };

  render() {
    const { appState, handleSubmit, verify, fieldValues, getAgency, currentAgent, actions, agents } = this.props;
    return (
      <div className="modal policyholder-agent">
        <Form noValidate onSubmit={handleSubmit(verify)}>
          <div className="modal policy-agent-agency-edit">

            <div className="card">
              <div className="card-header">
                <h4><i className="fa fa-address-book" /> Agency / Agent</h4>
              </div>
              <div className="card-block">


                <div className="flex-parent">

                  <div className="flex-child">
                    <h5>Current Agency</h5>
                    <p>{getAgency && `(${getAgency.agencyCode}) ${getAgency.legalName}`}</p>
                  </div>

                  <div className="flex-child">
                    <h5>Current Agent</h5>
                    <p>{currentAgent && `(${currentAgent.agentCode}) ${currentAgent.firstName} ${currentAgent.lastName}`}</p>
                  </div>

                </div>

                <div className="form-group">
                  <label>New Agency</label>
                  {/* TODO: still waiting on endpoint to get all agencies. This will not be hardcoded */}
                  <SelectField
                    name="agencyCode" component="select" styleName={''} label="Agency" validations={['required']} input={{
                      name: 'agencyCode',
                      onChange: event => this.handleAgencyChange(event.target.value),
                      value: fieldValues.agencyCode
                    }} answers={[
                      {
                        answer: '20000',
                        label: 'TypTap Insurance Company'
                      },
                      { answer: '20003',
                        label: 'OMEGA INSURANCE AGENCY INC'
                      }
                    ]}
                  />
                </div>
                <div className="form-group">
                  <SelectField
                    name="agentCode" component="select" styleName={''} label="Agent" validations={['required']} answers={agents.map(agent => ({
                      answer: String(agent.agentCode),
                      label: `${agent.firstName} ${agent.lastName}`
                    }))}
                  />
                </div>

              </div>
              <div className="card-footer">
                <div className="btn-group">
                  <button className="btn btn-secondary" onClick={() => handleClose(appState, actions)} type="button">Cancel</button>
                  <button className="btn btn-primary" type="submit">Save</button>
                </div>
              </div>
            </div>

          </div>
        </Form>
      </div>
    );
  }
}

PolicyholderAgent.propTypes = {
  ...propTypes,
  showPolicyholderAgentModal: PropTypes.func,
  verify: PropTypes.func,
  appState: PropTypes.shape({
    modelName: PropTypes.string,
    data: PropTypes.shape({
      recalc: PropTypes.boolean,
      submitting: PropTypes.boolean
    })
  })
};


const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState,
  getAgency: state.service.getAgency,
  currentAgent: state.service.currentAgent,
  agents: populateAgentData(state),
  quoteData: handleGetPolicy(state),
  fieldValues: _.get(state.form, 'Coverage.values', {})
});

const mapDispatchToProps = dispatch => ({
  actions: {
    serviceActions: bindActionCreators(serviceActions, dispatch),
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

// ------------------------------------------------
// wire up redux form with the redux connect
// ------------------------------------------------
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'PolicyholderAgent'
})(PolicyholderAgent));
