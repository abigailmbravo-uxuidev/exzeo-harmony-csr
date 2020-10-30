import React from 'react';
import { Button, useFormState, useForm } from '@exzeo/core-ui';

import Footer from '../../components/Footer';
import EndorsementForm from './EndorsementForm';
import { PAGE_ROUTING } from './constants/workflowNavigation';

function PolicyFooter({
  editingDisabled,
  timezone,
  history,
  policyFormData,
  errorHandler,
  workflowPage
}) {
  const formInstance = useForm();
  const { pristine, submitting } = useFormState({
    subscription: {
      pristine: true,
      submitting: true
    }
  });

  switch (workflowPage) {
    case PAGE_ROUTING.endorsements:
      return (
        <React.Fragment>
          <EndorsementForm
            history={history}
            setAppError={errorHandler}
            policyFormData={policyFormData}
            parentFormInstance={formInstance}
            timezone={timezone}
          />
          <div className="basic-footer btn-footer">
            <Footer />
          </div>
        </React.Fragment>
      );
    case PAGE_ROUTING.cancel:
      return (
        <React.Fragment>
          <div className="basic-footer btn-footer">
            <Footer />
            <Button
              className={Button.constants.classNames.secondary}
              label="Reset"
              data-test="reset"
              onClick={() => formInstance.reset()}
            />
            <Button
              className={Button.constants.classNames.primary}
              label="Cancel Policy"
              data-test="submit"
              onClick={formInstance.submit}
              disabled={editingDisabled || pristine || submitting}
            />
          </div>
        </React.Fragment>
      );
    default:
      return (
        <React.Fragment>
          <div className="basic-footer">
            <Footer />
          </div>
        </React.Fragment>
      );
  }
}

export default PolicyFooter;
