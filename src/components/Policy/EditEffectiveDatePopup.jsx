import React, { Component } from 'react';
import DateField from '../Form/inputs/DateField';
import SelectField from '../Form/inputs/SelectField';
export class EditEffectiveDatePopup extends Component {
  render() {
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
                      label: 'Reason 1'
                    }, {
                      answer: '',
                      label: 'Reason 2'
                    }, {
                      answer: '',
                      label: 'Reason 3'
                    }, {
                      answer: '',
                      label: 'Reason 4'
                    }, {
                      answer: '',
                      label: 'Reason 5'
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
  }
}
export default EditEffectiveDatePopup;