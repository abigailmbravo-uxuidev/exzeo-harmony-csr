import React from 'react';
import orderBy from 'lodash/orderBy';
import { Form, Field, date } from '@exzeo/core-ui';
import { defaultMemoize } from 'reselect';

import UnderwritingExceptions from './UnderwritingExceptions';

const UnderwritingValidationBar = ({ userProfile, updateQuote, quoteData }) => {
  const getGroupedUnderwritingExceptions = defaultMemoize(quoteData => {
    if (!quoteData || !Array.isArray(quoteData.underwritingExceptions))
      return [];

    return quoteData.underwritingExceptions.reduce(
      (data, exception) => {
        if (exception.action === 'Missing Info') {
          return {
            ...data,
            warnings: [...data.warnings, exception]
          };
        }
        return exception.canOverride
          ? {
              ...data,
              overridableExceptions: orderBy(
                [...data.overridableExceptions, exception],
                ['overridden'],
                ['asc']
              )
            }
          : {
              ...data,
              nonOverridableExceptions: [
                ...data.nonOverridableExceptions,
                exception
              ]
            };
      },
      { warnings: [], overridableExceptions: [], nonOverridableExceptions: [] }
    );
  });

  const handleFormSubmit = async data => {
    const { warnings, nonOverridableExceptions, overridableExceptions } = data;

    overridableExceptions.forEach(exception => {
      if (exception.overridden && !exception.overriddenAt) {
        exception.overriddenAt = date.formatToUTC();
        exception.overriddenBy = {
          userId: userProfile.userId,
          userName: userProfile.userName
        };
      }
    });
    await updateQuote({
      data: {
        ...quoteData,
        underwritingExceptions: [
          ...warnings,
          ...nonOverridableExceptions,
          ...overridableExceptions
        ]
      }
    });
  };

  const {
    warnings,
    nonOverridableExceptions,
    overridableExceptions
  } = getGroupedUnderwritingExceptions(quoteData);
  return (
    <Form
      initialValues={{
        warnings,
        nonOverridableExceptions,
        overridableExceptions
      }}
      onSubmit={handleFormSubmit}
      subscription={{ pristine: true }}
    >
      {({ handleSubmit, pristine }) => (
        <form id="UnderwritingOverride" onSubmit={handleSubmit}>
          <aside className="underwriting-validation">
            <h4 className="uw-validation-header">Qualifier Status</h4>
            <div>
              {warnings.length > 0 && (
                <UnderwritingExceptions
                  exceptionLevel="warning"
                  exceptions={warnings}
                />
              )}

              {nonOverridableExceptions.length > 0 && (
                <UnderwritingExceptions
                  exceptionLevel="nonOverridable"
                  exceptions={nonOverridableExceptions}
                />
              )}

              {overridableExceptions.length > 0 && (
                <UnderwritingExceptions
                  exceptionLevel="overridable"
                  exceptions={overridableExceptions}
                  pristine={pristine}
                  render={(exception, index) => (
                    <div className="check-box-wrapper">
                      <Field
                        name={`overridableExceptions[${index}].overridden`}
                        component="input"
                        type="checkbox"
                        data-test={`overridableExceptions[${index}].overridden`}
                      />
                      <label
                        htmlFor={`overridableExceptions[${index}].overridden`}
                      >
                        {' '}
                        Override
                      </label>
                    </div>
                  )}
                />
              )}
            </div>
          </aside>
        </form>
      )}
    </Form>
  );
};

export default UnderwritingValidationBar;
