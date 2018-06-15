import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
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

  toggleContractModal = editType => () =>
    this.setState({
      editType,
      showEditAgencyContract: !this.state.showEditAgencyContract
    });

  toggleAgencyModal = () => {
    this.setState({ showAgencyEdit: !this.state.showAgencyEdit });
  };

  saveContract = (values) => {
    /*
      call save action when agency endpoint is implemented
    */
    this.setState({ editType: null, showEditAgencyContract: false });
  };

  render() {
    const { agency, sameAsMailingValue } = this.props;
    if (!agency) return <div />;
    const matchedPhysicalAddress = _.cloneDeep(agency.physicalAddress);
    delete matchedPhysicalAddress.latitude;
    delete matchedPhysicalAddress.longitude;
    delete matchedPhysicalAddress.county;

    agency.eoExpirationDate = moment(agency.eoExpirationDate).format('YYYY-MM-DD');
    agency.licenseEffectiveDate = moment(agency.licenseEffectiveDate).format('YYYY-MM-DD');

    return (
      <div>
        {this.state.showEditAgencyContract && (
        <ContractsModal
          initialValues={this.state.editType === 'New' ? {} : agency}
          toggleModal={this.toggleContractModal}
          editType={this.state.editType}
          saveContract={this.saveContract}
        />
          )}
        <div className="route-content">
          <div className="scroll">
            <div className="form-group survey-wrapper" role="group">
              <TaxDetails agency={agency} editAgency={this.toggleAgencyModal} />
              <section>
                <h3>Contracts</h3>
                <ContractsCard agency={agency} editContract={this.toggleContractModal} />
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
            initialValues={{
              ...agency,
              sameAsMailing: _.isEqual(
                matchedPhysicalAddress,
                agency.mailingAddress
              )
            }}
            sameAsMailingValue={sameAsMailingValue}
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
  agency: PropTypes.shape()
};

export default Contracts;
