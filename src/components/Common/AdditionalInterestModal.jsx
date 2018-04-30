import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { reduxForm, Form, Field, propTypes, change } from 'redux-form';
import Input from '../Form/base/Input';
import { requireField, zipNumbersOnly } from "../Form/validations";
import { batchActions } from 'redux-batched-actions';
import ReactSelectField from '../Form/inputs/ReactSelectField';
import TextField from '../Form/inputs/TextField';
import SelectField from '../Form/inputs/SelectField';
import PhoneField from '../Form/inputs/PhoneField';
import Loader from './Loader';

const handleInitialize = (state) => {
  const mortgageeOrderAnswers = getMortgageeAnswers(state.questions, _.get(state, 'service.latestPolicy.additionalInterests') || _.get(state, 'service.quote.additionalInterests') || null);
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
const getAnswers = (name, questions) => _.get(_.find(questions, { name }), 'answers') || [];

export const setMortgageeValues = (val, props) => {
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
      hideAdditionalInterestModal,
      questions,
      additionalInterests,
      submitting,
      addAdditionalInterestType
    } = this.props;

    const mortgageeOrderAnswers = getMortgageeAnswers(questions, additionalInterests);
    return (
      <div className="modal" style={this.modalStyle}>
        <Form id="AdditionalInterestModal" className={`AdditionalInterestModal ${addAdditionalInterestType}`} noValidate onSubmit={handleSubmit(verify)}>
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
                <PhoneField label="Phone Number" styleName="phone" name="phoneNumber" validations={['phone']}/>
                <TextField label="Reference Number" styleName="reference-number" name="referenceNumber"/>
                {addAdditionalInterestType === 'Mortgagee' &&
                <SelectField
                  name="order"
                  component="select"
                  styleName=""
                  label="Order"
                  validations={['required']}
                  answers={mortgageeOrderAnswers}
                />}
              </div>
            </div>
            <div className="card-footer">
              <div className="btn-group">
                <button tabIndex="0" className="btn btn-secondary" type="button" onClick={hideAdditionalInterestModal}>Cancel</button>
                <button tabIndex="0" className="btn btn-primary" type="submit" disabled={submitting}>Save</button>
              </div>
            </div>
          </div>
        </Form>
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


const mapStateToProps = state => ({
  tasks: state.cg,
  initialValues: handleInitialize(state),
});

AdditionalInterestModal = reduxForm({
  form: 'AdditionalInterestModal',
  enableReinitialize: true
})(AdditionalInterestModal);

AdditionalInterestModal = connect(mapStateToProps)(AdditionalInterestModal);

export default AdditionalInterestModal;
