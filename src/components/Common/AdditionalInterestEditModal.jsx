import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { connect } from 'react-redux';
import { reduxForm, Form, propTypes, change } from 'redux-form';
import TextField from '../Form/inputs/TextField';
import SelectFieldMortgagee from '../Form/inputs/SelectFieldMortgagee';
import PhoneField from '../Form/inputs/PhoneField';
import HiddenField from '../Form/inputs/HiddenField';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import normalizePhone from '../Form/normalizePhone';

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

export const setMortgageeValues = (id, props) => {
  const answers = getAnswers('mortgagee', props.questions);
  const selectedMortgagee = _.find(answers, a => String(a.ID) === String(id));
  props.dispatch(change('AdditionalInterestEditModal', 'name1', _.get(selectedMortgagee, 'AIName1')));
  props.dispatch(change('AdditionalInterestEditModal', 'name2', _.get(selectedMortgagee, 'AIName2')));
  props.dispatch(change('AdditionalInterestEditModal', 'address1', _.get(selectedMortgagee, 'AIAddress1')));
  props.dispatch(change('AdditionalInterestEditModal', 'city', _.get(selectedMortgagee, 'AICity')));
  props.dispatch(change('AdditionalInterestEditModal', 'state', _.get(selectedMortgagee, 'AIState')));
  props.dispatch(change('AdditionalInterestEditModal', 'zip', String(_.get(selectedMortgagee, 'AIZip'))));
};

export const AdditionalInterestEditModal = (props) => {
  const { appState, handleSubmit, verify, hideAdditionalInterestModal, deleteAdditionalInterest, selectedAI, questions } = props;
  return (<div className="modal additionalInterestModal" style={{ flexDirection: 'row' }}>
    <Form id="AdditionalInterestEditModal" noValidate onSubmit={handleSubmit(verify)}>
      <div className="card">
        <div className="card-header">
          <h4><i className={`fa fa-circle ${selectedAI ? selectedAI.type : ''}`} /> {selectedAI ? selectedAI.type : ''}</h4>
        </div>
        <div className="card-block">
          <HiddenField name={'_id'} />
          <HiddenField name={'order'} />

          { appState.data.addAdditionalInterestType === 'Mortgagee' && <span><SelectFieldMortgagee
            name="mortgagee" component="select" styleName={'name-1'} label="Name 1" validations={['required']}
            onChange={event => setMortgageeValues(event.target.value, props)}
            answers={getAnswers('mortgagee', questions)}
          />
            <HiddenField label={'Name 1'} name={'name1'} />
          </span>
         }
          { selectedAI && selectedAI.type !== 'Mortgagee' &&
            <TextField label={'Name 1'} styleName={'name-1'} name={'name1'} />
            }
          <TextField label={'Name 2'} styleName={''} name={'name2'} />

          <TextField label={'Address 1'} styleName={''} name={'address1'} validations={['required']} />
          <TextField label={'Address 2'} styleName={''} name={'address2'} />
          <div className="flex-form">
            <TextField label={'City'} styleName={'city'} name={'city'} validations={['required']} />
            <TextField
              label={'State'} styleName={'state'} name={'state'} validations={['required']}
            />
            <TextField label={'Zip Code'} styleName={''} name={'zip'} validations={['required', 'numbersOnly']} />
          </div>
          <div className="flex-form">
            <PhoneField label={'Phone Number'} styleName={'phone'} name={'phoneNumber'} validations={['phone']} />
            <TextField label={'Reference Number'} styleName={''} name={'referenceNumber'} />
          </div>
        </div>
        <div className="card-footer">
          <div className="btn-group">
            <button className="btn btn-secondary" type="button" onClick={() => hideAdditionalInterestModal(props)}>Cancel</button>
            <button className="btn btn-secondary" type="button" disabled={appState.data.submitting} onClick={() => deleteAdditionalInterest(selectedAI, props)}>Delete</button>
            <button className="btn btn-primary" type="submit" disabled={appState.data.submitting}>Update</button>
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
      submitting: PropTypes.boolean
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
