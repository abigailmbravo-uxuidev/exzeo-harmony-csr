import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import GroupedInputs from '@exzeo/core-ui/lib/InputGrouped';
import lifecycle from '@exzeo/core-ui/lib/InputLifecycle';
import { getAnswers } from '../../../utilities/forms';

const {
  Integer, Select, SelectInteger, Numbers
} = GroupedInputs;
const { validation } = lifecycle;

const HomeLocation = ({ questions }) => (
  <section name="home" id="home">
    <h3>Home / Location</h3>
    <div className="flex-parent">
      {/* Col1 */}
      <div className="flex-child col-2">
        <div className="form-group labels">
          <label /><label>Current</label><label>New</label>
        </div>
        <Field
          name="property.yearBuilt"
          label="Year Home Built"
          component={Integer}
          thousandSeparator={false}
          validate={validation.isNumbersOnly}
          dataTest="yearBuilt"
        />
        <Field
          name="property.constructionType"
          label="Construction"
          component={Select}
          answers={getAnswers('constructionType', questions)}
          dataTest="constructionType"

        />
        <Field
          name="property.protectionClass"
          label="Protection Class"
          component={SelectInteger}
          answers={getAnswers('protectionClass', questions)}
          dataTest="protectionClass"
        />
        <Field
          name="property.buildingCodeEffectivenessGrading"
          label="BCEG"
          component={SelectInteger}
          answers={getAnswers('buildingCodeEffectivenessGrading', questions)}
          dataTest="buildingCodeEffectivenessGrading"
        />
        <Field
          name="property.familyUnits"
          label="Family Units"
          component={Select}
          answers={getAnswers('familyUnits', questions)}
          dataTest="familyUnits"
        />
        <Field
          name="property.floodZone"
          label="Flood Zone"
          component={Select}
          answers={getAnswers('floodZone', questions)}
          dataTest="floodZone"
        />
      </div>
      {/* Col2 */}
      <div className="flex-child col-2">
        <div className="form-group labels">
          <label /><label>Current</label><label>New</label>
        </div>
        <Field
          name="property.distanceToTidalWater"
          label="Tidal Waters Dist."
          component={Numbers}
          decimalScale={2}
          dataTest="distanceToTidalWater"
        />
        <Field
          name="property.distanceToFireHydrant"
          label="Fire Hydrant Dist."
          component={Numbers}
          decimalScale={2}
          dataTest="distanceToFireHydrant"
        />
        <Field
          name="property.distanceToFireStation"
          label="Fire Station Dist."
          component={Numbers}
          decimalScale={2}
          dataTest="distanceToFireStation"
        />
        <Field
          name="property.residenceType"
          label="Residence Type"
          component={Select}
          answers={getAnswers('residenceType', questions)}
          dataTest="residenceType"
        />
        <Field
          name="property.squareFeet"
          label="Sq. Ft. of Home"
          component={Integer}
          validate={validation.isRequired}
          dataTest="squareFeet"
        />
        <Field
          name="property.yearOfRoof"
          label="Year Roof Built"
          component={Integer}
          dataTest="yearOfRoof"
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
