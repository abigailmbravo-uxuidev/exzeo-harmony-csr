import React from 'react';
import { shallow } from 'enzyme';
import { TaxDetails } from './TaxDetails';
import mockAgency from '../mockAgency';

describe('Testing TaxDetails component', () => {
  it('should render', () => {
    const wrapper = shallow(
      <TaxDetails agency={mockAgency} editContact={x => x} />
    );
    expect(wrapper).toBeTruthy();
  });
});
