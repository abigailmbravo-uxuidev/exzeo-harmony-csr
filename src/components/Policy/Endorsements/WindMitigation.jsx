import React from 'react';
import PropTypes from 'prop-types';
import TextField from '../../Form/inputs/TextField';
import RadioField from '../../Form/inputs/RadioField';
import SelectField from '../../Form/inputs/SelectField';
import {getAnswers, setCalculate} from "./index";

const WindMitigation = (props) => {
  return (
    <section>
      <div className="flex-parent">
        {/* Col1 */}
        <div className="flex-child col3">
          <div className="form-group labels">
            <label /><label>Current</label><label>New</label>
          </div>
          <div className="form-group-double-element">
            <TextField label="Roof Covering" styleName="" name="roofCovering" disabled />
            <SelectField
              label=""
              name="roofCoveringNew"
              answers={getAnswers('roofCovering', props.questions)}
              component="select"
              styleName=""
              onChange={() => setCalculate(props, false)}
              validations={['required']}
            />
          </div>
          <div className="form-group-double-element">
            <TextField label="Roof Deck Attachment" styleName="" name="roofDeckAttachment" disabled />
            <SelectField
              label=""
              name="roofDeckAttachmentNew"
              answers={getAnswers('roofDeckAttachment', props.questions)}
              component="select"
              styleName=""
              onChange={() => setCalculate(props, false)}
              validations={['required']}
            />
          </div>
          <div className="form-group-double-element">
            <TextField label="Roof to Wall Attachment" styleName="" name="roofToWallConnection" disabled />
            <SelectField
              label=""
              name="roofToWallConnectionNew"
              answers={getAnswers('roofToWallConnection', props.questions)}
              component="select"
              styleName="weakestRoofWallConnect"
              onChange={() => setCalculate(props, false)}
              validations={['required']}
            />
          </div>
          <div className="form-group-double-element">
            <TextField label="Roof Geometry" styleName="" name="roofGeometry" disabled />
            <SelectField
              label=""
              name="roofGeometryNew"
              answers={getAnswers('roofGeometry', props.questions)}
              component="select"
              styleName=""
              onChange={() => setCalculate(props, false)}
              validations={['required']}
            />
          </div>
          <div className="form-group-double-element">
            <TextField label="Secondary Water Resistance (SWR)" styleName="" name="secondaryWaterResistance" disabled />
            <div className="flex-child discounts-sprinkler">
              <RadioField
                label=""
                styleName=""
                onChange={() => setCalculate(props, false)}
                segmented
                name="secondaryWaterResistanceNew"
                validations={['required']}
                answers={getAnswers('secondaryWaterResistance', props.questions)}
              />
            </div>
          </div>
          <div className="form-group-double-element">
            <TextField label="Opening Protection" styleName="" name="openingProtection" disabled />
            <SelectField
              label=""
              name="openingProtectionNew"
              answers={getAnswers('openingProtection', props.questions)}
              component="select"
              styleName=""
              onChange={() => setCalculate(props, false)}
              validations={['required']}
            />
          </div>
        </div>

        {/* Col2 */}
        <div className="flex-child col3">

          <div className="form-group labels">
            <label /><label>Current</label><label>New</label>
          </div>
          <div className="form-group-double-element">
            <TextField label="FBC Wind Speed" styleName="" name="floridaBuildingCodeWindSpeed" disabled />
            <TextField validations={['required', 'numbersOnly']} label="" styleName="" name="floridaBuildingCodeWindSpeedNew" onChange={() => setCalculate(props, false)} />
          </div>
          <div className="form-group-double-element">
            <TextField label="FBC Wind Speed Design" styleName="" name="floridaBuildingCodeWindSpeedDesign" disabled />
            <TextField validations={['required', 'numbersOnly']} label="" styleName="" name="floridaBuildingCodeWindSpeedDesignNew" onChange={() => setCalculate(props, false)} />
          </div>
          <div className="form-group-double-element">
            <TextField label="Terrain" styleName="" name="terrain" disabled />
            <SelectField
              name="terrainNew"
              answers={getAnswers('terrain', props.questions)}
              component="select"
              label=""
              styleName="propertyTerrain"
              onChange={() => setCalculate(props, false)}
              validations={['required']}
            />
          </div>
          <div className="form-group-double-element">
            <TextField label="Internal Pressure Design" styleName="" name="internalPressureDesign" disabled />
            <SelectField
              name="internalPressureDesignNew"
              answers={getAnswers('internalPressureDesign', props.questions)}
              component="select"
              label=""
              styleName=""
              onChange={() => setCalculate(props, false)}
              validations={['required']}
            />
          </div>
          <div className="form-group-double-element">
            <TextField label="Wind Borne Debris Region (WBDR)" styleName="" name="windBorneDebrisRegion" disabled />
            <div className="flex-child discounts-sprinkler">
              <RadioField
                label=""
                styleName=""
                onChange={() => setCalculate(props, false)}
                segmented
                name="windBorneDebrisRegionNew"
                validations={['required']}
                answers={getAnswers('windBorneDebrisRegion', props.questions)}
              />
            </div>
          </div>
          <div className="form-group-double-element">
            <TextField label="Wind Mit Factor" styleName="" name="windMitFactor" disabled />
            <TextField validations={['required']} styleName="" label="" name="windMitFactorNew" disabled />
          </div>
        </div>
      </div>
    </section>
  );
};

WindMitigation.propTypes = {};

WindMitigation.defaultProps = {};

export default WindMitigation;
