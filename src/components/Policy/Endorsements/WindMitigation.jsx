import React from 'react';
import { Field } from 'redux-form';
import Inputs from '@exzeo/core-ui/lib/Input';
import lifecycle from '@exzeo/core-ui/lib/InputLifecycle';
import { getAnswers } from './index';

const { Input, Select, Radio } = Inputs;
const {
  validation
} = lifecycle;

const WindMitigation = props => (
  <section>
    <h3>Wind Mitigation</h3>
    <div className="flex-parent">
      {/* Col1 */}
      <div className="flex-child col3">
        <div className="form-group labels">
          <label /><label>Current</label><label>New</label>
        </div>
        <div className="form-group-double-element">
          <Field
            label="Roof Covering"
            name="roofCovering"
            component={Input}
            disabled
          />
          <Field
            name="roofCoveringNew"
            answers={getAnswers('roofCovering', props.questions)}
            component={Select}
            validate={validation.isRequired}
          />
        </div>
        <div className="form-group-double-element">
          <Field
            label="Roof Deck Attachment"
            name="roofDeckAttachment"
            component={Input}
            disabled
          />
          <Field
            name="roofDeckAttachmentNew"
            answers={getAnswers('roofDeckAttachment', props.questions)}
            component={Select}
            validate={validation.isRequired}
          />
        </div>
        <div className="form-group-double-element">
          <Field
            label="Roof to Wall Attachment"
            name="roofToWallConnection"
            component={Input}
            disabled
          />
          <Field
            name="roofToWallConnectionNew"
            answers={getAnswers('roofToWallConnection', props.questions)}
            styleName="weakestRoofWallConnect"
            component={Select}
            validate={validation.isRequired}
          />
        </div>
        <div className="form-group-double-element">
          <Field
            label="Roof Geometry"
            name="roofGeometry"
            component={Input}
            disabled
          />
          <Field
            label=""
            name="roofGeometryNew"
            answers={getAnswers('roofGeometry', props.questions)}
            component={Select}
            validate={validation.isRequired}
          />
        </div>
        <div className="form-group-double-element">
          <Field
            label="Secondary Water Resistance (SWR)"
            name="secondaryWaterResistance"
            component={Input}
            disabled
          />
          <div className="flex-child discounts-sprinkler">
            <Field
              segmented
              name="secondaryWaterResistanceNew"
              answers={getAnswers('secondaryWaterResistance', props.questions)}
              component={Radio}
              validate={validation.isRequired}
            />
          </div>
        </div>
        <div className="form-group-double-element">
          <Field
            label="Opening Protection"
            name="openingProtection"
            component={Input}
            disabled
          />
          <Field
            name="openingProtectionNew"
            answers={getAnswers('openingProtection', props.questions)}
            component={Select}
            validate={validation.isRequired}
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
            label="FBC Wind Speed"
            name="floridaBuildingCodeWindSpeed"
            component={Input}
            disabled
          />
          <Field
            name="floridaBuildingCodeWindSpeedNew"
            component={Input}
            validate={[validation.isRequired, validation.isNumbersOnly]}
          />
        </div>
        <div className="form-group-double-element">
          <Field
            label="FBC Wind Speed Design"
            name="floridaBuildingCodeWindSpeedDesign"
            component={Input}
            disabled
          />
          <Field
            name="floridaBuildingCodeWindSpeedDesignNew"
            component={Input}
            validate={[validation.isRequired, validation.isNumbersOnly]}
          />
        </div>
        <div className="form-group-double-element">
          <Field
            label="Terrain"
            name="terrain"
            component={Input}
            disabled
          />
          <Field
            name="terrainNew"
            styleName="propertyTerrain"
            component={Select}
            answers={getAnswers('terrain', props.questions)}
            validate={validation.isRequired}
          />
        </div>
        <div className="form-group-double-element">
          <Field
            label="Internal Pressure Design"
            name="internalPressureDesign"
            component={Input}
            disabled
          />
          <Field
            name="internalPressureDesignNew"
            answers={getAnswers('internalPressureDesign', props.questions)}
            component={Select}
            validate={validation.isRequired}
          />
        </div>
        <div className="form-group-double-element">
          <Field
            label="Wind Borne Debris Region (WBDR)"
            name="windBorneDebrisRegion"
            component={Input}
            disabled
          />
          <div className="flex-child discounts-sprinkler">
            <Field
              segmented
              name="windBorneDebrisRegionNew"
              answers={getAnswers('windBorneDebrisRegion', props.questions)}
              component={Radio}
              validate={validation.isRequired}
            />
          </div>
        </div>
        <div className="form-group-double-element">
          <Field
            label="Wind Mit Factor"
            name="windMitFactor"
            component={Input}
            disabled
          />
          <Field
            name="windMitFactorNew"
            component={Input}
            validate={validation.isRequired}
            disabled
          />
        </div>
      </div>
    </div>
  </section>
);

WindMitigation.propTypes = {};

WindMitigation.defaultProps = {};

export default WindMitigation;
