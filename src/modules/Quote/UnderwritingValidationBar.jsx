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
        if (
          exception.action === 'Missing Info' ||
          exception.action === 'Informational'
        ) {
          return {
            ...data,
            info: [...data.info, exception]
          };
        } else if (exception.action === 'Fatal Error') {
          return {
            ...data,
            fatalError: orderBy(
              [...data.fatalError, exception],
              ['overridden'],
              ['asc']
            )
          };
        } else if (exception.action === 'Underwriting Review') {
          return {
            ...data,
            underwritingReview: orderBy(
              [...data.underwritingReview, exception],
              ['overridden'],
              ['asc']
            )
          };
        }
      },
      { info: [], underwritingReview: [], fatalError: [] }
    );
  });

  const handleFormSubmit = async data => {
    const { info, underwritingReview, fatalError } = data;

    fatalError.forEach(exception => {
      if (exception.overridden && !exception.overriddenAt) {
        exception.overriddenAt = date.formatToUTC();
        exception.overriddenBy = {
          userId: userProfile.userId,
          userName: userProfile.userName
        };
      }
    });

    underwritingReview.forEach(exception => {
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
        underwritingExceptions: [...info, ...underwritingReview, ...fatalError]
      }
    });
  };

  const {
    info,
    underwritingReview,
    fatalError
  } = getGroupedUnderwritingExceptions(quoteData);

  console.log(info, underwritingReview, fatalError);
  return (
    <Form
      initialValues={{
        info,
        underwritingReview,
        fatalError
      }}
      onSubmit={handleFormSubmit}
      subscription={{ pristine: true }}
    >
      {({ handleSubmit, pristine }) => (
        <form id="UnderwritingOverride" onSubmit={handleSubmit}>
          <aside className="underwriting-validation">
            <h4 className="uw-validation-header">Qualifier Status</h4>
            <div>
              {info.length > 0 && (
                <UnderwritingExceptions
                  exceptionLevel="info"
                  exceptions={info}
                />
              )}

              {fatalError.length > 0 && (
                <UnderwritingExceptions
                  exceptionLevel="fatalError"
                  exceptions={fatalError}
                  pristine={pristine}
                  render={(exception, index) =>
                    exception.canOverride && (
                      <div className="check-box-wrapper">
                        <Field
                          name={`fatalError[${index}].overridden`}
                          component="input"
                          type="checkbox"
                          data-test={`fatalError[${index}].overridden`}
                        />
                        <label htmlFor={`fatalError[${index}].overridden`}>
                          {' '}
                          Override
                        </label>
                      </div>
                    )
                  }
                />
              )}

              {underwritingReview.length > 0 && (
                <UnderwritingExceptions
                  exceptionLevel="underwritingReview"
                  exceptions={underwritingReview}
                  pristine={pristine}
                  render={(exception, index) =>
                    exception.canOverride && (
                      <div className="check-box-wrapper">
                        <Field
                          name={`underwritingReview[${index}].overridden`}
                          component="input"
                          type="checkbox"
                          data-test={`underwritingReview[${index}].overridden`}
                        />
                        <label
                          htmlFor={`underwritingReview[${index}].overridden`}
                        >
                          {' '}
                          Override
                        </label>
                      </div>
                    )
                  }
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
