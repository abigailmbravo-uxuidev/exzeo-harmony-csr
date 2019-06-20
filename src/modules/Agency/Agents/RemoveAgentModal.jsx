import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { Button } from '@exzeo/core-ui';

export class RemoveAgentModal extends Component {
  render() {
    const {
      agencyName,
      initialValues,
      disabled,
      handleCancel,
      handleConfirm,
      handleSubmit,
      submitting
    } = this.props;

    return (
      <div className="modal agent-remove">
        <form onSubmit={handleSubmit(handleConfirm)}>
          <div className="card">
            <div className="card-header">
              <h4>
                <i className="fa fa-remove" /> Remove Agent
              </h4>
            </div>
            <div className="card-block">
              <section className="agent-details">
                <h4>
                  Are you sure you want to remove{' '}
                  {`${initialValues.firstName} ${initialValues.lastName}`} from{' '}
                  {agencyName}?
                </h4>
              </section>
            </div>
            <div className="card-footer">
              <div className="btn-footer">
                <Button
                  className={Button.constants.classNames.secondary}
                  data-test="modal-cancel"
                  onClick={() => handleCancel()}
                >
                  No
                </Button>
                <Button
                  className={Button.constants.classNames.primary}
                  data-test="modal-submit"
                  type="submit"
                  disabled={disabled || submitting}
                >
                  Yes
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'RemoveAgent'
})(RemoveAgentModal);
