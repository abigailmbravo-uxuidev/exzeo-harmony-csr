import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@exzeo/core-ui/lib/Button';
import TaxDetail from './TaxDetails';
import LicenseCard from './LicenseCard';
import LicenseModal from './LicenseModal';
import ContractCard from './ContractCard';
import ContractModal from './ContractModal';
import Footer from '../../../components/Common/Footer';

export class Contracts extends Component {
  state = {
    showLicenseModal: false,
    licenseIndex: null,
    showContractModal: false,
    contractIndex: null
  };

  toggleLicense = licenseIndex => () => {
    this.setState(prevState => ({
      showLicenseModal: !prevState.showLicenseModal,
      licenseIndex
    }));
  };

  toggleContract = contractIndex => () => {
    this.setState(prevState => ({
      showContractModal: !prevState.showContractModal,
      contractIndex
    }));
  };

  saveLicense = async (data, dispatch, props) => {
    const { agency: { agencyCode, licenses }, updateAgency } = this.props;
    const { licenseIndex } = this.state;
    let newLicenses;

    if(licenseIndex || licenseIndex === 0) {
      newLicenses = licenses.map((item, index) => {
        if (index === licenseIndex) {
          return { ...data.licenses[0] };
        } else {
          return item;
        }
      });
    } else {
      
      newLicenses = [...licenses, ...data.licenses ];
    }

    await updateAgency({ agencyCode, licenses: newLicenses });
    this.toggleLicense()();
  };

  saveContract = async (data, dispatch, props) => {
    const { agency: { agencyCode, contracts }, updateAgency } = this.props;
    const { contractIndex } = this.state;

    let newContracts;

    if(contractIndex >= 0) {
      newContracts = contracts.map((item, index) => {
        if (index === contractIndex) {
          return { ...data };
        } else {
          return item;
        }
      });
    } else {
      newContracts = [...contracts, { ...data }];
    }

    await updateAgency({ agencyCode, contracts: newContracts });
    this.toggleContract()();
  };

  render() {
    const { agency } = this.props;
    const { licenseIndex, showLicenseModal, contractIndex, showContractModal } = this.state;

    if (!agency) return <div />;
    return (
      <div id="agency-contracts" className="agency-contracts">
        {showLicenseModal &&
          <LicenseModal
            saveLicense={this.saveLicense}
            closeModal={this.toggleLicense}
            initialValues={licenseIndex !== null ? { licenses: [agency.licenses[licenseIndex]] } : null}
            licenseNumbers={agency.licenses.map(l => l.licenseNumber)}
          />
        }
        {showContractModal &&
          <ContractModal
            saveContract={this.saveContract}
            closeModal={this.toggleContract}
            initialValues={agency.contracts[contractIndex]}
            contractNumbers={agency.contracts.map(c => c.contractNumber)}
          />
        }
        <div className="route-content">
          <div className="scroll">
            <div className="form-group survey-wrapper" role="group">
              <TaxDetail agency={agency} />
              <section>
                <h3>Licenses</h3>
                {Array.isArray(agency.licenses) && agency.licenses.map((license, index) => (
                  <LicenseCard
                    key={license.licenseNumber}
                    license={license}
                    editLicense={this.toggleLicense(index)} />
                ))}
                <div className="create-contract">
                  <hr />
                  <Button
                    baseClass="primary"
                    size="small"
                    onClick={this.toggleLicense(null)}
                    dataTest="addLicense"><i className="fa fa-plus" />License
                  </Button>
                  <hr />
                </div>
              </section>
              <section>
                <h3>Contracts</h3>
                {Array.isArray(agency.contracts) && agency.contracts.map((contract, index) => (
                  <ContractCard
                    key={`${contract.contractNumber}`}
                    contract={contract}
                    editContract={this.toggleContract(index)}
                  />
                ))}
                <div className="create-contract">
                  <hr />
                  <Button
                    baseClass="primary"
                    size="small"
                    onClick={this.toggleContract(null)}
                    dataTest="addContract"><i className="fa fa-plus" />Contract
                  </Button>
                  <hr />
                </div>
              </section>
            </div>
          </div>
        </div>
        <div className="basic-footer">
          <Footer />
        </div>
      </div>
    );
  }
}

Contracts.propTypes = {
  agency: PropTypes.shape(),
  contractInitialValues: PropTypes.shape()
};

export default Contracts;
