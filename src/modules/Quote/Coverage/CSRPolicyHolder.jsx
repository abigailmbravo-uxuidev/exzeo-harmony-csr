import React from 'react';
import { Field } from 'react-final-form';
import { OnChangeListener } from '@exzeo/core-ui';
import classNames from 'classnames';
import _get from 'lodash/get';
import PolicyHolder from '@exzeo/core-ui/src/@Harmony/Components/PolicyHolder';

const CSRPolicyHolder = ({
  config,
  initialValues,
  size,
}) => {
  const { watchField } = config.extendedProperties;
  return (
    <section className={classNames('policyholder-component', size)} data-test="section-policyholder">

      <section className="primary-policy view-col-6">
      <PolicyHolder
        fieldPrefix="policyHolders[0]"
        title="Primary Policyholder"
        isPrimary={true}
      />
       
      </section>
      <section className="secondary-policy view-col-6">
        <PolicyHolder
          fieldPrefix="policyHolders[1]"
          title="Secondary Policyholder"
          isPrimary={false}
          watchField={() => (
            <div className="check-box-wrapper">
                  <Field
                    name={watchField}
                    component="input"
                    type="checkbox"
                    data-test={watchField} />
                  <label htmlFor={watchField}> Remove</label>
            </div>
          )}
        />

        <Field name="policyHolders[1].firstName" subscription={{}}>
          {({ input: { onChange } }) => (
            <OnChangeListener name={watchField}>
              {(value) => {
                if (!value) {
                  onChange(_get(initialValues, `policyHolders[1].firstName`, ''));
                } else {
                  onChange('');
                }
              }}
            </OnChangeListener>
          )}
        </Field>

        <Field name="policyHolders[1].lastName" subscription={{}}>
          {({ input: { onChange } }) => (
            <OnChangeListener name={watchField}>
              {(value) => {
                if (!value) {
                  onChange(_get(initialValues, `policyHolders[1].lastName`, ''));
                } else {
                  onChange('');
                }
              }}
            </OnChangeListener>
          )}
        </Field>

        <Field name="policyHolders[1].primaryPhoneNumber" subscription={{}}>
          {({ input: { onChange } }) => (
            <OnChangeListener name={watchField}>
              {(value) => {
                if (!value) {
                  onChange(_get(initialValues, `policyHolders[1].primaryPhoneNumber`, ''));
                } else {
                  onChange('');
                }
              }}
            </OnChangeListener>
          )}
        </Field>

        <Field name="policyHolders[1].secondaryPhoneNumber" subscription={{}}>
          {({ input: { onChange } }) => (
            <OnChangeListener name={watchField}>
              {(value) => {
                if (!value) {
                  onChange(_get(initialValues, `policyHolders[1].secondaryPhoneNumber`, ''));
                } else {
                  onChange('');
                }
              }}
            </OnChangeListener>
          )}
        </Field>

        <Field name="policyHolders[1].emailAddress" subscription={{}}>
          {({ input: { onChange } }) => (
            <OnChangeListener name={watchField}>
              {(value) => {
                if (!value) {
                  onChange(_get(initialValues, `policyHolders[1].emailAddress`, ''));
                } else {
                  onChange('');
                }
              }}
            </OnChangeListener>
          )}
        </Field>

      </section>
    </section>
  );
};

export default CSRPolicyHolder;
