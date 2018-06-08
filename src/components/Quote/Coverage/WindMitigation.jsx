import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Select, Radio, Input, Integer } from '@exzeo/core-ui/lib/Input';
import { validation } from '@exzeo/core-ui/lib/InputLifecycle';
import { getAnswers } from '../../../utilities/forms';

const WindMitigation = ({
  sectionId, sectionClass, header, questions
}) => (
  <section id={sectionId} className={sectionClass}>
    <div className="wind-col1 flex-child">
      <h3>{header}</h3>
      <div className="flex-parent wind-col1-row-1">
        <Field
          styleName="flex-child"
          label="Roof Covering"
          name="roofCovering"
          answers={getAnswers('roofCovering', questions)}
          component={Select}
          validate={validation.isRequired}
          dataTest="roofCovering"
        />
      </div>
      <div className="flex-parent wind-col1-row-2">
        <Field
          styleName="flex-child"
          label="Roof Deck Attachment"
          name="roofDeckAttachment"
          answers={getAnswers('roofDeckAttachment', questions)}
          component={Select}
          validate={validation.isRequired}
          dataTest="roofDeckAttachment"
        />
      </div>
      <div className="flex-parent wind-col1-row-3">
        <Field
          styleName="flex-child"
          label="Roof to Wall Attachment"
          name="roofToWallConnection"
          answers={getAnswers('roofToWallConnection', questions)}
          component={Select}
          validate={validation.isRequired}
          dataTest="roofToWallConnection"
        />
      </div>
      <div className="flex-parent wind-col1-row-4">
        <Field
          styleName="flex-child"
          label="Roof Geometry"
          name="roofGeometry"
          answers={getAnswers('roofGeometry', questions)}
          component={Select}
          validate={validation.isRequired}
          dataTest="roofGeometry"
        />
      </div>
      <div className="flex-parent wind-col1-row-5">
        <Field
          styleName="flex-child"
          segmented
          label="Secondary Water Resistance (SWR)"
          name="secondaryWaterResistance"
          answers={getAnswers('secondaryWaterResistance', questions)}
          component={Radio}
          validate={validation.isRequired}
          dataTest="secondaryWaterResistance"
        />
      </div>
      <div className="flex-parent wind-col1-row-6">
        <Field
          styleName="flex-child"
          label="Opening Protection"
          name="openingProtection"
          answers={getAnswers('openingProtection', questions)}
          component={Select}
          validate={validation.isRequired}
          dataTest="openingProtection"
        />
      </div>
    </div>
    <div className="wind-col2 flex-child">
      <h3>&nbsp;</h3>
      <div className="flex-parent wind-col1-row-1">
        <Field
          styleName="flex-child"
          label="FBC Wind Speed"
          name="floridaBuildingCodeWindSpeed"
          component={Integer}
          validate={[validation.isRequired, validation.isNumbersOnly]}
          dataTest="floridaBuildingCodeWindSpeed"
        />
      </div>
      <div className="flex-parent wind-col1-row-2">
        <Field
          styleName="flex-child"
          label="FBC Wind Speed Design"
          name="floridaBuildingCodeWindSpeedDesign"
          component={Integer}
          validate={[validation.isRequired, validation.isNumbersOnly]}
          dataTest="floridaBuildingCodeWindSpeedDesign"
        />
      </div>
      <div className="flex-parent wind-col1-row-3">
        <Field
          styleName="flex-child"
          label="Terrain"
          name="terrain"
          component={Select}
          answers={getAnswers('terrain', questions)}
          validate={validation.isRequired}
          dataTest="terrain"
        />
      </div>
      <div className="flex-parent wind-col1-row-4">
        <Field
          styleName="flex-child"
          label="Internal Pressure Design"
          name="internalPressureDesign"
          answers={getAnswers('internalPressureDesign', questions)}
          component={Select}
          validate={validation.isRequired}
          dataTest="internalPressureDesign"
        />
      </div>
      <div className="flex-parent wind-col1-row-5">
        <Field
          styleName="flex-child"
          segmented
          label="Wind Borne Debris Region (WBDR)"
          name="windBorneDebrisRegion"
          answers={getAnswers('windBorneDebrisRegion', questions)}
          component={Radio}
          validate={validation.isRequired}
          dataTest="windBorneDebrisRegion"
        />
      </div>
    </div>
  </section>
);

WindMitigation.propTypes = {
  questions: PropTypes.array
};

WindMitigation.defaultProps = {
  questions: []
};

export default WindMitigation;
