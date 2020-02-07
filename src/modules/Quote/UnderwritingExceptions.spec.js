import React from 'react';
import { shallow } from 'enzyme';

import UnderwritingExceptions from './UnderwritingExceptions';

const info = [
  {
    code: '1',
    _id: 'name3',
    canOverride: false,
    fields: [{ name: 'rating.netPremium', value: 'null' }],
    action: 'Missing Info'
  }
];
const underwritingReview = [
  {
    code: '2',

    _id: 'name1',
    canOverride: true,
    fields: [{ name: 'rating.netPremium', value: 'null' }]
  }
];
const fatalError = [
  {
    code: '3',
    _id: 'name2',
    canOverride: false,
    fields: [{ name: 'rating.netPremium', value: 'null' }]
  }
];

describe('Testing UnderwritingExceptions component', () => {
  it('should render given correctly formatted props', () => {
    const warningWrapper = shallow(
      <UnderwritingExceptions exceptionLevel="info" exceptions={info} />
    );
    const overridableWrapper = shallow(
      <UnderwritingExceptions
        exceptionLevel="underwritingReview"
        exceptions={underwritingReview}
      />
    );
    const nonOverridableWrapper = shallow(
      <UnderwritingExceptions
        exceptionLevel="fatalError"
        exceptions={fatalError}
      />
    );

    expect(warningWrapper);
    expect(overridableWrapper);
    expect(nonOverridableWrapper);
  });
});
