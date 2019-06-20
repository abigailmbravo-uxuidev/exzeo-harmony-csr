import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import cloneDeep from 'lodash/cloneDeep';
import { reduxForm, Field, reset } from 'redux-form';
import {
  Input,
  Select,
  Phone,
  SelectTypeAhead,
  SelectInteger,
  Loader,
  Button,
  validation,
  noop,
  emptyArray,
  emptyObject
} from '@exzeo/core-ui';

import {
  getMortgageeOrderAnswers,
  getMortgageeOrderAnswersForEdit
} from '../utilities/additionalInterests';
import { getTopAnswers } from '../state/selectors/questions.selectors';
import { ADDITIONAL_INTERESTS } from '../constants/additionalInterests';
import {
  getGroupedAdditionalInterests,
  getSortedAdditionalInterests
} from '../state/selectors/quote.selectors';

export const checkAdditionalInterestForName = aiType => {
  return (
    aiType === 'Additional Insured' ||
    aiType === 'Additional Interest' ||
    aiType === 'Bill Payer'
  );
};

export class AdditionalInterestModal extends React.Component {
  setTopValues = (value, answers = []) => {
    const { change } = this.props;
    if (value) {
      const option = answers.find(o => o.id === value);
      change('name1', option.AIName1);
      change('name2', option.AIName2);
      change('address1', option.AIAddress1);
      change('city', option.AICity);
      change('state', option.AIState);
      change('zip', String(option.AIZip));
      change('address2', '');
    } else {
      change('name1', '');
      change('name2', '');
      change('address1', '');
      change('city', '');
      change('state', '');
      change('zip', '');
      change('address2', '');
    }
    return value;
  };

  normalizeTopMortgagee = value => {
    const { mortgageeAnswers } = this.props;
    return this.setTopValues(value, mortgageeAnswers);
  };

  normalizeTopPremiumFinance = value => {
    const { premiumFinanceAnswers } = this.props;
    return this.setTopValues(value, premiumFinanceAnswers);
  };

  handleFormSubmit = async (data, dispatch, formProps) => {
    const { additionalInterests, isEditing } = formProps;

    const aiData = {
      _id: data._id,
      name1: data.name1,
      name2: data.name2,
      referenceNumber: data.referenceNumber || '',
      order: Number(data.order) || 0,
      active: true,
      type: data.type,
      phoneNumber: String(data.phoneNumber).length > 0 ? data.phoneNumber : '',
      mailingAddress: {
        address1: data.address1,
        address2: data.address2,
        city: data.city,
        state: data.state,
        zip: data.zip,
        country: {
          code: 'USA',
          displayText: 'United States of America'
        }
      }
    };

    const isMortgagee = data.type === ADDITIONAL_INTERESTS.mortgagee;
    let updatedAdditionalInterests;

    if (isEditing) {
      updatedAdditionalInterests = (additionalInterests || []).filter(
        ai => ai._id !== data._id
      );

      if (isMortgagee && data.order !== formProps.initialValues.order) {
        // if user changed the order of mortgagee, make sure we swap the order of mortgagee that currently holds that order
        updatedAdditionalInterests.forEach(ai => {
          if (
            ai.type === ADDITIONAL_INTERESTS.mortgagee &&
            ai.order === data.order
          ) {
            ai.order = Number(formProps.initialValues.order);
          }
        });
      }
    } else {
      updatedAdditionalInterests = cloneDeep(additionalInterests) || [];
    }
    updatedAdditionalInterests.push(aiData);

    await formProps.completeSubmit(updatedAdditionalInterests, aiData);
  };

  render() {
    const {
      additionalInterests,
      addAdditionalInterestType,
      deleteAdditionalInterest,
      handleSubmit,
      hideModal,
      isDeleting,
      isEditing,
      isPolicy,
      mortgageeAnswers,
      questions,
      selectedAI,
      submitting,
      validAdditionalInterestTypes,
      premiumFinanceAnswers,
      pristine
    } = this.props;

    return (
      <div className="modal additional-interest">
        <form
          id={
            isEditing
              ? 'AdditionalInterestEditModal'
              : 'AdditionalInterestModal'
          }
          onSubmit={handleSubmit(this.handleFormSubmit)}
          className={classNames('AdditionalInterestModal', {
            [selectedAI.type]: isEditing,
            [addAdditionalInterestType]: !isEditing
          })}
        >
          <div className="card">
            <div className="card-header">
              <h4>
                <i className={`fa fa-circle ${addAdditionalInterestType}`} />{' '}
                {addAdditionalInterestType}
              </h4>
            </div>
            <div className="card-block">
              {(addAdditionalInterestType || selectedAI.type) ===
                'Mortgagee' && (
                <Field
                  label="Top Mortgagees"
                  name="mortgagee"
                  dataTest="mortgage"
                  component={SelectTypeAhead}
                  valueKey="displayText"
                  labelKey="displayText"
                  answers={mortgageeAnswers}
                  normalize={this.normalizeTopMortgagee}
                  optionValue="id"
                />
              )}
              {(addAdditionalInterestType || selectedAI.type) ===
                'Premium Finance' && (
                <Field
                  label="Top Premium Finance"
                  name="premiumFinance"
                  dataTest="premiumFinance"
                  component={SelectTypeAhead}
                  valueKey="displayText"
                  labelKey="displayText"
                  answers={premiumFinanceAnswers}
                  normalize={this.normalizeTopPremiumFinance}
                  optionValue="id"
                />
              )}
              <Field
                name="name1"
                dataTest="name1"
                label={
                  checkAdditionalInterestForName(addAdditionalInterestType)
                    ? 'First Name'
                    : 'Name 1'
                }
                component={Input}
                styleName="name-1"
                validate={validation.isRequired}
              />
              <Field
                name="name2"
                dataTest="name2"
                label={
                  checkAdditionalInterestForName(addAdditionalInterestType)
                    ? 'Last Name'
                    : 'Name 2'
                }
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

                {isEditing && selectedAI.type === 'Mortgagee' && (
                  <Field
                    name="order"
                    dataTest="order"
                    component={SelectInteger}
                    label="Order"
                    validate={validation.isRequired}
                    answers={getMortgageeOrderAnswersForEdit(
                      questions,
                      additionalInterests
                    )}
                  />
                )}

                {!isEditing && addAdditionalInterestType === 'Mortgagee' && (
                  <Field
                    name="order"
                    dataTest="order"
                    component={SelectInteger}
                    label="Order"
                    validate={validation.isRequired}
                    answers={getMortgageeOrderAnswers(
                      questions,
                      additionalInterests
                    )}
                  />
                )}
              </div>
              {isPolicy && (
                <div className="flex-form">
                  <Field
                    name="type"
                    dataTest="aiType"
                    label="Type"
                    component={Select}
                    answers={validAdditionalInterestTypes}
                    validate={validation.isRequired}
                  />
                </div>
              )}
            </div>
            <div className="card-footer">
              <div className="btn-group">
                <Button
                  className={Button.constants.classNames.secondary}
                  label="Cancel"
                  onClick={hideModal}
                  data-test="ai-modal-cancel"
                />
                {isEditing && (
                  <Button
                    className={Button.constants.classNames.secondary}
                    label="Delete"
                    disabled={submitting || isDeleting}
                    data-test="ai-modal-delete"
                    onClick={() =>
                      deleteAdditionalInterest(selectedAI, this.props)
                    }
                  />
                )}
                <Button
                  className={Button.constants.classNames.primary}
                  type="submit"
                  label="Save"
                  data-test="ai-modal-submit"
                  disabled={pristine || submitting || isDeleting}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

AdditionalInterestModal.propTypes = {
  change: PropTypes.func.isRequired,
  completeSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  validAdditionalInterestTypes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  addAdditionalInterestType: PropTypes.string,
  additionalInterests: PropTypes.array,
  deleteAdditionalInterest: PropTypes.func,
  isDeleting: PropTypes.bool,
  isEditing: PropTypes.bool,
  isPolicy: PropTypes.bool,
  mortgageeAnswers: PropTypes.arrayOf(PropTypes.shape()),
  premiumFinanceAnswers: PropTypes.arrayOf(PropTypes.shape()),
  questions: PropTypes.shape(),
  selectedAI: PropTypes.shape()
};

AdditionalInterestModal.defaultProps = {
  additionalInterests: emptyArray,
  isPolicy: false,
  isEditing: false,
  isDeleting: false,
  deleteAdditionalInterest: noop,
  mortgageeAnswers: emptyArray,
  premiumFinanceAnswers: emptyArray,
  questions: emptyObject,
  selectedAI: emptyObject
};

const getMortgageeAnswers = getTopAnswers('mortgagee');
const getTopPremiumFinanceAnswers = getTopAnswers('premiumFinance');
const mapStateToProps = state => ({
  groupedAdditionalInterests: getGroupedAdditionalInterests(state),
  mortgageeAnswers: getMortgageeAnswers(state),
  premiumFinanceAnswers: getTopPremiumFinanceAnswers(state),
  questions: state.questions,
  sortedAdditionalInterests: getSortedAdditionalInterests(state)
});

export default connect(
  mapStateToProps,
  {
    resetForm: reset
  }
)(
  reduxForm({
    form: 'AdditionalInterestModal',
    enableReinitialize: true
  })(AdditionalInterestModal)
);
