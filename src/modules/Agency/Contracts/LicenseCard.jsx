import React from 'react';
import moment from 'moment';
import { Button } from '@exzeo/core-ui';

export const LicenseCard = ({ license, editLicense, deleteLicense, canDelete }) => (
  <div className="license card">
    <div className="license-title">
      <i className="fa fa-file-text-o" />
      <label>License</label>
    </div>
    <div className="license-details">
      <div className="license-header">
        <h4 className="license-csp">
          <strong>{license.state} - {license.licenseNumber}</strong> |&nbsp;
          <span>{moment.utc(license.licenseEffectiveDate).format('MM/DD/YYYY')}</span>
        </h4>
      </div>
    </div>
    <div className="license-actions">
      {canDelete && 
        <Button
        customClass="btn btn-link btn-sm"
        onClick={deleteLicense}
        dataTest="delete-contract">
          <i className="fa fa-trash" />Delete
        </Button>
      }
      <Button
        customClass="btn btn-link btn-sm"
        onClick={editLicense}
        dataTest="delete-contract">
          <i className="fa fa-pencil-square" />Edit
      </Button>
    </div>
  </div>);

export default LicenseCard;
