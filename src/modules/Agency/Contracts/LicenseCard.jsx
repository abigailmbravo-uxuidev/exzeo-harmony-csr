import React from 'react';
import moment from 'moment';

export const LicenseCard = ({ license, editLicense }) => (
  <div className="license card">
    <div className="license-title">
      <i className="fa fa-file-text-o" />
      <label>License</label>
    </div>
    <div className="license-details">
      <div className="license-header">
        <h4 className="license-csp">
          <strong>{license.state} - {license.licenseNumber}</strong> |&nbsp;
          <span>{moment(license.licenseEffectiveDate).format('MM/DD/YYYY')}</span>
        </h4>
      </div>
    </div>
    <div className="license-actions">
      <button
        className="btn btn-link btn-sm"
        onClick={editLicense}
      >
      <i className="fa fa-pencil-square" />Edit
      </button>
    </div>
  </div>);

export default LicenseCard;
