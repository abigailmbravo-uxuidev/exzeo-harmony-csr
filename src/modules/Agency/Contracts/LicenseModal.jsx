import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Form, Field } from 'redux-form';
import { Input, Date, Select, validation } from '@exzeo/core-ui';

export const LicenseModal = (props) => {
  const {
    closeModal,
    saveLicense,
    handleSubmit,
    initialValues,
    licenseNumbers
  } = props;

  const states = [
    { answer: 'FL', label: 'FL' },
    { answer: 'TX', label: 'TX' }
  ];

  const typeAnswers = [
    { answer: 'Resident', label: 'Resident' },
    { answer: 'Non-Resident', label: 'Non-Resident' }
  ];

  const uniqueLicenseNumber = value => {
    return value && licenseNumbers.includes(value) && value !== initialValues.licenseNumbers
      ? 'The License Number must be unique.' 
      : undefined;
  };

  const actionType = initialValues ? 'Edit' : "Add";
  return (
    <div className="modal license-crud">
      <div className="card">
        <Form noValidate onSubmit={handleSubmit(saveLicense)}>
          <div className="card-header">
            <h4><i className="fa fa-file" /> {actionType} License</h4>
          </div>
          <div className="card-block">
            <section className="license-details">
              <Field
                label="State"
                styleName="state"
                name="state"
                answers={states}
                component={Select}
                dataTest="state"
                validate={validation.isRequired} />
              <Field
                label="License Number"
                styleName="licenseNumber"
                name="licenseNumber"
                component={Input}
                dataTest="licenseNumber"
                validate={[validation.isRequired, uniqueLicenseNumber]} />
              <Field
                label="Type"
                styleName="licenseType"
                name="licenseType"
                answers={typeAnswers}
                component={Select}
                dataTest="licenseType"
                validate={validation.isRequired} />
              <Field
                label="Effective Date"
                styleName="licenseEffectiveDate"
                name="licenseEffectiveDate"
                component={Date}
                dataTest="licenseEffectiveDate"
                validate={validation.isRequired} />
            </section>
          </div>
          <div className="card-footer">
            <div className="btn-footer">
              <button tabIndex="0" className="btn btn-secondary" type="button" onClick={closeModal()}>Cancel</button>
              <button tabIndex="0" className="btn btn-primary" type="submit">Save</button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

LicenseModal.defaultProps = {
  licenseNumbers: []
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

export default reduxForm({ form: 'LicenseModal', enableReinitialize: true })(LicenseModal);
