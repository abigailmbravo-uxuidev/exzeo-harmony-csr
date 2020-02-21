import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, date } from '@exzeo/core-ui';

import Footer from '../../../components/Common/Footer';

import TaxDetail from './TaxDetails';
import LicenseCard from './LicenseCard';
import LicenseModal from './LicenseModal';
import ContractCard from './ContractCard';
import ContractModal from './ContractModal';
import SmallModal from '../../../components/SmallModal';

export const Contracts = ({
  agency,
  agency: { agencyCode, licenses, contracts },
  updateAgency,
  listAnswers,
  listAnswersAsKey
}) => {
  const [showLicenseModal, setShowLicenseModal] = useState(false);
  const [showDeleteLicenseModal, setShowDeleteLicenseModal] = useState(false);
  const [showDeleteContractModal, setShowDeleteContractModal] = useState(false);
  const [licenseIndex, setLicenseIndex] = useState('');
  const [showContractModal, setShowContractModal] = useState(false);
  const [contractIndex, setContractIndex] = useState('');

  const toggleLicense = licenseIndex => {
    setShowLicenseModal(!showLicenseModal);
    setLicenseIndex(licenseIndex);
  };

  const toggleDeleteLicense = licenseIndex => {
    setShowDeleteLicenseModal(!showDeleteLicenseModal);
    setLicenseIndex(licenseIndex);
  };

  const toggleContract = contractIndex => {
    setShowContractModal(!showContractModal);
    setContractIndex(contractIndex);
  };

  const toggleDeleteContract = contractIndex => {
    setShowDeleteContractModal(!showDeleteContractModal);
    setContractIndex(contractIndex);
  };

  const mergeData = (data, existingArray, index) => {
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

  const deleteLicense = async () => {
    const newLicenses = [...licenses];
    newLicenses.splice(licenseIndex, 1);
    await updateAgency({ agencyCode, licenses: newLicenses });
    toggleDeleteLicense(null);
  };

  const deleteContract = async () => {
    const newContracts = [...contracts];
    newContracts.splice(contractIndex, 1);
    await updateAgency({ agencyCode, contracts: newContracts });
    toggleDeleteContract(null);
  };

  const saveLicense = async data => {
    const newLicenses = mergeData(data, licenses, licenseIndex);
    await updateAgency({ agencyCode, licenses: newLicenses });
    toggleLicense(null);
  };

  const saveContract = async data => {
    const newContracts = mergeData(data, contracts, contractIndex);
    await updateAgency({ agencyCode, contracts: newContracts });
    toggleContract(null);
  };

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
          handleSubmit={deleteLicense}
          handleCancel={toggleDeleteLicense}
        />
      )}
      {showDeleteContractModal && (
        <SmallModal
          header="Delete Contract"
          headerIcon="fa-trash"
          text={`Are you sure you want to delete contract: ${activeContract.companyCode} | ${activeContract.contractNumber} | ${activeContract.addendum}`}
          handleSubmit={deleteContract}
          handleCancel={toggleDeleteContract}
          contract={agency.contracts[contractIndex]}
        />
      )}
      {showLicenseModal && (
        <LicenseModal
          saveLicense={saveLicense}
          stateAnswers={listAnswersAsKey.US_states}
          closeModal={toggleLicense}
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
          saveContract={saveContract}
          closeModal={toggleContract}
          initialValues={
            contractIndex
              ? agency.contracts[contractIndex]
              : { stateProducts: [{ state: '', product: '' }] }
          }
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
                    deleteLicense={() => toggleDeleteLicense(index)}
                    editLicense={() => toggleLicense(index)}
                  />
                ))}
              <div className="create-contract">
                <hr />
                <Button
                  className={Button.constants.classNames.primary}
                  size={Button.constants.sizes.small}
                  onClick={() => toggleLicense(null)}
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
                    deleteContract={() => toggleDeleteContract(index)}
                    editContract={() => toggleContract(index)}
                  />
                ))}
              <div className="create-contract">
                <hr />
                <Button
                  className={Button.constants.classNames.primary}
                  size={Button.constants.sizes.small}
                  onClick={() => toggleContract(null)}
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
};

Contracts.defaultProps = {
  listAnswers: {},
  listAnswersAsKey: {}
};

Contracts.propTypes = {
  agency: PropTypes.object.isRequired
};

export default Contracts;
