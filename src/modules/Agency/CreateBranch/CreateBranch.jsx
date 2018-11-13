import React, { Component } from 'react';
import { FieldArray, FormSection } from 'redux-form';
import { Button } from '@exzeo/core-ui';

import ExistingAgentModal from '../components/ExistingAgentModal';
import Agent from '../components/FormGroup/Agent';
import Contact from '../components/FormGroup/Contact';
import License from '../components/License';
import history from '../../../history';
import Footer from '../../../components/Common/Footer';
import AddressGroup from '../components/AddressGroup';

import BranchDetails from './BranchDetails';

export class CreateBranch extends Component {
  state = {
    showAddExistingAgentModal: false
  }
  handleCreateBranch = async (data, dispatch, props) => {
    data.mailingAddress.country = {
      code: 'USA',
      displayText: 'United States of America'
    };
    data.agentOfRecord = this.props.agency.agentOfRecord;
    const branch = await this.props.createBranch(data, this.props.agency.agencyCode);
    history.push(`/agency/${this.props.agency.agencyCode}/${branch.branchCode}/overview`);
  };

  handleToggleExistingAgentModal = () => {
    this.setState({ showAddExistingAgentModal: !this.state.showAddExistingAgentModal });
  }

  handleResetForm = () => {
    this.props.reset();
    history.push(`/agency/${this.props.agency.agencyCode}/${this.props.branchCode}/overview`);
  };

  // TODO : Move to utilities
  applyOrphanedAgent = (data) => {
    const { change, orphans } = this.props;
    const { selectedAgentCode } = data;
    const selectedAgent = orphans.filter(a => String(a.agentCode) === String(selectedAgentCode))[0];
    change('agentOfRecord.firstName', selectedAgent.firstName);
    change('agentOfRecord.lastName', selectedAgent.lastName);
    change('agentOfRecord.primaryPhoneNumber', selectedAgent.primaryPhoneNumber);
    change('agentOfRecord.secondaryPhoneNumber', selectedAgent.secondaryPhoneNumber);
    change('agentOfRecord.faxNumber', selectedAgent.faxNumber);
    change('agentOfRecord.emailAddress', selectedAgent.emailAddress);
    change('agentOfRecord.agentCode', selectedAgent.agentCode);

    this.handleToggleExistingAgentModal();
  }

  render() {
    const {
      handleSubmit,
      licenseValue,
      submitting,
      pristine,
      change,
      orphans,
      sameAsMailingValue
    } = this.props;

    return (
      <div className="route-content-wrapper new-branch">
        <div className="route-content">
          <div className="scroll">
            <div className="form-group survey-wrapper" role="group">
              <form id="createBranch" onSubmit={handleSubmit(this.handleCreateBranch)}>
                <h3>Details</h3>
                <section className="agency-details">
                  <BranchDetails />
                  {/* web address validaiton */}
                </section>
                <h3>Address</h3>
                <AddressGroup sameAsMailingValue={sameAsMailingValue} changeField={change} />
                <h3>Contact</h3>
                <section className="agency-contact">
                  <FormSection name="contact" >
                    <Contact testPrefix="contact" />
                  </FormSection>
                </section>
                <h3>Agent Of Record <button onClick={this.handleToggleExistingAgentModal} className="btn btn-link btn-sm"><i className="fa fa-user" />Use Existing Agent</button></h3>
                <section className="agency-aor">
                  <div className="agent-of-record">
                    <FormSection name="agentOfRecord">
                      <Agent />
                    </FormSection>
                  </div>
                  <div className="agency-license">
                    <FieldArray
                      name="licenses"
                      component={License}
                      licenseValue={licenseValue}
                      isAgency />
                  </div>
                </section>
              </form>
            </div>
          </div>
        </div>
        <div className="basic-footer btn-footer">
          <Footer />
          <div className="btn-wrapper">
            <Button dataTest="resetButton" baseClass="secondary" onClick={this.handleResetForm}>Cancel</Button>
            <Button form="createBranch" dataTest="submitButton" baseClass="primary" type="submit" disabled={submitting || pristine}>Save</Button>
          </div>
        </div>
        {this.state.showAddExistingAgentModal &&
        <ExistingAgentModal
          listOfAgents={orphans}
          onToggleModal={this.handleToggleExistingAgentModal}
          handleSelection={this.applyOrphanedAgent} />
      }
      </div>
    );
  }
}

export default CreateBranch;
