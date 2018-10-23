import React from 'react';
import { shallow } from 'enzyme';

import { AppWrapper } from './AppWrapper';


describe('Test the AppWrapper Component', () => {
  it('Should Render', () => {
    const props = {
      pageTitle: 'Test',
      match: { path: '/quote' },
      showDiaries: false,
      openDiaryCount: 2,
      onToggleDiaries: x => x,
      render: x => x
    };
    const wrapper = shallow(<AppWrapper {...props} />);

    expect(wrapper.exists()).toBeTruthy();
  });
});
