import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { Input, Date, Select, validation } from '@exzeo/core-ui';

export const LicenseModal = props => {
  const {
    closeModal,
    saveLicense,
    handleSubmit,
    initialValues,
    stateAnswers
  } = props;

  const typeAnswers = [
    { answer: 'Resident', label: 'Resident' },
    { answer: 'Non-Resident', label: 'Non-Resident' }
  ];

  const actionType =
    initialValues && initialValues.licenseNumber ? 'Edit' : 'Add';
  return (
    <div className="modal license-crud">
      <div className="card">
        <form noValidate onSubmit={handleSubmit(saveLicense)}>
          <div className="card-header">
            <h4>
              <i className="fa fa-file" /> {actionType} License
            </h4>
          </div>
          <div className="card-block">
            <section className="license-details">
              <Field
                label="State"
                styleName="state"
                name="state"
                answers={stateAnswers}
                component={Select}
                dataTest="state"
                validate={validation.isRequired}
              />
              <Field
                label="License Number"
                styleName="licenseNumber"
                name="licenseNumber"
                component={Input}
                dataTest="licenseNumber"
                validate={[validation.isRequired, validation.isUnique]}
              />
              <Field
                label="Type"
                styleName="licenseType"
                name="licenseType"
                answers={typeAnswers}
                component={Select}
                dataTest="licenseType"
                validate={validation.isRequired}
              />
              <Field
                label="Effective Date"
                styleName="licenseEffectiveDate"
                name="licenseEffectiveDate"
                component={Date}
                dataTest="licenseEffectiveDate"
                validate={[
                  validation.isRequired,
                  validation.isDateRange('1900', '10000')
                ]}
              />
            </section>
          </div>
          <div className="card-footer">
            <div className="btn-footer">
              <button
                tabIndex="0"
                className="btn btn-secondary"
                data-test="modal-cancel"
                type="button"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                tabIndex="0"
                className="btn btn-primary"
                data-test="modal-submit"
                type="submit"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

LicenseModal.defaultProps = {
  licenseNumbers: [],
  stateAnswers: []
};

LicenseModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  saveLicense: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    state: PropTypes.string,
    licenseNumber: PropTypes.string,
    licenseEffectiveDate: PropTypes.string
  })
};

export default reduxForm({ form: 'LicenseModal', enableReinitialize: true })(
  LicenseModal
);
