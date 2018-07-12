import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import {Input} from "@exzeo/core-ui/lib/Input/index";
import {validation} from "@exzeo/core-ui/lib/InputLifecycle/index";

const License = ({ licenseValue, fields }) => {
  return (
    <React.Fragment>
      <div className="label-wrapper">
        <label className="state">State</label>
        <label className="licenseNumber">License</label>
      </div>
        {fields.map((license, index) => (
          <div className="license-wrapper" key={license}>
            <Field
              name={`${license}.state`}
              component={Input}
              styleName="state"
              dataTest={`${license}.state`}
              validate={validation.isRequired}
            />
            <Field
              name={`${license}.licenseNumber`}
              component={Input}
              styleName="licenseNumber"
              dataTest={`${license}.licenseNumber`}
              validate={validation.isRequired}
            />
          <button type="button" className="btn btn-link btn-sm" onClick={() => fields.remove(index)}><i className="fa fa-times-circle" />REMOVE</button>
          </div>
          ))}

      <button className="btn btn-secondary btn-sm add-license" type="button" onClick={() => fields.push({})}><i className="fa fa-plus" />License</button>
    </React.Fragment>
  );
};

License.propTypes = {};

License.defaultProps = {};

export default License;
