import React from 'react';
import { Button, date, noop } from '@exzeo/core-ui';
import { BUTTON_CLASS, BUTTON_SIZE } from '@exzeo/core-ui/src/Button/Button';
import Address from './Address';

const JobCard = ({ result }) => (
  <div tabIndex="0" className="card" data-test={`job-${result._id}`}>
    <div className="icon-name">
      <i className="card-icon fa fa-file-text" />
      <h5 className="product">{result.product}</h5>
    </div>
    <section>
      <div className="details">
        <span className="job-id">
          <strong>{result.additionalInterest._id}</strong>&nbsp;|&nbsp;
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
        <Button
          dataTest="download-policy-csv"
          size={BUTTON_SIZE.small}
          className={BUTTON_CLASS.link}
          type="button"
          onClick={noop}
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
