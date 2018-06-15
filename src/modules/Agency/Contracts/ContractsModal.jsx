import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Form, Field } from 'redux-form';
import { Input, Date } from '@exzeo/core-ui/lib/Input';
import { validation } from '@exzeo/core-ui/lib/InputLifecycle';

export const ContractsModal = (props) => {
  const {
    toggleModal, saveContract, handleSubmit, editType
  } = props;
  return (
    <div className="modal contract-crud">
      <Form noValidate onSubmit={handleSubmit(saveContract)}>
        <div className="card">
          <div className="card-header">
            <h4><i className="fa fa-file" /> {editType} Contract</h4>
          </div>
          <div className="card-block">
            <section className="contract-details">
              <div className="flex-form">
                <Field
                  label="Company Code"
                  styleName="companyCode"
                  name="companyCode"
                  component={Input}
                  validate={validation.isRequired}
                />
                <Field
                  label="State"
                  styleName="state"
                  name="state"
                  component={Input}
                  validate={validation.isRequired}
                />
              </div>
              <div className="flex-form">
                <Field
                  label="License Number"
                  styleName="licenseNumber"
                  name="licenseNumber"
                  component={Input}
                  validate={validation.isRequired}
                />
                <Field
                  label="License Effective Date"
                  styleName="licenseExpirationDate"
                  name="licenseExpirationDate"
                  component={Date}
                  validate={[validation.isRequired, validation.isDate]}
                />
              </div>
              <Field
                label="Contract"
                styleName="contract"
                name="contract"
                component={Input}
                validate={validation.isRequired}
              />
              <Field
                label="Addendum"
                styleName="addendum"
                name="addendum"
                component={Input}
                validate={validation.isRequired}
              />
              <Field
                label="EO Expiration Date"
                styleName="eoExpirationDate"
                name="eoExpirationDate"
                component={Date}
                validate={[validation.isRequired, validation.isDate]}
              />
            </section>
            <section className="product-details">
              <label>Products</label>
              <div className="product-wrapper">
                <Field
                  name="af3"
                  id="af3"
                  component="input"
                  type="checkbox"
                />
                <label htmlFor="af3"> AF3</label>
              </div>
              <div className="product-wrapper">
                <Field
                  name="ho3"
                  id="ho3"
                  component="input"
                  type="checkbox"
                />
                <label htmlFor="ho3"> HO3</label>
              </div>
            </section>
          </div>
          <div className="card-footer">
            <div className="btn-footer">
              <button tabIndex="0" className="btn btn-secondary" type="button" onClick={toggleModal('Edit')}>Cancel</button>
              <button tabIndex="0" className="btn btn-primary" type="submit">Save</button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

ContractsModal.propTypes = {
  initialValues: PropTypes.shape().isRequired,
  toggleModal: PropTypes.func.isRequired,
  editType: PropTypes.string.isRequired,
  saveContract: PropTypes.func.isRequired
};

export default reduxForm({ form: 'ContractModal', enableReinitialize: true })(ContractsModal);
