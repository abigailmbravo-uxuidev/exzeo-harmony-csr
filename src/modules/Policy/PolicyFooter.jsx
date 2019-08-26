import React from 'react';
import { Button } from '@exzeo/core-ui';

import Footer from '../../components/Common/Footer';
import EndorsementFooter from './EndorsementFooter';

function PolicyFooter({
  isSubmitDisabled,
  handlePrimaryClick,
  currentStep,
  formInstance,
  calculatedRate,
  handleEndorsementReset,
  setEndorsementFormInstance
}) {
  if (currentStep === 'endorsements') {
    return (
      <React.Fragment>
        <EndorsementFooter
          setEndorsementFormInstance={setEndorsementFormInstance}
          calculatedRate={calculatedRate}
          parentFormInstance={formInstance}
          handlePrimaryClick={handlePrimaryClick}
          handleReset={handleEndorsementReset}
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
