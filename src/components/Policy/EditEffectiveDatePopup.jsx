import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Form, propTypes, change } from 'redux-form';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import DateField from '../Form/inputs/DateField';
import SelectField from '../Form/inputs/SelectField';

export const handleInitialize = (state) => {
    const policyData = state.service.latestPolicy;
    const values = {};
  
    values.effectiveDate = _.get(policyData, 'effectiveDate');
  
    const paymentPlans = state.service.billingOptions;
  
    if (paymentPlans && paymentPlans.options && paymentPlans.options.length === 1 && !values.billTo && !values.billPlan) {
      values.billToId = _.get(paymentPlans.options[0], 'billToId');
      values.billToType = _.get(paymentPlans.options[0], 'billToType');
      values.billPlan = 'Annual';
    }
  
    return values;
  };

export const EditEffectiveDatePopup = (props) => {
    return (
      <div className="modal quote-summary">
        <div className="card unsaved-changes">
          <form>
            <div className="card-header">
              <h4>Edit Effective Date</h4>
            </div>
            <div className="card-block">
              <DateField label={'Effective Date'} name={'effectiveDate'} />
                <SelectField
                  name="personalPropertyNew" component="select" label={'Reason For Change'} styleName={''} validations={['required']} answers={[
                    {
                      answer: '',
                      label: 'HUD Statement/Property Deed'
                    }, {
                      answer: '',
                      label: 'Agent\'s Request'
                    }, {
                      answer: '',
                      label: 'Internal User Error'
                    }, {
                      answer: '',
                      label: 'Other'
                    }
                  ]}
                />
            </div>
            <div className="card-footer">
              <div className="btn-footer">
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick=""
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick=""
                >
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  };

export default EditEffectiveDatePopup;