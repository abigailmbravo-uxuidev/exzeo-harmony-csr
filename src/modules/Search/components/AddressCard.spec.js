import React from 'react';
import { shallow } from 'enzyme';
import AddressCard from './AddressCard';
import addressTestData from '../../../common/addressTestData';

describe('Test AddressCard component', () => {
  it('renders when provided correctly structured address', () => {
    const wrapper = shallow(
      <AddressCard
        handleKeypress={() => null}
        handleClick={() => null}
        address={addressTestData}
      />
    );

    const link = wrapper.find(`#${addressTestData.physicalAddress.address1}`);

    expect(wrapper.exists()).toBeTruthy();
    expect(link).toHaveLength(1);
    link.simulate('click');
    link.simulate('keypress', { key: 'Enter' });
  });
});
