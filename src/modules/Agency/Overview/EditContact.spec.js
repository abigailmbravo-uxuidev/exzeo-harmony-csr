import React from 'react';
import { shallow } from 'enzyme';
import { EditContact, saveAgency } from './EditContact';
import mockAgency from '../mockAgency';

describe('Testing ContactCard component', () => {
  it('should render', () => {
    const props = {
      updateAgency() {}, agency: mockAgency, editType: 'CSR', handleSubmit() {}, toggleModal: () => x => x
    };
    const wrapper = shallow(<EditContact {...props} />);
    expect(wrapper).toBeTruthy;
    saveAgency({}, x => x, props);
  });
});
