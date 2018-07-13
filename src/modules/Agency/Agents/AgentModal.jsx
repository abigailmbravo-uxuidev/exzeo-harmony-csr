import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field, FieldArray, FormSection, getFormValues} from 'redux-form';
import {applyLicenseToAgency} from '../../../state/actions/agencyActions';
import Address from "../components/Address";
import Details from './Details';
import License from "./License";

const FORM_NAME = 'AgentModal';

const radioDefaultAnswers = [
  {
    answer: 'true',
    label: 'Yes'
  }, {
    answer: 'false',
    label: 'No'
  }
];

export class AgentModal extends Component {
  update = async (data, dispatch, props) => {
    const {
      createdBy,
      createdAt,
      ...agent
    } = data;
    const {agency} = props;
    await props.updateAgent(agent, props.agency);
    const agencyData = await applyLicenseToAgency(data, agency);
    await props.updateAgency(agencyData);
    props.toggleModal('')();
  };
  add = async (data, dispatch, props) => {
    const {
      createdBy,
      createdAt,
      ...agent
    } = data;
    const {agency} = props;
    await props.addAgent(agent, agency);
    const agencyData = await applyLicenseToAgency(data, agency);
    await props.updateAgency(agencyData);
    props.toggleModal('')();
  };

  render() {
    const {
      toggleModal,
      handleSubmit,
      editType,
      submitting,
      agencyLicenseArray,
      isInAgencyLicenseArray,
      licenseValue
    } = this.props;

    return (
      <div className="modal agent-crud">
        <div className="card">
          <form onSubmit={handleSubmit(editType === 'Edit' ? this.update : this.add)}>
            <div className="card-header">
              <h4>
                <i className="fa fa-address-book"/>{editType === 'Edit' ? ' Edit ' : ' New '} Agent
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

                <FieldArray name='license' component={License} licenseValue={licenseValue}/>

              </section>
            </div>
            <div className="card-footer">
              <div className="btn-footer">
                <button tabIndex="0" className="btn btn-secondary" type="button" onClick={toggleModal()}>
                  Cancel
                </button>
                <button tabIndex="0" className="btn btn-primary" type="submit" disabled={submitting}>
                  Save
                </button>
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
