import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { Button } from '@exzeo/core-ui';
import SmallModal from '../../../components/SmallModal';

export class DeleteContractModal extends Component {
  render() {
    const {
      contract,
      handleCancel,
      handleConfirm,
      handleSubmit,
    } = this.props;

    return (
        <SmallModal
            modalClassName="contract-remove"
            handleCancel={handleCancel}
            handleOnSubmit={handleSubmit(handleConfirm)}
            header="Delete Contract"
            headerIcon="fa-trash"
            text={`Are you sure you want to delete contract: ${contract.companyCode} | ${contract.contractNumber} | ${contract.addendum}`}
        />
    );
  }
}

DeleteContractModal.defaultProps = {
    contract: {}
}

export default reduxForm({
  form: 'DeleteContract'
})(DeleteContractModal);
