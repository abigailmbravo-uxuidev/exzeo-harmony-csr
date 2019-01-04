import React from 'react';

import Details from './DetailMain';
import Section from './DetailSection';
import SectionSingle from './DetailSectionSingle';
import MapLink from './MapLink';

var components = {
  Section,
  SectionSingle
};

const detailsFields = {
  quote: {
    fields: [
      { value: 'policyHolder', component: 'Section' },
      { value: 'mailingAddress', component: 'Section' },
      { value: 'propertyAddress', component: 'Section' },
      { value: 'county', label: 'Property County' },
      { value: 'territory' },
      { value: 'constructionType' },
      { value: 'effectiveDate', className: 'quoteEffectiveDate'},
      { value: 'currentPremium', label: 'Premium', className:'premium' }
    ]
  },
  policy: {
    showEffectiveDateButton: true,
    showReinstateButton: true,
    fields: [
      { value: 'policyHolder', component: 'Section' },
      { value: 'mailingAddress', component: 'Section' },
      { value: 'propertyAddress', component: 'Section' },
      { value: 'county' },
      { value: 'territory' },
      { value: 'constructionType' },
      { value: 'effectiveDate' },
      { value: 'cancellationDate' },
      { label: 'Final Payment', value: 'finalPayment' },
      { value: 'currentPremium', className:'premium' }
    ]
  }
};

const EditButton = ({ handler }) => (
  <button
    className="btn btn-link btn-xs btn-alt-light no-padding"
    onClick={handler}>
    <i className="fa fa-pencil-square" />Edit
  </button>
);

const DetailsBlock = ({detailsFields, headerDetails, modalHandlers}) => {
  const { fields, showEffectiveDateButton, showReinstateButton } = detailsFields;

  const toTitleCase = str =>
    str.replace(/([A-Z])/g, (match) => ` ${match}`)
      .replace(/^./, (match) => match.toUpperCase());

  return fields.map(data =>{
    const props = { ...data };
    
    // Set the default values where needed
    if (!props.label && props.value) props.label = toTitleCase(props.value);
    if (!props.component) props.component = 'SectionSingle';
    if (!props.className) props.className = props.value;
    if (!props.dataTest) props.dataTest = `${props.value}Detail`;
    props.key = `${props.value}Detail`;

    // Set the value with the headerDetails value
    const detailValue = headerDetails[data.value];
    if (props.component === 'Section') {
      props.data = detailValue;
    } else if (typeof detailValue === 'object' && detailValue != null) {
      props.value = detailValue.value;
      props.label = detailValue.label;
    } else {
      props.value = detailValue;
    }

    // Add the buttons
    if (showEffectiveDateButton && data.value === 'effectiveDate') {
      props.render = () => <EditButton handler={modalHandlers.showEffectiveDateChangeModal} />;
    };
    if (showReinstateButton && data.value === 'cancellationDate') {
      props.render = () => <EditButton handler={modalHandlers.showReinstatePolicyModal} />;
    };
    if (data.value === 'propertyAddress') {
      props.render = () => <MapLink mapURI={headerDetails.mapURI} />;
    };

    // Build and return the component
    const Component = components[props.component];
    return <Component {...props} />
  })
};

const DetailDescription = ({context, details}) => {
  const { policyNumber, sourceNumber, status } = details;
  const isQuote = context === 'quote';

  const handleSelectPolicy = () => {
    return policyNumber 
      ? window.open(`/policy/${policyNumber}/coverage`, '_blank')
      :  false;
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

const DetailsHeader = ({ context, modalHandlers, headerDetails }) => {
  const testTag = `${context}Details`;
  const { details } = headerDetails;

  if (!headerDetails.status) return (<div className="detailHeader" />);

  return (
    <div className="detailHeader">
      <Details
        data={details}
        dataTest={testTag}
        className={testTag}>
        <DetailDescription context={context} details={headerDetails} />
      </Details>

      <DetailsBlock 
        detailsFields={detailsFields[context]} 
        headerDetails={headerDetails}
        modalHandlers={modalHandlers}
      />
    </div>
  );
}

export default DetailsHeader;
