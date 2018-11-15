import React from 'react';
import moment from 'moment';

import { formatUrl } from '../../../utilities/format';

export const DetailView = ({
  agency, agencyBranchData
}) => {
  return (
    <React.Fragment>
      <div className="agencyCode">
        <label>Agency ID</label>
        <div>
          {agency.agencyCode}
        </div>
      </div>
      <div className="agencyName">
        <label>Agency Name</label>
        <div>
          {agencyBranchData.displayName}
        </div>
      </div>
      <div className="entityName">
        <label>Entity Name</label>
        <div>{agency.legalName}</div>
      </div>
      <div className="status">
        <label>Status</label>
        <div>{agencyBranchData.status}</div>
      </div>
      <div className="tpaid">
        <label>TPAID</label>
        <div>{agency.tpaid}</div>
      </div>
      <div className="okToPay-wrapper">
        <label>OK to Pay</label>
        <div>{agency.okToPay ? 'Yes' : 'No'}</div>
      </div>
      <div className="webAddress">
        <label>Web Address</label>
        <div>
          <a href={formatUrl(agencyBranchData.websiteUrl)} target="_blank">
            {agencyBranchData.websiteUrl}
          </a>
        </div>
      </div>
      <div className="taxId">
        <label>Tax ID</label>
        <div>{agency.taxIdNumber}</div>
      </div>
      <div className="taxClassification">
        <label>Tax Classification</label>
        <div>{agency.taxClassification}</div>
      </div>
      <div className="eoExpirationDate">
        <label>EO Expiration Date</label>
        <div>{moment(agency.eoExpirationDate).format('MM/DD/YYYY')}</div>
      </div>
      {String(agencyBranchData.branchCode) !== '0' &&
      <div className="branchName">
        <label>Branch Name</label>
        <div>{agencyBranchData.displayName}</div>
      </div>
      }
      {String(agencyBranchData.branchCode) !== '0' &&
      <div className="mailCommisionChecksToBranch">
        <label>Mail Commision Checks to this Branch</label>
        <div>{agencyBranchData.mailCommissionChecksToBranch ? 'Yes' : 'No'}</div>
      </div>
      }
      {String(agencyBranchData.branchCode) !== '0' &&
      <div className="mailPolicyDocsToBranch">
        <label>Mail Policy Docs to this Branch</label>
        <div>{agencyBranchData.mailPolicyDocsToBranch ? 'Yes' : 'No'}</div>
      </div>
      }
    </React.Fragment>
  );
};

export default DetailView;
