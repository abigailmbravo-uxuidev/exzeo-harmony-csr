import React from 'react';
import { mount } from 'enzyme';

import { DiaryPolling } from './DiaryPolling';

describe('Test the DiaryPolling Component', () => {
  it('Should Render', () => {
    const props = {
      fetchDiaries: x => x,
      filter: { userId: '123', resourceType: 'test', resourceId: '321' }
    };
    const wrapper = mount(<DiaryPolling {...props} />);

    expect(wrapper.exists()).toBeTruthy();

    wrapper.unmount();
  });
});
