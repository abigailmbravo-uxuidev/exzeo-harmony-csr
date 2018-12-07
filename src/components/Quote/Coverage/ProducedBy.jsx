import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { SelectInteger, Date, validation } from '@exzeo/core-ui';

const ProducedBy = ({
  name, sectionId, sectionClass, header, agencies, agents, handleAgencyChange
}) => (
  <section name={name} id={sectionId} className={sectionClass}>
    <h3>{header}</h3>
    <div className="flex-parent produced-by-wrapper">
      <div className="flex-child effectiveDate">
        <Field
          component={Date}
          validate={[validation.isRequired, validation.isDate, validation.isValidUnderwritingDate]}
          label="Effective Date"
          name="effectiveDate"
          dataTest="effectiveDate" />
      </div>
      <div className="flex-child agencyCode">
        <Field
          name="agencyCode"
          label="Agency"
          component={SelectInteger}
          answers={agencies}
          onChange={handleAgencyChange}
          validate={validation.isRequired}
          dataTest="agencyCode" />
      </div>
      <div className="flex-child agentCode">
        <Field
          name="agentCode"
          label="Agent"
          component={SelectInteger}
          answers={agents}
          validate={validation.isRequired}
          dataTest="agentCode" />
      </div>
    </div>
  </section>
);

ProducedBy.propTypes = {
  agencies: PropTypes.array,
  agents: PropTypes.array
};

ProducedBy.defaultProps = {
  agencies: [],
  agents: []
};

export default ProducedBy;
