import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { reduxForm, Field, propTypes, initialize, reset } from 'redux-form';
import Input from '../Form/base/Input';
import { requireField, zipNumbersOnly, phone } from "../Form/validations";
import { normalizePhone } from "../Form/normalize";
// TODO refactor these out next
import ReactSelectField from '../Form/inputs/ReactSelectField';
import SelectField from '../Form/inputs/SelectField';
import Loader from './Loader';

const handleInitialize = (state, ownProps) => {
  const { service = {}, questions = {} } = state;
  let mortgageeOrderAnswers = '';
  if ((service.latestPolicy || service.quote) && ownProps.addAdditionalInterestType === 'Mortgagee') {
   mortgageeOrderAnswers = getMortgageeAnswers(questions, service.latestPolicy.additionalInterests || service.quote.additionalInterests || null);
  }
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

export const setMortgageeValues = (val, props) => {
  const selectedMortgagee = val;

  if (selectedMortgagee) {
    props.initializeForm('AdditionalInterestModal', {
      name1: selectedMortgagee['AIName1'],
      name2: selectedMortgagee['AIName2'],
      address1: selectedMortgagee['AIAddress1'],
      address2: selectedMortgagee['AIAddress2'] || '',
      city: selectedMortgagee['AICity'],
      state: selectedMortgagee['AIState'],
      zip: String(selectedMortgagee['AIZip']),
    });
  } else {
    props.resetForm('AdditionalInterestModal')
  }
};

const getAnswers = (name, questions) => _.get(_.find(questions, { name }), 'answers') || [];

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

export class AdditionalInterestModal extends React.Component {
  constructor(props) {
    super(props);

    this.modalStyle = {flexDirection: 'row'};
  }
  render() {
    const {
      handleSubmit,
      verify,
      hideModal,
      questions,
      additionalInterests,
      submitting,
      addAdditionalInterestType
    } = this.props;

    return (
      <div className="modal" style={this.modalStyle}>
        <form
          id="AdditionalInterestModal"
          className={`AdditionalInterestModal ${addAdditionalInterestType}`}
          onSubmit={handleSubmit(verify)}
        >
          {submitting && <Loader/>}
          <div className="card">
            <div className="card-header">
              <h4><i className={`fa fa-circle ${addAdditionalInterestType}`}/> {addAdditionalInterestType}</h4>
            </div>
            <div className="card-block">
              {addAdditionalInterestType === 'Mortgagee' &&
              <ReactSelectField
                label="Top Mortgagees"
                name="mortgagee"
                searchable
                labelKey="displayText"
                autoFocus
                answers={getAnswers('mortgagee', questions)}
                onChange={val => setMortgageeValues(val, this.props)}
              />
              }
              <Field
                name="name1"
                label={checkAdditionalInterestForName(addAdditionalInterestType) ? 'First Name' : 'Name 1'}
                component={Input}
                styleName="name-1"
                validate={requireField}
              />
              <Field
                name="name2"
                label={checkAdditionalInterestForName(addAdditionalInterestType) ? 'Last Name' : 'Name 2'}
                component={Input}
                styleName="name-2"
              />
              <Field
                name="address1"
                label="Address 1"
                component={Input}
                styleName="address-1"
                validate={requireField}
              />
              <Field
                name="address2"
                label="Address 2"
                component={Input}
                styleName="address-2"
              />
              <div className="flex-form">
                <Field
                  name="city"
                  label="City"
                  component={Input}
                  styleName="city"
                  validate={requireField}
                />
                <Field
                  name="state"
                  label="State"
                  component={Input}
                  styleName="state"
                  validate={requireField}
                />
                <Field
                  name="zip"
                  label="Zip Code"
                  component={Input}
                  styleName="zip"
                  validate={[requireField, zipNumbersOnly]}
                />
              </div>
              <div className="flex-form">
                <Field
                  name="phoneNumber"
                  label="Phone Number"
                  component={Input}
                  styleName="phone"
                  normalize={normalizePhone}
                  validate={phone}
                  placeholder="555-555-5555"
                />
                <Field
                  name="referenceNumber"
                  label="Reference Number"
                  component={Input}
                  styleName="reference-number"
                />
                {addAdditionalInterestType === 'Mortgagee' &&
                <SelectField
                  name="order"
                  component="select"
                  styleName=""
                  label="Order"
                  validations={['required']}
                  answers={getMortgageeAnswers(questions, additionalInterests)}
                />}
              </div>
            </div>
            <div className="card-footer">
              <div className="btn-group">
                <button tabIndex="0" className="btn btn-secondary" type="button" onClick={hideModal}>Cancel</button>
                <button tabIndex="0" className="btn btn-primary" type="submit" disabled={submitting}>Save</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  };
}

AdditionalInterestModal.propTypes = {
  ...propTypes,
  verify: PropTypes.func.isRequired,
  appState: PropTypes.shape({
    modelName: PropTypes.string,
    data: PropTypes.shape({
      recalc: PropTypes.bool,
      submitting: PropTypes.bool
    })
  })
};

const mapStateToProps = (state, ownProps) => ({
  tasks: state.cg,
  initialValues: handleInitialize(state, ownProps),
});

AdditionalInterestModal = reduxForm({
  form: 'AdditionalInterestModal',
  enableReinitialize: true
})(AdditionalInterestModal);

AdditionalInterestModal = connect(mapStateToProps, {
  initializeForm: initialize,
  resetForm: reset
})(AdditionalInterestModal);

export default AdditionalInterestModal;
