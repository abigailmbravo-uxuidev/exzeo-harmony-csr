import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';
import { Loader } from '@exzeo/core-ui';

import CheckField from '../Form/inputs/CheckField';

export const handleInitialize = () => {
  return {
    reinstatePolicy: false
  };
};

export const ReinstatePolicyPopup = ({
  submitting,
  handleSubmit,
  hideReinstatePolicyModal,
  latestPolicy,
  pristine,
  reinstatePolicySubmit,
  reinstatePolicyValue
}) => {
  return (
    <div id="reinstate-policy" className="modal reinstate-policy">
      {submitting && <Loader />}
      <div className="card unsaved-changes">
        <form
          id="ReinstatePolicyPopup"
          onSubmit={handleSubmit(reinstatePolicySubmit)}
        >
          <div className="card-header">
            <h4> Reinstate Policy</h4>
          </div>
          <div className="card-block">
            <h5>Reinstate this policy?</h5>
            <CheckField
              name="reinstatePolicy"
              component="select"
              label={`Yes, I want to reinstate policy: ${latestPolicy.policyNumber} `}
              styleName={''}
              validations={['required']}
            />
          </div>
          <div className="card-footer">
            <div className="btn-footer">
              <button
                className="btn btn-secondary"
                type="button"
                onClick={hideReinstatePolicyModal}
              >
                Cancel
              </button>
              <button
                disabled={submitting || pristine || !reinstatePolicyValue}
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

const selector = formValueSelector('ReinstatePolicyPopup');
const mapStateToProps = state => ({
  appState: state.appState,
  latestPolicy: state.policyState.policy,
  initialValues: handleInitialize(state),
  reinstatePolicyValue: selector(state, 'reinstatePolicy')
});

export default connect(mapStateToProps)(
  reduxForm({
    form: 'ReinstatePolicyPopup',
    enableReinitialize: true
  })(ReinstatePolicyPopup)
);
