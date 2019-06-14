import React from 'react';
import orderBy from 'lodash/orderBy';
import moment from 'moment';
import { Form, Field, Input } from '@exzeo/core-ui';

import UnderwritingExceptions from './UnderwritingExceptions';

const UnderwritingValidationBar = ({ initialValues, exceptions, userProfile, updateQuote, quoteData  }) => {

  const handleFormSubmit = async (data) => {
    const { underwritingExceptions, ...quote } = quoteData;
    const uwExceptions = underwritingExceptions || [];
    for (let i = 0; i < uwExceptions.length; i += 1) {
      const uwException = uwExceptions[i];
      if (uwException.canOverride && data[uwException._id] === true) {
        uwException.overridden = true;
        uwException.overriddenAt = moment.utc();
        uwException.overriddenBy = {
          userId: userProfile.userId,
          userName: userProfile.userName
        };
      } else if (uwException.canOverride) {
        uwException.overridden = false;
      }
    }
    await updateQuote({ 
      data: {
        ...quoteData,
        underwritingExceptions: uwExceptions
      }
    })
  };

  const { warnings, overridableExceptions, nonOverridableExceptions } = exceptions;
  const sortedOverridableExceptions = orderBy(overridableExceptions, ['overridden'], ['asc']);
  return (
    <Form
      initialValues={initialValues}
      onSubmit={handleFormSubmit}
      subscription={{ pristine: true }}>
      {({ handleSubmit, pristine }) => (
        <form id="UnderwritingOverride" onSubmit={handleSubmit}>
          <aside className="underwriting-validation">
            <h4 className="uw-validation-header">Qualifier Status</h4>
            <div>

              {warnings.length > 0 &&
              <UnderwritingExceptions
                exceptionLevel="warning"
                exceptions={warnings} />
              }

              {nonOverridableExceptions.length > 0 &&
              <UnderwritingExceptions
                exceptionLevel="nonOverridable"
                exceptions={nonOverridableExceptions} />
              }

              {overridableExceptions.length > 0 &&
              <UnderwritingExceptions
              exceptionLevel="overridable"
              exceptions={sortedOverridableExceptions}
              pristine={pristine}
              render={exception => (
                <div className="check-box-wrapper">
                  <Field
                    name={exception._id}
                    component="input"
                    type="checkbox"
                    data-test={exception._id}
                  />
                  <label htmlFor={exception._id}> Override</label>
              </div>
              )} />
              }

            </div>
          </aside>
        </form>
      )}
    </Form>
  );
};

export default UnderwritingValidationBar;
