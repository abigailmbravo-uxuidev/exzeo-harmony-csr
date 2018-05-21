import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { reduxForm, Field, propTypes, initialize, reset } from 'redux-form';
import Inputs from '@exzeo/core-ui/lib/Input';
import lifecycle from '@exzeo/core-ui/lib/InputLifecycle';
// TODO refactor this out next
import ReactSelectField from '../Form/inputs/ReactSelectField';
import Loader from './Loader';

const { validation, format } = lifecycle;
const { Input, Select, Phone } = Inputs;

export const setMortgageeValues = (val, props) => {
  const selectedMortgagee = val;

  if (selectedMortgagee) {
    props.initializeForm('AdditionalInterestModal', {
      name1: selectedMortgagee.AIName1,
      name2: selectedMortgagee.AIName2,
      address1: selectedMortgagee.AIAddress1,
      address2: selectedMortgagee.AIAddress2 || '',
      city: selectedMortgagee.AICity,
      state: selectedMortgagee.AIState,
      zip: String(selectedMortgagee.AIZip)
    });
  } else {
    props.resetForm('AdditionalInterestModal');
  }
};

export const checkAdditionalInterestForName = aiType => aiType === 'Additional Insured' || aiType === 'Additional Interest' || aiType === 'Bill Payer';

export class AdditionalInterestModal extends React.Component {
  constructor(props) {
    super(props);

    this.modalStyle = { flexDirection: 'row' };
  }
  render() {
    const {
      handleSubmit,
      verify,
      hideModal,
      questions,
      additionalInterests,
      submitting,
      addAdditionalInterestType,
      isEditing,
      isEndorsement,
      getAnswers,
      getMortgageeOrderAnswers,
      getMortgageeOrderAnswersForEdit,
      deleteAdditionalInterest,
      validAdditionalInterestTypes,
      selectedAI,
      isDeleting
    } = this.props;

    return (
      <div className="modal" style={this.modalStyle}>
        <form
          id={isEditing ? 'AdditionalInterestEditModal' : 'AdditionalInterestModal'}
          className={classNames('AdditionalInterestModal', { [selectedAI.type]: isEditing, [addAdditionalInterestType]: !isEditing })}
          onSubmit={handleSubmit(verify)}
        >
          {(submitting || isDeleting) && <Loader />}
          <div className="card">
            <div className="card-header">
              <h4><i className={`fa fa-circle ${addAdditionalInterestType}`} /> {addAdditionalInterestType}</h4>
            </div>
            <div className="card-block">
              {(addAdditionalInterestType || selectedAI.type) === 'Mortgagee' &&
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
                validate={validation.isRequired}
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
                validate={validation.isRequired}
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
                  validate={validation.isRequired}
                />
                <Field
                  name="state"
                  label="State"
                  component={Input}
                  styleName="state"
                  validate={validation.isRequired}
                />
                <Field
                  name="zip"
                  label="Zip Code"
                  component={Input}
                  styleName="zip"
                  format={format.toString}
                  validate={[validation.isRequired, validation.isZipCode]}
                />
              </div>
              <div className="flex-form">
                <Field
                  name="phoneNumber"
                  label="Phone Number"
                  component={Phone}
                  styleName="phone"
                  validate={validation.isPhone}
                  placeholder="555-555-5555"
                />
                <Field
                  name="referenceNumber"
                  label="Reference Number"
                  component={Input}
                  styleName="reference-number"
                />

                {isEditing && selectedAI.type === 'Mortgagee' &&
                <Field
                  name="order"
                  component={Select}
                  label="Order"
                  validate={validation.isRequired}
                  answers={getMortgageeOrderAnswersForEdit(questions, additionalInterests)}
                />
                }

                {!isEditing && addAdditionalInterestType === 'Mortgagee' &&
                  <Field
                    name="order"
                    component={Select}
                    styleName=""
                    label="Order"
                    answers={getMortgageeOrderAnswers(questions, additionalInterests)}
                  />
                }
              </div>
              {isEndorsement &&
              <div className="flex-form">
                <Field
                  name="aiType"
                  label="Type"
                  component={Select}
                  answers={validAdditionalInterestTypes}
                  validations={validation.isRequired}
                />
              </div>
              }
            </div>
            <div className="card-footer">
              <div className="btn-group">
                <button tabIndex="0" className="btn btn-secondary" type="button" onClick={hideModal}>Cancel</button>
                {isEditing && <button tabIndex="0" className="btn btn-secondary" type="button" disabled={submitting || isDeleting} onClick={() => deleteAdditionalInterest(selectedAI, this.props)}>Delete</button> }
                <button tabIndex="0" className="btn btn-primary" type="submit" disabled={submitting || isDeleting}>Save</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
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
  tasks: state.cg
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
