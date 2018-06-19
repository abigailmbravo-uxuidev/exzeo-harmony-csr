import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Form } from 'redux-form';
import _ from 'lodash';
import * as questionsActions from '../../state/actions/questionsActions';
import * as cgActions from '../../state/actions/cgActions';
import * as appStateActions from '../../state/actions/appStateActions';
import * as serviceActions from '../../state/actions/serviceActions';
import * as policyStateActions from '../../state/actions/policyActions';
import CheckField from '../Form/inputs/CheckField';
import Loader from '../Common/Loader';

export const handleInitialize = (state) => {
  return {
    reinstatePolicy: false
  };
};

export const ReinstatePolicyPopup = (props) => {
  const { hideReinstatePolicyModal, handleSubmit, reinstatePolicySubmit, pristine, fieldValues, latestPolicy } = props;
  return (
    <div id="reinstate-policy" className="modal reinstate-policy">
      {props.appState.data.submitting && <Loader />}
      <div className="card unsaved-changes">
        <Form id="ReinstatePolicyPopup" noValidate onSubmit={handleSubmit(reinstatePolicySubmit)}>
          <div className="card-header">
            <h4> Reinstate Policy</h4>
          </div>
          <div className="card-block">
            <h5>Reinstate this policy?</h5>
            <CheckField
              name="reinstatePolicy" component="select" label={`Yes, I want to reinstate policy: ${latestPolicy.policyNumber} `} styleName={''} validations={['required']}
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
                disabled={props.appState.data.submitting || pristine || !fieldValues.reinstatePolicy}
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

const mapStateToProps = state => ({
  latestPolicy: state.policyState.policy,
  initialValues: handleInitialize(state),
  fieldValues: _.get(state.form, 'ReinstatePolicyPopup.values', {}),
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
  form: 'ReinstatePolicyPopup', enableReinitialize: true
})(ReinstatePolicyPopup));
