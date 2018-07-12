import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import {Input} from "@exzeo/core-ui/lib/Input/index";
import {validation} from "@exzeo/core-ui/lib/InputLifecycle/index";

const License = ({ licenseValue, fields }) => {
  return (
    <React.Fragment>
      <div className="license-wrapper">
        {fields.map((license) => (
          <React.Fragment key={license}>
            <Field
              name={`${license}.state`}
              label="State"
              component={Input}
              styleName="state"
              dataTest={`${license}.state`}
              validate={validation.isRequired}
            />
            <Field
              name={`${license}.licenseNumber`}
              label="License"
              component={Input}
              styleName="licenseNumber"
              dataTest={`${license}.licenseNumber`}
              validate={validation.isRequired}
            />
          </React.Fragment>
          ))}
      </div>
      <button className="btn btn-secondary btn-sm" type="button" onClick={() => fields.push({})}><i className="fa fa-plus" />License</button>
    </React.Fragment>
  );
};

License.propTypes = {};

License.defaultProps = {};

export default License;
