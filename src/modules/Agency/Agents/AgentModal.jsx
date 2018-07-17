import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field, FieldArray, FormSection, getFormValues} from 'redux-form';
import Button from '@exzeo/core-ui/lib/Button';
import Address from "../components/Address";
import Details from './Details';
import License from "./License";

const FORM_NAME = 'AgentDetails';

// const radioDefaultAnswers = [
//   {
//     answer: 'true',
//     label: 'Yes'
//   }, {
//     answer: 'false',
//     label: 'No'
//   }
// ];

export class AgentModal extends Component {
  handleSave = async (data) => {
    await this.props.handleSaveAgent(data)
  };

  render() {
    const {
      toggleModal,
      handleSubmit,
      isEditing,
      submitting,
      agencyLicenseArray,
      isInAgencyLicenseArray,
      licenseValue
    } = this.props;

    return (
      <div className="modal agent-crud">
        <div className="card">
          <form onSubmit={handleSubmit(this.handleSave)}>
            <div className="card-header">
              <h4>
                <i className="fa fa-address-book"/>{isEditing ? ' Edit ' : ' New '} Agent
              </h4>
            </div>
            <div className="card-block">
              <section className="agent-details">
                <Details
                  agencyLicenseArray={agencyLicenseArray}
                  isInAgencyLicenseArray={isInAgencyLicenseArray}
                />
                <h4>Mailing Address
                  <Field
                    name="sameAsMailing"
                    component="input"
                    id="sameAsMailing"
                    type="checkbox"
                    normalize={this.handleSameAsMailing}
                    data-test="sameAsMailing"
                  />
                  <label htmlFor="sameAsMailing">Same as Agency Mailing Address</label>
                </h4>

                <FormSection name="mailingAddress">
                  <Address mailingAddress />
                </FormSection>

              </section>
              <section className="agent-license">
                <FieldArray
                  name='license'
                  component={License}
                  licenseValue={licenseValue}
                />
              </section>
            </div>
            <div className="card-footer">
              <div className="btn-footer">
                <Button
                  baseClass="secondary"
                  onClick={toggleModal()}
                >Cancel</Button>
                <Button
                  baseClass="primary"
                  type="submit"
                  disabled={submitting}
                >Save</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const selector = getFormValues(FORM_NAME);
const defaultArr = [];
const mapStateToProps = state => ({
  licenseValue: selector(state, 'license') || defaultArr
});

export default connect(mapStateToProps)(reduxForm({
  form: FORM_NAME,
  enableReinitialize: true
})(AgentModal));
