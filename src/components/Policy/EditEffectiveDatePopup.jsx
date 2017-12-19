import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Form, propTypes, change } from 'redux-form';
import _ from 'lodash';
import moment from 'moment-timezone';
import * as questionsActions from '../../actions/questionsActions';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import * as serviceActions from '../../actions/serviceActions';
import * as policyStateActions from '../../actions/policyStateActions';
import DateField from '../Form/inputs/DateField';
import SelectField from '../Form/inputs/SelectField';
import Loader from '../Common/Loader';

export const reasonAnswers = (reasons) => {
    const reformattedReasons = _.concat([], reasons).map((reason) => {
      return { answer: reason, label: reason};
    })
    return reformattedReasons || [];
}

const handleInitialize = (state) => {
  const policy = state.service.latestPolicy || {};
  console.log(policy)

  return {
    effectiveDate: moment.utc(policy.effectiveDate).format('YYYY-MM-DD'),
    effectiveDateChangeReason: ''
  };
};

export const EditEffectiveDatePopup = (props) => {
  const { effectiveDateReasons, latestPolicy, hideEffectiveDateModal, handleSubmit, changeEffectiveDateSubmit, pristine  } = props;
  const reasons = reasonAnswers(effectiveDateReasons);
  // Effective Date Change business rules
  const effectiveDate = latestPolicy.effectiveDate;
  return (
      <div id="effective-date" className="modal effective-date">
        {props.appState.data.submitting && <Loader />}
        <div className="card unsaved-changes">
          <Form id="EditEffectiveDatePopup" noValidate onSubmit={handleSubmit(changeEffectiveDateSubmit)}>
            <div className="card-header">
              <h4>Edit Effective Date</h4>
            </div>
            <div className="card-block">
              <DateField label={'Effective Date'} name={'effectiveDate'} validations={['required']}  />
                <SelectField
                  name="effectiveDateChangeReason" component="select" label={'Reason For Change'} styleName={''} validations={['required']} answers={reasons}
                />
            </div>
            <div className="card-footer">
              <div className="btn-footer">
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={hideEffectiveDateModal}
                >
                  Cancel
                </button>
                <button
                  disabled={props.appState.data.submitting || pristine}
                  className="btn btn-primary"
                  type="submit"
                >
                  Update
                </button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    );
  };

  EditEffectiveDatePopup.propTypes = {
    showEffectiveDatePopup: PropTypes.func,
    effectiveDate: PropTypes.string
  };
  
  
  const mapStateToProps = state => ({
    effectiveDateReasons: state.service.effectiveDateReasons,
    latestPolicy: state.service.latestPolicy,
    tasks: state.cg,
    appState: state.appState,
    initialValues: handleInitialize(state)
  });

  const mapDispatchToProps = dispatch => ({
    actions: {
      policyStateActions: bindActionCreators(policyStateActions, dispatch),
      questionsActions: bindActionCreators(questionsActions, dispatch),
      serviceActions: bindActionCreators(serviceActions, dispatch),
      cgActions: bindActionCreators(cgActions, dispatch),
      appStateActions: bindActionCreators(appStateActions, dispatch)
    }
  });
  

  export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'EditEffectiveDatePopup', enableReinitialize: true
  })(EditEffectiveDatePopup));