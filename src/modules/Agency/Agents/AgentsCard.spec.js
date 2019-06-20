import React from 'react';
import { shallow } from 'enzyme';
import { AgentsCard } from './AgentsCard';
import mockAgency from '../mockAgency';

describe('Testing AgentsCard component', () => {
  it('should render AOR', () => {
    const props = {
      getAgency: x => x,
      handleSwitchAOR() {},
      handleEditAgent() {},
      handleRemoveAgent() {}
    };
    const wrapper = shallow(
      <AgentsCard
        {...props}
        agency={mockAgency}
        agent={{
          licenses: [
            {
              appointed: true,
              licenseNumber: 'W180087',
              licenseType: 'Resident',
              state: 'FL'
            }
          ],
          agentCode: mockAgency.agentOfRecord,
          mailingAddress: {},
          primaryPhoneNumber: '1234567890',
          secondaryPhoneNumber: '1234567890',
          faxNumber: '1234567890',
          status: 'ACTIVE'
        }}
      />
    );
    expect(wrapper.exists()).toBeTruthy();

    wrapper.find('Button').everyWhere(x => {
      x.simulate('click');
      return x;
    });
  });

  it('should render not AOR', () => {
    const props = {
      getAgency() {},
      handleSwitchAOR() {},
      handleEditAgent() {},
      handleRemoveAgent() {}
    };
    const wrapper = shallow(
      <AgentsCard
        {...props}
        agency={mockAgency}
        agent={{
          licenses: [
            {
              appointed: true,
              licenseNumber: 'W180087',
              licenseType: 'Resident',
              state: 'FL'
            }
          ],
          emailAddress: 'test@typtap.com',
          agentCode: mockAgency.agentOfRecord + 1,
          mailingAddress: { address2: 'test' },
          primaryPhoneNumber: '1234567890',
          secondaryPhoneNumber: '1234567890',
          faxNumber: '1234567890',
          status: 'ACTIVE'
        }}
      />
    );
    expect(wrapper.exists()).toBeTruthy();

    wrapper.find('Button').everyWhere(x => {
      x.simulate('click');
      return x;
    });
  });
});
