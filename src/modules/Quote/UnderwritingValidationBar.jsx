import React from 'react';
import orderBy from 'lodash/orderBy';
import { Form, Field, date, Button } from '@exzeo/core-ui';
import { defaultMemoize } from 'reselect';
import { useUser } from '../../context/user-context';

import UnderwritingExceptions from './UnderwritingExceptions';

const getGroupedUnderwritingExceptions = defaultMemoize(
  underwritingExceptions => {
    if (!underwritingExceptions || !Array.isArray(underwritingExceptions))
      return [];

    return underwritingExceptions.reduce(
      (data, exception) => {
        const uwException = {
          ...exception,
          overridden: !!exception.overridden
        };
        if (
          uwException.action === 'Missing Info' ||
          uwException.action === 'Informational'
        ) {
          return {
            ...data,
            info: [...data.info, uwException]
          };
        } else if (uwException.action === 'Fatal Error') {
          return {
            ...data,
            fatalError: orderBy(
              [...data.fatalError, uwException],
              ['overridden'],
              ['asc']
            )
          };
        } else if (uwException.action === 'Underwriting Review') {
          return {
            ...data,
            underwritingReview: orderBy(
              [...data.underwritingReview, uwException],
              ['overridden'],
              ['asc']
            )
          };
        }
        return data;
      },
      { info: [], underwritingReview: [], fatalError: [] }
    );
  }
);

const UnderwritingValidationBar = ({ updateQuote, quoteData }) => {
  const userProfile = useUser();
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

  const groupedUnderwritingExceptions = getGroupedUnderwritingExceptions(
    quoteData.underwritingExceptions
  );
  const {
    info,
    underwritingReview,
    fatalError
  } = groupedUnderwritingExceptions;
  return (
    <Form
      initialValues={groupedUnderwritingExceptions}
      onSubmit={handleFormSubmit}
      subscription={{ pristine: true }}
    >
      {({ handleSubmit, pristine }) => (
        <form id="UnderwritingOverride" onSubmit={handleSubmit}>
          <aside className="underwriting-validation">
            <header className="uw-validation-header">
              <h4>Qualifier Status</h4>
              {!pristine && (
                <Button
                  type="submit"
                  data-test="submit"
                  size="btn-sm"
                  className={Button.constants.classNames.primary}
                  label="Save"
                />
              )}
            </header>
            <div className="exception-list">
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
