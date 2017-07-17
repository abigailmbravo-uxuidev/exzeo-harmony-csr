import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import _ from 'lodash';
import { reduxForm, Form, propTypes, change } from 'redux-form';
import TextField from '../Form/inputs/TextField';
import PhoneField from '../Form/inputs/PhoneField';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';

const handleInitialize = () => ({
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
});
const getAnswers = (name, questions) => _.get(_.find(questions, { name }), 'answers') || [];

export const setMortgageeValues = (val, props) => {
  props.actions.appStateActions.setAppState(props.appState.modelName, props.appState.instanceId, {
    ...props.appState.data,
    selectedMortgageeOption: val
  });
  const selectedMortgagee = val;

  if (selectedMortgagee) {
    props.dispatch(change('AdditionalInterestModal', 'name1', _.get(selectedMortgagee, 'AIName1')));
    props.dispatch(change('AdditionalInterestModal', 'name2', _.get(selectedMortgagee, 'AIName2')));
    props.dispatch(change('AdditionalInterestModal', 'address1', _.get(selectedMortgagee, 'AIAddress1')));
    props.dispatch(change('AdditionalInterestModal', 'city', _.get(selectedMortgagee, 'AICity')));
    props.dispatch(change('AdditionalInterestModal', 'state', _.get(selectedMortgagee, 'AIState')));
    props.dispatch(change('AdditionalInterestModal', 'zip', String(_.get(selectedMortgagee, 'AIZip'))));
  } else {
    props.dispatch(change('AdditionalInterestModal', 'name1', ''));
    props.dispatch(change('AdditionalInterestModal', 'name2', ''));
    props.dispatch(change('AdditionalInterestModal', 'address1', ''));
    props.dispatch(change('AdditionalInterestModal', 'city', ''));
    props.dispatch(change('AdditionalInterestModal', 'state', ''));
    props.dispatch(change('AdditionalInterestModal', 'zip', ''));
  }
};


export const AdditionalInterestModal = (props) => {
  const { appState, handleSubmit, verify, hideAdditionalInterestModal, questions } = props;
  return (
    <div className="modal additionalInterestModal" style={{ flexDirection: 'row' }}>
      <Form id="AdditionalInterestModal" noValidate onSubmit={handleSubmit(verify)}>
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
                autofocus
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
              <TextField label={'Zip Code'} styleName={'zip'} name={'zip'} validations={['required', 'numbersOnly']} />
            </div>
            <div className="flex-form">
              <PhoneField label={'Phone Number'} styleName={'phone'} name={'phoneNumber'} validations={['phone']} />
              <TextField label={'Reference Number'} styleName={'reference-number'} name={'referenceNumber'} />
            </div>
          </div>
          <div className="card-footer">
            <div className="btn-group">
              <button className="btn btn-secondary" type="button" onClick={() => hideAdditionalInterestModal(props)}>Cancel</button>
              <button className="btn btn-primary" type="submit" disabled={appState.data.submitting}>Save</button>
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
  form: 'AdditionalInterestModal', enableReinitialize: true
})(AdditionalInterestModal));
