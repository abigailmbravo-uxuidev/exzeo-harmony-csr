import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Loader } from '@exzeo/core-ui';

import { getAgency, getAgentList } from '../../state/actions/agency.actions';
import normalizePhone from '../Form/normalizePhone';
import Footer from '../Common/Footer';
import TransferModal from './TransferModal';

export class Transfer extends Component {
  state = { showTransferModal: false };

  componentDidMount() {
    // const { getAgencyAction, getAgentListAction, agency } = this.props;
    // get policies by agency
  }

  handleToggleTransferModal = () => {
    this.setState(state => ({ showTransferModal: !state.showTransferModal }));
  }

  render() {
    const {
      agency,
      agents,
    } = this.props;

    if (!(agents && agents.length && agency)) return <Loader />;

    const { showTransferModal } = this.state;

    return (
      <React.Fragment>
        {showTransferModal && 
          <TransferModal
            toggleModal={this.handleToggleTransferModal}
          />
        }
        <div className="route-content">
          <div className="scroll">
            <div className="form-group survey-wrapper" role="group">
              <section className="policy-filter">
              Bootstrap Table
              </section>
              <section className="policy-filter-actions">
              Bootstrap Table Actions
              </section>
            </div>
          </div>
        </div>
        <div className="basic-footer">
          <Footer />
        </div>
      </React.Fragment>
    );
  }
}

Transfer.propTypes = {
  policies: PropTypes.array,
  agents: PropTypes.array,
  agency: PropTypes.object
};

Transfer.defaultProps = {
  policies: []
};

const mapStateToProps = state => ({
  agents: state.service.agents,
  agency: state.service.agency,
  policies: []
});

export default connect(mapStateToProps, {})(Transfer);