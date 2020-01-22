import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import AgencyDetails from '../components/FormGroup/AgencyDetails';

export class AgencyModal extends Component {
  saveAgency = async (data, dispatch, props) => {
    data.branches = data.branches.filter(b => String(b.branchCode) !== '0');
    await this.props.updateAgency(data);
    this.props.closeModal();
  };

  render() {
    const { closeModal, handleSubmit, submitting } = this.props;

    return (
      <div className="modal agency-crud">
        <form onSubmit={handleSubmit(this.saveAgency)}>
          <div className="card">
            <div className="card-header">
              <h4>
                <i className="fa fa-address-book" /> Edit Agency Details
              </h4>
            </div>
            <div className="card-block">
              <section className="agency-details">
                <AgencyDetails agencyCodeDisabled />
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

export default reduxForm({
  form: 'AgencyModal',
  enableReinitialize: true,
  destroyOnUnmount: false
})(AgencyModal);
