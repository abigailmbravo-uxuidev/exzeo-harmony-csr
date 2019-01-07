import React from 'react';

const DetailDescription = ({context, details}) => {
  const { policyNumber, sourceNumber, status } = details;
  const isQuote = context === 'quote';

  const handleSelectPolicy = () => {
    return policyNumber 
      ? window.open(`/policy/${policyNumber}/coverage`, '_blank')
      : null;
  };

  if (isQuote) {
    return (
      <dd className="status">
      {status === 'Policy Issued' ?
        <button 
          className="btn btn-link btn-alt-light" 
          data-test="selectPolicy" 
          onClick={handleSelectPolicy}>
          {status}
        </button>
        :
        status
      }
      </dd>
    )
  } else {
    return (
      <React.Fragment>
        <dd>
          {policyNumber}
          <span
            data-test={sourceNumber}
            id="source-number"
            title={sourceNumber}
            className="btn btn-link btn-white btn-xs no-padding btn-info">
            <i className="fa fa-info-circle" />Source
          </span>
        </dd>
        <dd className="status">{status}</dd>
      </React.Fragment>
    )
  }
};

const DetailMain = ({
  context,
  className,
  data,
  dataTest
}) => {
  const { details } = data;
  return (
    <section data-test={dataTest} className={className}>
      <dl>
        <div>
          {Object.keys(details).map(key => (
            <dd key={key}>{details[key]}</dd>
          ))}
          <DetailDescription context={context} details={data} />
        </div>
      </dl>
    </section>
  );
};

export default DetailMain;
