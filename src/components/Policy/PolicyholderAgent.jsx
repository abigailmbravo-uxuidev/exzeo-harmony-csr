import React, { Component } from 'react';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PolicyConnect from '../../containers/Policy';
import ClearErrorConnect from '../Error/ClearError';
import normalizePhone from '../Form/normalizePhone';
import * as appStateActions from '../../actions/appStateActions';
import * as serviceActions from '../../actions/serviceActions';

let isLoaded = false;

export const handleGetPolicy = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  if (!taskData) return {};
  const policyData = _.find(taskData.model.variables, { name: 'retrievePolicy' }) ? _.find(taskData.model.variables, { name: 'retrievePolicy' }).value[0] : {};
  return policyData;
};


// turn this into class and use the service runner
export class PolicyholderAgent extends Component {

  componentWillReceiveProps(nextProps) {
    const policyData = nextProps.policy;
    if (policyData && policyData.companyCode && policyData.state && policyData.agencyCode && !isLoaded) {
      isLoaded = true;
      nextProps.actions.serviceActions.getAgents(policyData.companyCode, policyData.state);
      nextProps.actions.serviceActions.getAgency(policyData.companyCode, policyData.state, policyData.agencyCode);
    }
  }

  render() {
    const {
policyHolders,
policyHolderMailingAddress
} = this.props.policy;

    const { agency, agents, policy } = this.props;

    let selectedAgent;

    if (agents && agents.length > 0 && policy && policy.agentCode) {
      selectedAgent = _.find(agents, a => a.agentCode === policy.agentCode);
    }

    return (
      <PolicyConnect>
        <ClearErrorConnect />
        <div className="route-content">
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
                      </p> }
                      <p className="email">
                        <a href={`mailto: ${policyHolder.emailAddress}`}><i className="fa fa-envelope" />{policyHolder.emailAddress}</a>
                      </p>
                    </div>
                  </div>
                  <div className="electronic-delivery"><label>Electronic Delivery: </label> {policyHolder.electronicDelivery ? 'Yes' : 'No'}</div>
                </div>)) }
              </section>
              { agency && selectedAgent && <section className="agency-cards">
                <h3>Agency / Agent</h3>
                <div className="agency contact card">
                  <div className="contact-title"><i className="fa fa-address-book" /><label>Agency</label></div>
                  <div className="contact-details">
                    <h4>{agency.displayName} | {agency.legalName}</h4>
                    <p>{agency.mailingAddress.address1}{agency.mailingAddress.address2 ? ` ,${agency.mailingAddress.address2}` : ''}, {agency.mailingAddress.city}, {agency.mailingAddress.state} {agency.mailingAddress.zip}</p>
                    <div className="contact-methods">
                      { agency.primaryPhoneNumber && <p className="primary-phone">
                        <a href={`tel:${agency.primaryPhoneNumber}`}><i className="fa fa-phone-square" />{normalizePhone(agency.primaryPhoneNumber)}</a>
                      </p> }
                      { agency.secondaryPhoneNumber && <p className="primary-phone">
                        <a href={`tel:${agency.secondaryPhoneNumber}`}><i className="fa fa-phone-square" />{normalizePhone(agency.secondaryPhoneNumber)}</a>
                      </p> }
                      { agency.faxNumber && <p className="fax">
                        <a href={`tel:${agency.faxNumber}`}><i className="fa fa-fax" />{normalizePhone(agency.faxNumber)}</a>
                      </p> }
                      { agency.customerServiceEmailAddress && <p className="email">
                        <a href={`mailto:${agency.customerServiceEmailAddress}`}><i className="fa fa-envelope" />{agency.customerServiceEmailAddress}</a>
                      </p> }
                    </div>
                    <div className="additional-contacts">
                      <ul>
                        <li>
                          <div>
                            <h5>{`${agency.principalFirstName} ${agency.principalLastName}`}</h5>
                            <span>Principal</span>
                          </div>
                          <div className="contact-methods">
                            { agency.principalEmailAddress && <p><a href={`mailto:${agency.principalEmailAddress}`}><i className="fa fa-envelope" />{agency.principalEmailAddress}</a></p> }
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="agent contact card">
                  <div className="contact-title"><i className="fa fa-address-card" /><label>Agent</label></div>
                  <div className="contact-details">
                    <h4>{`${selectedAgent.firstName} ${selectedAgent.lastName}`}</h4>
                    <p>{selectedAgent.mailingAddress.address1}{selectedAgent.mailingAddress.address2 ? ` ,${selectedAgent.mailingAddress.address2}` : ''}, {selectedAgent.mailingAddress.city}, {selectedAgent.mailingAddress.state} {selectedAgent.mailingAddress.zip}</p>
                    <div className="contact-methods">
                      { selectedAgent.primaryPhoneNumber && <p className="primary-phone">
                        <a href={`tel:${selectedAgent.primaryPhoneNumber}`}><i className="fa fa-phone-square" />{normalizePhone(selectedAgent.primaryPhoneNumber)}</a>
                      </p> }
                      { selectedAgent.faxNumber && <p className="fax">
                        <a href={`tel:${selectedAgent.faxNumber}`}><i className="fa fa-fax" />{normalizePhone(selectedAgent.faxNumber)}</a>
                      </p> }
                      { selectedAgent.emailAddress && <p className="email">
                        <a href={`mailto:${selectedAgent.emailAddress}`}><i className="fa fa-envelope" />{selectedAgent.emailAddress}</a>
                      </p> }
                    </div>
                  </div>
                </div>
              </section>}
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
  agents: state.service.agents,
  agency: state.service.agency,
  policy: handleGetPolicy(state)
});

const mapDispatchToProps = dispatch => ({
  actions: {
    appStateActions: bindActionCreators(appStateActions, dispatch),
    serviceActions: bindActionCreators(serviceActions, dispatch)
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(PolicyholderAgent);
