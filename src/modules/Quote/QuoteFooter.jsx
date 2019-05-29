import React from 'react';
import Footer from '../../components/Common/Footer';
import { Button } from '@exzeo/core-ui/src';
import { Share } from '@exzeo/core-ui/src/@Harmony';

function QuoteFooter({ submitting, isPrimaryDisabled, handlePrimaryClick, handleResetForm, currentStep }) {
  return (
    <div className="basic-footer btn-footer">
      {(currentStep === 'notes' || currentStep === 'additionalInterests')
        ? <Footer/>
        : (currentStep === 'summary')
          ? <React.Fragment>
              <Share handleShare={handlePrimaryClick} disabled={isPrimaryDisabled}/>
              <Footer/>
            </React.Fragment>
          : <React.Fragment>
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
          </React.Fragment>
      }
    </div>
  );
}

QuoteFooter.propTypes = {};

export default QuoteFooter;

