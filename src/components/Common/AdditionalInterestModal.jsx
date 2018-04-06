import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { reduxForm, Form, propTypes, change } from 'redux-form';
import { batchActions } from 'redux-batched-actions';
import ReactSelectField from '../Form/inputs/ReactSelectField';
import TextField from '../Form/inputs/TextField';
import SelectField from '../Form/inputs/SelectField';
import PhoneField from '../Form/inputs/PhoneField';
import * as questionsActions from '../../actions/questionsActions';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import * as serviceActions from '../../actions/serviceActions';
import * as policyStateActions from '../../actions/policyStateActions';
import * as quoteStateActions from '../../actions/quoteStateActions';
import Loader from './Loader';

const handleInitialize = (state) => {
  const mortgageeOrderAnswers = getMortgageeAnswers(state.questions, _.get(state, 'service.latestPolicy.additionalInterests') || _.get(state, 'service.quote.additionalInterests') || null);
  return {
    name1: '',
    name2: '',
    phoneNumber: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    referenceNumber: '',
    type: '',
    order: mortgageeOrderAnswers.length === 1 ? mortgageeOrderAnswers[0].answer : ''
  };
};
const getAnswers = (name, questions) => _.get(_.find(questions, { name }), 'answers') || [];

export const setMortgageeValues = (val, props) => {
  props.actions.appStateActions.setAppState(props.appState.modelName, props.appState.instanceId, {
    ...props.appState.data,
    selectedMortgageeOption: val
  });
  const selectedMortgagee = val;

  if (selectedMortgagee) {
    props.dispatch(batchActions([
      change('AdditionalInterestModal', 'name1', _.get(selectedMortgagee, 'AIName1')),
      change('AdditionalInterestModal', 'name2', _.get(selectedMortgagee, 'AIName2')),
      change('AdditionalInterestModal', 'address1', _.get(selectedMortgagee, 'AIAddress1')),
      change('AdditionalInterestModal', 'city', _.get(selectedMortgagee, 'AICity')),
      change('AdditionalInterestModal', 'state', _.get(selectedMortgagee, 'AIState')),
      change('AdditionalInterestModal', 'zip', String(_.get(selectedMortgagee, 'AIZip')))
    ]));
  } else {
    props.dispatch(batchActions([
      change('AdditionalInterestModal', 'name1', ''),
      change('AdditionalInterestModal', 'name2', ''),
      change('AdditionalInterestModal', 'address1', ''),
      change('AdditionalInterestModal', 'city', ''),
      change('AdditionalInterestModal', 'state', ''),
      change('AdditionalInterestModal', 'zip', '')
    ]));
  }
};

export const getMortgageeAnswers = (questions, additionalInterests) => {
  let mortgageeOrderAnswers = _.cloneDeep(getAnswers('order', questions));

  if (additionalInterests && additionalInterests.filter(ai => ai.type === 'Mortgagee' && ai.active).length === 0) {
    mortgageeOrderAnswers = mortgageeOrderAnswers.filter(answer => Number(answer.answer) === 0);
  } else if (additionalInterests && additionalInterests.filter(ai => ai.type === 'Mortgagee' && ai.active).length === 1) {
    mortgageeOrderAnswers = mortgageeOrderAnswers.filter(answer => Number(answer.answer) === 1);
  }
  return mortgageeOrderAnswers;
};

export const checkAdditionalInterestForName = aiType => aiType === 'Additional Insured' || aiType === 'Additional Interest' || aiType === 'Bill Payer';

export const AdditionalInterestModal = (props) => {
  const {
    appState, handleSubmit, verify, hideAdditionalInterestModal, questions, additionalInterests
  } = props;

  const mortgageeOrderAnswers = getMortgageeAnswers(questions, additionalInterests);
  return (
    <div className="modal" style={{ flexDirection: 'row' }}>
      <Form id="AdditionalInterestModal" className={`AdditionalInterestModal ${appState.data.addAdditionalInterestType}`} noValidate onSubmit={handleSubmit(verify)}>
        {props.appState.data.submittingAI && <Loader />}
        <div className="card">
          <div className="card-header">
            <h4><i className={`fa fa-circle ${appState.data.addAdditionalInterestType}`} /> {appState.data.addAdditionalInterestType}</h4>
          </div>
          <div className="card-block">
            { appState.data.addAdditionalInterestType === 'Mortgagee' &&
            <ReactSelectField
              label="Top Mortgagees"
              name="mortgage"
              searchable
              labelKey="displayText"
              autoFocus
              value={appState.data.selectedMortgageeOption}
              answers={getAnswers('mortgagee', questions)}
              onChange={val => setMortgageeValues(val, props)}
            />
         }
            <TextField label={checkAdditionalInterestForName(appState.data.addAdditionalInterestType) ? 'First Name' : 'Name 1'} styleName="name-1" name="name1" validations={['required']} />
            <TextField label={checkAdditionalInterestForName(appState.data.addAdditionalInterestType) ? 'Last Name' : 'Name 2'} styleName="name-2" name="name2" />
            <TextField label="Address 1" styleName="address-1" name="address1" validations={['required']} />
            <TextField label="Address 2" styleName="address-2" name="address2" />
            <div className="flex-form">
              <TextField label="City" styleName="city" name="city" validations={['required']} />
              <TextField
                label="State"
                styleName="state"
                name="state"
                validations={['required']}
              />
              <TextField label="Zip Code" styleName="zip" name="zip" validations={['required', 'zipNumbersOnly']} />
            </div>
            <div className="flex-form">
              <PhoneField label="Phone Number" styleName="phone" name="phoneNumber" validations={['phone']} />
              <TextField label="Reference Number" styleName="reference-number" name="referenceNumber" />
              { appState.data.addAdditionalInterestType === 'Mortgagee' && <SelectField
                name="order"
                component="select"
                styleName=""
                label="Order"
                validations={['required']}
                answers={mortgageeOrderAnswers}
              />}
            </div>
          </div>
          <div className="card-footer">
            <div className="btn-group">
              <button tabIndex="0" className="btn btn-secondary" type="button" onClick={() => hideAdditionalInterestModal(props)}>Cancel</button>
              <button tabIndex="0" className="btn btn-primary" type="submit" disabled={appState.data.submitting}>Save</button>
            </div>
          </div>
        </div>
      </Form>
    </div>);
};

AdditionalInterestModal.propTypes = {
  ...propTypes,
  verify: PropTypes.func.isRequired,
  appState: PropTypes.shape({
    modelName: PropTypes.string,
    data: PropTypes.shape({
      recalc: PropTypes.bool,
      submitting: PropTypes.bool
    }).isRequired
  }).isRequired
};


const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState,
  initialValues: handleInitialize(state),
  fieldValues: _.get(state.form, 'AdditionalInterestModal.values', {})
});

const mapDispatchToProps = dispatch => ({
  actions: {
    serviceActions: bindActionCreators(serviceActions, dispatch),
    quoteStateActions: bindActionCreators(quoteStateActions, dispatch),
    policyStateActions: bindActionCreators(policyStateActions, dispatch),
    questionsActions: bindActionCreators(questionsActions, dispatch),
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch)
  }
});

// ------------------------------------------------
// wire up redux form with the redux connect
// ------------------------------------------------
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'AdditionalInterestModal', enableReinitialize: true
})(AdditionalInterestModal));
