import React, { Component } from 'react';
import AgencyDetails from './AgencyDetails';
import AgencyModal from '../AgencyModal';
import EditContact from './EditContact';

export class Overview extends Component {
  render() {
    const { agency } = this.props;
    if (!agency || !agency._id) return <div />;

    return (
      <div className="route-content-wrapper">
        <div className="route-content">
          <div className="scroll">
            <div className="form-group survey-wrapper" role="group">
              <AgencyDetails agency={agency} editAgency={this.toggleAgencyModal} />
            </div>
          </div>
        </div>
      </div>);
  }
}

export default Overview;
