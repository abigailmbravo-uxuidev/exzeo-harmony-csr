import React from 'react';
import { Button, useForm, useFormState } from '@exzeo/core-ui';
import { ShareFooter } from '@exzeo/core-ui/src/@Harmony';

import Footer from '../../components/Footer';
import { useQuoteWorkflow } from './context';
import { PAGE_ROUTING } from './constants/workflowNavigation';

function QuoteFooter({ workflowPage }) {
  const { verifyQuote, isSubmitDisabled } = useQuoteWorkflow();
  const formInstance = useForm();
  const { pristine, submitting, values, initialValues } = useFormState({
    subscription: {
      pristine: true,
      submitting: true,
      values: true,
      initialValues: true
    }
  });

  const disabled = isSubmitDisabled(pristine, submitting, values);
  switch (workflowPage) {
    case PAGE_ROUTING.notes:
    case PAGE_ROUTING.additionalInterests:
      return (
        <div className="basic-footer">
          <Footer />
        </div>
      );
    case PAGE_ROUTING.summary:
      return (
        <React.Fragment>
          <ShareFooter
            initialValues={initialValues}
            summaryType="csr"
            disabled={disabled}
          />
          <div className="basic-footer">
            <Footer />
          </div>
        </React.Fragment>
      );
    case PAGE_ROUTING.application:
      return (
        <div className="basic-footer btn-footer">
          <Footer />
          <div className="btn-wrapper">
            <Button
              data-test="send-application"
              className={Button.constants.classNames.primary}
              onClick={verifyQuote}
              disabled={disabled}
              label="Send To Docusign"
            />
          </div>
        </div>
      );
    default:
      return (
        <div className="basic-footer btn-footer">
          <Footer />
          <div className="btn-wrapper">
            <Button
              onClick={() => formInstance.reset()}
              data-test="reset"
              className={Button.constants.classNames.secondary}
              label="Reset"
            />
            <Button
              data-test="submit"
              className={Button.constants.classNames.primary}
              onClick={formInstance.submit}
              disabled={disabled}
              label="Update"
            />
          </div>
        </div>
      );
  }
}

export default QuoteFooter;
