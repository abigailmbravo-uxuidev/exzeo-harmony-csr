import React from 'react';
import { ModalPortal } from '@exzeo/core-ui';
import SendApplicationModal from './SendApplicationModal';
import { isApplicationReady } from '../../utilities/quoteState';

const Application = ({ initialValues, customHandlers }) => {
  return (
    <div className="detail-wrapper">
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
