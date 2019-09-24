import React, { useState } from 'react';
import { Prompt } from 'react-router-dom';
import { Alert, Button } from '@exzeo/core-ui';

const CustomNavigationPrompt = ({
  whenValue,
  history,
  confirmNavigationHandler
}) => {
  const [nextLocation, setLocation] = useState('');
  const [blockNavigation, setBlockNavigation] = useState(false);

  function stopNavigation(nextLocation) {
    if (whenValue && !blockNavigation) {
      setLocation(nextLocation);
      setBlockNavigation(true);
      return false;
    }
    return true;
  }

  function confirmNavigation() {
    confirmNavigationHandler();
    setBlockNavigation(false);
    history.push(nextLocation);
  }

  return (
    <React.Fragment>
      <Prompt when={whenValue} message={stopNavigation} />

      {blockNavigation && (
        <Alert
          modalClassName="unsaved-changes"
          headerIcon="fa fa-exclamation-circle"
          header="Unsaved Changes"
          text="Are you sure you want to leave with unsaved changes?"
          handleConfirm={confirmNavigation}
          confirmLabel="Yes"
          renderSecondary={() => (
            <Button
              className={Button.constants.classNames.secondary}
              dataTest="modal-cancel"
              onClick={() => setBlockNavigation(false)}
            >
              No
            </Button>
          )}
        />
      )}
    </React.Fragment>
  );
};

export default CustomNavigationPrompt;
