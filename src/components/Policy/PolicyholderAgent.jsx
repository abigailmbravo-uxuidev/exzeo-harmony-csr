import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { reduxForm, change } from 'redux-form';
import PolicyConnect from '../../containers/Policy';
import ClearErrorConnect from '../Error/ClearError';
import normalizePhone from '../Form/normalizePhone';
import * as appStateActions from '../../actions/appStateActions';
import * as serviceActions from '../../actions/serviceActions';
import * as cgActions from '../../actions/cgActions';
import PolicyholderAgentModal from '../../components/Common/PolicyholderAgentModal';

const handleGetPolicy = (state) => {
  const model = state.appState ? state.appState.modelName : undefined;
  const previousTask = model && state.cg[model] && state.cg[model].data ? state.cg[model].data.previousTask : undefined;
  return (previousTask && previousTask.value) ? previousTask.value[0] : {};
};

const handleEdit = (props) => {
  const workflowId = props.appState.instanceId;
  props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { ...props.appState.data, submiting: false, showPolicyholderAgentModal: true });
};

export class PolicyholderAgent extends Component {

  componentWillMount() {
    const workflowId = this.props.appState.instanceId;
    this.props.actions.appStateActions.setAppState(this.props.appState.modelName, workflowId, { ...this.props.appState.data, showPolicyholderAgentModal: false });
    this.props.actions.serviceActions.getAgents(this.props.policy.state, this.props.policy.companyCode);
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(this.props, nextProps)) {
      if (nextProps.policy && nextProps.policy.policyNumber) {
        this.props.actions.serviceActions.getAgency(nextProps.policy.companyCode, nextProps.policy.state, nextProps.policy.agencyCode);
        this.props.actions.serviceActions.currentAgent(nextProps.policy.companyCode, nextProps.policy.state, nextProps.policy.agentCode);
      }
    }
  }

  handleFormSubmit = (data) => {
    const workflowId = this.props.appState.instanceId;

    this.props.actions.appStateActions.setAppState(this.props.appState.modelName, workflowId, {
      ...this.props.appState.data,
      submitting: true,
      showPolicyholderAgentModal: false
    });

    this.props.dispatch(change('Coverage', 'agentCode', data.agentCode.toString()));
  };

  render() {
    const { policyHolders, policyHolderMailingAddress } = this.props.policy;
    const { appState, currentAgent, getAgency } = this.props;

    return (
      <PolicyConnect>
        <ClearErrorConnect />
        <div className="route-content">
          { appState.data.showPolicyholderAgentModal && <PolicyholderAgentModal verify={this.handleFormSubmit} showPolicyholderAgentModal={() => PolicyholderAgentModal(this.props)} /> }
          <div className="scroll">
            <div className="form-group survey-wrapper" role="group">
              <section className="policyholder-cards">
                <h3>Policyholder</h3>
                { policyHolders && policyHolders.map((policyHolder, index) => (<div key={`ph${index}`} className="primary-policyholder contact card">
                  <div className="contact-title"><i className="fa fa-address-card-o" /><label>Policyholder {index + 1}</label></div>
                  <div className="contact-details">
                    <h4>{`${policyHolder.firstName} ${policyHolder.lastName}`}</h4>
                    <p>{`${policyHolderMailingAddress.address1} ${policyHolderMailingAddress.address2 ? policyHolderMailingAddress.address2 : ''}
                        ${policyHolderMailingAddress.city} ${policyHolderMailingAddress.state}, ${policyHolderMailingAddress.zip}`}</p>
                    <div className="contact-methods">
                      <p className="primary-phone"><i className="fa fa-phone-square" />
                        <a href={`tel: ${(policyHolder.primaryPhoneNumber)}`}>{normalizePhone(policyHolder.primaryPhoneNumber)}</a>
                      </p>
                      { policyHolder.secondaryPhoneNumber && <p className="secondary-phone">
                        <small>2<sup>ND</sup><i className="fa fa-phone" /></small>
                        <a href={`tel: ${policyHolder.secondaryPhoneNumber}`}>{normalizePhone(policyHolder.secondaryPhoneNumber)}</a>
                      </p>
}
                      <p className="email">
                        <a href={`mailto: ${policyHolder.emailAddress}`}><i className="fa fa-envelope" />{policyHolder.emailAddress}</a>
                      </p>
                    </div>
                  </div>

                </div>))
}
              </section>
              <section className="agency-cards">
                <h3>Agency / Agent</h3>
                <div className="agency contact card card-multi">
                  <div className="card-multi-split">
                    <div className="contact-title"><i className="fa fa-address-book" /><label>Agency</label></div>
                    <div className="contact-details">
                      <h4>                                           {
                          `(${getAgency && getAgency.agencyCode})
                          ${getAgency && getAgency.legalName}`
                        }
                      </h4>
                      <p>
                        {getAgency && getAgency.mailingAddress.address1}
                        {getAgency && getAgency.mailingAddress.address2},&nbsp;
                        {getAgency && getAgency.mailingAddress.city},&nbsp;
                        {getAgency && getAgency.mailingAddress.state}.&nbsp;
                        {getAgency && getAgency.mailingAddress.zip}
                      </p>
                      <div className="contact-methods">
                        <p className="primary-phone">
                          <a href="tel: 9417777755"><i className="fa fa-phone-square" />{normalizePhone(getAgency && getAgency.primaryPhoneNumber)}</a>
                        </p>
                        <p className="fax">
                          <a href="tel: 9417777722"><i className="fa fa-fax" />{normalizePhone(getAgency && getAgency.secondaryPhoneNumber)}</a>
                        </p>
                        <p className="email">
                          <a href="mailto:help@greatflorida.com"><i className="fa fa-envelope" />{getAgency && getAgency.customerServiceEmailAddress}</a>
                        </p>
                      </div>
                      <div className="additional-contacts">
                        <ul>
                          <li>
                            <div>
                              <h5>Laurie Cyr</h5>
                              <span>PI Manager</span>
                            </div>
                            <div className="contact-methods">
                              <p><a href="mailto:laurie.cyr@greatflorida.com"><i className="fa fa-envelope" />laurie.cyr@greatflorida.com</a></p>
                            </div>
                          </li>
                          <li>
                            <div>
                              <h5>Wendy North</h5>
                              <span>Pricipal</span>
                            </div>
                            <div className="contact-methods">
                              <p><a href="mailto:wendy.north@greatflorida.com"><i className="fa fa-envelope" />wendy.north@greatflorida.com</a></p>
                            </div>
                          </li>
                          <li>
                            <div>
                              <h5>Yanet Coursen</h5>
                              <span>Sales Manager</span>
                            </div>
                            <div className="contact-methods" />
                          </li>
                        </ul>
                      </div>
                    </div>
                    <a href="#"><i onClick={() => handleEdit(this.props)} className="fa fa-pencil" /></a>
                  </div>
                  {currentAgent && currentAgent.agentCode &&
                  <div className="card-multi-split">
                    <div className="contact-title"><i className="fa fa-address-card" /><label>Agent</label></div>
                    <div className="contact-details">
                      <h4>
                        {
                          `(${currentAgent && currentAgent.agentCode})
                          ${currentAgent && currentAgent.firstName} ${currentAgent && currentAgent.lastName}`
                        }
                      </h4>
                      <p>
                        {currentAgent && currentAgent.mailingAddress.address1}
                        {currentAgent && currentAgent.mailingAddress.address2},&nbsp;
                        {currentAgent && currentAgent.mailingAddress.city},&nbsp;
                        {currentAgent && currentAgent.mailingAddress.state}.&nbsp;
                        {currentAgent && currentAgent.mailingAddress.zip}
                      </p>
                      <div className="contact-methods">
                        <p className="primary-phone">
                          <a href="tel: 9417777755"><i className="fa fa-phone-square" />
                            {normalizePhone(currentAgent && currentAgent.primaryPhoneNumber)}
                          </a>
                        </p>
                        <p className="secondary-phone">
                          <a href="tel: 9417777333"><small>2<sup>ND</sup><i className="fa fa-phone" /></small>
                            {normalizePhone(currentAgent && currentAgent.secondaryPhoneNumber)}
                          </a>
                        </p>
                        <p className="fax">
                          {currentAgent && currentAgent.faxNumber &&
                          <a href="tel: 9417777722"><i className="fa fa-fax" />
                            {normalizePhone(currentAgent && currentAgent.faxNumber)}
                          </a>
                          }
                        </p>
                        <p className="email">
                          <a href="mailto:laurie.cyr@greatflorida.com"><i className="fa fa-envelope" />{currentAgent && currentAgent.emailAddress}</a>
                        </p>
                      </div>
                    </div>
                  </div>
                  }
                </div>
              </section>
            </div>
          </div>
        </div>
      </PolicyConnect>
    );
  }
}

PolicyholderAgent.propTypes = {
  policy: PropTypes.shape()
};

const mapStateToProps = state => ({
  policy: handleGetPolicy(state),
  tasks: state.cg,
  appState: state.appState,
  currentAgent: state.service.currentAgent,
  getAgents: state.service.getAgents,
  getAgency: state.service.agency
});

const mapDispatchToProps = dispatch => ({
  actions: {
    serviceActions: bindActionCreators(serviceActions, dispatch),
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'PolicyholderAgent', enableReinitialize: true })(PolicyholderAgent));
