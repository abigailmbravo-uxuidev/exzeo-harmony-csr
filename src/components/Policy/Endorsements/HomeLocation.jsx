import React from 'react';
import TextField from '../../Form/inputs/TextField';
import SelectField from '../../Form/inputs/SelectField';
import NumberField from '../../Form/inputs/NumberField';

import { getAnswers, setCalculate } from './index';

const HomeLocation = props => (
  <section name="home" id="home">
    <h3>Home / Location</h3>
    <div className="flex-parent">
      {/* Col1 */}
      <div className="flex-child col3">
        <div className="form-group labels">
          <label /><label>Current</label><label>New</label>
        </div>
        <div className="form-group-double-element">
          <TextField label="Year Home Built" styleName="" name="yearBuilt" disabled />
          <TextField
            validations={['numbersOnly']}
            styleName=""
            label=""
            name="yearBuiltNew"
            onChange={() => setCalculate(props, false)}
          />
        </div>
        <div className="form-group-double-element">
          <TextField label="Construction" styleName="" name="constructionType" disabled />
          <SelectField
            onChange={() => setCalculate(props, false)}
            name="constructionTypeNew"
            answers={getAnswers('constructionType', props.questions)}
            component="select"
            styleName=""
            label=""
          />
        </div>
        <div className="form-group-double-element">
          <TextField label="Protection Class" styleName="" name="protectionClass" disabled />
          <SelectField
            onChange={() => setCalculate(props, false)}
            name="protectionClassNew"
            answers={getAnswers('protectionClass', props.questions)}
            component="select"
            label=""
            styleName=""
          />
        </div>
        <div className="form-group-double-element">
          <TextField label="BCEG" styleName="" name="buildingCodeEffectivenessGrading" disabled />
          <SelectField
            onChange={() => setCalculate(props, false)}
            name="buildingCodeEffectivenessGradingNew"
            answers={getAnswers('buildingCodeEffectivenessGrading', props.questions)}
            component="select"
            styleName=""
            label=""
          />
        </div>
        <div className="form-group-double-element">
          <TextField label="Family Units" styleName="" name="familyUnits" disabled />
          <SelectField
            onChange={() => setCalculate(props, false)}
            name="familyUnitsNew"
            answers={getAnswers('familyUnits', props.questions)}
            component="select"
            label=""
            styleName=""
          />
        </div>
        <div className="form-group-double-element">
          <TextField label="Flood Zone" styleName="" name="floodZone" disabled />
          <SelectField
            onChange={() => setCalculate(props, false)}
            name="floodZoneNew"
            answers={getAnswers('floodZone', props.questions)}
            component="select"
            label=""
            styleName=""
          />
        </div>
      </div>
      {/* Col2 */}
      <div className="flex-child col3">
        <div className="form-group labels">
          <label /><label>Current</label><label>New</label>
        </div>
        <div className="form-group-double-element">
          <TextField label="Tidal Waters Dist." styleName="" name="distanceToTidalWater" disabled />
          <NumberField label="" styleName="" name="distanceToTidalWaterNew" onChange={() => setCalculate(props, false)} />
        </div>
        <div className="form-group-double-element">
          <TextField label="Fire Hydrant Dist." styleName="" name="distanceToFireHydrant" disabled />
          <NumberField label="" styleName="" name="distanceToFireHydrantNew" onChange={() => setCalculate(props, false)} />
        </div>
        <div className="form-group-double-element">
          <TextField label="Fire Station Dist." styleName="" name="distanceToFireStation" disabled />
          <NumberField label="" styleName="" name="distanceToFireStationNew" onChange={() => setCalculate(props, false)} />
        </div>
        <div className="form-group-double-element">
          <TextField label="Residence Type" styleName="" name="residenceType" disabled />
          <SelectField
            name="residenceTypeNew"
            answers={getAnswers('residenceType', props.questions)}
            component="select"
            label=""
            styleName=""
            onChange={() => setCalculate(props, false)}
          />
        </div>
        <div className="form-group-double-element">
          <TextField label="Sq. Ft. of Home" styleName="" name="squareFeet" disabled />
          <TextField validations={['required']} label="" styleName="" name="squareFeetNew" onChange={() => setCalculate(props, false)} />
        </div>
        <div className="form-group-double-element">
          <TextField label="Year Roof Built" styleName="" name="yearOfRoof" disabled />
          <TextField styleName="" label="" name="yearOfRoofNew" onChange={() => setCalculate(props, false)} />
        </div>
      </div>
    </div>
  </section>
);

HomeLocation.propTypes = {};

HomeLocation.defaultProps = {};

export default HomeLocation;
