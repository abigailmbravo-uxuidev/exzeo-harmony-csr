import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import SmallModal from '../../../components/SmallModal';

// TODO: look at this to consider converting to a genric modal
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
            handleSubmit={handleSubmit(handleConfirm)}
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

DeleteContractModal.propTypes = {
  contract: PropTypes.shape({
    companyCode: PropTypes.string,
    contractNumber: PropTypes.string,
    addendum: PropTypes.string,
    stateProducts: PropTypes.arrayOf(
      PropTypes.shape({
        state: PropTypes.string,
        product: PropTypes.string,
      })
    )
  }),
  handleConfirm: PropTypes.func,
  handleCancel: PropTypes.func,
  handleSubmit: PropTypes.func
};

export default reduxForm({
  form: 'DeleteContract'
})(DeleteContractModal);
