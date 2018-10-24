import React from 'react';
import { shallow } from 'enzyme/build';

import DetailMain from './DetailMain';

describe('Test DetailMain component', () => {
  const props = {
    className: 'test',
    dataTest: 'test',
    data: {
      one: 'First thing',
      two: 'Second thing',
      three: 'Third thing'
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
});

