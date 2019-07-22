import React from 'react';
import {
  Field,
  OnChangeListener,
  validation,
  Radio,
  date
} from '@exzeo/core-ui';
import {
  VOLUNTARY_CANCELLATION,
  UNDERWRITING_CANCELLATION,
  UNDERWRITING_NON_RENEWAL
} from './constants/policy';

const CancelType = ({ initialValues, options }) => {
  const now = date.convertDateToTimeZone(undefined, options.zipCodeSettings);
  const effectiveDate = date.convertDateToTimeZone(
    initialValues.summaryLedger.effectiveDate,
    options.zipCodeSettings
  );
  const notice = effectiveDate.isAfter(now) ? effectiveDate : now;
  const endDate = date.convertDateToTimeZone(
    initialValues.endDate,
    options.zipCodeSettings
  );

  return (
    <React.Fragment>
      <Field name="cancel.cancelType" validate={validation.isRequired}>
        {({ input, meta }) => (
          <Radio
            input={input}
            meta={meta}
            styleName="cancelType view-col-10"
            dataTest="cancelType"
            label="Cancel Type"
            segmented
            onChange={x => x}
            answers={[
              {
                label: VOLUNTARY_CANCELLATION,
                answer: VOLUNTARY_CANCELLATION
              },
              {
                label: UNDERWRITING_CANCELLATION,
                answer: UNDERWRITING_CANCELLATION
              },
              {
                label: UNDERWRITING_NON_RENEWAL,
                answer: UNDERWRITING_NON_RENEWAL
              }
            ]}
          />
        )}
      </Field>
      <Field name="cancel.effectiveDate" subscription={{}}>
        {({ input: { onChange } }) => (
          <OnChangeListener name="cancel.cancelType">
            {function(value) {
              if (
                value === UNDERWRITING_CANCELLATION &&
                effectiveDate
                  .clone()
                  .add(90, 'days')
                  .isAfter(now)
              ) {
                onChange(
                  notice
                    .clone()
                    .add(20, 'days')
                    .format('YYYY-MM-DD')
                );
              } else if (value === UNDERWRITING_CANCELLATION) {
                onChange(
                  now
                    .clone()
                    .add(120, 'days')
                    .format('YYYY-MM-DD')
                );
              } else if (value === VOLUNTARY_CANCELLATION) {
                onChange(notice.format('YYYY-MM-DD'));
              } else if (value === UNDERWRITING_NON_RENEWAL) {
                onChange(endDate.format('YYYY-MM-DD'));
              }
            }}
          </OnChangeListener>
        )}
      </Field>
    </React.Fragment>
  );
};

export default CancelType;
