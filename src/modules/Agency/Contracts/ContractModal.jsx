import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, FieldArray, Form, Field } from 'redux-form';
import { Input, Date, Select } from '@exzeo/core-ui/lib/Input';
import { validation } from '@exzeo/core-ui';

export const renderProducts = ({ fields }) => {
  const states = [
    { answer: 'FL', label: 'FL' },
    { answer: 'TX', label: 'TX' }
  ];

  const productTypes = [
    { answer: 'HO3', label: 'HO3' },
    { answer: 'FL3', label: 'FL3' }
  ];
  
  if (fields.length === 0) fields.insert(0, {});

  return (
    <React.Fragment>
      {fields.map((product, index) =>
        <div className="license-wrapper" key={product}>
          <Field
            label="State"
            styleName="state"
            name={`${product}.state`}
            component={Select}
            answers={states}
            dataTest={`state-${index}`}
            validate={validation.isRequired}
          />
          <Field
            label="Product"
            styleName="product"
            name={`${product}.product`}
            component={Select}
            answers={productTypes}
            dataTest={`product-${index}`}
            validate={validation.isRequired}
          />
          {fields.length > 1 &&
            <i className="fa fa-times-circle" onClick={() => fields.remove(index)} />
          }
        </div>
      )}
      <div className="add-product">
        <hr/>
        <button className="btn-secondary btn btn-sm" onClick={() => fields.push({})}><i className="fa fa-plus"/>Product</button>
        <hr/>
      </div>
    </React.Fragment>
  )
};

export const ContractModal = (props) => {
  const {
    closeModal,
    saveContract,
    handleSubmit,
    initialValues,
    contractNumbers
  } = props;

  const uniqueContractNumber = value => {
    return value && contractNumbers.includes(value) && value !== initialValues.contractNumbers
      ? 'The Contract Number must be unique.' 
      : undefined;
  }
  const actionType = initialValues ? 'Edit' : "Add";
  return (
    <div className="modal contract-crud">
      <div className="card">
        <Form noValidate onSubmit={handleSubmit(saveContract)}>
          <div className="card-header">
            <h4><i className="fa fa-file" /> {actionType} Contract</h4>
          </div>
          <div className="card-block">
            <section className="contract-details">
              <Field
                label="Company Code"
                styleName="companyCode"
                name={`companyCode`}
                dataTest={`companyCode`}
                component={Input}
                validate={validation.isRequired}
              />
              <Field
                label="Contract"
                styleName="contractNumber"
                name={`contractNumber`}
                dataTest={`contractNumber`}
                component={Input}
                validate={[validation.isRequired, uniqueContractNumber]}
              />
              <Field
                label="Addendum"
                styleName="addendum"
                name={`addendum`}
                dataTest={`addendum`}
                component={Input}
              />
            </section>
            <section className="contract-csp">
              <FieldArray name="stateProducts" component={renderProducts} />
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

ContractModal.defaultProps = {
  contractNumbers: []
};

ContractModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  saveContract: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    companyCode: PropTypes.string.isRequired,
    contractNumber: PropTypes.string.isRequired,
    addendum: PropTypes.string,
    stateProducts: PropTypes.arrayOf(PropTypes.shape({
      state: PropTypes.string,
      product: PropTypes.string
    }))
  })
};

export default reduxForm({ form: 'ContractModal', enableReinitialize: true })(ContractModal);
