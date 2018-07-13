import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep'
import Button from '@exzeo/core-ui/lib/Button'
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
    const {
      activeIndex,
      isEditing,
      showModal,
    } = this.state;

    if (!agency) return <div />;

    return (
      <div id="agency-contracts" className="agency-contracts">
        {showModal &&
          <LicenseModal
            initialValues={isEditing ? agency.license[activeIndex] : { agent: [] }}
            isEditing={isEditing}
            listOfAgents={listOfAgents}
            handleCloseModal={this.handleCloseModal}
            handleSaveLicense={this.handleSaveLicense}
          />
        }
        <div className="route-content">
          <div className="scroll">
            <div className="form-group survey-wrapper" role="group">
              <TaxDetail agency={agency} />
              <section>
                <h3>Contracts</h3>
                {Array.isArray(agency.license) && agency.license.map((li, index) => (
                  <License
                    key={li.licenseNumber}
                    license={li}
                    editLicense={this.handleEditLicense(index)}
                  />
                ))}
                <div className="create-contract">
                  <hr />
                  <Button
                    baseClass="primary"
                    size="small"
                    onClick={this.handleAddLicense}
                  ><i className="fa fa-plus" /> Contract</Button>
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
