import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import Inputs from '@exzeo/core-ui/lib/Input';
import lifecycle from '@exzeo/core-ui/lib/InputLifecycle';
import { getAnswers } from '../../../utilities/forms';

const { IntegerGrouped, SelectGrouped, SelectIntegerGrouped, NumbersGrouped } = Inputs;
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
          component={IntegerGrouped}
          validate={validation.isNumbersOnly}
        />
        <Field
          name="property.constructionType"
          label="Construction"
          component={SelectGrouped}
          answers={getAnswers('constructionType', questions)}

        />
        <Field
          name="property.protectionClass"
          label="Protection Class"
          component={SelectIntegerGrouped}
          answers={getAnswers('protectionClass', questions)}
        />
        <Field
          name="property.buildingCodeEffectivenessGrading"
          label="BCEG"
          component={SelectIntegerGrouped}
          answers={getAnswers('buildingCodeEffectivenessGrading', questions)}
        />
        <Field
          name="property.familyUnits"
          label="Family Units"
          component={SelectGrouped}
          answers={getAnswers('familyUnits', questions)}
        />
        <Field
          name="property.floodZone"
          label="Flood Zone"
          component={SelectGrouped}
          answers={getAnswers('floodZone', questions)}
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
          component={NumbersGrouped}
          decimalScale={2}
        />
        <Field
          name="property.distanceToFireHydrant"
          label="Fire Hydrant Dist."
          component={NumbersGrouped}
          decimalScale={2}
        />
        <Field
          name="property.distanceToFireStation"
          label="Fire Station Dist."
          component={NumbersGrouped}
          decimalScale={2}
        />
        <Field
          name="property.residenceType"
          label="Residence Type"
          component={SelectGrouped}
          answers={getAnswers('residenceType', questions)}
        />
        <Field
          name="property.squareFeet"
          label="Sq. Ft. of Home"
          component={IntegerGrouped}
          validate={validation.isRequired}
        />
        <Field
          name="property.yearOfRoof"
          label="Year Roof Built"
          component={IntegerGrouped}
        />
      </div>

    </div>
  </section>
);

HomeLocation.propTypes = {
  questions: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

HomeLocation.defaultProps = {};

export default HomeLocation;
