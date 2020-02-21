import React from 'react';
import { Select, validation, Button, Field } from '@exzeo/core-ui';

const ContractProducts = ({ fields, stateAnswers, productAnswers }) => {
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

export default ContractProducts;
