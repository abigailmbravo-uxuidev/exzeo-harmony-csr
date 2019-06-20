import React from 'react';
import { shallow } from 'enzyme';

import UnderwritingExceptions from './UnderwritingExceptions';

const warnings = [
  {
    _id: 'name3',
    canOverride: false,
    fields: [{ name: 'rating.netPremium', value: 'null' }],
    action: 'Missing Info'
  }
];
const overridableExceptions = [
  {
    _id: 'name1',
    canOverride: true,
    fields: [{ name: 'rating.netPremium', value: 'null' }]
  }
];
const nonOverridableExceptions = [
  {
    _id: 'name2',
    canOverride: false,
    fields: [{ name: 'rating.netPremium', value: 'null' }]
  }
];

describe('Testing UnderwritingExceptions component', () => {
  it('should render given correctly formatted props', () => {
    const warningWrapper = shallow(
      <UnderwritingExceptions exceptionLevel="warning" exceptions={warnings} />
    );
    const overridableWrapper = shallow(
      <UnderwritingExceptions
        exceptionLevel="overridable"
        exceptions={overridableExceptions}
      />
    );
    const nonOverridableWrapper = shallow(
      <UnderwritingExceptions
        exceptionLevel="nonOverridable"
        exceptions={nonOverridableExceptions}
      />
    );

    expect(warningWrapper);
    expect(overridableWrapper);
    expect(nonOverridableWrapper);
  });
});
