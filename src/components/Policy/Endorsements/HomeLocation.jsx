import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import {
  validation,
  IntegerGroup,
  SelectGroup,
  SelectIntegerGroup,
  NumbersGroup
} from '@exzeo/core-ui';
import { getAnswers } from '../../../utilities/forms';

const HomeLocation = ({ questions }) => (
  <section name="home" id="home">
    <h3>Home / Location</h3>
    <div className="flex-row">
      {/* Col1 */}
      <div className="col-2">
        <div className="form-group labels">
          <label />
          <label>Current</label>
          <label>New</label>
        </div>
        <Field
          name="property.yearBuilt"
          label="Year Home Built"
          component={IntegerGroup}
          thousandSeparator={false}
          validate={validation.isNumbersOnly}
          dataTest="yearBuilt"
        />
        <Field
          name="property.constructionType"
          label="Construction"
          component={SelectGroup}
          answers={getAnswers('constructionType', questions)}
          dataTest="constructionType"
        />
        <Field
          name="property.protectionClass"
          label="Protection Class"
          component={SelectIntegerGroup}
          answers={getAnswers('protectionClass', questions)}
          dataTest="protectionClass"
        />
        <Field
          name="property.buildingCodeEffectivenessGrading"
          label="BCEG"
          component={SelectIntegerGroup}
          answers={getAnswers('buildingCodeEffectivenessGrading', questions)}
          dataTest="buildingCodeEffectivenessGrading"
        />
        <Field
          name="property.familyUnits"
          label="Family Units"
          component={SelectGroup}
          answers={getAnswers('familyUnits', questions)}
          dataTest="familyUnits"
        />
        <Field
          name="property.floodZone"
          label="Flood Zone"
          component={SelectGroup}
          answers={getAnswers('floodZone', questions)}
          dataTest="floodZone"
        />
      </div>
      {/* Col2 */}
      <div className="col-2">
        <div className="form-group labels">
          <label />
          <label>Current</label>
          <label>New</label>
        </div>
        <Field
          name="property.distanceToTidalWater"
          label="Tidal Waters Dist."
          component={NumbersGroup}
          decimalScale={2}
          dataTest="distanceToTidalWater"
        />
        <Field
          name="property.distanceToFireHydrant"
          label="Fire Hydrant Dist."
          component={NumbersGroup}
          decimalScale={2}
          dataTest="distanceToFireHydrant"
        />
        <Field
          name="property.distanceToFireStation"
          label="Fire Station Dist."
          component={NumbersGroup}
          decimalScale={2}
          dataTest="distanceToFireStation"
        />
        <Field
          name="property.residenceType"
          label="Residence Type"
          component={SelectGroup}
          answers={getAnswers('residenceType', questions)}
          dataTest="residenceType"
        />
        <Field
          name="property.squareFeet"
          label="Sq. Ft. of Home"
          component={IntegerGroup}
          validate={validation.isRequired}
          dataTest="squareFeet"
        />
        <Field
          name="property.yearOfRoof"
          label="Year Roof Built"
          component={IntegerGroup}
          dataTest="yearOfRoof"
          thousandSeparator={false}
          allowNegative={false}
        />
      </div>
    </div>
  </section>
);

HomeLocation.propTypes = {
  questions: PropTypes.object
};

HomeLocation.defaultProps = {};

export default HomeLocation;
