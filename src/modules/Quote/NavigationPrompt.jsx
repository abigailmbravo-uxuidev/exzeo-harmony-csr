import React, { useState } from 'react';
import { Prompt } from 'react-router-dom';
import { Alert, Button } from '@exzeo/core-ui';

const NavigationPrompt = ({ dirty, formInstance, history }) => {
  const [nextLocation, setLocation] = useState('');
  const [blockNavigation, setBlockNavigation] = useState(false);

  function stopNavigation(nextLocation) {
    // checking for 'dirty' at the time this function is called, which will be AFTER the current render cycle
    const { dirty: isDirty } = formInstance.getState();
    if (isDirty) {
      setLocation(nextLocation);
      setBlockNavigation(true);
      return false;
    }
    return true;
  }

  function confirmNavigation() {
    formInstance.reset();
    setBlockNavigation(false);
    history.push(nextLocation);
  }

  return (
    <React.Fragment>
      <Prompt when={dirty} message={stopNavigation} />

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

export default NavigationPrompt;
