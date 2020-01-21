import React from 'react';
import { Field } from 'redux-form';
import { Input, Select, validation } from '@exzeo/core-ui';

import { LICENSE_TYPE } from '../../../constants/agency';

const License = ({ fields, isAgency, stateAnswers }) => {
  return (
    <React.Fragment>
      {fields.map((license, index) => (
        <div className="license-wrapper" key={license}>
          <Field
            name={`${license}.state`}
            component={Select}
            styleName="state"
            label="State"
            answers={stateAnswers}
            dataTest={`${license}.state`}
            validate={validation.isRequired}
          />
          <Field
            name={`${license}.licenseNumber`}
            component={Input}
            label="License"
            styleName="licenseNumber"
            dataTest={`${license}.licenseNumber`}
            validate={validation.isRequired}
          />
          <Field
            name={`${license}.licenseType`}
            component={Select}
            styleName="licenseType"
            label="Type"
            answers={LICENSE_TYPE}
            dataTest={`${license}.licenseType`}
            validate={validation.isRequired}
          />
          <div className="appointed-wrapper">
            <label htmlFor={`${license}.appointed`}>Appointed</label>
            <Field
              name={`${license}.appointed`}
              component="input"
              type="checkbox"
              className="appointed"
              label="Appointed"
              data-test={`${license}.appointed`}
            />
          </div>
          {fields.length > 1 && (
            <div className="btn-remove-wrapper align-right align-bottom in-grid-layout">
              <button
                type="button"
                className="btn btn-link btn-sm"
                data-test={`rm-license-${index}`}
                onClick={() => fields.remove(index)}
              >
                <i className="fa fa-times-circle" />
                REMOVE
              </button>
            </div>
          )}
        </div>
      ))}
      <div className="btn-divider-wrapper">
        <button
          className="btn btn-secondary btn-sm add-license"
          type="button"
          data-test="add-license"
          onClick={() => fields.push({ appointed: false })}
        >
          <i className="fa fa-plus" />
          License
        </button>
      </div>
    </React.Fragment>
  );
};

License.defaultProps = {
  fields: [],
  isAgency: false,
  stateAnswers: []
};

export default License;
