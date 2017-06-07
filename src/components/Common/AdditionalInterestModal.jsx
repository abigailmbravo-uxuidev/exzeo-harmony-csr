import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Form, propTypes } from 'redux-form';
import TextField from '../Form/inputs/TextField';
import PhoneField from '../Form/inputs/PhoneField';
import SelectField from '../Form/inputs/SelectField';
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


const AdditionalInterestModal = ({ appState, handleSubmit, verify, hideAdditionalInterestModal }) => <div className="modal quote-summary" style={{ flexDirection: 'row' }}>
  <Form id="AdditionalInterestModal" noValidate onSubmit={handleSubmit(verify)}>
    <div className="card">
      <div className="card-header">
        <h4><i className={`fa fa-circle ${appState.data.addAdditionalInterestType}`} /> {appState.data.addAdditionalInterestType}</h4>
      </div>
      <div className="card-block">
        <TextField label={'Name 1'} styleName={'name-1'} name={'name1'} validations={['required']} />
        <TextField label={'Name 2'} styleName={'name-2'} name={'name2'} />
        <TextField label={'Address 1'} styleName={'address-1'} name={'address1'} validations={['required']} />
        <TextField label={'Address 2'} styleName={'address-2'} name={'address2'} />
        <div className="flex-form">
          <TextField label={'City'} styleName={'city'} name={'city'} validations={['required']} />
          <SelectField
            label={'State'} styleName={'state'} name={'state'} validations={['required']} answers={[
              {
                label: 'Alabama',
                answer: 'AL'
              },
              {
                label: 'Alaska',
                answer: 'AK'
              },
              {
                label: 'Arizona',
                answer: 'AZ'
              },
              {
                label: 'Arkansas',
                answer: 'AR'
              },
              {
                label: 'California',
                answer: 'CA'
              },
              {
                label: 'Colorado',
                answer: 'CO'
              },
              {
                label: 'Connecticut',
                answer: 'CT'
              },
              {
                label: 'Delaware',
                answer: 'DE'
              },
              {
                label: 'Florida',
                answer: 'FL'
              },
              {
                label: 'Georgia',
                answer: 'GA'
              },
              {
                label: 'Hawaii',
                answer: 'HI'
              },
              {
                label: 'Idaho',
                answer: 'ID'
              },
              {
                label: 'Illinois',
                answer: 'IL'
              },
              {
                label: 'Indiana',
                answer: 'IN'
              },
              {
                label: 'Iowa',
                answer: 'IA'
              },
              {
                label: 'Kansas',
                answer: 'KS'
              },
              {
                label: 'Kentucky',
                answer: 'KY'
              },
              {
                label: 'Louisiana',
                answer: 'LA'
              },
              {
                label: 'Maine',
                answer: 'ME'
              },
              {
                label: 'Maryland',
                answer: 'MD'
              },
              {
                label: 'Massachusetts',
                answer: 'MA'
              },
              {
                label: 'Michigan',
                answer: 'MI'
              },
              {
                label: 'Minnesota',
                answer: 'MN'
              },
              {
                label: 'Mississippi',
                answer: 'MS'
              },
              {
                label: 'Missouri',
                answer: 'MO'
              },
              {
                label: 'Montana',
                answer: 'MT'
              },
              {
                label: 'Nebraska',
                answer: 'NE'
              },
              {
                label: 'Nevada',
                answer: 'NV'
              },
              {
                label: 'New Hampshire',
                answer: 'NH'
              },
              {
                label: 'New Jersey',
                answer: 'NJ'
              },
              {
                label: 'New Mexico',
                answer: 'NM'
              },
              {
                label: 'New York',
                answer: 'NY'
              },
              {
                label: 'North Carolina',
                answer: 'NC'
              },
              {
                label: 'North Dakota',
                answer: 'ND'
              },
              {
                label: 'Ohio',
                answer: 'OH'
              },
              {
                label: 'Oklahoma',
                answer: 'OK'
              },
              {
                label: 'Oregon',
                answer: 'OR'
              },
              {
                label: 'Pennsylvania',
                answer: 'PA'
              },
              {
                label: 'Rhode Island',
                answer: 'RI'
              },
              {
                label: 'South Carolina',
                answer: 'SC'
              },
              {
                label: 'South Dakota',
                answer: 'SD'
              },
              {
                label: 'Tennessee',
                answer: 'TN'
              },
              {
                label: 'Texas',
                answer: 'TX'
              },
              {
                label: 'Utah',
                answer: 'UT'
              },
              {
                label: 'Vermont',
                answer: 'VT'
              },
              {
                label: 'Virginia',
                answer: 'VA'
              },
              {
                label: 'Washington',
                answer: 'WA'
              },
              {
                label: 'West Virginia',
                answer: 'WV'
              },
              {
                label: 'Wisconsin',
                answer: 'WI'
              },
              {
                label: 'Wyoming',
                answer: 'WY'
              }
            ]} validate={[value => (value ? undefined : 'Field Required')]}
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
          <button className="btn btn-secondary" type="button" onClick={() => hideAdditionalInterestModal()}>Cancel</button>
          <button className="btn btn-primary" type="submit" disabled={appState.data.submitting}>Save</button>
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
