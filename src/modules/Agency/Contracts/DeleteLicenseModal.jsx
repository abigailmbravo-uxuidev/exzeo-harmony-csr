import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
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
            handleSubmit={handleSubmit(handleConfirm)}
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

DeleteLicenseModal.propTypes = {
  license: PropTypes.shape({
    state: PropTypes.string,
    licenseNumber: PropTypes.string,
    licenseType: PropTypes.string,
    licenseEffectiveDate: PropTypes.string,
  }),
  handleConfirm: PropTypes.func,
  handleCancel: PropTypes.func,
  handleSubmit: PropTypes.func
};

export default reduxForm({
  form: 'DeleteLicense'
})(DeleteLicenseModal);
