import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TaxDetails from './TaxDetails';
import AgencyModal from '../AgencyModal';
import ContractsCard from './ContractsCard';
import ContractsModal from './ContractsModal';

export class Contracts extends Component {
  state = {
    showEditAgencyContract: false,
    editType: null,
    showAgencyEdit: false
  };

  displayAgencyPopup = (showPopup) => {
    this.setState({ showAgencyEdit: showPopup });
  };

  saveAgency = (data, dispatch, props) => {
    this.displayAgencyPopup(false);
  };

  toggleContractModal = (editType, contractIndex) => () =>
    this.setState({
      editType,
      contractIndex,
      showEditAgencyContract: !this.state.showEditAgencyContract
    });

  toggleAgencyModal = () => {
    this.setState({ showAgencyEdit: !this.state.showAgencyEdit });
  };

  saveContract = async (data) => {
    this.props.updateAgency(data);
    this.setState({ editType: null, showEditAgencyContract: false });
  };

  render() {
    const { agency, contractInitialValues, agencyAgentsList } = this.props;
    if (!agency) return <div />;

    const { license } = agency;
    console.log(agencyAgentsList);
    return (
      <div>
        {this.state.showEditAgencyContract && (
        <ContractsModal
          agencyAgentsList={agencyAgentsList}
          initialValues={contractInitialValues}
          toggleModal={this.toggleContractModal}
          editType={this.state.editType}
          contractIndex={this.state.contractIndex}
          saveContract={this.saveContract}
        />
          )}
        <div className="route-content">
          <div className="scroll">
            <div className="form-group survey-wrapper" role="group">
              <TaxDetails agency={agency} editAgency={this.toggleAgencyModal} />
              <section>
                <h3>Contracts</h3>
                { license && license.length > 0 && license.map((contract, index) =>
                  <ContractsCard contractIndex={index} contract={contract} editContract={this.toggleContractModal} />)}
                <div className="create-contract">
                  <hr />
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={this.toggleContractModal('New', license ? license.length : 0)}
                  >
                    <i className="fa fa-plus" /> Contract
                  </button>
                  <hr />
                </div>
              </section>
            </div>
          </div>
        </div>
        {this.state.showAgencyEdit && (
          <AgencyModal
            saveAgency={this.saveAgency}
            isEdit
            closeModal={this.toggleAgencyModal}
          />
        )}
      </div>
    );
  }
}

Contracts.propTypes = {
  agency: PropTypes.shape(),
  contractInitialValues: PropTypes.shape()
};

export default Contracts;
