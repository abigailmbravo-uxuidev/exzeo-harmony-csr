import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, FieldArray, Form, Field } from 'redux-form';
import { Input, Date, Select, validation } from '@exzeo/core-ui';

export const RenderLicenses = ({ fields }) => {
  const states = [
    { answer: 'FL', label: 'FL' },
    { answer: 'TX', label: 'TX' }
  ];

  if (fields.length === 0) fields.insert(0, {});
  return (
    <React.Fragment>
    {fields.map((license, index) => (
        <div className="license-wrapper" key={license}>
          <Field
            label="State"
            styleName="state"
            name={`${license}.state`}
            answers={states}
            component={Select}
            dataTest={`${license}.state`}
            validate={validation.isRequired} />
          <Field
            label="License Number"
            styleName="licenseNumber"
            name={`${license}.licenseNumber`}
            component={Input}
            dataTest={`${license}.licenseNumber`}
            validate={validation.isRequired} />
          <Field
            label="Effective Date"
            styleName="licenseEffectiveDate"
            name={`${license}.licenseEffectiveDate`}
            component={Date}
            dataTest={`${license}.licenseEffectiveDate`}
            validate={validation.isRequired} />
          {fields.length > 1 &&
          <div className="btn-remove-wrapper align-right align-bottom in-grid-layout">
            <button type="button" className="btn btn-link btn-sm" onClick={() => fields.remove(index)}>
              <i className="fa fa-times-circle" />REMOVE
            </button>
          </div>}
        </div>
          ))}
      <div className="btn-divider-wrapper">
        <button className="btn btn-secondary btn-sm add-license" type="button" onClick={() => fields.push({})}><i className="fa fa-plus" />License</button>
      </div>
    </React.Fragment>
  );
};

export const LicenseModal = (props) => {
  const {
    closeModal,
    saveLicense,
    handleSubmit,
    initialValues,
    licenseNumbers
  } = props;

  const uniqueLicenseNumber = value => {
    return value && licenseNumbers.includes(value) && value !== initialValues.licenseNumbers
      ? 'The License Number must be unique.' 
      : undefined;
  }
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
              <FieldArray name="stateProducts" component={RenderLicenses} />
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
