import React from 'react';
import { shallow } from 'enzyme';

import { AgentCard } from './AgentCard';

describe('Testing AgentCard component', () => {
  it('should render', () => {
    const wrapper = shallow(
      <AgentCard
        handleSecondaryClick={x => x}
        agent={{
          agentOfRecord: true,
          appointed: true,
          primaryPhoneNumber: '12334567890',
          secondaryPhoneNumber: '1234567890',
          faxNumber: '1234567890',
          emailAddress: 'test@test.com'
        }}
      />
    );
    expect(wrapper).toBeTruthy();
  });
});
