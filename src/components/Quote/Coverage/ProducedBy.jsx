import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Select, Date } from '@exzeo/core-ui/lib/Input';
import { validation } from '@exzeo/core-ui/lib/InputLifecycle';

const ProducedBy = ({
  name, sectionId, sectionClass, header, agencies, agents, handleAgencyChange
}) => (
  <section name={name} id={sectionId} className={sectionClass}>
    <h3>{header}</h3>
    <div className="flex-parent produced-by-wrapper">
      <div className="flex-child effectiveDate">
        <Field
          component={Date}
          validate={[validation.isRequired, validation.isDate]}
          label="Effective Date"
          name="effectiveDate"
        />
      </div>
      <div className="flex-child agencyCode">
        <Field
          name="agencyCode"
          label="Agency"
          component={Select}
          answers={agencies}
          normalize={value => handleAgencyChange(value)}
          validate={validation.isRequired}
        />
      </div>
      <div className="flex-child agentCode">
        <Field
          name="agentCode"
          label="Agent"
          component={Select}
          answers={agents}
          validate={validation.isRequired}
        />
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
