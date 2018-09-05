import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';
import { reduxForm, Field, reset } from 'redux-form';
import { Input, Select, Phone, SelectTypeAhead, SelectInteger, Loader, validation } from '@exzeo/core-ui';

import {
  getMortgageeOrderAnswers,
  getMortgageeOrderAnswersForEdit
} from '../utilities/additionalInterests';
import { getTopAnswers } from '../state/selectors/questions.selectors';
import { ADDITIONAL_INTERESTS } from '../constants/additionalInterests';
import { setAppState } from '../state/actions/appState.actions';
import { getGroupedAdditionalInterests, getSortedAdditionalInterests } from '../state/selectors/quote.selectors';

export const checkAdditionalInterestForName = aiType => aiType === 'Additional Insured' || aiType === 'Additional Interest' || aiType === 'Bill Payer';

export class AdditionalInterestModal extends React.Component {
  constructor(props) {
    super(props);

    this.modalStyle = { flexDirection: 'row' };
  }

  setTopValues = (value) => {
    const { change } = this.props;
    if (value) {
      change('name1', value.AIName1);
      change('name2', value.AIName2);
      change('address1', value.AIAddress1);
      change('city', value.AICity);
      change('state', value.AIState);
      change('zip', value.AIZip);
    } else {
      change('name1', '');
      change('name2', '');
      change('address1', '');
      change('city', '');
      change('state', '');
      change('zip', '');
    }
    return value;
  };

  handleFormSubmit = async (data, dispatch, formProps) => {
    const {
      appState, additionalInterests, setAppStateAction, isEditing
    } = formProps;

    const workflowId = appState.instanceId;
    setAppStateAction(
      appState.modelName,
      workflowId, {
        ...appState.data
      }
    );

    const aiData = {
      _id: data._id, // eslint-disable-line
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
      updatedAdditionalInterests = (additionalInterests || []).filter(ai => ai._id !== data._id);

      if (isMortgagee && data.order !== formProps.initialValues.order) {
        // if user changed the order of mortgagee, make sure we swap the order of mortgagee that currently holds that order
        updatedAdditionalInterests.forEach((ai) => {
          if (ai.type === ADDITIONAL_INTERESTS.mortgagee && ai.order === data.order) {
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
      <div className="modal" style={this.modalStyle}>
        {(submitting || isDeleting) && <Loader />}
        <form
          id={isEditing ? 'AdditionalInterestEditModal' : 'AdditionalInterestModal'}
          className={classNames('AdditionalInterestModal', { [selectedAI.type]: isEditing, [addAdditionalInterestType]: !isEditing })}
          onSubmit={handleSubmit(this.handleFormSubmit)}>
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
                normalize={this.setTopValues}/>
              }
              {(addAdditionalInterestType || selectedAI.type) === 'Premium Finance' &&
              <Field
                label="Top Premium Finance"
                name="premiumFinance"
                dataTest="premiumFinance"
                component={SelectTypeAhead}
                valueKey="displayText"
                labelKey="displayText"
                answers={premiumFinanceAnswers}
                normalize={this.setTopValues}/>
              }
              <Field
                name="name1"
                dataTest="name1"
                label={checkAdditionalInterestForName(addAdditionalInterestType) ? 'First Name' : 'Name 1'}
                component={Input}
                styleName="name-1"
                validate={validation.isRequired}/>
              <Field
                name="name2"
                dataTest="name2"
                label={checkAdditionalInterestForName(addAdditionalInterestType) ? 'Last Name' : 'Name 2'}
                component={Input}
                styleName="name-2"/>
              <Field
                name="address1"
                dataTest="address1"
                label="Address 1"
                component={Input}
                styleName="address-1"
                validate={validation.isRequired}/>
              <Field
                name="address2"
                dataTest="address2"
                label="Address 2"
                component={Input}
                styleName="address-2"/>
              <div className="flex-form">
                <Field
                  name="city"
                  dataTest="city"
                  label="City"
                  component={Input}
                  styleName="city"
                  validate={validation.isRequired}/>
                <Field
                  name="state"
                  dataTest="state"
                  label="State"
                  component={Input}
                  styleName="state"
                  validate={validation.isRequired}/>
                <Field
                  name="zip"
                  dataTest="zip"
                  label="Zip Code"
                  component={Input}
                  styleName="zip"
                  validate={[validation.isRequired, validation.isZipCode]}/>
              </div>
              <div className="flex-form">
                <Field
                  name="phoneNumber"
                  dataTest="phoneNumber"
                  label="Phone Number"
                  component={Phone}
                  styleName="phone"
                  validate={validation.isPhone}
                  placeholder="555-555-5555"/>
                <Field
                  name="referenceNumber"
                  dataTest="referenceNumber"
                  label="Reference Number"
                  component={Input}
                  styleName="reference-number"/>

                {isEditing && selectedAI.type === 'Mortgagee' &&
                <Field
                  name="order"
                  dataTest="order"
                  component={SelectInteger}
                  label="Order"
                  validate={validation.isRequired}
                  answers={getMortgageeOrderAnswersForEdit(questions, additionalInterests)}/>
                }

                {!isEditing && addAdditionalInterestType === 'Mortgagee' &&
                <Field
                  name="order"
                  dataTest="order"
                  component={SelectInteger}
                  label="Order"
                  validate={validation.isRequired}
                  answers={getMortgageeOrderAnswers(questions, additionalInterests)}/>
                }
              </div>
              {isPolicy &&
              <div className="flex-form">
                <Field
                  name="type"
                  dataTest="aiType"
                  label="Type"
                  component={Select}
                  answers={validAdditionalInterestTypes}
                  validate={validation.isRequired}/>
              </div>
              }
            </div>
            <div className="card-footer">
              <div className="btn-group">
                <button tabIndex="0" className="btn btn-secondary" type="button" onClick={hideModal}>Cancel</button>
                {isEditing && <button tabIndex="0" className="btn btn-secondary" type="button" disabled={submitting || isDeleting} onClick={() => deleteAdditionalInterest(selectedAI, this.props)}>Delete</button>}
                <button tabIndex="0" className="btn btn-primary" type="submit" disabled={pristine || submitting || isDeleting}>Save</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

AdditionalInterestModal.propTypes = {
  completeSubmit: PropTypes.func.isRequired
};

AdditionalInterestModal.defaultProps = {
  isPolicy: false
};
const getMortgageeAnswers = getTopAnswers('mortgagee');
const getTopPremiumFinanceAnswers = getTopAnswers('premiumFinance');

const mapStateToProps = state => ({
  appState: state.appState,
  questions: state.questions,
  tasks: state.cg,
  mortgageeAnswers: getMortgageeAnswers(state),
  sortedAdditionalInterests: getSortedAdditionalInterests(state),
  groupedAdditionalInterests: getGroupedAdditionalInterests(state),
  premiumFinanceAnswers: getTopPremiumFinanceAnswers(state)
});

export default connect(mapStateToProps, {
  setAppStateAction: setAppState,
  resetForm: reset
})(reduxForm({
  form: 'AdditionalInterestModal',
  enableReinitialize: true
})(AdditionalInterestModal));
