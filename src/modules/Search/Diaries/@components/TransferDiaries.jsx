import React from 'react';
import {
  Form,
  Field,
  SelectTypeAhead,
  Button,
  validation
} from '@exzeo/core-ui';
import { transferDiariesCalculator } from '../utilities';

const TransferDiaries = ({
  active,
  children,
  handleSubmit,
  reset,
  transferToOptions = []
}) => {
  return (
    <>
      {!active ? (
        <div className="diary-results-wrapper">
          <div className="results-container">{children}</div>
        </div>
      ) : (
        <Form
          subscription={{ submitting: true, values: true }}
          onSubmit={handleSubmit}
          decorators={[transferDiariesCalculator]}
        >
          {({ submitting, handleSubmit, values }) => (
            <div className="diary-results-wrapper transfer">
              <form onSubmit={handleSubmit}>
                <div className="search-input-row fade-in">
                  <div className="form-group transferSelect">
                    <Field
                      id="selectAll"
                      name="selectAll"
                      initialValue={false}
                      data-test="select-all"
                      component="input"
                      type="checkbox"
                    />
                    <label htmlFor="selectAll">Select All</label>
                  </div>
                  <div className="transfer-control-wrapper">
                    <div className="form-group transferTo">
                      <Field
                        name="transferTo"
                        dataTest="transfer-to"
                        styleName="transferTo"
                        component={SelectTypeAhead}
                        label="Transfer To"
                        answers={transferToOptions}
                        validate={validation.isRequired}
                      />
                    </div>
                    <Button
                      className={Button.constants.classNames.secondary}
                      customClass="multi-input"
                      type="button"
                      disabled={submitting}
                      data-test="reset-transfer"
                      onClick={() => reset()}
                    >
                      Cancel
                    </Button>
                    <Button
                      className={Button.constants.classNames.success}
                      customClass="multi-input"
                      type="submit"
                      dataTest="submit-transfer"
                      disabled={
                        submitting ||
                        !Object.values(values.diaries || {}).includes(true)
                      }
                    >
                      <i className="fa fa-share" />
                      Transfer
                    </Button>
                  </div>
                </div>

                {children}
              </form>
            </div>
          )}
        </Form>
      )}
    </>
  );
};

export default TransferDiaries;
