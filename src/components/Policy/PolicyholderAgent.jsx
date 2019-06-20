import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Loader } from '@exzeo/core-ui';

import ContactAddress from '../ContactAddress';
import {
  getAgency,
  getAgentsByAgencyCode
} from '../../state/actions/agency.actions';
import normalizePhone from '../Form/normalizePhone';
import Footer from '../Common/Footer';
import TransferAOR from './TransferAOR';

export class PolicyholderAgent extends Component {
  state = { showTransferAOR: false };

  componentDidMount() {
    const { getAgencyAction, getAgentsByAgencyCode, policy } = this.props;

    if (policy && policy.companyCode && policy.state && policy.agencyCode) {
      getAgentsByAgencyCode(policy.agencyCode);
      getAgencyAction(policy.agencyCode);
    }
  }

  handleToggleTransferAOR = () => {
    this.setState(state => ({ showTransferAOR: !state.showTransferAOR }));
  };

  render() {
    const {
      agency,
      agents,
      policy,
      policy: { policyHolders, policyHolderMailingAddress }
    } = this.props;

    if (!(agents && agents.length && agency)) return <Loader />;

    const selectedAgent =
      agents.find(a => a.agentCode === policy.agentCode) || {};
    const { showTransferAOR } = this.state;
    const transferDisabled = !['Policy Issued', 'In Force'].includes(
      policy.status
    );
    const { contact = {}, licenses = [] } = agency;
    const { licenses: agentLicenses = [] } = selectedAgent;

    return (
      <React.Fragment>
        {showTransferAOR && (
          <TransferAOR
            toggleModal={this.handleToggleTransferAOR}
            policyNumber={policy.policyNumber}
            companyCode={policy.companyCode}
            state={policy.state}
            agencyCode={policy.agencyCode}
            agentCode={policy.agentCode}
          />
        )}
        <div className="route-content">
          <div className="scroll">
            <div className="form-group survey-wrapper" role="group">
              <section className="policyholder-cards">
                <h3>Policyholder</h3>
                {policyHolders &&
                  policyHolders.map((policyHolder, index) => (
                    <div
                      key={index}
                      className="primary-policyholder contact card"
                    >
                      <div className="contact-title">
                        <i className="fa fa-address-card-o" />
                        <label>Policyholder {index + 1}</label>
                      </div>
                      <div className="contact-details">
                        <h4>{`${policyHolder.firstName} ${policyHolder.lastName}`}</h4>
                        <ContactAddress
                          mailingAddress={policyHolderMailingAddress}
                        />
                        <div className="additional-contacts">
                          <ul>
                            <li>
                              <div className="contact-methods">
                                <p className="primary-phone">
                                  <i className="fa fa-phone-square" />
                                  <a
                                    href={`tel: ${policyHolder.primaryPhoneNumber}`}
                                  >
                                    {normalizePhone(
                                      policyHolder.primaryPhoneNumber
                                    )}
                                  </a>
                                </p>
                                {policyHolder.secondaryPhoneNumber && (
                                  <p className="secondary-phone">
                                    <small>
                                      2<sup>ND</sup>
                                      <i className="fa fa-phone" />
                                    </small>
                                    <a
                                      href={`tel: ${policyHolder.secondaryPhoneNumber}`}
                                    >
                                      {normalizePhone(
                                        policyHolder.secondaryPhoneNumber
                                      )}
                                    </a>
                                  </p>
                                )}
                                <p className="email">
                                  <i className="fa fa-envelope" />
                                  <a
                                    href={`mailto: ${policyHolder.emailAddress}?subject=${policy.policyNumber}%20${policyHolders[0].firstName}%20${policyHolders[0].lastName}`}
                                  >
                                    {policyHolder.emailAddress}
                                  </a>
                                </p>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="electronic-delivery">
                        <label>Electronic Delivery: </label>{' '}
                        {policyHolder.electronicDelivery ? 'Yes' : 'No'}
                      </div>
                    </div>
                  ))}
              </section>
              {agency && selectedAgent && (
                <section className="agency-cards">
                  <h3>
                    Agency / Agent{' '}
                    <button
                      className="btn btn-link btn-sm"
                      onClick={this.handleToggleTransferAOR}
                      disabled={transferDisabled}
                    >
                      <i className="fa fa-exchange" />
                      Change AOR
                    </button>
                  </h3>
                  <div className="agency contact card">
                    <div className="contact-title">
                      <i className="fa fa-address-book" />
                      <label>Agency</label>
                    </div>
                    <div className="contact-details">
                      <h4 className="agency">
                        <span className="agency-code">
                          {agency.agencyCode}{' '}
                        </span>
                        |{' '}
                        <span className="agency-display-name">
                          {agency.displayName}{' '}
                        </span>
                        |{' '}
                        <span className="agency-legal-name">
                          {agency.legalName}
                        </span>
                        {licenses.map(l => (
                          <React.Fragment key={l.licenseNumber}>
                            {' '}
                            |{' '}
                            <span className="agency-license">
                              {l.licenseNumber}
                            </span>
                          </React.Fragment>
                        ))}
                      </h4>
                      <ContactAddress
                        mailingAddress={agency.mailingAddress}
                        status={agency.status}
                      >
                        <span className="additional-data tier">
                          <label>TIER:&nbsp;</label>
                          {agency.tier >= 0 ? agency.tier : ''}
                        </span>
                        {agency.websiteUrl ? (
                          <span className="additional-data website">
                            <label>WEBSITE:&nbsp;</label>
                            <a href={`${agency.websiteUrl}`} target="_blank">
                              {agency.websiteUrl}
                            </a>
                          </span>
                        ) : null}
                      </ContactAddress>
                      <div className="additional-contacts">
                        <ul>
                          <li>
                            <div>
                              <h5>
                                {contact.firstName} {contact.lastName}
                              </h5>
                            </div>
                            <div className="contact-methods">
                              {agency.primaryPhoneNumber && (
                                <p className="primary-phone">
                                  <i className="fa fa-phone-square" />
                                  <a href={`tel:${agency.primaryPhoneNumber}`}>
                                    {normalizePhone(agency.primaryPhoneNumber)}
                                  </a>
                                </p>
                              )}
                              {agency.secondaryPhoneNumber && (
                                <p className="secondary-phone">
                                  <small>
                                    2<sup>ND</sup>
                                    <i className="fa fa-phone" />
                                  </small>
                                  <a
                                    href={`tel:${agency.secondaryPhoneNumber}`}
                                  >
                                    {normalizePhone(
                                      agency.secondaryPhoneNumber
                                    )}
                                  </a>
                                </p>
                              )}
                              {agency.faxNumber && (
                                <p className="fax">
                                  <i className="fa fa-fax" />
                                  <a href={`tel:${agency.faxNumber}`}>
                                    {normalizePhone(agency.faxNumber)}
                                  </a>
                                </p>
                              )}
                              {contact.emailAddress && policyHolders[0] ? (
                                <p>
                                  <i className="fa fa-envelope" />
                                  <a
                                    href={`mailto:${contact.emailAddress}?subject=${policy.policyNumber}%20${policyHolders[0].firstName}%20${policyHolders[0].lastName}`}
                                  >
                                    {contact.emailAddress}
                                  </a>
                                </p>
                              ) : null}
                              {agency.customerServiceEmailAddress && (
                                <p className="phone csr-phone">
                                  <span className="contact-divider">|</span>
                                  <small>
                                    CSR <i className="fa fa-envelope" />
                                  </small>
                                  <a
                                    href={`mailto:${agency.customerServiceEmailAddress}?subject=${policy.policyNumber}%20${policyHolders[0].firstName}%20${policyHolders[0].lastName}`}
                                  >
                                    {agency.customerServiceEmailAddress}
                                  </a>
                                </p>
                              )}
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="agent contact card">
                    <div className="contact-title">
                      <i className="fa fa-address-card" />
                      <label>Agent</label>
                    </div>
                    <div className="contact-details">
                      <h4>
                        <span className="agent-code">
                          {selectedAgent.agentCode}{' '}
                        </span>
                        |{' '}
                        <span className="agent-name">{`${selectedAgent.firstName} ${selectedAgent.lastName}`}</span>
                        {agentLicenses.map(l => (
                          <React.Fragment key={l.licenseNumber}>
                            {' '}
                            |{' '}
                            <span className="agent-license">
                              {l.licenseNumber}
                            </span>
                          </React.Fragment>
                        ))}
                      </h4>
                      <ContactAddress
                        mailingAddress={selectedAgent.mailingAddress}
                      />
                      <div className="additional-contacts">
                        <ul>
                          <li>
                            <div className="contact-methods">
                              {selectedAgent.primaryPhoneNumber && (
                                <p className="primary-phone">
                                  <i className="fa fa-phone-square" />
                                  <a
                                    href={`tel:${selectedAgent.primaryPhoneNumber}`}
                                  >
                                    {normalizePhone(
                                      selectedAgent.primaryPhoneNumber
                                    )}
                                  </a>
                                </p>
                              )}
                              {selectedAgent.faxNumber && (
                                <p className="fax">
                                  <i className="fa fa-fax" />
                                  <a href={`tel:${selectedAgent.faxNumber}`}>
                                    {normalizePhone(selectedAgent.faxNumber)}
                                  </a>
                                </p>
                              )}
                              {selectedAgent.emailAddress && (
                                <p className="email">
                                  <i className="fa fa-envelope" />
                                  <a
                                    href={`mailto:${selectedAgent.emailAddress}?subject=${policy.policyNumber}%20${policyHolders[0].firstName}%20${policyHolders[0].lastName}`}
                                  >
                                    {selectedAgent.emailAddress}
                                  </a>
                                </p>
                              )}
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>
              )}
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
  agents: state.agencyState.agents,
  agency: state.agencyState.agency,
  policy: state.policyState.policy || {}
});

export default connect(
  mapStateToProps,
  {
    getAgencyAction: getAgency,
    getAgentsByAgencyCode
  }
)(PolicyholderAgent);
