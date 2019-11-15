import React from 'react';
import { date } from '@exzeo/core-ui';

import { formatUrl } from '../../../utilities/format';

export const DetailView = ({ agency, agencyBranchData }) => {
  return (
    <React.Fragment>
      <div className="agencyCode" data-test="agency-code">
        <label>Agency ID</label>
        <div>{agency.agencyCode}</div>
      </div>
      <div className="agencyName" data-test="agency-name">
        <label>Agency Name</label>
        <div>{agency.displayName}</div>
      </div>
      <div className="entityName" data-test="entity-code">
        <label>Entity Name</label>
        <div>{agency.legalName}</div>
      </div>
      <div className="status" data-test="status">
        <label>Status</label>
        <div>{agencyBranchData.status}</div>
      </div>
      <div className="tpaid" data-test="tpaid">
        <label>TPAID</label>
        <div>{agency.tpaid}</div>
      </div>
      <div className="okToPay-wrapper" data-test="ok-to-pay">
        <label>OK to Pay</label>
        <div>{agency.okToPay ? 'Yes' : 'No'}</div>
      </div>
      <div className="webAddress" data-test="web-address">
        <label>Web Address</label>
        <div>
          <a
            href={formatUrl(agencyBranchData.websiteUrl)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {agencyBranchData.websiteUrl}
          </a>
        </div>
      </div>
      <div className="taxId" data-test="tax-id">
        <label>Tax ID</label>
        <div>{agency.taxIdNumber}</div>
      </div>
      <div className="taxClassification" data-test="tax-classification">
        <label>Tax Classification</label>
        <div>{agency.taxClassification}</div>
      </div>
      <div className="eoExpirationDate" data-test="eo-expiration-date">
        <label>EO Expiration Date</label>
        <div>{date.formattedDate(agency.eoExpirationDate, 'MM/DD/YYYY')}</div>
      </div>
      {String(agencyBranchData.branchCode) !== '0' && (
        <div className="branchName" data-test="branch-name">
          <label>Branch Name</label>
          <div>{agencyBranchData.displayName}</div>
        </div>
      )}
      {String(agencyBranchData.branchCode) !== '0' && (
        <div
          className="mailCommissionChecksToBranch"
          data-test="mail-commission"
        >
          <label>Mail Commission Checks to this Branch</label>
          <div>
            {agencyBranchData.mailCommissionChecksToBranch ? 'Yes' : 'No'}
          </div>
        </div>
      )}
      {String(agencyBranchData.branchCode) !== '0' && (
        <div className="mailPolicyDocsToBranch" data-test="mail-policy-docs">
          <label>Mail Policy Docs to this Branch</label>
          <div>{agencyBranchData.mailPolicyDocsToBranch ? 'Yes' : 'No'}</div>
        </div>
      )}
    </React.Fragment>
  );
};

export default DetailView;
