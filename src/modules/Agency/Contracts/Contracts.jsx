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
    // agency has the wrong schema

    // const license = [
    //   {
    //     product: [
    //       'HO3'
    //     ],
    //     agent: [
    //       {
    //         agentCode: 61201,
    //         agentOfRecord: true,
    //         appointed: true
    //       }
    //     ],
    //     addendum: null,
    //     primaryAgent: 61201,
    //     companyCode: 'TTIC',
    //     contract: 'Flood 03 16',
    //     eoExpirationDate: '1987-08-01T00:00:00.000Z',
    //     licenseEffectiveDate: '1987-09-06T00:00:00.000Z',
    //     licenseNumber: 'R013307',
    //     stateLicense: 'FL'
    //   }
    // ];

    // data.license = license;

    this.props.updateAgency(data);
    this.setState({ editType: null, showEditAgencyContract: false });
  };

  render() {
    const { agency, contractInitialValues } = this.props;
    if (!agency) return <div />;

    agency.license = [
      {
        product: [
          'HO3', 'AF3'
        ],
        agent: [
          {
            agentCode: 61201,
            agentOfRecord: true,
            appointed: true
          }
        ],
        addendum: null,
        primaryAgent: 61201,
        companyCode: 'TTIC',
        contract: 'Flood 03 16',
        eoExpirationDate: '1987-08-01',
        licenseEffectiveDate: '1987-09-06',
        licenseNumber: 'R013307',
        stateLicense: 'FL'
      }
    ];

    const { license } = agency;

    return (
      <div>
        {this.state.showEditAgencyContract && (
        <ContractsModal
          initialValues={this.state.editType === 'New' ? {} : agency}
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
                    onClick={this.toggleContractModal('New')}
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
