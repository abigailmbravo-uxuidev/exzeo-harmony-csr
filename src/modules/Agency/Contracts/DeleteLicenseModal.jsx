import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { Button } from '@exzeo/core-ui';
import SmallModal from '../../../components/SmallModal';

export class DeleteLicenseModal extends Component {
  render() {
    const {
      license,
      handleCancel,
      handleConfirm,
      handleSubmit,
    } = this.props;

    return (
        <SmallModal
            modalClassName="license-remove"
            handleCancel={handleCancel}
            handleOnSubmit={handleSubmit(handleConfirm)}
            header="Delete License"
            headerIcon="fa-trash"
            text={`Are you sure you want to delete license: ${license.state} - ${license.licenseNumber}`}
        />
    );
  }
}

DeleteLicenseModal.defaultProps = {
    license: {}
}

export default reduxForm({
  form: 'DeleteLicense'
})(DeleteLicenseModal);
