import React from '../../../../../../Library/Caches/typescript/2.9/node_modules/@types/react';
import { shallow } from '../../../../../../Library/Caches/typescript/2.9/node_modules/@types/enzyme';
import { Contact } from './Contact.old';
import mockAgency from '../mockAgency';

describe('Testing Contact component', () => {
  it('should render', () => {
    const wrapper = shallow(<Contact agency={mockAgency} />);
    expect(wrapper).toBeTruthy;
  });
});
