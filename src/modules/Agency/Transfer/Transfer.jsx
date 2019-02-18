import React, { Component } from 'react';
import { Loader } from '@exzeo/core-ui';

import Footer from '../../../components/Common/Footer'
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

    // if (!(agents && agents.length && agency)) return <Loader />;

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

export default Transfer;