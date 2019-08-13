import React from 'react';
import { ModalPortal } from '@exzeo/core-ui';
import SendApplicationModal from './SendApplicationModal';
import { isApplicationReady } from '../../utilities/quoteState';

const Application = ({ initialValues, customHandlers }) => {
  return (
    <div className="detail-wrapper">
      {Array.isArray(initialValues.underwritingExceptions) &&
        initialValues.underwritingExceptions.filter(
          uw => (uw.canOverride && !uw.overridden) || !uw.canOverride
        ).length > 0 && (
          <div className="messages">
            <div className="message error">
              <i className="fa fa-exclamation-circle" aria-hidden="true" />
              &nbsp;Application cannot be sent due to Underwriting Validations.
            </div>
          </div>
        )}
      {customHandlers.showApplicationModal &&
        isApplicationReady(initialValues.quoteState) && (
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
