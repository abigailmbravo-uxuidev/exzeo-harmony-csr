import React from 'react';
import { mount } from 'enzyme';

import DiaryList from './DiaryList';

describe('Test the DiaryList Component', () => {
  const DIARIES = [
    {
      resource: { type: 'Policy', id: '12-1010363-01' },
      _id: '5bb4cc11e40767002bf63345',
      entries: [
        {
          open: true,
          due: '2018-10-10T00:00:00.000Z',
          type: 'additional_interest',
          reason: 'needs_security',
          message: 'fddf',
          assignee: { id: '2', displayName: 'Jordan Rhodes', type: 'user' },
          createdBy: {
            userId: 'auth0|59419e3a43e76f16f68c3349',
            userName: 'tticcsr'
          },
          createdAt: '2018-10-03T14:02:57.743Z',
          updatedAt: '2018-10-03T14:02:57.743Z'
        }
      ],
      createdAt: '2018-10-03T14:02:57.743Z',
      updatedAt: '2018-10-03T14:02:57.743Z',
      __v: 0
    }
  ];
  it('Should Render', () => {
    const wrapper = mount(<DiaryList diaries={DIARIES} dataTest="diaries" />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
