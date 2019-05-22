import React from 'react'
import PropTypes from 'prop-types'
import Footer from '../../components/Common/Footer';
import { Button } from '@exzeo/core-ui/src';
import Share from '@exzeo/core-ui/src/@Harmony/Summary/Share';

function QuoteFooter({ submitting, isPrimaryDisabled, handlePrimaryClick, handleResetForm, currentStep }) {

  if(currentStep === 'summary'){
    return (<Share handleShare={handlePrimaryClick} disabled={isPrimaryDisabled} />)
  }

  return (
    <div className="basic-footer btn-footer">
      <Footer />
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
            label={currentStep !== 'application' ? "Update" : 'Send To Docusign'}
          />
        </div>
    </div>
  )
}

QuoteFooter.propTypes = {

}

export default QuoteFooter

