import React from 'react';

import Details from './DetailMain';
import Section from './DetailSection';
import SectionSingle from './DetailSectionSingle';
import MapLink from './MapLink';

const EditButton = ({ handler }) => (
  <button
    className="btn btn-link btn-xs btn-alt-light no-padding"
    onClick={handler}>
    <i className="fa fa-pencil-square" />Edit
  </button>
);

const DetailsBlock = ({detailsFields, headerDetails, modalHandlers}) => {
  const { fields, showEffectiveDateButton, showReinstateButton } = detailsFields;
  const components = {
    Section,
    SectionSingle
  };

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

    // Replace the value with the headerDetails value
    const detailValue = headerDetails[data.value];
    if (props.component === 'Section') {
      props.data = detailValue;
    } else if (typeof detailValue === 'object' && detailValue != null) {
      props.value = detailValue.value;
      if (detailValue.label) props.label = detailValue.label;
    } else {
      props.value = detailValue;
    }

    // Edge case: Don't show finalPayment is value is empty
    if (data.value === 'finalPayment' && !props.value) return null;

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

const DetailsHeader = ({ context, modalHandlers, detailsFields, headerDetails }) => {
  const testTag = `${context}Details`;

  if (!headerDetails.status) return (<div className="detailHeader" />);

  return (
    <div className="detailHeader">
      <Details
        context={context}
        data={headerDetails}
        dataTest={testTag}
        className={testTag}>
      </Details>

      <DetailsBlock 
        detailsFields={detailsFields} 
        headerDetails={headerDetails}
        modalHandlers={modalHandlers}
      />
    </div>
  );
}

export default DetailsHeader;
