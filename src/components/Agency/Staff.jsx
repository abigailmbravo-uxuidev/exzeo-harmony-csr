import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// import _ from 'lodash';
// import moment from 'moment';
import localStorage from 'localStorage';
import {reduxForm, propTypes} from 'redux-form';
// import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import * as serviceActions from '../../actions/serviceActions';
import AgencyConnect from '../../containers/Agency';
import ClearErrorConnect from '../Error/ClearError';
// import normalizeNumbers from '../Form/normalizeNumbers';
import Footer from '../Common/Footer';
import normalizePhone from '../Form/normalizePhone';

const handleInitialize = state => ({agency: state.service.getAgency, agents: state.service.getAgentsByAgency});

export class Staff extends Component {

  componentDidMount() {
    const isNewTab = localStorage.getItem('isNewTab') === 'true';
    if (isNewTab) {
      localStorage.setItem('isNewTab', false);
      const agencyCode = localStorage.getItem('agencyCode');
      this.props.actions.serviceActions.getAgency('TTIC', 'FL', agencyCode);
      this.props.actions.serviceActions.getAgentsByAgency('TTIC', 'FL', agencyCode);
    }
  }

  render() {
    const {agency, agents} = this.props;
    console.log(agents);
    if (!agency) {
      return (<AgencyConnect>
        <ClearErrorConnect/>
      </AgencyConnect>);
    }
    return (<AgencyConnect>
      <ClearErrorConnect/>
      <div className="route-content">
        <div className="scroll">
          <div className="form-group survey-wrapper" role="group">
            <section>
              <h3>Contacts</h3>
              <div className="contact card">
                <div className="contact-title">
                  <i className="fa fa-phone-square"></i>
                  <label>Contact</label>
                </div>
                <div className="contact-details">
                  <h4>{agency.contactFirstName}
                    {agency.contactLastName}</h4>
                  <div className="additional-contacts">
                    <ul>
                      <li>
                        <div className="contact-methods">
                          {
                            agency.primaryPhoneNumber ? <p className="phone">
                              <i className="fa fa-phone-square"/>
                              <a href={`tel:${agency.primaryPhoneNumber}`}>{normalizePhone(agency.primaryPhoneNumber)}</a>
                            </p> : null
                          }
                          {
                            agency.secondaryPhoneNumber ? <p className="phone">
                              <small>2<sup>ND</sup><i className="fa fa-phone"/></small>
                              <a href={`tel:${agency.secondaryPhoneNumber}`}>{normalizePhone(agency.secondaryPhoneNumber)}</a>
                            </p> : null
                          }
                          {
                            agency.faxNumber ? <p className="fax">
                              <i className="fa fa-fax"/>
                              <a href={`tel:${agency.faxNumber}`}>{normalizePhone(agency.faxNumber)}</a>
                            </p> : null
                          }
                          {
                            agency.contactEmailAddress ? <p>
                              <i className="fa fa-envelope"/>
                              <a href={`mailto:${agency.contactEmailAddress}`}>{agency.contactEmailAddress}</a>
                            </p> : null
                          }
                          {
                            agency.customerServiceEmailAddress ? <p className="phone">
                              <span className="contact-divider">|</span>
                              <small>CSR
                                <i className="fa fa-envelope"/></small>
                              <a href={`mailto:${agency.customerServiceEmailAddress}`}>{agency.customerServiceEmailAddress}</a>
                            </p> : null
                          }
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="contact card">
                <div className="contact-title">
                  <i className="fa fa-black-tie"></i>
                  <label>Principal</label>
                </div>
                <div className="contact-details">
                  <h4>{agency.principalFirstName}
                    {agency.principalLastName}</h4>
                  <div className="additional-contacts">
                    <ul>
                      <li>
                        <div className="contact-methods">
                          {
                            agency.principalEmailAddress ? <p>
                              <i className="fa fa-envelope"/>
                              <a href={`mailto:${agency.principalEmailAddress}`}>{agency.principalEmailAddress}</a>
                            </p> : null
                          }
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
            <h3>Agents</h3>
            <section>
            {
              agents.length > 0 ? agents.map((agent, index) => (
                <div className="agency agent contact card" key={index}>
                  <div className="contact-title">
                    <i className="fa fa-address-card margin bottom"/> {
                      agent.agentOfRecord ? <small><i className="card-icon fa fa-bookmark"/>
                        <label>AOR</label>
                      </small> : null
                      }
                      {
                        agent.appointed ? <small><i className="card-icon fa fa-certificate"/>
                          <label>Appointed</label>
                        </small> : null
                      }
                    </div>
                    <div className="contact-details">
                      <div className="card-name">
                        <h4 className="agent">
                          <span className="agent-code">{agent.agentCode}</span> | <span className="agent-name">{agent.firstName}
                            {agent.lastName}</span> | <span className="agent-license">{agent.licenseNumber}</span>
                        </h4>
                        <p className="contact-address">
                          {agent.mailingAddress.address1},&nbsp; {agent.mailingAddress.address2}{
                            agent.mailingAddress.address2 ? ', ' : ' '
                          }
                          {agent.mailingAddress.city},&nbsp; {agent.mailingAddress.state}&nbsp; {agent.mailingAddress.zip}
                          {
                            agent.status ? <small><label>STATUS:&nbsp;</label>{agent.status}</small> : null
                          }
                        </p>
                        <div className="additional-contacts">
                          <ul>
                            <li>
                              <div className="contact-methods">
                                {
                                  agent.primaryPhoneNumber ? <p className="phone">
                                    <i className="fa fa-phone-square"/>
                                    <a href={`tel:${agent.primaryPhoneNumber}`}>{normalizePhone(agent.primaryPhoneNumber)}</a>
                                  </p> : null
                                }
                                {
                                  agent.secondaryPhoneNumber ? <p className="phone">
                                    <small>2<sup>ND</sup><i className="fa fa-phone"/></small>
                                    <a href={`tel:${agent.secondaryPhoneNumber}`}>{normalizePhone(agent.secondaryPhoneNumber)}</a>
                                  </p> : null
                                }
                                {
                                  agent.faxNumber ? <p className="fax">
                                    <i className="fa fa-fax"/>
                                    <a href={`tel:${agent.faxNumber}`}>{normalizePhone(agent.faxNumber)}</a>
                                  </p> : null
                                }
                                {
                                  agent.emailAddress ? <p>
                                    <i className="fa fa-envelope"/>
                                    <a href={`mailto:${agent.emailAddress}`}>{agent.emailAddress}</a>
                                  </p> : null
                                }
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )) : null
            }</section>
          </div>
        </div>
      </div>
      <div className="basic-footer">
        <Footer/>
      </div>
    </AgencyConnect>);
  }
}

/**
------------------------------------------------
Property type definitions
------------------------------------------------
*/
Staff.propTypes = {
  ...propTypes,
  tasks: PropTypes.shape(),
  appState: PropTypes.shape({
    modelName: PropTypes.string,
    instanceId: PropTypes.string,
    data: PropTypes.shape({submitting: PropTypes.boolean})
  })
};

/**
------------------------------------------------
redux mapping
------------------------------------------------
*/
const mapStateToProps = state => ({
  initialValues: handleInitialize(state),
  agency: state.service.agency || {},
  agents: state.service.agents || []

});

const mapDispatchToProps = dispatch => ({
  actions: {
    serviceActions: bindActionCreators(serviceActions, dispatch)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({form: 'Staff'})(Staff));
