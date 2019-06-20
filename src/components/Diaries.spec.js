import React from 'react';
import { shallow } from 'enzyme';

import Diaries from './Diaries';

describe('Test the Diaries Component', () => {
  it('Should Render Diaries', () => {
    const wrapper = shallow(
      <Diaries
        handleSubmit={x => x}
        openHandler={x => x}
        onToggleDiary={x => x}
        diaryLevel="dueSoon"
        diaries={[
          {
            diaryId: '1',
            dueDate: '2018-08-24',
            type: 'Billing /Payment',
            reason: 'Receipt Needed',
            assignee: 'jsutphin',
            message: ''
          }
        ]}
      />
    );
    expect(wrapper.exists()).toBeTruthy();
  });
});
