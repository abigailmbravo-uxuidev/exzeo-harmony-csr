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

  const effectiveDatePlus20 = effectiveDate.clone().add(20, 'd');
  const effectiveDatePlus45 = effectiveDate.clone().add(45, 'd');
  const effectiveDatePlus90 = effectiveDate.clone().add(90, 'd');

  const currentDatePlus20 = now.clone().add(20, 'd');
  const currentDatePlus45 = now.clone().add(45, 'd');

  const notice = effectiveDate.isAfter(now) ? effectiveDate : now;
  const endDate = date.convertDateToTimeZone(
    initialValues.endDate,
    options.zipCodeSettings
  );

  const getMax = (a, b) => (a.isAfter(b) ? a : b);

  const { product, policyTerm } = initialValues;

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
              if (value === UNDERWRITING_CANCELLATION) {
                const uwEffectiveDate =
                  policyTerm > 1 || now.isAfter(effectiveDatePlus90)
                    ? now.clone().add(120, 'd')
                    : product === 'AF3' &&
                      now.isSameOrBefore(effectiveDatePlus90)
                    ? getMax(effectiveDatePlus45, currentDatePlus45)
                    : getMax(effectiveDatePlus20, currentDatePlus20);

                onChange(uwEffectiveDate.format('YYYY-MM-DD'));
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
