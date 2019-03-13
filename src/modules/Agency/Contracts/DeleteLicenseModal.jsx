import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { Button } from '@exzeo/core-ui';

export class DeleteLicenseModal extends Component {
  render() {
    const {
      license,
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
              <h4><i className="fa fa-remove" /> Delete License</h4>
            </div>
            <div className="card-block">
              <section className="agent-details">
                <h4 className="license-csp">
                    Are you sure yuo want to delete license: <strong>{license.state} - {license.licenseNumber}</strong> ?
                </h4>
              </section>
            </div>
            <div className="card-footer">
              <div className="btn-footer">
                <Button
                  baseClass="secondary"
                  dataTest="modal-cancel"
                  onClick={() => handleCancel()}>No
                </Button>
                <Button
                  baseClass="primary"
                  dataTest="modal-submit"
                  type="submit"
                  disabled={disabled || submitting}>Yes
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

DeleteLicenseModal.defaultProps = {
    license: {}
};

export default reduxForm({
  form: 'DeleteLicense'
})(DeleteLicenseModal);
