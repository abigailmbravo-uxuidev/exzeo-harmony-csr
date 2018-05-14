import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import Inputs from '@exzeo/core-ui/lib/Input';
import lifecycle from '@exzeo/core-ui/lib/InputLifecycle';
import { getAnswers } from '../../../utilities/forms';

const { Input, Select, SelectInteger, Numbers } = Inputs;
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
            name="yearBuilt"
            label="Year Home Built"
            component={Input}
            disabled
          />
          <Field
            name="yearBuiltNew"
            component={Numbers}
            decimalScale={0}
            validate={validation.isNumbersOnly}
          />
        </div>
        <div className="form-group-double-element">
          <Field
            name="constructionType"
            label="Construction"
            disabled
            component={Input}
          />
          <Field
            name="constructionTypeNew"
            component={Select}
            answers={getAnswers('constructionType', questions)}
          />
        </div>
        <div className="form-group-double-element">
          <Field
            name="protectionClass"
            label="Protection Class"
            component={Numbers}
            prefix={'0'}
            disabled
          />

          <Field
            name="protectionClassNew"
            component={SelectInteger}
            answers={getAnswers('protectionClass', questions)}
          />
        </div>
        <div className="form-group-double-element">
          <Field
            name="buildingCodeEffectivenessGrading"
            label="BCEG"
            component={Numbers}
            prefix={'0'}
            disabled
          />
          <Field
            name="buildingCodeEffectivenessGradingNew"
            component={SelectInteger}
            answers={getAnswers('buildingCodeEffectivenessGrading', questions)}
          />
        </div>
        <div className="form-group-double-element">
          <Field
            name="familyUnits"
            label="Family Units"
            component={Input}
            disabled
          />
          <Field
            name="familyUnitsNew"
            component={Select}
            answers={getAnswers('familyUnits', questions)}
          />
        </div>
        <div className="form-group-double-element">
          <Field
            name="floodZone"
            label="Flood Zone"
            component={Input}
            disabled
          />
          <Field
            name="floodZoneNew"
            component={Select}
            answers={getAnswers('floodZone', questions)}
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
            name="distanceToTidalWater"
            label="Tidal Waters Dist."
            component={Input}
            disabled
          />
          <Field
            name="distanceToTidalWaterNew"
            component={Numbers}
            decimalScale={2}
          />
        </div>
        <div className="form-group-double-element">
          <Field
            name="distanceToFireHydrant"
            label="Fire Hydrant Dist."
            component={Input}
            disabled
          />
          <Field
            name="distanceToFireHydrantNew"
            component={Numbers}
            decimalScale={2}
          />
        </div>
        <div className="form-group-double-element">
          <Field
            name="distanceToFireStation"
            label="Fire Station Dist."
            component={Input}
            disabled
          />
          <Field
            name="distanceToFireStationNew"
            component={Numbers}
            decimalScale={2}
          />
        </div>
        <div className="form-group-double-element">
          <Field
            label="Residence Type"
            name="residenceType"
            component={Input}
            disabled
          />
          <Field
            name="residenceTypeNew"
            component={Select}
            answers={getAnswers('residenceType', questions)}
          />
        </div>
        <div className="form-group-double-element">
          <Field
            name="squareFeet"
            label="Sq. Ft. of Home"
            component={Input}
            disabled
          />
          <Field
            name="squareFeetNew"
            component={Numbers}
            decimalScale={0}
            validate={validation.isRequired}
          />
        </div>
        <div className="form-group-double-element">
          <Field
            label="Year Roof Built"
            name="yearOfRoof"
            component={Input}
            disabled
          />
          <Field
            name="yearOfRoofNew"
            component={Numbers}
            decimalScale={0}
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
