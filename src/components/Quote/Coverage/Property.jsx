import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Integer, Select, SelectInteger, Numbers } from '@exzeo/core-ui/lib/Input';
import { validation } from '@exzeo/core-ui/lib/InputLifecycle';
import PropertyAddress from './PropertyAddress';
import { getAnswers, getQuestionName } from '../../../utilities/forms';

const Property = ({
  sectionId, sectionClass, header, questions
}) => (
  <section id={sectionId} className={sectionClass}>
    <PropertyAddress
      name="propertyAdress"
      sectionId="property-risk"
      header="Property Address"
      className="property-address flex-child property-risk"
    />
    <div className="property-details flex-child home-location">
      <h3>{header}</h3>
      <div className="flex-parent home-location-row-1">
        <Field
          styleName="flex-child"
          name="yearBuilt"
          label="Year Home Built"
          component={Integer}
          thousandSeparator={false}
          validate={validation.isNumbersOnly}
          disabled
          dataTest="yearBuilt"
        />
        <Field
          styleName="flex-child"
          name="protectionClass"
          label={getQuestionName('protectionClass', questions)}
          component={SelectInteger}
          answers={getAnswers('protectionClass', questions)}
          disabled
          dataTest="protectionClass"
        />
        <Field
          styleName="flex-child"
          name="distanceToTidalWater"
          label="Tidal Waters Dist."
          component={Numbers}
          decimalScale={2}
          disabled
          dataTest="distanceToTidalWater"
        />
        <Field
          styleName="flex-child"
          name="residenceType"
          label={getQuestionName('residenceType', questions)}
          component={Select}
          answers={getAnswers('residenceType', questions)}
          disabled
          dataTest="residenceType"
        />
      </div>
      <div className="flex-parent home-location-row-2">
        <Field
          styleName="flex-child"
          name="constructionType"
          label={getQuestionName('constructionType', questions)}
          component={Select}
          answers={getAnswers('constructionType', questions)}
          disabled
          dataTest="constructionType"
        />
        <Field
          styleName="flex-child"
          name="buildingCodeEffectivenessGrading"
          label={getQuestionName('buildingCodeEffectivenessGrading', questions)}
          component={SelectInteger}
          answers={getAnswers('buildingCodeEffectivenessGrading', questions)}
          disabled
          dataTest="buildingCodeEffectivenessGrading"
        />
        <Field
          styleName="flex-child"
          name="distanceToFireHydrant"
          label="Fire Hydrant Dist."
          component={Numbers}
          decimalScale={2}
          disabled
          dataTest="distanceToFireHydrant"
        />
        <Field
          styleName="flex-child"
          name="squareFeet"
          label="Sq. Ft. of Home"
          component={Integer}
          validate={validation.isRequired}
          disabled
          dataTest="squareFeet"
        />
      </div>
      <div className="flex-parent home-location-row-3">
        <Field
          styleName="flex-child"
          name="yearOfRoof"
          label="Year Roof Built"
          component={Integer}
          disabled
          dataTest="yearOfRoof"
        />
        <Field
          styleName="flex-child"
          name="familyUnits"
          label={getQuestionName('familyUnits', questions)}
          component={Select}
          answers={getAnswers('familyUnits', questions)}
          disabled
          dataTest="familyUnits"
        />
        <Field
          styleName="flex-child"
          name="distanceToFireStation"
          label="Fire Station Dist."
          component={Numbers}
          decimalScale={2}
          disabled
          dataTest="distanceToFireStation"
        />
        <Field
          styleName="flex-child"
          name="floodZone"
          label={getQuestionName('floodZone', questions)}
          component={Select}
          answers={getAnswers('floodZone', questions)}
          disabled
          dataTest="floodZone"
        />
      </div>
    </div>
  </section>
);

Property.propTypes = {
  questions: PropTypes.object
};

Property.defaultProps = {
  questions: {}
};

export default Property;
