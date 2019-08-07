import React from 'react';
import { ModalPortal, SectionLoader } from '@exzeo/core-ui';
import SendApplicationModal from './SendApplicationModal';
import { useVerifyQuote } from './hooks';

const Application = ({ initialValues, customHandlers }) => {
  const { quote, quoteLoaded } = useVerifyQuote({
    quoteNumber: initialValues.quoteNumber
  });

  console.log(quote);

  if (!quoteLoaded) {
    return <SectionLoader />;
  }

  return (
    <div className="detail-wrapper">
      {Array.isArray(quote.underwritingExceptions) &&
        quote.underwritingExceptions.filter(
          uw => uw.canOverride && !uw.overridden
        ).length > 0 && (
          <div className="messages">
            <div className="message error">
              <i className="fa fa-exclamation-circle" aria-hidden="true" />
              &nbsp;Application cannot be sent due to Underwriting Validations.
            </div>
          </div>
        )}
      {customHandlers.showApplicationModal && (
        <ModalPortal>
          <SendApplicationModal
            initialValues={initialValues}
            submitApplication={customHandlers.handleSubmit}
            closeModal={() => customHandlers.setShowApplicationModal(false)}
          />
        </ModalPortal>
      )}
    </div>
  );
};

export default Application;
