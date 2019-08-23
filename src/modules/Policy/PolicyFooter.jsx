import React from 'react';
import { Button } from '@exzeo/core-ui';

import Footer from '../../components/Common/Footer';
import EndorsementFooter from './EndorsementFooter';

function PolicyFooter({
  isSubmitDisabled,
  handlePrimaryClick,
  currentStep,
  formInstance,
  isEndorsementCalculated,
  handleEndorsementReset
}) {
  if (currentStep === 'endorsements') {
    return (
      <React.Fragment>
        <EndorsementFooter>
          <Button
            className={Button.constants.classNames.secondary}
            onClick={handleEndorsementReset}
            data-test="modal-cancel"
          >
            Cancel
          </Button>
          <Button
            className={Button.constants.classNames.primary}
            type="submit"
            onClick={handlePrimaryClick}
            disabled={isSubmitDisabled}
            data-test="modal-submit"
          >
            {isEndorsementCalculated ? 'Save' : 'Review'}
          </Button>
        </EndorsementFooter>
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
