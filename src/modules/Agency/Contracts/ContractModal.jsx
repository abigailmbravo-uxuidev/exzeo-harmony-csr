import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, FieldArray, Form, Field } from 'redux-form';
import { Input, Date, Select } from '@exzeo/core-ui/lib/Input';
import { validation } from '@exzeo/core-ui';
import CheckBoxGroup from '../CheckBoxGroup';

export const renderProducts = ({ fields, meta: { error, submitFailed } }) =>
  <div className="additional-contacts">
    <ul className="contract-agent-list">
    {fields.map((member, index) =>
      <li key={index}>
        <Field
          label="State"
          styleName="state"
          name={`${member}.state`}
          dataTest={`state-${index}`}
          component={Input}
          validate={validation.isRequired}
        />
        <Field
          label="Product"
          name={`${member}.product`}
          dataTest={`product-${index}`}
          component={Input}
          validate={validation.isRequired}
        />
        <i className="fa fa-file-text" onClick={() => fields.remove(index)} />
      </li>      
    )}
    </ul>
  </div>

export const ContractModal = (props) => {
  const {
    closeModal, 
    saveContract, 
    handleSubmit,
    initialValues
  } = props;
console.log(props)
  const actionType = initialValues ? 'Edit' : "Add";
  return (
    <div className="modal contract-crud">
      <Form noValidate onSubmit={handleSubmit(saveContract)}>
        <div className="card">
          <div className="card-header">
            <h4><i className="fa fa-file" />{actionType} Contract</h4>
          </div>
          <div className="card-block">
            <section className="contract-details">
              <div className="flex-form">
                <Field
                  label="Company Code"
                  styleName="companyCode"
                  name={`companyCode`}
                  dataTest={`companyCode`}
                  component={Input}
                  validate={validation.isRequired}
                />
              </div>
              <div className="flex-form">
                <Field
                  label="Contract"
                  styleName="contractNumber"
                  name={`contractNumber`}
                  dataTest={`contractNumber`}
                  component={Input}
                  validate={validation.isRequired}
                />
              </div>
              <div className="flex-form">
                <Field
                  label="Addendum"
                  styleName="addendum"
                  name={`addendum`}
                  dataTest={`addendum`}
                  component={Input}
                  validate={validation.isRequired}
                />
              </div>
              <div className="flex-form">
                <Field
                  label="EO Expiration Date"
                  styleName="eoExpirationDate"
                  name={`eoExpirationDate`}
                  dataTest={`eoExpirationDate`}
                  component={Input}
                  validate={validation.isRequired}
                />
              </div>
            </section>
            <section className="contract-details">
              <div className="flex-form">
                <FieldArray name="stateProducts" component={renderProducts} />
              </div>
            </section>
          </div>
          <div className="card-footer">
            <div className="btn-footer">
              <button tabIndex="0" className="btn btn-secondary" type="button" onClick={closeModal()}>Cancel</button>
              <button tabIndex="0" className="btn btn-primary" type="submit">Save</button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

ContractModal.propTypes = {

};

export default reduxForm({ form: 'ContractModal', enableReinitialize: true })(ContractModal);
