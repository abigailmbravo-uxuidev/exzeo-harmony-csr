import React, { Component } from 'react';
import AgencyDetails from './AgencyDetails';

export class Overview extends Component {
  render() {
    return (
      <div className="route-content-wrapper">
        <div className="route-content">
          <div className="scroll">
            <div className="form-group survey-wrapper" role="group">
              <AgencyDetails agency={{}} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Overview;
