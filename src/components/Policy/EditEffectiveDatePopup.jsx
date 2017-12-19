import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Form, propTypes, change } from 'redux-form';
import _ from 'lodash';
import moment from 'moment-timezone';
import * as serviceActions from '../../actions/serviceActions';
import DateField from '../Form/inputs/DateField';
import SelectField from '../Form/inputs/SelectField';


export const reasonAnswers = (reasons) => {
    const reformattedReasons = _.concat([], reasons).map((reason) => {
      return { answer: reason, label: reason};
    })
    return reformattedReasons || [];
}

export const EditEffectiveDatePopup = (props) => {
  const { effectiveDateReasons, latestPolicy  } = props;
  const reasons = reasonAnswers(effectiveDateReasons);
  // Effective Date Change business rules
  const effectiveDate = latestPolicy.effectiveDate;
  return (
      <div className="modal quote-summary">
        <div className="card unsaved-changes">
          <form>
            <div className="card-header">
              <h4>Edit Effective Date</h4>
            </div>
            <div className="card-block">
              <DateField label={'Effective Date'} name={'effectiveDate'}  />
                <SelectField
                  name="personalPropertyNew" component="select" label={'Reason For Change'} styleName={''} validations={['required']} answers={reasons}
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

  EditEffectiveDatePopup.propTypes = {
    showEffectiveDatePopup: PropTypes.func,
    effectiveDate: PropTypes.string
  };
  
  
  const mapStateToProps = state => ({
    effectiveDateReasons: state.service.effectiveDateReasons,
    latestPolicy: state.service.latestPolicy
  });

  const mapDispatchToProps = dispatch => ({
    actions: {      
      serviceActions: bindActionCreators(serviceActions, dispatch)
    }
  });
  

  export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'EditEffectiveDatePopup', enableReinitialize: true
  })(EditEffectiveDatePopup));