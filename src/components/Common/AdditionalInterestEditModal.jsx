import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Form, propTypes } from 'redux-form';
import TextField from '../Form/inputs/TextField';
import PhoneField from '../Form/inputs/PhoneField';
import HiddenField from '../Form/inputs/HiddenField';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import normalizePhone from '../Form/normalizePhone';

const handleInitialize = (state) => {
  const selectedAI = state.appState.data.selectedAI;

  if (selectedAI) {
    return {
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

const AdditionalInterestEditModal = (props) => {
  const { appState, handleSubmit, verify, hideAdditionalInterestModal, deleteAdditionalInterest, selectedAI } = props;
  return (<div className="modal additionalInterestModal" style={{ flexDirection: 'row' }}>
    <Form id="AdditionalInterestEditModal" noValidate onSubmit={handleSubmit(verify)}>
      <div className="card">
        <div className="card-header">
          <h4><i className={`fa fa-circle ${selectedAI ? selectedAI.type : ''}`} /> {selectedAI ? selectedAI.type : ''}</h4>
        </div>
        <div className="card-block">
          <HiddenField name={'_id'} />
          <HiddenField name={'order'} />

          <TextField label={'Name 1'} styleName={''} name={'name1'} validations={['required']} />
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
            <button className="btn btn-secondary" type="button" onClick={() => hideAdditionalInterestModal()}>Cancel</button>
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
