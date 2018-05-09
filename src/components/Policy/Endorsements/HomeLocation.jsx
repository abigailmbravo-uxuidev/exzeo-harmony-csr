import React from 'react';
import { Field } from 'redux-form';
import Inputs from '@exzeo/core-ui/lib/Input';
import lifecycle from '@exzeo/core-ui/lib/InputLifecycle';
import { getAnswers } from './index';

const { Input, Select, NumberInput } = Inputs;
const {
  validation
} = lifecycle;

const HomeLocation = ({ questions }) => (
  <section name="home" id="home">
    <h3>Home / Location</h3>
    <div className="flex-parent">
      {/* Col1 */}
      <div className="flex-child col3">
        <div className="form-group labels">
          <label /><label>Current</label><label>New</label>
        </div>
        <div className="form-group-double-element">
          <Field
            label="Year Home Built"
            name="yearBuilt"
            disabled
            component={Input}
          />
          <Field
            name="yearBuiltNew"
            validate={validation.isNumbersOnly}
            component={Input}
          />
        </div>
        <div className="form-group-double-element">
          <Field
            label="Construction"
            name="constructionType"
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
            label="Protection Class"
            name="protectionClass"
            component={Input}
            disabled
          />

          <Field
            name="protectionClassNew"
            component={Select}
            answers={getAnswers('protectionClass', questions)}
          />
        </div>
        <div className="form-group-double-element">
          <Field
            label="BCEG"
            name="buildingCodeEffectivenessGrading"
            component={Input}
            disabled
          />
          <Field
            name="buildingCodeEffectivenessGradingNew"
            component={Select}
            answers={getAnswers('buildingCodeEffectivenessGrading', questions)}
          />
        </div>
        <div className="form-group-double-element">
          <Field
            label="Family Units"
            name="familyUnits"
            component={Input}
            disabled
          />
          <Field
            name="familyUnitsNew"
            answers={getAnswers('familyUnits', questions)}
            component={Select}
          />
        </div>
        <div className="form-group-double-element">
          <Field
            label="Flood Zone"
            name="floodZone"
            component={Input}
            disabled
          />
          <Field
            name="floodZoneNew"
            answers={getAnswers('floodZone', questions)}
            component={Select}
          />
        </div>
      </div>
      {/* Col2 */}
      <div className="flex-child col3">
        <div className="form-group labels">
          <label /><label>Current</label><label>New</label>
        </div>
        <div className="form-group-double-element">
          <Field
            label="Tidal Waters Dist."
            name="distanceToTidalWater"
            component={Input}
            disabled
          />
          <Field
            name="distanceToTidalWaterNew"
            component={NumberInput}
          />
        </div>
        <div className="form-group-double-element">
          <Field
            label="Fire Hydrant Dist."
            name="distanceToFireHydrant"
            component={Input}
            disabled
          />
          <Field
            name="distanceToFireHydrantNew"
            component={NumberInput}
          />
        </div>
        <div className="form-group-double-element">
          <Field
            label="Fire Station Dist."
            name="distanceToFireStation"
            component={Input}
            disabled
          />
          <Field
            name="distanceToFireStationNew"
            component={NumberInput}
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
            answers={getAnswers('residenceType', questions)}
            component={Select}
          />
        </div>
        <div className="form-group-double-element">
          <Field
            label="Sq. Ft. of Home"
            name="squareFeet"
            component={Input}
            disabled
          />
          <Field
            name="squareFeetNew"
            component={Input}
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
            component={Input}
          />
        </div>
      </div>
    </div>
  </section>
);

HomeLocation.propTypes = {};

HomeLocation.defaultProps = {};

export default HomeLocation;
