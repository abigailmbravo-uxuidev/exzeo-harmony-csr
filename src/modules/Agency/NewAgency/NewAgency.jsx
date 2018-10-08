import React, { Component } from 'react';
import NewAgencyForm from './NewAgencyForm';

export class NewAgency extends Component {
  render() {
    return (
      <div className="route-content-wrapper">
        <div className="route-content">
          <div className="scroll">
            <div className="form-group survey-wrapper" role="group">
              <NewAgencyForm agency={{}} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewAgency;
