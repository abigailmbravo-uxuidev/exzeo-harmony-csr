import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import Inputs from '@exzeo/core-ui/lib/Input';
import lifecycle from '@exzeo/core-ui/lib/InputLifecycle';
import { getAnswers } from '../../../utilities/forms';

const {
  Input, Select, SelectInteger, Numbers
} = Inputs;
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
        <div className="form-group-double-element">
          <Field
            name="property.yearBuilt"
            label="Year Home Built"
            component={Numbers}
            decimalScale={0}
            validate={validation.isNumbersOnly}
            showInitial
          />
        </div>
        <div className="form-group-double-element">
          <Field
            name="property.constructionType"
            label="Construction"
            component={Select}
            answers={getAnswers('constructionType', questions)}
            showInitial
          />
        </div>
        <div className="form-group-double-element">
          <Field
            name="property.protectionClass"
            label="Protection Class"
            component={SelectInteger}
            answers={getAnswers('protectionClass', questions)}
            showInitial
          />
        </div>
        <div className="form-group-double-element">
          <Field
            name="property.buildingCodeEffectivenessGrading"
            label="BCEG"
            component={SelectInteger}
            answers={getAnswers('buildingCodeEffectivenessGrading', questions)}
            showInitial
          />
        </div>
        <div className="form-group-double-element">
          <Field
            name="property.familyUnits"
            label="Family Units"
            component={Select}
            answers={getAnswers('familyUnits', questions)}
            showInitial
          />
        </div>
        <div className="form-group-double-element">
          <Field
            name="property.floodZone"
            label="Flood Zone"
            component={Select}
            answers={getAnswers('floodZone', questions)}
            showInitial
          />
        </div>
      </div>
      {/* Col2 */}
      <div className="flex-child col-2">
        <div className="form-group labels">
          <label /><label>Current</label><label>New</label>
        </div>
        <div className="form-group-double-element">
          <Field
            name="property.distanceToTidalWater"
            label="Tidal Waters Dist."
            component={Numbers}
            decimalScale={2}
            showInitial
          />
        </div>
        <div className="form-group-double-element">
          <Field
            name="property.distanceToFireHydrant"
            label="Fire Hydrant Dist."
            component={Numbers}
            decimalScale={2}
            showInitial
          />
        </div>
        <div className="form-group-double-element">
          <Field
            name="property.distanceToFireStation"
            label="Fire Station Dist."
            component={Numbers}
            decimalScale={2}
            showInitial
          />
        </div>
        <div className="form-group-double-element">
          <Field
            label="Residence Type"
            name="property.residenceType"
            component={Select}
            answers={getAnswers('residenceType', questions)}
            showInitial
          />
        </div>
        <div className="form-group-double-element">
          <Field
            name="property.squareFeet"
            label="Sq. Ft. of Home"
            component={Numbers}
            decimalScale={0}
            validate={validation.isRequired}
            showInitial
          />
        </div>
        <div className="form-group-double-element">
          <Field
            label="Year Roof Built"
            name="property.yearOfRoof"
            component={Numbers}
            decimalScale={0}
            showInitial
          />
        </div>
      </div>
    </div>
  </section>
);

HomeLocation.propTypes = {
  questions: PropTypes.array
};

HomeLocation.defaultProps = {};

export default HomeLocation;
