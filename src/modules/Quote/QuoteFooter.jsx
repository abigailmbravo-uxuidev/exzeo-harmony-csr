import React from 'react';
import Footer from '../../components/Common/Footer';
import { Button } from '@exzeo/core-ui/src';
import { Share } from '@exzeo/core-ui/src/@Harmony';

function QuoteFooter({ submitting, isPrimaryDisabled, handlePrimaryClick, handleResetForm, currentStep }) {
  return (
    <React.Fragment>
      {(currentStep === 'notes' || currentStep === 'additionalInterests')
        ? <div className="basic-footer">
          <Footer/>
        </div>
        : (currentStep === 'summary')
        ? <React.Fragment>
          <Share handleShare={handlePrimaryClick} disabled={isPrimaryDisabled}/>
          <div className="basic-footer">
            <Footer/>
          </div>
        </React.Fragment>
        : <div className="basic-footer btn-footer">
          <Footer/>
          <div className="btn-wrapper">
            {currentStep !== 'application' &&
            <Button
              onClick={handleResetForm}
              data-test="reset"
              className={Button.constants.classNames.secondary}
              label="Reset"
            />
            }
            <Button
              data-test="submit"
              className={Button.constants.classNames.primary}
              onClick={handlePrimaryClick}
              disabled={isPrimaryDisabled}
              label={currentStep !== 'application' ? 'Update' : 'Send To Docusign'}
            />
          </div>
        </div>
      }
      </React.Fragment>
  );
}

QuoteFooter.propTypes = {};

export default QuoteFooter;

