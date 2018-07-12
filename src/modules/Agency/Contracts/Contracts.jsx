import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep'
import TaxDetail from './TaxDetails';
import License from './LicenseCard';
import LicenseModal from './LicenseModal';

export class Contracts extends Component {
  state = {
    showModal: false,
    isEditing: false,
    activeIndex: null
  };

  handleAddLicense = () => {
    this.setState({
      showModal: true,
      isEditing: false
    });
  };

  handleEditLicense = index => () => {
    this.setState({
      showModal: true,
      isEditing: true,
      activeIndex: index
    });
  };

  handleCloseModal = () => {
    this.setState({
      showModal: false,
      isEditing: false,
      activeIndex: null
    });
  };

  handleSaveLicense = async (data, dispatch, props) => {
    const { agency } = this.props;
    const newAgency = cloneDeep(agency);
    const { activeIndex, isEditing } = this.state;
    if (isEditing) {
      newAgency.license[activeIndex] = data;
    } else {
      newAgency.license.push(data);
    }
    await this.props.updateAgency(newAgency);
    this.handleCloseModal();
  };

  render() {
    const {
      agency,
      listOfAgents
    } = this.props;
    const { showModal, isEditing, activeIndex } = this.state;
    if (!agency) return <div />;
    const { license } = agency;
    return (
      <div id="agency-contracts" className="agency-contracts">
        { showModal && <LicenseModal
          initialValues={isEditing ? agency.license[activeIndex] : { agent: [] }}
          isEditing={isEditing}
          listOfAgents={listOfAgents}
          handleCloseModal={this.handleCloseModal}
          handleSaveLicense={this.handleSaveLicense}
        />}
        <div className="route-content">
          <div className="scroll">
            <div className="form-group survey-wrapper" role="group">
              <TaxDetail agency={agency} editAgency={this.toggleAgencyModal} />
              <section>
                <h3>Contracts</h3>
                {license && license.length > 0 && license.map((l, index) => (
                  <License
                    key={l.licenseNumber}
                    license={l}
                    editLicense={this.handleEditLicense(index)}
                  />
                ))}
                <div className="create-contract">
                  <hr />
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={this.handleAddLicense}
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
