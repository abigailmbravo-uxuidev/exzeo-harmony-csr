import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import Inputs from '@exzeo/core-ui/lib/Input';
import lifecycle from '@exzeo/core-ui/lib/InputLifecycle';
import { getAnswers } from '../../../utilities/forms';

const {
  Input, Select, Radio, Numbers
} = Inputs;
const { validation } = lifecycle;

const WindMitigation = ({ questions }) => (
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
            name="property.windMitigation.roofCovering"
            answers={getAnswers('roofCovering', questions)}
            component={Select}
            validate={validation.isRequired}
            showInitial
          />
        </div>
        <div className="form-group-double-element">
          <Field
            label="Roof Deck Attachment"
            name="property.windMitigation.roofDeckAttachment"
            answers={getAnswers('roofDeckAttachment', questions)}
            component={Select}
            validate={validation.isRequired}
            showInitial
          />
        </div>
        <div className="form-group-double-element">
          <Field
            label="Roof to Wall Attachment"
            name="property.windMitigation.roofToWallConnection"
            answers={getAnswers('roofToWallConnection', questions)}
            styleName="weakestRoofWallConnect"
            component={Select}
            validate={validation.isRequired}
            showInitial
          />
        </div>
        <div className="form-group-double-element">
          <Field
            label="Roof Geometry"
            name="property.windMitigation.roofGeometry"
            answers={getAnswers('roofGeometry', questions)}
            component={Select}
            validate={validation.isRequired}
            showInitial
          />
        </div>
        <div className="form-group-double-element">
          <div className="flex-child discounts-sprinkler">
            <Field
              segmented
              label="Secondary Water Resistance (SWR)"
              name="property.windMitigation.secondaryWaterResistance"
              answers={getAnswers('secondaryWaterResistance', questions)}
              component={Radio}
              validate={validation.isRequired}
              showInitial
            />
          </div>
        </div>
        <div className="form-group-double-element">
          <Field
            label="Opening Protection"
            name="property.windMitigation.openingProtection"
            answers={getAnswers('openingProtection', questions)}
            component={Select}
            validate={validation.isRequired}
            showInitial
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
            component={Numbers}
            decimalScale={0}
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
            component={Numbers}
            decimalScale={0}
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
            answers={getAnswers('terrain', questions)}
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
            answers={getAnswers('internalPressureDesign', questions)}
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
              answers={getAnswers('windBorneDebrisRegion', questions)}
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

WindMitigation.propTypes = {
  questions: PropTypes.array
};

WindMitigation.defaultProps = {};

export default WindMitigation;
