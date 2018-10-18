import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, FormSection, FieldArray, getFormValues } from 'redux-form';
import { Button } from '@exzeo/core-ui';

import License from '../components/License';
import Address from '../components/Address';

import Details from './Details';

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
    await this.props.handleSaveAgent(data);
  };

  render() {
    const {
      closeModal,
      handleSubmit,
      isEditing,
      submitting,
      licenseValue
    } = this.props;

    return (
      <div className="modal agent-crud">
        <form onSubmit={handleSubmit(this.handleSave)}>
          <div className="card">
            <div className="card-header">
              <h4>
                <i className="fa fa-address-book" /> {isEditing ? 'Edit' : 'Save'} Agent
              </h4>
            </div>
            <div className="card-block">
              <h3>Details</h3>
              <section className="agent-details">
                <Details isEditing={isEditing} />
              </section>
              <h3>Mailing Address</h3>
              <section className="agent-mailing">
                <FormSection
                  name="mailingAddress">
                  <Address />
                </FormSection>
              </section>
              <h3>Licenses</h3>
              <section className="agent-license">
                <FieldArray
                  name="licenses"
                  component={License}
                  licenseValue={licenseValue}
                  isAgency={false} />
              </section>
            </div>
            <div className="card-footer">
              <div className="btn-footer">
                <Button
                  tabIndex="0"
                  className="btn btn-secondary"
                  type="button"
                  onClick={closeModal}>
                Cancel
                </Button>
                <Button
                  tabIndex="0"
                  className="btn btn-primary"
                  type="submit"
                  disabled={submitting}>
                Save
                </Button>
              </div>
            </div>
          </div>
        </form>
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
