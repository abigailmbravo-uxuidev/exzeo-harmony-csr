import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Select, Radio, Input, Integer, validation, Phone } from '@exzeo/core-ui';

import { updateAgency } from '../../../state/actions/agencyActions';
import AgencyDetails from '../components/FormGroup/AgencyDetails';

const statusAnswers = [
  { answer: 'Active', label: 'Active' },
  { answer: 'InActive', label: 'InActive' }
];

const okToPayAnswers = [
  { answer: false, label: 'No' },
  { answer: true, label: 'Yes' }
];

const taxClassificationAnswers = [
  { answer: 'LLC', label: 'LLC' },
  { answer: 'Corporation', label: 'Corporation' }
];

export class AgencyModal extends Component {
  saveAgency = async (data, dispatch, props) => {
    data.branches = data.branches.filter(b => String(b.branchCode) !== '0');
    await props.updateAgency(data);
    props.closeModal();
  };

  render() {
    const {
      closeModal,
      handleSubmit,
      initialValues,
      submitting
    } = this.props;

    return (
      <div className="modal agency-crud">
        <form onSubmit={handleSubmit(this.saveAgency)}>
          <div className="card">
            <div className="card-header">
              <h4>
                <i className="fa fa-address-book" /> Edit Agency
              </h4>
            </div>
            <div className="card-block">
              <section className="agency-details">
                <AgencyDetails />
              </section>
            </div>
            <div className="card-footer">
              <div className="btn-footer">
                <button
                  tabIndex="0"
                  className="btn btn-secondary"
                  type="button"
                  onClick={closeModal}>
                Cancel
                </button>
                <button
                  tabIndex="0"
                  className="btn btn-primary"
                  type="submit"
                  disabled={submitting}>
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

const mapStateToProps = state => state;

export default connect(mapStateToProps, {
  updateAgency
})(reduxForm({
  form: 'AgencyModal',
  enableReinitialize: true,
  destroyOnUnmount: false
})(AgencyModal));
