import React from 'react';
import { reduxForm } from 'redux-form';
import { Button } from '@exzeo/core-ui';

export class AIDeleteReinstateModal extends React.Component {
  render() {
    const {
      selectedAI,
      handleAction,
      handleSubmit,
      closeModal,
      submitting,
      actionType
    } = this.props;

    return (
      <div className="modal">
        <form id="AIDeleteReinstateModal" onSubmit={handleSubmit(handleAction)}>
          <div className="card">
            <div className="card-header">
              <h4>
                <i className="fa fa-trash" /> {actionType} {selectedAI.type}
              </h4>
            </div>
            <div className="card-block">
              {`Are you sure that you want to ${actionType} ${selectedAI.type}: ${selectedAI.name1}?`}
            </div>
            <div className="card-footer">
              <div className="btn-group">
                <Button
                  className={Button.constants.classNames.secondary}
                  label="Cancel"
                  onClick={closeModal}
                  dataTest="ai-modal-cancel"
                />
                <Button
                  className={Button.constants.classNames.primary}
                  type="submit"
                  label={actionType}
                  dataTest="ai-modal-submit"
                  disabled={submitting}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'AIDeleteReinstateModal'
})(AIDeleteReinstateModal);
