import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import moment from 'moment-timezone';
import DateField from '../Form/inputs/DateField';
import SelectField from '../Form/inputs/SelectField';
import Loader from '../Common/Loader';

export const reasonAnswers = (reasons) => reasons.map(reason => ({ answer: reason, label: reason }));

export const handleInitialize = (state) => {
  const policy = state.service.latestPolicy || {};

  return {
    effectiveDate: moment.utc(policy.effectiveDate).format('YYYY-MM-DD'),
    effectiveDateChangeReason: ''
  };
};

export const EditEffectiveDatePopup = (props) => {
  const { effectiveDateReasons, hideEffectiveDateModal, handleSubmit, changeEffectiveDateSubmit, pristine } = props;
  const reasons = reasonAnswers(effectiveDateReasons);
  return (
    <div id="effective-date" className="modal effective-date">
      {props.appState.data.submitting && <Loader />}
      <div className="card unsaved-changes">
        <form id="EditEffectiveDatePopup" onSubmit={handleSubmit(changeEffectiveDateSubmit)}>
          <div className="card-header">
            <h4>Edit Effective Date</h4>
          </div>
          <div className="card-block">
            <DateField label={'Effective Date'} name={'effectiveDate'} validations={['required']} />
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
        </form>
      </div>
    </div>
  );
};

EditEffectiveDatePopup.propTypes = {
  showEffectiveDatePopup: PropTypes.func,
  effectiveDate: PropTypes.string
};


const mapStateToProps = state => ({
  appState: state.appState,
  effectiveDateReasons: state.policyState.effectiveDateReasons,
  initialValues: handleInitialize(state),
  latestPolicy: state.service.latestPolicy,
  tasks: state.cg,
});

export default connect(mapStateToProps)(reduxForm({
  form: 'EditEffectiveDatePopup',
  enableReinitialize: true
})(EditEffectiveDatePopup));
