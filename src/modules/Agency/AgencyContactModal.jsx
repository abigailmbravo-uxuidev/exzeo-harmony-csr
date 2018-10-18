import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, FormSection } from 'redux-form';

import { updateAgency } from '../../state/actions/agencyActions';
import { getEditModalInitialValues } from '../../state/selectors/agency.selector';

import Contact from './components/FormGroup/Contact';

export class AgencyContactModal extends Component {
  saveAgency = async (data, dispatch, props) => {
    const { agency, branchCode, section } = this.props;

    if (Number(branchCode) > 0) {
      const selectedBranch = agency.branches.filter(b => String(b.branchCode) === String(branchCode));
      selectedBranch[0][section] = data[section];
      agency.branches = agency.branches.filter(b => String(b.branchCode) !== '0');
      props.updateAgency(agency);
    } else {
      agency.branches = agency.branches.filter(b => String(b.branchCode) !== '0');
      agency[section] = data[section];
      await props.updateAgency(agency);
    }
    props.closeModal();
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
        <form onSubmit={handleSubmit(this.saveAgency)}>
          <div className="card">
            <div className="card-header">
              <h4>
                <i className="fa fa-address-card" /> {header}
              </h4>
            </div>
            <div className="card-block">
              <section className="agency-details">
                <FormSection name={section} >
                  <Contact testPrefix={section} />
                </FormSection>
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
  form: 'AgencyContactModal',
  enableReinitialize: true,
  destroyOnUnmount: false
})(AgencyContactModal));
