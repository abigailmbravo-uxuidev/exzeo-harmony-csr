import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import _ from 'lodash';
import { reduxForm, Form, propTypes, change } from 'redux-form';
import { batchActions } from 'redux-batched-actions';
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

export const handleGetQuoteData = (state) => {
  const taskData = (state.cg && state.appState && state.cg[state.appState.modelName]) ? state.cg[state.appState.modelName].data : null;
  if (!taskData) return {};
  const quoteEnd = _.find(taskData.model.variables, { name: 'retrieveQuote' })
    ? _.find(taskData.model.variables, { name: 'retrieveQuote' }).value.result
    : {};
  const quoteData = _.find(taskData.model.variables, { name: 'getQuoteBetweenPageLoop' })
    ? _.find(taskData.model.variables, { name: 'getQuoteBetweenPageLoop' }).value.result
    : quoteEnd;

  return quoteData;
};

const handleInitialize = (state) => {
  const quoteData = handleGetQuoteData(state);
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
    order: state.appState.data.addAdditionalInterestType === 'Mortgagee' && _.filter(quoteData.additionalInterests || [], ai => ai.type === 'Mortgagee').length === 1 ? 1 : 0
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


export const AdditionalInterestModal = (props) => {
  const { appState, handleSubmit, verify, hideAdditionalInterestModal, questions, additionalInterests } = props;

  const mortgageeOrderAnswers = _.cloneDeep(getAnswers('order', questions));

  if (_.filter(additionalInterests, ai => ai.type === 'Mortgagee').length === 0) {
    _.remove(mortgageeOrderAnswers, answer => Number(answer.answer) === 1);
  } else if (_.filter(additionalInterests, ai => ai.type === 'Mortgagee').length === 1) {
    _.remove(mortgageeOrderAnswers, answer => Number(answer.answer) === 0);
  }
  return (
    <div className="modal" style={{ flexDirection: 'row' }}>
      <Form id="AdditionalInterestModal" className={`AdditionalInterestModal ${appState.data.addAdditionalInterestType}`} noValidate onSubmit={handleSubmit(verify)}>
        {props.appState.data.submittingAI && <Loader />}
        <div className="card">
          <div className="card-header">
            <h4><i className={`fa fa-circle ${appState.data.addAdditionalInterestType}`} /> {appState.data.addAdditionalInterestType}</h4>
          </div>
          <div className="card-block">
            { appState.data.addAdditionalInterestType === 'Mortgagee' && <span>
              <label htmlFor={'mortgage'}>
                Top Mortgagees
              </label>
              <Select
                name="mortgage"
                searchable
                labelKey="displayText"
                autoFocus
                value={appState.data.selectedMortgageeOption}
                options={getAnswers('mortgagee', questions)}
                onChange={val => setMortgageeValues(val, props)}
              />
            </span>
         }
            <TextField label={'Name 1'} styleName={'name-1'} name={'name1'} validations={['required']} />
            <TextField label={'Name 2'} styleName={'name-2'} name={'name2'} />
            <TextField label={'Address 1'} styleName={'address-1'} name={'address1'} validations={['required']} />
            <TextField label={'Address 2'} styleName={'address-2'} name={'address2'} />
            <div className="flex-form">
              <TextField label={'City'} styleName={'city'} name={'city'} validations={['required']} />
              <TextField
                label={'State'} styleName={'state'} name={'state'} validations={['required']}
              />
              <TextField label={'Zip Code'} styleName={'zip'} name={'zip'} validations={['required', 'zipNumbersOnly']} />
            </div>
            <div className="flex-form">
              <PhoneField label={'Phone Number'} styleName={'phone'} name={'phoneNumber'} validations={['phone']} />
              <TextField label={'Reference Number'} styleName={'reference-number'} name={'referenceNumber'} />
              { appState.data.addAdditionalInterestType === 'Mortgagee' && <SelectField
                name="order" component="select" styleName={''} label="Order" onChange={function () {}} validations={['required']}
                answers={mortgageeOrderAnswers}
              />}
            </div>
          </div>
          <div className="card-footer">
            <div className="btn-group">
              <button tabIndex={'0'} className="btn btn-secondary" type="button" onClick={() => hideAdditionalInterestModal(props)}>Cancel</button>
              <button tabIndex={'0'} className="btn btn-primary" type="submit" disabled={appState.data.submitting}>Save</button>
            </div>
          </div>
        </div>
      </Form>
    </div>);
};

AdditionalInterestModal.propTypes = {
  ...propTypes,
  showAdditionalInterestModalModal: PropTypes.func,
  verify: PropTypes.func,
  appState: PropTypes.shape({
    modelName: PropTypes.string,
    data: PropTypes.shape({
      recalc: PropTypes.boolean,
      submitting: PropTypes.boolean
    })
  })
};


const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState,
  initialValues: handleInitialize(state),
  quoteData: handleGetQuoteData(state)
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
