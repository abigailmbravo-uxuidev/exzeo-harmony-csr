import React from 'react';
import { OnChangeListener, Field } from '@exzeo/core-ui';
import _get from 'lodash/get';

const PolicyHoldersWatcher = ({ fieldPrefix, watchField, values }) => {
  return (
    <React.Component>
        <Field name={`${fieldPrefix}.firstName`} subscription={{}}>
          {({ input: { onChange } }) => (
            <OnChangeListener name={watchField}>
              {(value) => {
                if (!value) {
                  onChange(_get(values, `${fieldPrefix}.firstName`, ''));
                } else {
                  onChange('');
                }
              }}
            </OnChangeListener>
          )}
        </Field>

        <Field name={`${fieldPrefix}.lastName`} subscription={{}}>
          {({ input: { onChange } }) => (
            <OnChangeListener name={watchField}>
              {(value) => {
                if (!value) {
                  onChange(_get(values, `${fieldPrefix}.lastName`, ''));
                } else {
                  onChange('');
                }
              }}
            </OnChangeListener>
          )}
        </Field>

        <Field name={`${fieldPrefix}.primaryPhoneNumber`} subscription={{}}>
          {({ input: { onChange } }) => (
            <OnChangeListener name={watchField}>
              {(value) => {
                if (!value) {
                  onChange(_get(values, `${fieldPrefix}.primaryPhoneNumber`, ''));
                } else {
                  onChange('');
                }
              }}
            </OnChangeListener>
          )}
        </Field>

        <Field name={`${fieldPrefix}.secondaryPhoneNumber`} subscription={{}}>
          {({ input: { onChange } }) => (
            <OnChangeListener name={watchField}>
              {(value) => {
                if (!value) {
                  onChange(_get(values, `${fieldPrefix}.secondaryPhoneNumber`, ''));
                } else {
                  onChange('');
                }
              }}
            </OnChangeListener>
          )}
        </Field>

        <Field name={`${fieldPrefix}.emailAddress`} subscription={{}}>
          {({ input: { onChange } }) => (
            <OnChangeListener name={watchField}>
              {(value) => {
                if (!value) {
                  onChange(_get(values, `${fieldPrefix}.emailAddress`, ''));
                } else {
                  onChange('');
                }
              }}
            </OnChangeListener>
          )}
        </Field>
    </React.Component>
  )
}

export default PolicyHoldersWatcher;
