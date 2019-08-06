import React, { useState } from 'react';
import { defaultMemoize } from 'reselect';
import {
  Field,
  OnChangeListener,
  validation,
  Select,
  Input
} from '@exzeo/core-ui';

import {
  UNDERWRITING_CANCELLATION,
  UNDERWRITING_NON_RENEWAL
} from './constants/policy';

const CancelReason = ({ options }) => {
  const [cancelReasons, setCancelReasons] = useState([]);
  const [showAdditionalReason, setShowAdditionalReason] = useState(false);

  const getCancelReasons = defaultMemoize(cancelType => {
    const { cancelOptions } = options;

    const selectedOptions =
      cancelOptions &&
      cancelOptions.find(option => option.cancelType === cancelType);

    setCancelReasons(
      selectedOptions && selectedOptions.cancelReason
        ? selectedOptions.cancelReason.map(reason => ({
            answer: reason,
            label: reason
          }))
        : []
    );
  });

  return (
    <React.Fragment>
      <Field name="cancel.cancelReason" validate={validation.isRequired}>
        {({ input, meta }) => (
          <Select
            input={input}
            meta={meta}
            styleName="cancelReason view-col-12"
            dataTest="cancelReason"
            label="Cancel Reason"
            answers={cancelReasons}
          />
        )}
      </Field>

      {showAdditionalReason && (
        <Field name="cancel.additionalReason">
          {({ input, meta }) => (
            <Input
              input={input}
              meta={meta}
              styleName="additionalReason view-col-12"
              dataTest="additionalReason"
              label="Additional Reason"
            />
          )}
        </Field>
      )}

      <Field name="cancel.cancelReason" subscription={{}}>
        {({ input: { onChange } }) => (
          <OnChangeListener name="cancel.cancelType">
            {function(value) {
              getCancelReasons(value);
              const showAdditional =
                value === UNDERWRITING_CANCELLATION ||
                value === UNDERWRITING_NON_RENEWAL;
              setShowAdditionalReason(showAdditional);
              onChange('');
            }}
          </OnChangeListener>
        )}
      </Field>
    </React.Fragment>
  );
};

export default CancelReason;
