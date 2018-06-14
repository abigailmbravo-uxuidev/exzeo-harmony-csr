import React from 'react';
import { shallow } from 'enzyme';
import { EditContact } from './EditContact';
import mockAgency from '../mockAgency';

describe('Testing ContactCard component', () => {
  it('should render', () => {
    const wrapper = shallow(<EditContact agency={mockAgency} editType="CSR" handleSubmit={x => x} toggleModal={x => x} />);
    expect(wrapper).toBeTruthy;
  });
});
