import React, { useState, useEffect } from 'react';
import { QUOTE_STATE, UNQUALIFIED_STATE } from '../../utilities/quoteState';
import { PAGE_ROUTING } from './constants/workflowNavigation';

export const QuoteWorkflowContext = React.createContext();

const { ApplicationReady } = QUOTE_STATE;

export function QuoteWorkflowProvider({
  children,
  quote,
  setAppError,
  verifyQuote,
  workflowPage
}) {
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [applicationSent, setApplicationSent] = useState(false);

  useEffect(() => {
    if (applicationSent && showApplicationModal) {
      setShowApplicationModal(false);
    }
  }, [applicationSent, showApplicationModal]);

  const isSubmitDisabled = (pristine, submitting, values) => {
    if (quote.editingDisabled || applicationSent) return true;

    switch (workflowPage) {
      case PAGE_ROUTING.billing:
        return pristine || submitting || !values.billToId;
      case PAGE_ROUTING.application:
        return (
          UNQUALIFIED_STATE.includes(quote.quoteInputState) ||
          quote.blockSendApplication
        );
      case PAGE_ROUTING.summary:
        return (
          UNQUALIFIED_STATE.includes(quote.quoteInputState) ||
          quote.blockQuoteSummary
        );
      default:
        return pristine || submitting;
    }
  };

  async function submitQuoteAndVerify() {
    try {
      const { quoteState } = await verifyQuote({
        quoteNumber: quote.quoteNumber
      });
      quoteState !== ApplicationReady
        ? setAppError({
            message: `The Quote Status is no longer ${ApplicationReady}, please review the Qualifier Status message(s).`
          })
        : setShowApplicationModal(true);
    } catch (error) {
      setAppError({ message: `Error with verify quote: ${error}` });
    }
  }

  return (
    <QuoteWorkflowContext.Provider
      value={{
        showApplicationModal,
        setShowApplicationModal,
        applicationSent,
        setApplicationSent,
        editingDisabled: quote.editingDisabled,
        setAppError,
        verifyQuote: submitQuoteAndVerify,
        isSubmitDisabled
      }}
      children={children}
    />
  );
}

export function useQuoteWorkflow() {
  const context = React.useContext(QuoteWorkflowContext);
  if (context === undefined) {
    throw new Error(
      `useQuoteWorkflow must be used within a QuoteWorkflowProvider`
    );
  }

  return context;
}
