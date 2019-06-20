import React from 'react';
import { shallow } from 'enzyme';
import AgencyCard from './AgencyCard';
import agencyTestData from '../../../common/agencyTestData';

describe('Test AgencyCard component', () => {
  it('renders when provided correctly structured agency', () => {
    const wrapper = shallow(
      <AgencyCard
        handleKeypress={() => null}
        handleClick={() => null}
        agency={agencyTestData}
      />
    );

    const link = wrapper.find(`#agency-code-${agencyTestData.agencyCode}`);

    expect(wrapper.exists()).toBeTruthy();
    expect(link).toHaveLength(1);
    link.simulate('click');
    link.simulate('keypress', { key: 'Enter' });
  });
});
