import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { connect } from 'react-redux';
import { reduxForm, Form, propTypes, change } from 'redux-form';
import { batchActions } from 'redux-batched-actions';
import TextField from '../Form/inputs/TextField';
import PhoneField from '../Form/inputs/PhoneField';
import HiddenField from '../Form/inputs/HiddenField';
import SelectField from '../Form/inputs/SelectField';
import * as questionsActions from '../../actions/questionsActions';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import * as serviceActions from '../../actions/serviceActions';
import * as policyStateActions from '../../actions/policyStateActions';
import * as quoteStateActions from '../../actions/quoteStateActions';
import normalizePhone from '../Form/normalizePhone';
import Loader from './Loader';

const getAnswers = (name, questions) => _.get(_.find(questions, { name }), 'answers') || [];


const handleInitialize = (state) => {
  const selectedAI = state.appState.data.selectedAI;

  if (selectedAI) {
    const mortgagee = _.get(_.find(getAnswers('mortgagee', state.questions), a => a.AIName1 === selectedAI.name1 &&
    a.AIAddress1 === selectedAI.mailingAddress.address1), 'ID');

    return {
      mortgagee,
      _id: selectedAI._id, // eslint-disable-line
      name1: selectedAI.name1,
      name2: selectedAI.name2,
      phoneNumber: String(selectedAI.phoneNumber).length > 0 ? normalizePhone(String(selectedAI.phoneNumber)) : '',
      address1: selectedAI.mailingAddress.address1,
      address2: selectedAI.mailingAddress.address2,
      city: selectedAI.mailingAddress.city,
      state: selectedAI.mailingAddress.state,
      zip: String(selectedAI.mailingAddress.zip),
      referenceNumber: selectedAI.referenceNumber,
      type: selectedAI.type,
      aiType: selectedAI.type,
      order: selectedAI.order
    };
  }

  return {
    _id: '',
    name1: '',
    name2: '',
    phoneNumber: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    referenceNumber: '',
    type: ''
  };
};

export const setMortgageeValues = (val, props) => {
  props.actions.appStateActions.setAppState(props.appState.modelName, props.appState.instanceId, {
    ...props.appState.data,
    selectedMortgageeOption: val
  });
  const selectedMortgagee = val;

  if (selectedMortgagee) {
    props.dispatch(batchActions([
      change('AdditionalInterestEditModal', 'name1', _.get(selectedMortgagee, 'AIName1')),
      change('AdditionalInterestEditModal', 'name2', _.get(selectedMortgagee, 'AIName2')),
      change('AdditionalInterestEditModal', 'address1', _.get(selectedMortgagee, 'AIAddress1')),
      change('AdditionalInterestEditModal', 'city', _.get(selectedMortgagee, 'AICity')),
      change('AdditionalInterestEditModal', 'state', _.get(selectedMortgagee, 'AIState')),
      change('AdditionalInterestEditModal', 'zip', String(_.get(selectedMortgagee, 'AIZip')))
    ]));
  } else {
    props.dispatch(batchActions([
      change('AdditionalInterestEditModal', 'name1', ''),
      change('AdditionalInterestEditModal', 'name2', ''),
      change('AdditionalInterestEditModal', 'address1', ''),
      change('AdditionalInterestEditModal', 'city', ''),
      change('AdditionalInterestEditModal', 'state', ''),
      change('AdditionalInterestEditModal', 'zip', '')
    ]));
  }
};

export const AdditionalInterestEditModal = (props) => {
  const { appState, handleSubmit, verify, hideAdditionalInterestModal, deleteAdditionalInterest, selectedAI, questions, isEndorsement, validAdditionalInterestTypes, additionalInterests } = props;

  const mortgageeOrderAnswers = _.cloneDeep(getAnswers('order', questions));

  if (_.filter(additionalInterests, ai => ai.type === 'Mortgagee').length < 2) {
    _.remove(mortgageeOrderAnswers, answer => Number(answer.answer) === 1);
  }

  return (<div className="modal" style={{ flexDirection: 'row' }}>

    <Form id="AdditionalInterestEditModal" className={`AdditionalInterestModal ${selectedAI ? selectedAI.type : ''}`} noValidate onSubmit={handleSubmit(verify)}>
      {props.appState.data.submittingAI && <Loader />}
      <div className="card">
        <div className="card-header">
          <h4><i className={`fa fa-circle ${selectedAI ? selectedAI.type : ''}`} /> {selectedAI ? selectedAI.type : ''}</h4>
        </div>
        <div className="card-block">
          <HiddenField name={'_id'} />
          <HiddenField name={'order'} />

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
          <TextField label={'Name 2'} styleName={''} name={'name2'} />

          <TextField label={'Address 1'} styleName={''} name={'address1'} validations={['required']} />
          <TextField label={'Address 2'} styleName={''} name={'address2'} />
          <div className="flex-form">
            <TextField label={'City'} styleName={'city'} name={'city'} validations={['required']} />
            <TextField
              label={'State'} styleName={'state'} name={'state'} validations={['required']}
            />
            <TextField label={'Zip Code'} styleName={''} name={'zip'} validations={['required', 'zipNumbersOnly']} />
          </div>
          <div className="flex-form">
            <PhoneField label={'Phone Number'} styleName={'phone'} name={'phoneNumber'} validations={['phone']} />
            <TextField label={'Reference Number'} styleName={''} name={'referenceNumber'} />
            { appState.data.addAdditionalInterestType === 'Mortgagee' && <SelectField
              name="order" component="select" styleName={''} label="Order" onChange={function () {}} validations={['required']}
              answers={mortgageeOrderAnswers}
            />}
          </div>
          {isEndorsement &&
            <div className="flex-form">
              <SelectField
                name={'aiType'}
                answers={validAdditionalInterestTypes}
                label={''} component="select" styleName={''} validations={['required']}
              />
            </div>
          }
        </div>
        <div className="card-footer">
          <div className="btn-group">
            <button tabIndex={'0'} className="btn btn-secondary" type="button" onClick={() => hideAdditionalInterestModal(props)}>Cancel</button>
            <button tabIndex={'0'} className="btn btn-secondary" type="button" disabled={appState.data.submittingAI} onClick={() => deleteAdditionalInterest(selectedAI, props)}>Delete</button>
            <button tabIndex={'0'} className="btn btn-primary" type="submit" disabled={appState.data.submittingAI}>Update</button>
          </div>
        </div>
      </div>
    </Form>
  </div>);
};

AdditionalInterestEditModal.propTypes = {
  ...propTypes,
  showAdditionalInterestEditModalModal: PropTypes.func,
  verify: PropTypes.func,
  appState: PropTypes.shape({
    modelName: PropTypes.string,
    data: PropTypes.shape({
      recalc: PropTypes.boolean,
      submittingAI: PropTypes.boolean
    })
  })
};


const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState,
  selectedAI: state.appState.data.selectedAI,
  initialValues: handleInitialize(state)
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
  form: 'AdditionalInterestEditModal', enableReinitialize: true
})(AdditionalInterestEditModal));
