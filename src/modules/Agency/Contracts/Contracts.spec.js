import React from 'react';
import { shallow } from 'enzyme';
import { Contracts } from './Contracts';
import mockAgency from '../mockAgency';

describe('Testing Contracts component', () => {
  it('should render', () => {
    const props = {
      getAgency: x => x,
      updateAgency() {}
    };
    const wrapper = shallow(<Contracts {...props} agency={mockAgency} />);
    expect(wrapper.exists()).toBeTruthy();
    const wi = wrapper.instance();
    wi.saveContract({});
  });

  it('should toggle', () => {
    const props = {
      getAgency: x => x,
      updateAgency() {}
    };
    const wrapper = shallow(<Contracts {...props} agency={mockAgency} />);
    const instance = wrapper.instance();

    instance.toggleLicense(1);
    expect(instance.state.licenseIndex).toBe(1);

    instance.toggleLicense(null);
    expect(instance.state.licenseIndex).toBe(null);

    instance.toggleContract(1);
    expect(instance.state.contractIndex).toBe(1);

    instance.toggleContract(null);
    expect(instance.state.contractIndex).toBe(null);
  });

  it('mergeData should add', () => {
    const props = {
      getAgency: x => x,
      updateAgency() {}
    };
    const license = {
      licenseNumber: 'test',
      state: 'FL',
      licenseType: 'Resident',
      licenseEffectiveDate: '2018-10-27T00:00:00.000Z'
    };
    const expected = [
      {
        state: 'TX',
        licenseNumber: 'test040b',
        licenseType: 'Non-Resident',
        licenseEffectiveDate: '2018-10-27T00:00:00.000Z'
      },
      {
        licenseNumber: 'test040bz',
        state: 'FL',
        licenseType: 'Resident',
        licenseEffectiveDate: '2018-10-27T00:00:00.000Z'
      },
      {
        licenseNumber: 'test',
        state: 'FL',
        licenseType: 'Resident',
        licenseEffectiveDate: '2018-10-27T00:00:00.000Z'
      }
    ];

    const wrapper = shallow(<Contracts {...props} agency={mockAgency} />);
    const instance = wrapper.instance();

    const result = instance.mergeData(license, mockAgency.licenses, null);

    expect(result).toEqual(expected);
  });

  it('mergeData should update', () => {
    const props = {
      getAgency: x => x,
      updateAgency() {}
    };
    const license = {
      licenseNumber: 'test',
      state: 'FL',
      licenseType: 'Resident',
      licenseEffectiveDate: '2018-10-27T00:00:00.000Z'
    };
    const expected = [
      {
        licenseNumber: 'test',
        state: 'FL',
        licenseType: 'Resident',
        licenseEffectiveDate: '2018-10-27T00:00:00.000Z'
      },
      {
        licenseNumber: 'test040bz',
        state: 'FL',
        licenseType: 'Resident',
        licenseEffectiveDate: '2018-10-27T00:00:00.000Z'
      }
    ];

    const wrapper = shallow(<Contracts {...props} agency={mockAgency} />);
    const instance = wrapper.instance();

    const result = instance.mergeData(license, mockAgency.licenses, 0);

    expect(result).toEqual(expected);
  });
});
