import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Form, propTypes } from 'redux-form';
import TextField from '../Form/inputs/TextField';
import HiddenField from '../Form/inputs/HiddenField';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';

const handleInitialize = (state) => {
  const selectedAI = state.appState.data.selectedAI;
  const values = {
    _id: selectedAI._id, // eslint-disable-line
    name1: selectedAI.name1,
    name2: selectedAI.name2,
    phoneNumber: String(selectedAI.phoneNumber),
    address1: selectedAI.mailingAddress.address1,
    address2: selectedAI.mailingAddress.address2,
    city: selectedAI.mailingAddress.city,
    state: selectedAI.mailingAddress.state,
    zip: String(selectedAI.mailingAddress.zip),
    referenceNumber: selectedAI.referenceNumber,
    type: selectedAI.type
  };

  console.log(values);
  return values;
};

const AdditionalInterestEditModal = ({ appState, handleSubmit, verify, hideAdditionalInterestModal, deleteAdditionalInterest, selectedAI }) => <div className="modal quote-summary">
  <Form id="AdditionalInterestEditModal" noValidate onSubmit={handleSubmit(verify)}>
    <div className="card">
      <div className="card-header">
        <h4><i className={`fa fa-circle ${selectedAI.type}`} /> {selectedAI.type}</h4>
      </div>
      <div className="card-block">
        <HiddenField name={'_id'} />
        <TextField label={'Name 1'} styleName={''} name={'name1'} validations={['required']} />
        <TextField label={'Name 2'} styleName={''} name={'name2'} />
        <TextField label={'Phone Number'} styleName={''} name={'phoneNumber'} validations={['required', 'phone']} />
        <TextField label={'Address 1'} styleName={''} name={'address1'} validations={['required']} />
        <TextField label={'Address 2'} styleName={''} name={'address2'} />
        <TextField label={'City'} styleName={''} name={'city'} validations={['required']} />
        <TextField label={'State'} styleName={''} name={'state'} validations={['required']} />
        <TextField label={'Zip Code'} styleName={''} name={'zip'} validations={['required']} />
        <TextField label={'Reference Number'} styleName={''} name={'referenceNumber'} />
      </div>
      <div className="card-footer">
        <div className="btn-footer">
          <button className="btn btn-secondary" type="button" onClick={() => hideAdditionalInterestModal()}>Cancel</button>
          <button className="btn btn-secondary" type="button" onClick={() => deleteAdditionalInterest(selectedAI)}>Delete</button>
          <button className="btn btn-primary" type="submit" disabled={appState.data.submitting}>Send</button>
        </div>
      </div>
    </div>
  </Form>
</div>;

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
  form: 'AdditionalInterestEditModal'
})(AdditionalInterestEditModal));
