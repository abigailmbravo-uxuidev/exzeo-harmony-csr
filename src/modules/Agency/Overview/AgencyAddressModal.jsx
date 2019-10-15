import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';

import { updateAgency } from '../../../state/actions/agency.actions';
import AddressGroup from '../components/AddressGroup';

export class AgencyAddressModal extends Component {
  onHandleSaveAgency = async (data, dispatch, props) => {
    const { agency, branchCode } = this.props;

    if (Number(branchCode) > 0) {
      const selectedBranch = agency.branches.find(
        b => String(b.branchCode) === String(branchCode)
      );
      selectedBranch.physicalAddress = data.physicalAddress;
      selectedBranch.mailingAddress = data.mailingAddress;
      selectedBranch.territoryManagerId = data.territoryManagerId;
      agency.branches = agency.branches.filter(
        b => String(b.branchCode) !== '0'
      );
      this.props.updateAgency(agency);
    } else {
      agency.physicalAddress = data.physicalAddress;
      agency.mailingAddress = data.mailingAddress;
      agency.territoryManagerId = data.territoryManagerId;
      agency.branches = agency.branches.filter(
        b => String(b.branchCode) !== '0'
      );
      await this.props.updateAgency(agency);
    }
    this.props.closeModal();
  };

  onHandleSameAsMailing = (value, previousValue, allValues) => {
    const { change } = this.props;
    const { mailingAddress } = allValues;
    if (value) {
      change('physicalAddress.address1', mailingAddress.address1);
      change('physicalAddress.address2', mailingAddress.address2);
      change('physicalAddress.city', mailingAddress.city);
      change('physicalAddress.state', mailingAddress.state);
      change('physicalAddress.zip', mailingAddress.zip);
    } else {
      change('physicalAddress.address1', '');
      change('physicalAddress.address2', '');
      change('physicalAddress.city', '');
      change('physicalAddress.state', '');
      change('physicalAddress.zip', '');
    }
    return value;
  };

  render() {
    const {
      closeModal,
      handleSubmit,
      submitting,
      change,
      sameAsMailingValue
    } = this.props;

    return (
      <div className="modal agency-crud">
        <form onSubmit={handleSubmit(this.onHandleSaveAgency)}>
          <div className="card">
            <div className="card-header">
              <h4>
                <i className="fa fa-address-book" /> Edit Agency Address
              </h4>
            </div>
            <div className="card-block">
              <AddressGroup
                sameAsMailingValue={sameAsMailingValue}
                changeField={change}
                isAgency
                showCounty
              />
            </div>
            <div className="card-footer">
              <div className="btn-footer">
                <button
                  tabIndex="0"
                  className="btn btn-secondary"
                  type="button"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  tabIndex="0"
                  className="btn btn-primary"
                  type="submit"
                  disabled={submitting}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const selector = formValueSelector('AgencyAddressModal');
const mapStateToProps = state => ({
  sameAsMailingValue: selector(state, 'sameAsMailing'),
  territoryManagers: state.questions.territoryManagers
});

export default connect(
  mapStateToProps,
  {
    updateAgency
  }
)(
  reduxForm({
    form: 'AgencyAddressModal',
    enableReinitialize: true
  })(AgencyAddressModal)
);
