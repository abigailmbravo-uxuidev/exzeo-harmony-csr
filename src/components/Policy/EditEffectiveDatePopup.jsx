import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as serviceActions from '../../actions/serviceActions';
import DateField from '../Form/inputs/DateField';
import SelectField from '../Form/inputs/SelectField';


export const reasonAnswers = (reasons) => {
    const reasonsArray = [];
    const reformattedReasons = reasons.map((reason) => {
      const reasonsObj = { answer: reason, label: reason};
      reasonsArray.push(reasonsObj);
    })

    return reasonsArray
}

export const EditEffectiveDatePopup = (props) => {
  const { effectiveDateReasons  } = props;
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
                  name="personalPropertyNew" component="select" label={'Reason For Change'} styleName={''} validations={['required']} answers={() => reasonAnswers(effectiveDateReasons)}
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
    effectiveDateReasons: state.service.effectiveDateReasons
  });

  const mapDispatchToProps = dispatch => ({
    actions: {      
      serviceActions: bindActionCreators(serviceActions, dispatch)
    }
  });
  

  export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'EditEffectiveDatePopup', enableReinitialize: true
  })(EditEffectiveDatePopup));