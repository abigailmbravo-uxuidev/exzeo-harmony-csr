import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { updateAgency } from '../../state/actions/agencyActions';
import { getEditModalInitialValues } from '../../state/selectors/agency.selector';

import Agent from './components/FormGroup/Agent';

export class AgentModal extends Component {
  saveAgent = async (data, dispatch, props) => {
    await props.updateAgent(data);
    props.closeModal();
  };

  render() {
    const {
      closeModal,
      handleSubmit,
      submitting
    } = this.props;

    return (
      <div className="modal agency-crud" style={{ overflow: 'scroll', display: 'block' }}>
        <form onSubmit={handleSubmit(this.saveAgent)}>
          <div className="card">
            <div className="card-header">
              <h4>
                <i className="fa fa-address-book" /> Edit Agent
              </h4>
            </div>
            <div className="card-block">
              <section className="agency-details">
                <Agent />
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

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, {
  updateAgency
})(reduxForm({
  form: 'AgentModal',
  enableReinitialize: true
})(AgentModal));
