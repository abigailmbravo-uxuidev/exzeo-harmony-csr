import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, date } from '@exzeo/core-ui';

import Footer from '../../../components/Common/Footer';

import TaxDetail from './TaxDetails';
import LicenseCard from './LicenseCard';
import LicenseModal from './LicenseModal';
import ContractCard from './ContractCard';
import ContractModal from './ContractModal';
import SmallModal from '../../../components/SmallModal';

export class Contracts extends Component {
  state = {
    showLicenseModal: false,
    showDeleteLicenseModal: false,
    showDeleteContractModal: false,
    licenseIndex: '',
    showContractModal: false,
    contractIndex: ''
  };

  toggleLicense = licenseIndex => {
    this.setState(prevState => ({
      showLicenseModal: !prevState.showLicenseModal,
      licenseIndex
    }));
  };

  toggleDeleteLicense = licenseIndex => {
    this.setState(prevState => ({
      showDeleteLicenseModal: !prevState.showDeleteLicenseModal,
      licenseIndex
    }));
  };

  toggleContract = contractIndex => {
    this.setState(prevState => ({
      showContractModal: !prevState.showContractModal,
      contractIndex
    }));
  };

  toggleDeleteContract = contractIndex => {
    this.setState(prevState => ({
      showDeleteContractModal: !prevState.showDeleteContractModal,
      contractIndex
    }));
  };

  mergeData = (data, existingArray, index) => {
    let newArray;
    if (index !== null && index !== '') {
      newArray = existingArray.map((item, i) =>
        i === index ? { ...data } : item
      );
    } else {
      newArray = [...existingArray, { ...data }];
    }
    return newArray;
  };

  deleteLicense = async (data, dispatch, props) => {
    const {
      agency: { agencyCode, licenses },
      updateAgency
    } = this.props;
    const { licenseIndex } = this.state;
    const newLicenses = [...licenses];
    newLicenses.splice(licenseIndex, 1);
    await updateAgency({ agencyCode, licenses: newLicenses });
    this.toggleDeleteLicense(null);
  };

  deleteContract = async (data, dispatch, props) => {
    const {
      agency: { agencyCode, contracts },
      updateAgency
    } = this.props;
    const { contractIndex } = this.state;
    const newContracts = [...contracts];
    newContracts.splice(contractIndex, 1);
    await updateAgency({ agencyCode, contracts: newContracts });
    this.toggleDeleteContract(null);
  };

  saveLicense = async (data, dispatch, props) => {
    const {
      agency: { agencyCode, licenses },
      updateAgency
    } = this.props;
    const { licenseIndex } = this.state;
    const newLicenses = this.mergeData(data, licenses, licenseIndex);

    await updateAgency({ agencyCode, licenses: newLicenses });
    this.toggleLicense(null);
  };

  saveContract = async (data, dispatch, props) => {
    const {
      agency: { agencyCode, contracts },
      updateAgency
    } = this.props;
    const { contractIndex } = this.state;
    const newContracts = this.mergeData(data, contracts, contractIndex);

    await updateAgency({ agencyCode, contracts: newContracts });
    this.toggleContract(null);
  };

  getLicenseInitialValues = agency => {};

  render() {
    const { agency, listAnswers, listAnswersAsKey } = this.props;
    const {
      licenseIndex,
      showLicenseModal,
      contractIndex,
      showContractModal,
      showDeleteLicenseModal,
      showDeleteContractModal
    } = this.state;

    const activeContract = (agency.contracts || [])[contractIndex || 0];
    const activeLicense = (agency.licenses || [])[licenseIndex || 0];

    if (!agency) return <div />;
    return (
      <div id="agency-contracts" className="agency-contracts">
        {showDeleteLicenseModal && (
          <SmallModal
            header="Delete License"
            headerIcon="fa-trash"
            text={`Are you sure you want to delete license: ${activeLicense.state} - ${activeLicense.licenseNumber}`}
            handleSubmit={this.deleteLicense}
            handleCancel={this.toggleDeleteLicense}
          />
        )}
        {showDeleteContractModal && (
          <SmallModal
            header="Delete Contract"
            headerIcon="fa-trash"
            text={`Are you sure you want to delete contract: ${activeContract.companyCode} | ${activeContract.contractNumber} | ${activeContract.addendum}`}
            handleSubmit={this.deleteContract}
            handleCancel={this.toggleDeleteContract}
            contract={agency.contracts[contractIndex]}
          />
        )}
        {showLicenseModal && (
          <LicenseModal
            saveLicense={this.saveLicense}
            stateAnswers={listAnswersAsKey.US_states}
            closeModal={this.toggleLicense}
            initialValues={{
              ...agency.licenses[licenseIndex],
              licenseEffectiveDate: date.formatDate(
                agency.licenses[licenseIndex]
                  ? agency.licenses[licenseIndex].licenseEffectiveDate
                  : '',
                date.FORMATS.SECONDARY
              )
            }}
            licenseNumbers={agency.licenses.map(l => l.licenseNumber)}
          />
        )}
        {showContractModal && (
          <ContractModal
            productAnswers={listAnswers.Products}
            stateAnswers={listAnswersAsKey.US_states}
            addendumAnswers={listAnswers.Agency_Addendum}
            companyCodeAnswers={listAnswers.Company_Code}
            agencyContractAnswers={listAnswers.Agency_Contract}
            listAnswers={listAnswers}
            saveContract={this.saveContract}
            closeModal={this.toggleContract}
            initialValues={agency.contracts[contractIndex]}
            contractNumbers={agency.contracts.map(c => c.contractNumber)}
          />
        )}
        <div className="route-content">
          <div className="scroll">
            <div className="form-group survey-wrapper" role="group">
              <TaxDetail agency={agency} />
              <section data-test="licenses">
                <h3>Licenses</h3>
                {Array.isArray(agency.licenses) &&
                  agency.licenses.map((license, index) => (
                    <LicenseCard
                      canDelete={agency.licenses.length > 1}
                      key={license.licenseNumber}
                      license={license}
                      deleteLicense={() => this.toggleDeleteLicense(index)}
                      editLicense={() => this.toggleLicense(index)}
                    />
                  ))}
                <div className="create-contract">
                  <hr />
                  <Button
                    className={Button.constants.classNames.primary}
                    size={Button.constants.sizes.small}
                    onClick={() => this.toggleLicense(null)}
                    dataTest="addLicense"
                  >
                    <i className="fa fa-plus" />
                    License
                  </Button>
                  <hr />
                </div>
              </section>
              <section data-test="contracts">
                <h3>Contracts</h3>
                {Array.isArray(agency.contracts) &&
                  agency.contracts.map((contract, index) => (
                    <ContractCard
                      canDelete={agency.contracts.length > 1}
                      key={contract.contractNumber}
                      contract={contract}
                      deleteContract={() => this.toggleDeleteContract(index)}
                      editContract={() => this.toggleContract(index)}
                    />
                  ))}
                <div className="create-contract">
                  <hr />
                  <Button
                    className={Button.constants.classNames.primary}
                    size={Button.constants.sizes.small}
                    onClick={() => this.toggleContract(null)}
                    dataTest="addContract"
                  >
                    <i className="fa fa-plus" />
                    Contract
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

Contracts.defaultProps = {
  listAnswers: {},
  listAnswersAsKey: {}
};

Contracts.propTypes = {
  agency: PropTypes.object.isRequired
};

export default Contracts;
