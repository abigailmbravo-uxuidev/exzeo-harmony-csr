import React from 'react';
import PropTypes from 'prop-types';
import {
  Select,
  validation,
  SelectTypeAhead,
  Button,
  emptyArray
} from '@exzeo/core-ui';
import { reduxForm, FieldArray, Field } from 'redux-form';

export const RenderProducts = ({ fields, stateAnswers, productAnswers }) => {
  if (fields.length === 0) fields.insert(0, {});

  return (
    <React.Fragment>
      {fields.map((product, index) => (
        <div className="csp-wrapper" key={product}>
          <Field
            label="State"
            styleName="state"
            name={`${product}.state`}
            component={Select}
            answers={stateAnswers}
            dataTest={`state-${index}`}
            validate={validation.isRequired}
          />
          <Field
            label="Product"
            styleName="product"
            name={`${product}.product`}
            component={Select}
            answers={productAnswers}
            dataTest={`product-${index}`}
            validate={validation.isRequired}
          />
          {fields.length > 1 && (
            <i
              className="fa fa-times-circle"
              onClick={() => fields.remove(index)}
            />
          )}
        </div>
      ))}
      <div className="add-product">
        <hr />
        <Button
          className={Button.constants.classNames.secondary}
          size={Button.constants.classNames.small}
          data-test="add-product"
          onClick={() => fields.push({})}
        >
          <i className="fa fa-plus" />
          Product
        </Button>
        <hr />
      </div>
    </React.Fragment>
  );
};

export const ContractModal = props => {
  const {
    closeModal,
    saveContract,
    handleSubmit,
    initialValues,
    addendumAnswers,
    companyCodeAnswers,
    agencyContractAnswers,
    stateAnswers,
    productAnswers
  } = props;

  const actionType = initialValues ? 'Edit' : 'Add';
  return (
    <div className="modal contract-crud">
      <div className="card">
        <form noValidate onSubmit={handleSubmit(saveContract)}>
          <div className="card-header">
            <h4>
              <i className="fa fa-file" /> {actionType} Contract
            </h4>
          </div>
          <div className="card-block">
            <section className="contract-details">
              <Field
                name="companyCode"
                label="Company Code"
                component={SelectTypeAhead}
                styleName="companyCode"
                dataTest="companyCode"
                validate={validation.isRequired}
                answers={companyCodeAnswers}
              />
              <Field
                name="contractNumber"
                label="Contract"
                component={SelectTypeAhead}
                styleName="contractNumber"
                dataTest="contractNumber"
                validate={[validation.isRequired, validation.isUnique]}
                answers={agencyContractAnswers}
              />
              <Field
                name="addendum"
                label="Addendum"
                component={SelectTypeAhead}
                styleName="addendum"
                dataTest="addendum"
                answers={addendumAnswers}
              />
            </section>
            <section className="contract-csp">
              <FieldArray
                name="stateProducts"
                component={fieldProps => (
                  <RenderProducts
                    {...fieldProps}
                    stateAnswers={stateAnswers}
                    productAnswers={productAnswers}
                  />
                )}
              />
            </section>
          </div>
          <div className="card-footer">
            <div className="btn-footer">
              <button
                tabIndex="0"
                className="btn btn-secondary"
                type="button"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button tabIndex="0" className="btn btn-primary" type="submit">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

ContractModal.defaultProps = {
  contractNumbers: emptyArray,
  addendumAnswers: emptyArray,
  companyCodeAnswers: emptyArray,
  agencyContractAnswers: emptyArray,
  stateAnswers: emptyArray,
  productAnswers: emptyArray
};

ContractModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  saveContract: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    companyCode: PropTypes.string.isRequired,
    contractNumber: PropTypes.string.isRequired,
    addendum: PropTypes.string,
    stateProducts: PropTypes.arrayOf(
      PropTypes.shape({
        state: PropTypes.string,
        product: PropTypes.string
      })
    )
  })
};

export default reduxForm({ form: 'ContractModal', enableReinitialize: true })(
  ContractModal
);
