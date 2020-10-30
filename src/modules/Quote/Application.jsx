import React from 'react';
import { Button, Modal, ModalPortal } from '@exzeo/core-ui';
import { isApplicationReady } from '../../utilities/quoteState';
import { useQuoteWorkflow } from './context';
import SendApplicationForm from './SendApplicationForm';

const Application = ({ initialValues, manualSubmit }) => {
  const {
    showApplicationModal,
    setShowApplicationModal,
    setApplicationSent
  } = useQuoteWorkflow();

  const submitApplication = async values => {
    await manualSubmit(values);
    setApplicationSent(true);
  };

  return (
    <div className="detail-wrapper">
      {showApplicationModal && isApplicationReady(initialValues.quoteState) && (
        <ModalPortal>
          <Modal
            size={Modal.sizes.large}
            className="quote-summary fade-in"
            header={
              <h4>
                <i className="fa fa-share-alt" /> Congratulations
              </h4>
            }
          >
            <SendApplicationForm
              initialValues={initialValues}
              handleSubmit={submitApplication}
              className="card-block"
            >
              {({ submitting }) => (
                <div className="card-footer">
                  <Button
                    className={Button.constants.classNames.secondary}
                    onClick={() => setShowApplicationModal(false)}
                    data-test="modal-cancel"
                  >
                    Cancel
                  </Button>
                  <Button
                    className={Button.constants.classNames.primary}
                    type="submit"
                    disabled={
                      !isApplicationReady(initialValues.quoteState) ||
                      submitting
                    }
                    data-test="modal-submit"
                  >
                    Send
                  </Button>
                </div>
              )}
            </SendApplicationForm>
          </Modal>
        </ModalPortal>
      )}
    </div>
  );
};

export default Application;
