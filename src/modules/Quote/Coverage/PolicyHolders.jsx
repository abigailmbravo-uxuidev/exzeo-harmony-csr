import React from 'react';
import classNames from 'classnames';
import { Field } from '@exzeo/core-ui';
import PolicyHolder from '@exzeo/core-ui/src/@Harmony/Components/PolicyHolder';
import PolicyHoldersWatcher from './PolicyHoldersWatcher';

const PolicyHolders = ({
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
          renderWatchField={() => (
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
      </section>
        <PolicyHoldersWatcher
          values={initialValues}
          fieldPrefix="policyHolders[1]"
          watchField={watchField}
        />
    </section>
  );
};

export default PolicyHolders;
