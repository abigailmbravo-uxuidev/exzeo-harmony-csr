import React from 'react';
import { bool, func, string, shape } from 'prop-types';

import { Button } from '@exzeo/core-ui';
import { ShareFooter } from '@exzeo/core-ui/src/@Harmony';

import Footer from '../../components/Common/Footer';

function QuoteFooter({
  isSubmitDisabled,
  handlePrimaryClick,
  currentStep,
  formInstance,
  handleApplicationClick
}) {
  return (
    <React.Fragment>
      {currentStep === 'notes' || currentStep === 'additionalInterests' ? (
        <div className="basic-footer">
          <Footer />
        </div>
      ) : currentStep === 'summary' ? (
        <React.Fragment>
          <ShareFooter
            parentFormInstance={formInstance}
            summaryType="csr"
            disabled={isSubmitDisabled}
          />
          <div className="basic-footer">
            <Footer />
          </div>
        </React.Fragment>
      ) : (
        <div className="basic-footer btn-footer">
          <Footer />
          <div className="btn-wrapper">
            {currentStep === 'application' ? (
              <Button
                data-test="send-application"
                className={Button.constants.classNames.primary}
                onClick={handleApplicationClick}
                disabled={isSubmitDisabled}
                label="Send To Docusign"
              />
            ) : (
              <React.Fragment>
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
                  label="Update"
                />
              </React.Fragment>
            )}
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

QuoteFooter.propTypes = {
  isSubmitDisabled: bool.isRequired,
  handlePrimaryClick: func.isRequired,
  currentStep: string.isRequired,
  formInstance: shape({}).isRequired
};

export default QuoteFooter;
