import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Form, propTypes } from 'redux-form';
import TextField from '../Form/inputs/TextField';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';

const AdditionalInterestModal = ({ appState, handleSubmit, verify, hideAdditionalInterestModal }) => <div className="modal quote-summary" style={{ flexDirection: 'row' }}>
  <Form id="AdditionalInterestModal" noValidate onSubmit={handleSubmit(verify)}>
    <div className="card">
      <div className="card-header">
        <h4><i className={`fa fa-circle ${appState.data.addAdditionalInterestType}`} /> {appState.data.addAdditionalInterestType}</h4>
      </div>
      <div className="card-block">
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
          <button className="btn btn-primary" type="submit" disabled={appState.data.submitting}>Send</button>
        </div>
      </div>
    </div>
  </Form>
</div>;

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
  appState: state.appState
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
  form: 'AdditionalInterestModal'
})(AdditionalInterestModal));
