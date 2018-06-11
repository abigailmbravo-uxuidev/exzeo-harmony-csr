import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { reduxForm, Field, propTypes, initialize, reset, change } from 'redux-form';
import { batchActions } from 'redux-batched-actions';
import Inputs from '@exzeo/core-ui/lib/Input';
import lifecycle from '@exzeo/core-ui/lib/InputLifecycle';
// TODO refactor this out next
import ReactSelectField from '../Form/inputs/ReactSelectField';
import Loader from './Loader';

const { validation } = lifecycle;
const { Input, Select, Phone } = Inputs;

export const setMortgageeValues = (val, props) => {
  const selectedMortgagee = val;

  if (selectedMortgagee) {
    props.dispatch(batchActions([
      change('AdditionalInterestModal', 'name1', selectedMortgagee.AIName1),
      change('AdditionalInterestModal', 'name2', selectedMortgagee.AIName2),
      change('AdditionalInterestModal', 'address1', selectedMortgagee.AIAddress1),
      change('AdditionalInterestModal', 'city', selectedMortgagee.AICity),
      change('AdditionalInterestModal', 'state', selectedMortgagee.AIState),
      change('AdditionalInterestModal', 'zip', String(selectedMortgagee.AIZip))
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
          id={isEditing ? 'AdditionalInterestModal' : 'AdditionalInterestModal'}
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
                dataTest="name1"
                label={checkAdditionalInterestForName(addAdditionalInterestType) ? 'First Name' : 'Name 1'}
                component={Input}
                styleName="name-1"
                validate={validation.isRequired}
              />
              <Field
                name="name2"
                dataTest="name2"
                label={checkAdditionalInterestForName(addAdditionalInterestType) ? 'Last Name' : 'Name 2'}
                component={Input}
                styleName="name-2"
              />
              <Field
                name="address1"
                dataTest="address1"
                label="Address 1"
                component={Input}
                styleName="address-1"
                validate={validation.isRequired}
              />
              <Field
                name="address2"
                dataTest="address2"
                label="Address 2"
                component={Input}
                styleName="address-2"
              />
              <div className="flex-form">
                <Field
                  name="city"
                  dataTest="city"
                  label="City"
                  component={Input}
                  styleName="city"
                  validate={validation.isRequired}
                />
                <Field
                  name="state"
                  dataTest="state"
                  label="State"
                  component={Input}
                  styleName="state"
                  validate={validation.isRequired}
                />
                <Field
                  name="zip"
                  dataTest="zip"
                  label="Zip Code"
                  component={Input}
                  styleName="zip"
                  validate={[validation.isRequired, validation.isZipCode]}
                />
              </div>
              <div className="flex-form">
                <Field
                  name="phoneNumber"
                  dataTest="phoneNumber"
                  label="Phone Number"
                  component={Phone}
                  styleName="phone"
                  validate={validation.isPhone}
                  placeholder="555-555-5555"
                />
                <Field
                  name="referenceNumber"
                  dataTest="referenceNumber"
                  label="Reference Number"
                  component={Input}
                  styleName="reference-number"
                />

                {isEditing && selectedAI.type === 'Mortgagee' &&
                <Field
                  name="order"
                  dataTest="order"
                  component={Select}
                  label="Order"
                  validate={validation.isRequired}
                  answers={getMortgageeOrderAnswersForEdit(questions, additionalInterests)}
                />
                }

                {!isEditing && addAdditionalInterestType === 'Mortgagee' &&
                  <Field
                    name="order"
                    dataTest="order"
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
                  dataTest="aiType"
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
