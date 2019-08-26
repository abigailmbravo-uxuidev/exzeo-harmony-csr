import React from 'react';
import { Field, Date, validation, Currency, Button } from '@exzeo/core-ui';
import EndorsementForm from './EndorsementForm';

const EndorsementFooter = ({
  parentFormInstance,
  handleReset,
  handlePrimaryClick,
  calculatedRate,
  setEndorsementFormInstance
}) => {
  const { initialValues: policy } = parentFormInstance.getState();
  const initialValues = {
    ...policy,
    rating: calculatedRate
  };

  return (
    <EndorsementForm
      setEndorsementFormInstance={setEndorsementFormInstance}
      initialValues={initialValues}
      handleSubmit={handlePrimaryClick}
      className="share-inputs"
    >
      {({ submitting, pristine }) => (
        <React.Fragment>
          <Button
            className={Button.constants.classNames.secondary}
            onClick={handleReset}
            data-test="modal-cancel"
          >
            Cancel
          </Button>
          <Button
            className={Button.constants.classNames.primary}
            type="submit"
            onClick={handlePrimaryClick}
            disabled={null}
            data-test="modal-submit"
          >
            {calculatedRate ? 'Save' : 'Review'}
          </Button>
        </React.Fragment>
      )}
    </EndorsementForm>
  );
};

export default EndorsementFooter;
