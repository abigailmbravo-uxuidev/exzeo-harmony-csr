import React from 'react';

export const AgentOfRecordCard = ({ agentOfRecord, handleClick }) => (
  <div className="csr agentOfRecord card">
    <div className="agentOfRecord-title">
      <i className="fa fa-phone-square" />
      <label>Agent Of Record</label>
      {/* <div className="agentOfRecord-details">
        <h4><strong>{`${agentOfRecord.firstName} ${agentOfRecord.lastName}`} | Officer</strong></h4>
        <div className="additional-agentOfRecords">
          <ul>
            <li>
              <div className="agentOfRecord-methods">
                <p>
                  <i className="fa fa-envelope" />
                  <a href={`mailto:${agentOfRecord.emailAddress}`}>
                    {agentOfRecord.emailAddress}
                  </a>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div> */}
      <div className="agentOfRecord-actions">
        <button
          className="btn btn-link btn-sm"
          onClick={handleClick}>
          <i className="fa fa-pencil-square" />Edit
        </button>
      </div>
    </div>
  </div>
);

export default AgentOfRecordCard;
