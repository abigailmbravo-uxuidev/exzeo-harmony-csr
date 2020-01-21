import React, { Component } from 'react';
import { FieldArray, FormSection } from 'redux-form';
import {
  Button,
  Form,
  Field,
  Date,
  Input,
  Select,
  FormSpy,
  OnChangeListener,
  date,
  composeValidators,
  validation
} from '@exzeo/core-ui';
import { Redirect } from 'react-router-dom';

import ExistingAgentModal from '../components/ExistingAgentModal';
import License from '../components/License';
import Agent from '../components/FormGroup/Agent';
import Contact from '../components/FormGroup/Contact';
import AgencyDetails from './AgencyDetails';
import Footer from '../../../components/Common/Footer';
import AddressGroup from '../components/AddressGroup';
import NavigationPrompt from 'components/NavigationPrompt';

export class Create extends Component {
  state = {
    showAddExistingAgentModal: false
  };
  createAgency = async (data, dispatch, props) => {
    data.agentOfRecord.status = 'Active';
    data.mailingAddress.country = {
      code: 'USA',
      displayText: 'United States of America'
    };
    data.physicalAddress.country = data.mailingAddress.country;
    data.agentOfRecord.mailingAddress = data.mailingAddress;
    await this.props.createAgency(data);
  };

  handleToggleExistingAgentModal = () => {
    this.setState({
      showAddExistingAgentModal: !this.state.showAddExistingAgentModal
    });
  };

  // TODO : Move to utilities
  handleSameAsMailing = (value, previousValue, allValues) => {
    const { change } = this.props;
    const { mailingAddress } = allValues;
    if (!mailingAddress) return value;
    if (value) {
      change('physicalAddress.address1', mailingAddress.address1);
      change('physicalAddress.address2', mailingAddress.address2);
      change('physicalAddress.city', mailingAddress.city);
      change('physicalAddress.state', mailingAddress.state);
      change('physicalAddress.zip', mailingAddress.zip);
    } else {
      change('physicalAddress.address1', '');
      change('physicalAddress.address2', '');
      change('physicalAddress.city', '');
      change('physicalAddress.state', '');
      change('physicalAddress.zip', '');
    }
    return value;
  };

  handleResetForm = () => {
    this.props.reset();
    window.close();
  };

  // TODO : Move to utilities
  applyOrphanedAgent = data => {
    const { change, orphans } = this.props;
    const { selectedAgentCode } = data;
    const selectedAgent = orphans.filter(
      a => String(a.agentCode) === String(selectedAgentCode)
    )[0];
    change('agentOfRecord.firstName', selectedAgent.firstName);
    change('agentOfRecord.lastName', selectedAgent.lastName);
    change(
      'agentOfRecord.primaryPhoneNumber',
      selectedAgent.primaryPhoneNumber
    );
    change(
      'agentOfRecord.secondaryPhoneNumber',
      selectedAgent.secondaryPhoneNumber
    );
    change('agentOfRecord.faxNumber', selectedAgent.faxNumber);
    change('agentOfRecord.emailAddress', selectedAgent.emailAddress);
    change('agentOfRecord.agentCode', selectedAgent.agentCode);

    this.handleToggleExistingAgentModal();
  };

  render() {
    const {
      licenseValue,
      sameAsMailingValue,
      sameAsMailingAORValue,
      submitting,
      pristine,
      change,
      agency,
      orphans,
      listAnswersAsKey,
      history
    } = this.props;

    return (
      <div className="route-content-wrapper">
        <div className="route-content">
          <div className="scroll">
            <div className="form-group survey-wrapper" role="group">
              <Form
                id="DiaryModal"
                initialValues={{
                  status: 'Active',
                  okToPay: true,
                  mailingAddress: {},
                  physicalAddress: {},
                  agentOfRecord: {
                    sameAsMailing: false,
                    licenses: [
                      {
                        state: '',
                        license: '',
                        licenseType: '',
                        licenseEffectiveDate: '',
                        appointed: false
                      }
                    ]
                  }
                }}
                onSubmit={this.createAgency}
                subscription={{ submitting: true, values: true, dirty: true }}
              >
                {({
                  form,
                  handleSubmit,
                  submitting,
                  values: formValues,
                  dirty
                }) => (
                  <form id="createAgency" onSubmit={handleSubmit}>
                    <NavigationPrompt
                      dirty={dirty}
                      formInstance={form}
                      history={history}
                    />
                    {agency &&
                      agency.agencyCode &&
                      agency.agencyCode !== 'new' && (
                        <Redirect
                          replace
                          to={`/agency/${agency.agencyCode}/0/contracts`}
                        />
                      )}
                    <h3>Details</h3>
                    <section
                      className="agency-details"
                      data-test="agency-details"
                    >
                      <AgencyDetails />
                    </section>
                    <h3>Address</h3>
                    {/* <AddressGroup
                  sameAsMailingValue={sameAsMailingValue}
                  changeField={change}
                  dataTest="agency"
                  isAgency
                  showCounty
                /> */}
                    <h3>Officer</h3>
                    <section
                      className="agency-principal"
                      data-test="agency-principal"
                    >
                      {/* <FormSection name="principal">
                    <Contact />
                  </FormSection> */}
                    </section>
                    <h3>Contact</h3>
                    <section
                      className="agency-contact"
                      data-test="agency-contact"
                    >
                      {/* <FormSection name="contact">
                    <Contact showTitle />
                  </FormSection> */}
                    </section>
                    <h3>
                      Agent Of Record
                      <button
                        onClick={this.handleToggleExistingAgentModal}
                        type="button"
                        className="btn btn-link btn-sm"
                      >
                        <i className="fa fa-user" />
                        Use Existing Agent
                      </button>
                    </h3>
                    <section className="agency-aor" data-test="agent-of-record">
                      <div className="agent-of-record">
                        {/* <FormSection name="agentOfRecord">
                      <Agent />
                      <AddressGroup
                        parentFormGroup="agentOfRecord"
                        sameAsMailingValue={sameAsMailingAORValue}
                        changeField={change}
                        dataTest="aor"
                        isOptional
                      />
                    </FormSection> */}
                      </div>
                      <div className="agency-license">
                        {/* <FieldArray
                      stateAnswers={listAnswersAsKey.US_states}
                      name="agentOfRecord.licenses"
                      component={License}
                      licenseValue={licenseValue}
                      isAgency
                    /> */}
                      </div>
                    </section>
                  </form>
                )}
              </Form>
            </div>
          </div>
        </div>
        <div className="basic-footer btn-footer">
          <Footer />
          <div className="btn-wrapper">
            <Button
              className={Button.constants.classNames.secondary}
              data-test="resetButton"
              onClick={this.handleResetForm}
            >
              Cancel
            </Button>
            <Button
              className={Button.constants.classNames.primary}
              form="createAgency"
              data-test="submitButton"
              type="submit"
              disabled={submitting || pristine}
            >
              Save
            </Button>
          </div>
        </div>
        {this.state.showAddExistingAgentModal && (
          <ExistingAgentModal
            listOfAgents={orphans}
            onToggleModal={this.handleToggleExistingAgentModal}
            handleSelection={this.applyOrphanedAgent}
            header="Exisiting Agent"
          />
        )}
      </div>
    );
  }
}

export default Create;
