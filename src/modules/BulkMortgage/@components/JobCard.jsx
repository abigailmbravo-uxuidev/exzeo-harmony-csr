import React from 'react';
import { Button, date } from '@exzeo/core-ui';
import { BUTTON_CLASS, BUTTON_SIZE } from '@exzeo/core-ui/src/Button/Button';
import Address from './Address';
import { downloadJob } from '../utilities';

const JobCard = ({ result }) => (
  <div tabIndex="0" className="card" data-test={`job-${result._id}`}>
    <section>
      <div className="details">
        <span className="job-id">
          <strong>{result._id}</strong>&nbsp;|&nbsp;
          {result.status}
        </span>
        {result.status === 'Completed' && (
          <React.Fragment>
            <span className="completed-by">
              <strong>Completed By:</strong>&nbsp;
              {result.updatedBy.userName}
            </span>
            <span className="completed-date">
              <strong>Completed:</strong>&nbsp;
              <span>{date.formattedLocalDate(result.updatedAt)}</span>
            </span>
          </React.Fragment>
        )}
        <span className="policies">
          <strong>Policies:</strong>&nbsp;
          <span>{result.policies.length}</span>
        </span>
        <Button
          dataTest="download-policy-csv"
          size={BUTTON_SIZE.small}
          className={BUTTON_CLASS.link}
          type="button"
          onClick={() => downloadJob(result)}
        >
          <i className="fa fa-download" />
          Download Policy CSV
        </Button>
      </div>
      <div className="title">
        <h4>
          {result.additionalInterest.name1}
          &nbsp;|&nbsp;
          <span className="propertyAddress">
            <Address
              className=""
              address={result.additionalInterest.mailingAddress}
            />
          </span>
        </h4>
      </div>
    </section>
  </div>
);

JobCard.propTypes = {};

JobCard.defaultProps = {};

export default JobCard;
