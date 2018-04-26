import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { connect } from 'react-redux';
import { reduxForm, Form, propTypes, change } from 'redux-form';
import { batchActions } from 'redux-batched-actions';
import TextField from '../Form/inputs/TextField';
import PhoneField from '../Form/inputs/PhoneField';
import HiddenField from '../Form/inputs/HiddenField';
import SelectField from '../Form/inputs/SelectField';
import ReactSelectField from '../Form/inputs/ReactSelectField';
import * as questionsActions from '../../actions/questionsActions';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import * as serviceActions from '../../actions/serviceActions';
import * as policyStateActions from '../../actions/policyStateActions';
import * as quoteStateActions from '../../actions/quoteStateActions';
import Loader from './Loader';

const getAnswers = (name, questions) => _.get(_.find(questions, { name }), 'answers') || [];


export const setMortgageeValues = (val, props) => {
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

export const checkAdditionalInterestForName = aiType => aiType === 'Additional Insured' || aiType === 'Additional Interest' || aiType === 'Bill Payer';

export const AdditionalInterestEditModal = (props) => {
  const {
    appState, handleSubmit, verify, hideAdditionalInterestModal, deleteAdditionalInterest, questions, isEndorsement, validAdditionalInterestTypes, additionalInterests, submitting, selectedMortgageeOption, selectedAI
  } = props;

  const mortgageeOrderAnswers = _.cloneDeep(getAnswers('order', questions));

  if (_.filter(additionalInterests, ai => ai.type === 'Mortgagee' && ai.active).length < 2) {
    _.remove(mortgageeOrderAnswers, answer => Number(answer.answer) === 1);
  }

  return (
    <div className="modal" style={{ flexDirection: 'row' }}>
      <Form id="AdditionalInterestEditModal" className={`AdditionalInterestModal ${selectedAI ? selectedAI.type : ''}`} noValidate onSubmit={handleSubmit(verify)}>
        {submitting && <Loader />}
        <div className="card">
          <div className="card-header">
            <h4><i className={`fa fa-circle ${selectedAI ? selectedAI.type : ''}`} /> {selectedAI ? selectedAI.type : ''}</h4>
          </div>
          <div className="card-block">
            <HiddenField name="_id" />
            <HiddenField name="order" />

            { selectedAI.type === 'Mortgagee' &&
            <ReactSelectField
              label="Top Mortgagees"
              name="mortgage"
              searchable
              labelKey="displayText"
              autoFocus
              value={selectedMortgageeOption}
              answers={getAnswers('mortgagee', questions)}
              onChange={val => setMortgageeValues(val, props)}
            />
         }
            <TextField label={checkAdditionalInterestForName(selectedAI.type) ? 'First Name' : 'Name 1'} styleName="name-1" name="name1" validations={['required']} />
            <TextField label={checkAdditionalInterestForName(selectedAI.type) ? 'Last Name' : 'Name 2'} styleName="" name="name2" />

            <TextField label="Address 1" styleName="" name="address1" validations={['required']} />
            <TextField label="Address 2" styleName="" name="address2" />
            <div className="flex-form">
              <TextField label="City" styleName="city" name="city" validations={['required']} />
              <TextField
                label="State"
                styleName="state"
                name="state"
                validations={['required']}
              />
              <TextField label="Zip Code" styleName="" name="zip" validations={['required', 'zipNumbersOnly']} />
            </div>
            <div className="flex-form">
              <PhoneField label="Phone Number" styleName="phone" name="phoneNumber" validations={['phone']} />
              <TextField label="Reference Number" styleName="" name="referenceNumber" />
              { selectedAI.type === 'Mortgagee' && <SelectField
                name="order"
                component="select"
                styleName=""
                label="Order"
                validations={['required']}
                answers={mortgageeOrderAnswers}
              />}
            </div>
            {isEndorsement &&
            <div className="flex-form">
              <SelectField
                name="aiType"
                answers={validAdditionalInterestTypes}
                label="Type"
                component="select"
                styleName=""
                validations={['required']}
              />
            </div>
          }
          </div>
          <div className="card-footer">
            <div className="btn-group">
              <button tabIndex="0" className="btn btn-secondary" type="button" onClick={() => hideAdditionalInterestModal(props)}>Cancel</button>
              <button tabIndex="0" className="btn btn-secondary" type="button" disabled={submitting} onClick={() => deleteAdditionalInterest(selectedAI, props)}>Delete</button>
              <button tabIndex="0" className="btn btn-primary" type="submit" disabled={submitting}>Update</button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

AdditionalInterestEditModal.propTypes = {
  ...propTypes,
  verify: PropTypes.func.isRequired,
  appState: PropTypes.shape({
    modelName: PropTypes.string,
    data: PropTypes.shape({
      recalc: PropTypes.bool,
      submittingAI: PropTypes.bool
    }).isRequired
  }).isRequired
};


const mapStateToProps = state => ({
  tasks: state.cg,
  fieldValues: _.get(state.form, 'AdditionalInterestEditModal.values', {})
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
