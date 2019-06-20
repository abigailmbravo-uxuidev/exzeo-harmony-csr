import React from 'react';
import { shallow } from 'enzyme';

import AddressComponent from './Address';

describe('Testing PropertyAddress component', () => {
  it('should render', () => {
    const sectionId = 'Address';
    const header = 'Property Address';
    const wrapper = shallow(
      <AddressComponent header={header} sectionId={sectionId} />
    );

    expect(wrapper.exists()).toBeTruthy();
  });
});
