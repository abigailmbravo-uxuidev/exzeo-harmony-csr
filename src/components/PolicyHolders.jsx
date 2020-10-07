import React from 'react';
import classNames from 'classnames';
import { Field } from '@exzeo/core-ui/src';
import { PolicyHolder } from '@exzeo/core-ui/src/@Harmony';

import PolicyHoldersWatcher from './PolicyHoldersWatcher';

const PolicyHolders = ({ initialValues, size, watchField }) => {
  return (
    <section
      className={classNames('policyholder-component', size)}
      data-test="section-policyholder"
    >
      <section
        className="primary-policy view-col-6"
        aria-label="primary policyholder info"
      >
        <PolicyHolder
          fieldPrefix="policyHolders[0]"
          title="Primary Policyholder"
          isPrimary
          showSecondaryPhone
        />
      </section>
      <section
        className="secondary-policy view-col-6"
        aria-label="secondary policyholder info"
      >
        <PolicyHolder
          fieldPrefix="policyHolders[1]"
          title="Secondary Policyholder"
          isPrimary={false}
          showSecondaryPhone
          renderWatchField={() => (
            <div className="check-box-wrapper">
              <Field
                name={watchField}
                component="input"
                type="checkbox"
                disabled={initialValues.policyHolders.length === 1}
                data-test={watchField}
              />
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
