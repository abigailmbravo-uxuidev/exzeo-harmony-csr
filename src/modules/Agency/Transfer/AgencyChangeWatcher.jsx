import React from 'react';
import { OnChangeListener, Field, useField } from '@exzeo/core-ui';

const AgencyChangeWatcher = ({ getAgentsForTransfer }) => {
  return (
    <React.Fragment>
      <Field name="agentCodeTo" subscription={{}}>
        {({ input: { onChange } }) => (
          <React.Fragment>
            <OnChangeListener name="agencyCodeTo">
              {value => {
                if (value) {
                  onChange(null);
                  getAgentsForTransfer(value);
                }
              }}
            </OnChangeListener>
          </React.Fragment>
        )}
      </Field>
    </React.Fragment>
  );
};

export default AgencyChangeWatcher;
