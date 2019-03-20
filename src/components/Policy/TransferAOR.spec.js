import React from 'react';
import { shallow } from 'enzyme';
import { TransferAOR } from './TransferAOR';

describe('Testing TransferAOR component', () => {
  const props = {
    companyCode: 'test',
    state: 'FL',
    agencyCode: 1234, 
    agentCode: 4567,
    toggleModal: jest.fn(),
    handleSubmit: jest.fn(),
    getAgencies: jest.fn(), 
    getAgentsForAORTransfer: jest.fn()
  };

  it('renders without crashing', () => {
    const wrapper = shallow(<TransferAOR {...props} />);
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find('Field')).toHaveLength(2);
    expect(wrapper.find('button')).toHaveLength(2);
  });

  it('component mounts', () => {
    const instance = shallow(<TransferAOR {...props} />).instance();

    expect(instance.props.getAgencies).toHaveBeenCalled();
    expect(instance.props.getAgentsForAORTransfer).toHaveBeenCalled();
  });
});
