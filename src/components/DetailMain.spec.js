import React from 'react';
import { mount, shallow } from 'enzyme/build';

import DetailMain from './DetailMain';

describe('Test DetailMain component', () => {
  const props = {
    context: 'policy',
    className: 'test',
    dataTest: 'test',
    data: {
      policyNumber: 'test',
      sourceNumber: 'test', 
      status: 'In Force',
      details: {
        one: 'First thing',
        two: 'Second thing',
        three: 'Third thing'
      }
    }
  };
  it('renders without crashing', () => {
    const wrapper = shallow(<DetailMain {...props} />);
    expect(wrapper.exists())
      .toBeTruthy();
  });

  it('maps through data and renders values', () => {
    const wrapper = shallow(<DetailMain {...props} />);
    expect(wrapper.find('dd').length).toEqual(3);
  });

  it('contains a DetailDescription', () => {
    const wrapper = mount(<DetailMain {...props} />);
    expect(wrapper.find('DetailDescription').length).toEqual(1);
  });
});

