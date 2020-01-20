import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, FormSection } from 'redux-form';

import { updateAgency } from '../../../state/actions/agency.actions';
import Contact from '../components/FormGroup/Contact';

export class AgencyContactModal extends Component {
  onHandleSaveAgency = async data => {
    const { agency, branchCode, section } = this.props;

    if (Number(branchCode) > 0) {
      const selectedBranch = agency.branches.filter(
        b => String(b.branchCode) === String(branchCode)
      );
      selectedBranch[0][section] = data[section];
      agency.branches = agency.branches.filter(
        b => String(b.branchCode) !== '0'
      );
      await this.props.updateAgency(agency);
    } else {
      agency[section] = data[section];
      agency.branches = agency.branches.filter(
        b => String(b.branchCode) !== '0'
      );
      await this.props.updateAgency(agency);
    }
    this.props.closeModal();
  };

  render() {
    const {
      closeModal,
      handleSubmit,
      submitting,
      section,
      header
    } = this.props;

    return (
      <div className="modal edit-contact">
        <form onSubmit={handleSubmit(this.onHandleSaveAgency)}>
          <div className="card">
            <div className="card-header">
              <h4>
                <i className="fa fa-address-card" /> {header}
              </h4>
            </div>
            <div className="card-block">
              <section className="agency-details">
                <FormSection name={section}>
                  <Contact showTitle />
                </FormSection>
              </section>
            </div>
            <div className="card-footer">
              <div className="btn-footer">
                <button
                  tabIndex="0"
                  data-test="modal-cancel"
                  className="btn btn-secondary"
                  type="button"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  tabIndex="0"
                  data-test="modal-submit"
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

export default connect(null, {
  updateAgency
})(
  reduxForm({
    form: 'AgencyContactModal',
    enableReinitialize: true,
    destroyOnUnmount: false
  })(AgencyContactModal)
);
