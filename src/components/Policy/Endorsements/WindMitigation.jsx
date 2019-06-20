import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import {
  SelectGroup,
  RadioGroup,
  IntegerGroup,
  InputGroup,
  validation
} from '@exzeo/core-ui';

import { getAnswers } from '../../../utilities/forms';

const WindMitigation = ({ questions }) => (
  <section>
    <h3>Wind Mitigation</h3>
    <div className="flex-row">
      {/* Col1 */}
      <div className="col-2">
        <div className="form-group labels">
          <label />
          <label>Current</label>
          <label>New</label>
        </div>
        <Field
          label="Roof Covering"
          name="property.windMitigation.roofCovering"
          answers={getAnswers('roofCovering', questions)}
          component={SelectGroup}
          validate={validation.isRequired}
          dataTest="roofCovering"
        />
        <Field
          label="Roof Deck Attachment"
          name="property.windMitigation.roofDeckAttachment"
          answers={getAnswers('roofDeckAttachment', questions)}
          component={SelectGroup}
          validate={validation.isRequired}
          dataTest="roofDeckAttachment"
        />
        <Field
          label="Roof to Wall Attachment"
          name="property.windMitigation.roofToWallConnection"
          answers={getAnswers('roofToWallConnection', questions)}
          styleName="weakestRoofWallConnect"
          component={SelectGroup}
          validate={validation.isRequired}
          dataTest="roofToWallConnection"
        />
        <Field
          label="Roof Geometry"
          name="property.windMitigation.roofGeometry"
          answers={getAnswers('roofGeometry', questions)}
          component={SelectGroup}
          validate={validation.isRequired}
          dataTest="roofGeometry"
        />
        <Field
          segmented
          label="Secondary Water Resistance (SWR)"
          name="property.windMitigation.secondaryWaterResistance"
          answers={getAnswers('secondaryWaterResistance', questions)}
          component={RadioGroup}
          validate={validation.isRequired}
          dataTest="secondaryWaterResistance"
        />
        <Field
          label="Opening Protection"
          name="property.windMitigation.openingProtection"
          answers={getAnswers('openingProtection', questions)}
          component={SelectGroup}
          validate={validation.isRequired}
          dataTest="openingProtection"
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
          label="FBC Wind Speed"
          name="property.windMitigation.floridaBuildingCodeWindSpeed"
          component={IntegerGroup}
          validate={[validation.isRequired, validation.isNumbersOnly]}
          dataTest="floridaBuildingCodeWindSpeed"
        />
        <Field
          label="FBC Wind Speed Design"
          name="property.windMitigation.floridaBuildingCodeWindSpeedDesign"
          component={IntegerGroup}
          validate={[validation.isRequired, validation.isNumbersOnly]}
          dataTest="floridaBuildingCodeWindSpeedDesign"
        />
        <Field
          label="Terrain"
          name="property.windMitigation.terrain"
          styleName="propertyTerrain"
          component={SelectGroup}
          answers={getAnswers('terrain', questions)}
          validate={validation.isRequired}
          dataTest="terrain"
        />
        <Field
          label="Internal Pressure Design"
          name="property.windMitigation.internalPressureDesign"
          answers={getAnswers('internalPressureDesign', questions)}
          component={SelectGroup}
          validate={validation.isRequired}
          dataTest="internalPressureDesign"
        />
        <Field
          segmented
          label="Wind Borne Debris Region (WBDR)"
          name="property.windMitigation.windBorneDebrisRegion"
          answers={getAnswers('windBorneDebrisRegion', questions)}
          component={RadioGroup}
          validate={validation.isRequired}
          dataTest="windBorneDebrisRegion"
        />
        <Field
          label="Wind Mit Factor"
          name="windMitFactor"
          component={InputGroup}
          disabled
          dataTest="windMitFactor"
        />
      </div>
    </div>
  </section>
);

WindMitigation.propTypes = {
  questions: PropTypes.object
};

WindMitigation.defaultProps = {};

export default WindMitigation;
