import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { reduxForm, Field, propTypes, initialize, reset } from 'redux-form';
import { Input, Select, Phone, SelectTypeAhead } from '@exzeo/core-ui/lib/Input';
import { validation } from '@exzeo/core-ui/lib/InputLifecycle';
import { getTopMortgageeAnswers } from "../../state/selectors/questions.selectors";
import Loader from './Loader';

export const checkAdditionalInterestForName = aiType => aiType === 'Additional Insured' || aiType === 'Additional Interest' || aiType === 'Bill Payer';

export class AdditionalInterestModal extends React.Component {
  constructor(props) {
    super(props);

    this.modalStyle = { flexDirection: 'row' };
  }

  setMortgageeValues = (value) => {
    const { change } = this.props;
    if (value) {
        change('name1', value.AIName1);
        change('name2', value.AIName2);
        change('address1', value.AIAddress1);
        change('city', value.AICity);
        change('state', value.AIState);
        change('zip', value.AIZip)
    } else {
        change('name1', '');
        change('name2', '');
        change('address1', '');
        change('city', '');
        change('state', '');
        change('zip', '')
    }
    return value;
  };

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
      isPolicy,
      getMortgageeOrderAnswers,
      getMortgageeOrderAnswersForEdit,
      deleteAdditionalInterest,
      validAdditionalInterestTypes,
      selectedAI,
      isDeleting,
      mortgageeAnswers
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
              <Field
                label="Top Mortgagees"
                name="mortgagee"
                dataTest="mortgage"
                component={SelectTypeAhead}
                valueKey="displayText"
                labelKey="displayText"
                answers={mortgageeAnswers}
                normalize={this.setMortgageeValues} />
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
                    label="Order"
                    validate={validation.isRequired}
                    answers={getMortgageeOrderAnswers(questions, additionalInterests)}
                  />
                }
              </div>
              {isPolicy &&
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

const mapStateToProps = (state) => ({
  questions: state.questions,
  tasks: state.cg,
  mortgageeAnswers: getTopMortgageeAnswers(state),
});

AdditionalInterestModal = connect(mapStateToProps, {
  initializeForm: initialize,
  resetForm: reset
})(reduxForm({
  form: 'AdditionalInterestModal',
  enableReinitialize: true
})(AdditionalInterestModal));

export default AdditionalInterestModal;
