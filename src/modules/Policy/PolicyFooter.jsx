import React from 'react';
import { Button } from '@exzeo/core-ui';

import Footer from '../../components/Common/Footer';
import EndorsementForm from './EndorsementForm';

function PolicyFooter({
  isSubmitDisabled,
  handlePrimaryClick,
  handleGandalfSubmit,
  currentStep,
  formInstance,
  timezone,
  policyFormData,
  setAppError,
  history
}) {
  if (currentStep === 'endorsements') {
    return (
      <React.Fragment>
        <EndorsementForm
          history={history}
          setAppError={setAppError}
          policyFormData={policyFormData}
          parentFormInstance={formInstance}
          handlePrimaryClick={handleGandalfSubmit}
          timezone={timezone}
        />
        <div className="basic-footer btn-footer">
          <Footer />
        </div>
      </React.Fragment>
    );
  }
  if (currentStep === 'cancel') {
    return (
      <React.Fragment>
        <div className="basic-footer btn-footer">
          <Footer />
          <Button
            onClick={formInstance.reset}
            data-test="reset"
            className={Button.constants.classNames.secondary}
            label="Reset"
          />
          <Button
            data-test="submit"
            className={Button.constants.classNames.primary}
            onClick={handlePrimaryClick}
            disabled={isSubmitDisabled}
            label="Cancel Policy"
          />
        </div>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <div className="basic-footer">
        <Footer />
      </div>
    </React.Fragment>
  );
}
export default PolicyFooter;
