import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Loader } from '@exzeo/core-ui';

import { getAgency, getAgentList } from '../../state/actions/agency.actions';
import normalizePhone from '../Form/normalizePhone';
import Footer from '../Common/Footer';

export class PolicyholderAgent extends Component {
  componentDidMount() {
    const { getAgencyAction, getAgentListAction, policy } = this.props;

    if (policy && policy.companyCode && policy.state && policy.agencyCode) {
      getAgentListAction(policy.companyCode, policy.state);
      getAgencyAction(policy.agencyCode);
    }
  }

  render() {
    const {
      agency,
      agents,
      policy,
      policy: {
        policyHolders,
        policyHolderMailingAddress
      }
    } = this.props;

    if (!(agents && agents.length && agency)) return <Loader />;

    const selectedAgent = agents.find(a => a.agentCode === policy.agentCode);

    return (
      <React.Fragment>
        <div className="route-content">
          <div className="scroll">
            <div className="form-group survey-wrapper" role="group">
              <section className="policyholder-cards">
                <h3>Policyholder</h3>
                {policyHolders && policyHolders.map((policyHolder, index) => (<div key={index} className="primary-policyholder contact card">
                  <div className="contact-title"><i className="fa fa-address-card-o" /><label>Policyholder {index + 1}</label></div>
                  <div className="contact-details">
                    <h4>{`${policyHolder.firstName} ${policyHolder.lastName}`}</h4>
                    <div className="contact-address">{`${policyHolderMailingAddress.address1} ${policyHolderMailingAddress.address2 ? policyHolderMailingAddress.address2 : ''}
${policyHolderMailingAddress.city}, ${policyHolderMailingAddress.state} ${policyHolderMailingAddress.zip}`}
                    </div>
                    <div className="additional-contacts">
                      <ul>
                        <li>
                          <div className="contact-methods">
                            <p className="primary-phone">
                              <i className="fa fa-phone-square" />
                              <a href={`tel: ${(policyHolder.primaryPhoneNumber)}`}>{normalizePhone(policyHolder.primaryPhoneNumber)}</a>
                            </p>
                            {policyHolder.secondaryPhoneNumber && <p className="secondary-phone">
                              <small>2<sup>ND</sup><i className="fa fa-phone" /></small>
                              <a href={`tel: ${policyHolder.secondaryPhoneNumber}`}>{normalizePhone(policyHolder.secondaryPhoneNumber)}</a>
                                                                   </p>}
                            <p className="email">
                              <i className="fa fa-envelope" />
                              <a href={`mailto: ${policyHolder.emailAddress}?subject=${policy.policyNumber}%20${policyHolders[0].firstName}%20${policyHolders[0].lastName}`}>{policyHolder.emailAddress}</a>
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="electronic-delivery"><label>Electronic Delivery: </label> {policyHolder.electronicDelivery ? 'Yes' : 'No'}</div>
                                                                               </div>))}
              </section>
              {agency && selectedAgent && <section className="agency-cards">
                <h3>Agency / Agent</h3>
                <div className="agency contact card">
                  <div className="contact-title"><i className="fa fa-address-book" /><label>Agency</label></div>
                  <div className="contact-details">
                    <h4 className="agency"><span className="agency-code">{agency.agencyCode}</span> | <span className="agency-display-name">{agency.displayName}</span> | <span className="agency-legal-name">{agency.legalName}</span> | <span className="agency-license">{agency.licenseNumber}</span></h4>
                    <div className="contact-address">{agency.mailingAddress.address1}{agency.mailingAddress.address2 ? ` ,${agency.mailingAddress.address2}` : ''}, {agency.mailingAddress.city}, {agency.mailingAddress.state} {agency.mailingAddress.zip}
                      {agency.status ? <span className="additional-data status"><label>STATUS:&nbsp;</label>{agency.status}</span> : null}
                      <span className="additional-data tier"><label>TIER:&nbsp;</label>{agency.tier >= 0 ? agency.tier : ''}</span>
                      {agency.websiteUrl ? <span className="additional-data website"><label>WEBSITE:&nbsp;</label><a href={`${agency.websiteUrl}`} target="_blank">{agency.websiteUrl}</a></span> : null}
                    </div>
                    <div className="additional-contacts">
                      <ul>
                        <li>
                          <div>
                            <h5>{agency.contactFirstName} {agency.contactLastName}</h5>
                          </div>
                          <div className="contact-methods">
                            {agency.primaryPhoneNumber && <p className="primary-phone">
                              <i className="fa fa-phone-square" />
                              <a href={`tel:${agency.primaryPhoneNumber}`}>{normalizePhone(agency.primaryPhoneNumber)}</a>
                                                           </p>}
                            {agency.secondaryPhoneNumber && <p className="secondary-phone">
                              <small>2<sup>ND</sup><i className="fa fa-phone" /></small>
                              <a href={`tel:${agency.secondaryPhoneNumber}`}>{normalizePhone(agency.secondaryPhoneNumber)}</a>
                                                             </p>}
                            {agency.faxNumber && <p className="fax">
                              <i className="fa fa-fax" />
                              <a href={`tel:${agency.faxNumber}`}>{normalizePhone(agency.faxNumber)}</a>
                                                  </p>}
                            {agency.contactEmailAddress ?
                              <p>
                                <i className="fa fa-envelope" />
                                <a href={`mailto:${agency.contactEmailAddress}?subject=${policy.policyNumber}%20${policyHolders[0].firstName}%20${policyHolders[0].lastName}`}>{agency.contactEmailAddress}</a>
                              </p> : null}
                            {agency.customerServiceEmailAddress && <p className="phone csr-phone">
                              <span className="contact-divider">|</span>
                              <small>CSR <i className="fa fa-envelope" /></small>
                              <a href={`mailto:${agency.customerServiceEmailAddress}?subject=${policy.policyNumber}%20${policyHolders[0].firstName}%20${policyHolders[0].lastName}`}>{agency.customerServiceEmailAddress}</a>
                                                                    </p>}
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="agent contact card">
                  <div className="contact-title"><i className="fa fa-address-card" /><label>Agent</label></div>
                  <div className="contact-details">
                    <h4><span className="agent-code">{selectedAgent.agentCode}</span> | <span className="agent-name">{`${selectedAgent.firstName} ${selectedAgent.lastName}`}</span> | <span className="agent-license">{selectedAgent.licenseNumber}</span></h4>
                    <div className="contact-address">{selectedAgent.mailingAddress.address1}{selectedAgent.mailingAddress.address2 ? ` ,${selectedAgent.mailingAddress.address2}` : ''}, {selectedAgent.mailingAddress.city}, {selectedAgent.mailingAddress.state} {selectedAgent.mailingAddress.zip}</div>
                    <div className="additional-contacts">
                      <ul>
                        <li>
                          <div className="contact-methods">
                            {selectedAgent.primaryPhoneNumber && <p className="primary-phone">
                              <i className="fa fa-phone-square" />
                              <a href={`tel:${selectedAgent.primaryPhoneNumber}`}>{normalizePhone(selectedAgent.primaryPhoneNumber)}</a>
                                                                  </p>}
                            {selectedAgent.faxNumber && <p className="fax">
                              <i className="fa fa-fax" />
                              <a href={`tel:${selectedAgent.faxNumber}`}>{normalizePhone(selectedAgent.faxNumber)}</a>
                                                         </p>}
                            {selectedAgent.emailAddress && <p className="email">
                              <i className="fa fa-envelope" />
                              <a href={`mailto:${selectedAgent.emailAddress}?subject=${policy.policyNumber}%20${policyHolders[0].firstName}%20${policyHolders[0].lastName}`}>{selectedAgent.emailAddress}</a>
                                                            </p>}
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                                           </section>}
            </div>
          </div>
        </div>
        <div className="basic-footer">
          <Footer />
        </div>
      </React.Fragment>
    );
  }
}

PolicyholderAgent.propTypes = {
  policy: PropTypes.object,
  agents: PropTypes.array,
  agency: PropTypes.object
};

PolicyholderAgent.defaultProps = {
  policy: {}
};

const mapStateToProps = state => ({
  agents: state.service.agents,
  agency: state.service.agency,
  policy: state.policyState.policy || {}
});

export default connect(mapStateToProps, {
  getAgencyAction: getAgency,
  getAgentListAction: getAgentList
})(PolicyholderAgent);
