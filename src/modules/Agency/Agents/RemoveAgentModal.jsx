import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import Button from '@exzeo/core-ui/lib/Button'

export class RemoveAgentModal extends Component {
  render() {
    const {
      agencyName,
      agent,
      disabled,
      handleCancel,
      handleConfirm
    } = this.props;

    return (
      <div className="modal agent-remove">
        <div className="card">
          <div className="card-header">
            <h4><i className="fa fa-remove" onClick={handleCancel}/> Remove Agent</h4>
          </div>
          <div className="card-block">
            <section className="agent-details">
              <h4>Are you sure you want to remove {`${agent.firstName} ${agent.lastName}`} from {agencyName}?</h4>
            </section>
          </div>
          <div className="card-footer">
            <div className="btn-footer">
              <Button
                baseClass="secondary"
                dataTest="modal-cancel"
                onClick={handleCancel}
              >No</Button>
              <Button
                baseClass="primary"
                dataTest="modal-submit"
                onClick={handleConfirm}
                disabled={disabled}
              >Yes</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default RemoveAgentModal;
