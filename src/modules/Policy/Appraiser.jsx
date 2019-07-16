import React from 'react';
import { defaultMemoize } from 'reselect';
import _find from 'lodash/find';
import _get from 'lodash/get';

const Appraiser = ({ initialValues, options }) => {
  const getPropertyAppraisalLink = defaultMemoize((county, questions) => {
    const question = questions.propertyAppraisal || {};
    const answers = question.answers || [];
    return _find(answers, { label: county }) || {};
  });

  return (
    <React.Fragment>
      <dl>
        <dt className="appraiser">Appraiser</dt>
        <dd className="appraiser">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={
              getPropertyAppraisalLink(
                initialValues.property.physicalAddress.county,
                options.questions
              ).answer
            }
          >
            {
              getPropertyAppraisalLink(
                initialValues.property.physicalAddress.county,
                options.questions
              ).label
            }
          </a>
        </dd>
      </dl>
    </React.Fragment>
  );
};

export default Appraiser;
