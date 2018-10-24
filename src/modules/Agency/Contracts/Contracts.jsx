import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep'
import Button from '@exzeo/core-ui/lib/Button'
import TaxDetail from './TaxDetails';
import LicenseCard from './LicenseCard';
import ContractCard from './ContractCard';
import ContractModal from './ContractModal';
import Footer from '../../../components/Common/Footer';

export class Contracts extends Component {
  state = {
    showContractModal: false,
    activeContract: null
  };

  toggleContract = contract => () => {
    this.setState(prevState => ({
      showContractModal: !prevState.showContractModal,
      activeContract: contract
    }));
  };

  saveContract = async (data, dispatch, props) => {
    const { agency: { agencyCode }, updateAgency } = this.props
    const submitData = { agencyCode, contracts: [{ ...data }] };
    await updateAgency(submitData);
    this.toggleContract()();
  };

  render() {
    const { agency, listOfAgents } = this.props;
    const { activeIndex, showContractModal } = this.state;

    if (!agency) return <div />;
    return (
      <div id="agency-contracts" className="agency-contracts">
        {showContractModal &&
          <ContractModal
            saveContract={this.saveContract}
            closeModal={this.toggleContract}
            initialValues={this.state.activeContract}
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
                    editContract={this.toggleContract(license)}
                  />
                ))}
                <div className="create-contract">
                  <hr />
                  <Button
                    baseClass="primary"
                    size="small"
                    onClick={this.toggleContract(null)}
                    dataTest="addContract"
                  ><i className="fa fa-plus" /> Contract</Button>
                  <hr />
                </div>
              </section>
              <section>
                <h3>Contracts</h3>
                {Array.isArray(agency.contracts) && agency.contracts.map((contract, index) => (
                  <ContractCard
                    key={contract.contractNumber}
                    contract={contract}
                    editContract={this.toggleContract(contract)}
                  />
                ))}
                <div className="create-contract">
                  <hr />
                  <Button
                    baseClass="primary"
                    size="small"
                    onClick={this.toggleContract(null)}
                    dataTest="addContract"
                  ><i className="fa fa-plus" /> Contract</Button>
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
