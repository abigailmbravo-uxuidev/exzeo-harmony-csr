import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, FieldArray, getFormValues } from 'redux-form';
import { Button } from '@exzeo/core-ui';

import License from '../components/License';
import AddressGroup from '../components/AddressGroup';
import { getListAnswersAsKey } from '../../../state/selectors/questions.selectors';

import AgentDetails from './FormGroup/AgentDetails';

const FORM_NAME = 'AgentDetails';

export class AgentModal extends Component {
  handleSave = async data => {
    await this.props.handleSaveAgent(data);
  };

  render() {
    const {
      closeModal,
      handleSubmit,
      isEditing,
      submitting,
      licenseValue,
      change,
      sameAsMailingValue,
      listAnswersAsKey
    } = this.props;

    return (
      <div className="modal agent-crud">
        <form onSubmit={handleSubmit(this.handleSave)}>
          <div className="card">
            <div className="card-header">
              <h4>
                <i className="fa fa-address-book" />{' '}
                {isEditing ? 'Edit' : 'Save'} Agent
              </h4>
            </div>
            <div className="card-block">
              <section className="agent-details">
                <h3 data-test="agent-details">Details</h3>
                <AgentDetails isEditing={isEditing} />
              </section>
              <AddressGroup
                sameAsMailingValue={sameAsMailingValue}
                changeField={change}
                dataTest="agent"
                isOptional
              />
              <section className="agent-license">
                <h3 data-test="agent-license">Licenses</h3>
                <FieldArray
                  name="licenses"
                  stateAnswers={listAnswersAsKey.US_states}
                  component={License}
                  licenseValue={licenseValue}
                  isAgency={false}
                />
              </section>
            </div>
            <div className="card-footer">
              <div className="btn-footer">
                <Button
                  className={Button.constants.classNames.secondary}
                  data-test="cancel-modal"
                  onClick={closeModal}
                >
                  Cancel
                </Button>
                <Button
                  className={Button.constants.classNames.primary}
                  type="submit"
                  data-test="submit-modal"
                  disabled={submitting}
                >
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
  licenseValue: selector(state, 'license') || defaultArr,
  sameAsMailingValue: selector(state, 'sameAsMailing'),
  listAnswersAsKey: getListAnswersAsKey(state)
});

export default connect(mapStateToProps)(
  reduxForm({
    form: FORM_NAME,
    enableReinitialize: true
  })(AgentModal)
);
