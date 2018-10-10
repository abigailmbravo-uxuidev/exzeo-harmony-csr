import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Input, Select, Date, validation } from '@exzeo/core-ui';

const stateAnswers = [
  { answer: 'FL', label: 'FL' },
  { answer: 'TX', label: 'TX' }
];

const typeAnswers = [
  { answer: 'Resident', label: 'Resident' }
];

const License = ({ licenseValue, fields }) => {
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
            validate={validation.isRequired} />
          <Field
            name={`${license}.licenseNumber`}
            component={Input}
            label="License"
            styleName="licenseNumber"
            dataTest={`${license}.licenseNumber`}
            validate={validation.isRequired} />
          <Field
            name={`${license}.licenseType`}
            component={Select}
            styleName="licenseType"
            label="Type"
            answers={typeAnswers}
            dataTest={`${license}.licenseType`}
            validate={validation.isRequired} />
          <Field
            name={`${license}.licenseEffectiveDate`}
            component={Date}
            styleName="licenseEffectiveDate"
            label="Effective Date"
            answers={typeAnswers}
            dataTest={`${license}.licenseEffectiveDate`}
            validate={validation.isRequired} />
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
