import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Radio, Input, Phone, AutocompleteChips, Integer } from '@exzeo/core-ui/lib/Input';
import { validation } from '@exzeo/core-ui/lib/InputLifecycle';

const radioStatusAnswers = [
  { answer: 'Inactive', label: 'Inactive' },
  { answer: 'Active', label: 'Active' }
];

const radioDefaultAnswers = [
  { answer: 'true', label: 'Yes' },
  { answer: 'false', label: 'No' }
];

export class AgentModal extends Component {
  update = async (data, dispatch, props) => {
    const { createdBy, createdAt, ...agent } = data;
    await props.updateAgent(agent, props.agency);
    await this.applyLicenseToAgency(data, props);
    props.toggleModal('')();
  };
  add = async (data, dispatch, props) => {
    const { createdBy, createdAt, ...agent } = data;
    await props.addAgent(agent, props.agency);
    await this.applyLicenseToAgency(data, props);
    props.toggleModal('')();
  };

  // TODO: Clean up this logic!
  applyLicenseToAgency = async (data, props) => {
    const { agency } = props;
    data.agencyLicense.forEach((l) => {
      const license = agency.license.find(li => li.licenseNumber === l);
      const selectedAgent = license && license.agent ? license.agent.find(a => a.agentCode === data.agentCode) : null;

      if (license && license.agent && !selectedAgent) {
        license.agent.push({
          agentCode: data.agentCode,
          appointed: String(data.appointed) === 'true',
          agentOfRecord: String(data.agentOfRecord) === 'true'
        });
        const licenseIndex = agency.license.findIndex(li => li.licenseNumber === l);
        if (licenseIndex !== -1) {
          agency.license.splice(licenseIndex, 1, license);
        }
      } else if (license && license.agent && selectedAgent) {
        const agentIndex = license.agent.findIndex(a => a.agentCode === data.agentCode);
        selectedAgent.appointed = String(data.appointed) === 'true';
        selectedAgent.agentOfRecord = String(data.agentOfRecord) === 'true';
        selectedAgent.agentInfo = data;
        if (agentIndex !== -1) {
          license.agent.splice(agentIndex, 1, selectedAgent);
        }
        const licenseIndex = agency.license.findIndex(li => li.licenseNumber === l);
        if (licenseIndex !== -1) {
          agency.license.splice(licenseIndex, 1, license);
        }
      }
    });
    const { createdAt, createdBy, ...selectedAgency } = agency;
    await props.updateAgency(selectedAgency);
  }

  render() {
    const {
      toggleModal,
      handleSubmit,
      editType,
      submitting,
      agencyLicenseArray,
      existsInAgencyLicense
    } = this.props;

    return (
      <div className="modal agent-crud">
        <form onSubmit={handleSubmit(editType === 'Edit' ? this.update : this.add)}>
          <div className="card">
            <div className="card-header">
              <h4>
                <i className="fa fa-address-book" /> {editType === 'Edit' ? 'Edit ' : 'New '}
            Agent
              </h4>
            </div>
            <div className="card-block">
              <section className="agent-details">
                <h4>Agent Information</h4>

                <div className="flex-form">
                  <Field
                    label="Agent ID"
                    styleName="agentCode"
                    name="agentCode"
                    validate={[validation.isRequired, validation.isNumbersOnly]}
                    disabled={editType === 'Edit'}
                    component={Integer}
                    thousandSeparator={false}
                  />
                  <Field
                    label="License Number"
                    styleName="licenseNumber"
                    name="license[0].licenseNumber"
                    component={Input}
                    validate={validation.isRequired}
                  />
                  <Field
                    label="State"
                    styleName="state"
                    name="license[0].state"
                    component={Input}
                    validate={validation.isRequired}
                  />
                </div>
                <div className="flex-form">
                  <Field
                    label="First Name"
                    styleName="firstName"
                    name="firstName"
                    component={Input}
                    validate={validation.isRequired}
                  />
                  <Field
                    label="Last Name"
                    styleName="lastName"
                    name="lastName"
                    component={Input}
                    validate={validation.isRequired}
                  />
                  <Field
                    label="Agent Of Record"
                    styleName="agentOfRecord"
                    name="agentOfRecord"
                    component={Radio}
                    segmented
                    answers={radioDefaultAnswers}
                    validate={validation.isRequired}
                  />
                  <Field
                    label="Appointed"
                    styleName="appointed"
                    name="appointed"
                    component={Radio}
                    segmented
                    answers={radioDefaultAnswers}
                    validate={validation.isRequired}
                  />
                </div>
                <div className="flex-form">
                  <Field
                    label="Primary Phone"
                    styleName="primaryPhoneNumber"
                    name="primaryPhoneNumber"
                    component={Phone}
                    validate={validation.isRequired}
                  />
                  <Field
                    label="Secondary Phone"
                    styleName="secondaryPhoneNumber"
                    name="secondaryPhoneNumber"
                    component={Phone}
                  />
                  <Field
                    label="Fax Number"
                    styleName="faxNumber"
                    name="faxNumber"
                    component={Phone}
                  />
                </div>
                <div className="flex-form">
                  <Field
                    label="Status"
                    styleName="status"
                    name="status"
                    component={Radio}
                    segmented
                    answers={radioStatusAnswers}
                    validate={validation.isRequired}
                  />
                  <Field
                    label="Email Address"
                    styleName="emailAddress"
                    name="emailAddress"
                    component={Input}
                    validate={[validation.isRequired, validation.isEmail]}
                  />
                  <Field
                    label="Agency License"
                    styleName="agencyLicense"
                    name="agencyLicense"
                    autoSuggest={agencyLicenseArray}
                    component={AutocompleteChips}
                    validate={[validation.isRequiredArray, existsInAgencyLicense]}
                  />
                </div>
              </section>
              <section className="agent-address">
                <div className="agent-mailing-address">
                  <h4>Mailing Address</h4>
                  <Field
                    label="Address 1"
                    styleName="mailingAddress1"
                    name="mailingAddress.address1"
                    component={Input}
                    validate={validation.isRequired}
                  />
                  <Field
                    label="Address 2"
                    styleName="mailingAddress2"
                    name="mailingAddress.address2"
                    component={Input}
                  />
                  <div className="flex-form">
                    <Field
                      label="City"
                      styleName="mailingCity"
                      name="mailingAddress.city"
                      component={Input}
                      validate={validation.isRequired}
                    />
                    <Field
                      label="State"
                      styleName="mailingState"
                      name="mailingAddress.state"
                      component={Input}
                      validate={validation.isRequired}
                    />
                    <Field
                      label="Zip Code"
                      styleName="mailingZip"
                      name="mailingAddress.zip"
                      component={Input}
                      validate={[validation.isRequired, validation.isZipCode]}
                    />
                  </div>
                </div>
              </section>
            </div>
            <div className="card-footer">
              <div className="btn-footer">
                <button
                  tabIndex="0"
                  className="btn btn-secondary"
                  type="button"
                  onClick={toggleModal()}
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


export default reduxForm({ form: 'AgentModal', enableReinitialize: true })(AgentModal);
