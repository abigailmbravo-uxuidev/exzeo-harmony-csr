import React, { Component } from 'react';
import { change, reset } from 'redux-form';
import PropTypes from 'prop-types';
import TaxDetails from './TaxDetails';
import AgencyModal from '../AgencyModal';
import ContractsCard from './ContractsCard';
import ContractsModal from './ContractsModal';

export class Contracts extends Component {
  render() {
    const {
      agency
    } = this.props;
    if (!agency) return <div />;
    const { license } = agency;
    return (
      <div id="agency-contracts" className="agency-contracts">
        <div className="route-content">
          <div className="scroll">
            <div className="form-group survey-wrapper" role="group">
              <TaxDetails agency={agency} editAgency={this.toggleAgencyModal} />
              <section>
                <h3>Contracts</h3>
                { license && license.length > 0 && license.map((l, index) =>
                  <ContractsCard key={`${l.licenseNumber}_${index}`} contractIndex={index} license={l} editContract={x => x} />)}
                <div className="create-contract">
                  <hr />
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={x => x}
                  >
                    <i className="fa fa-plus" /> Contract
                  </button>
                  <hr />
                </div>
              </section>
            </div>
          </div>
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
