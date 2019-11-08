import React from 'react';
import { shallow } from 'enzyme/build';

import { DiaryModal } from './DiaryModal';

describe('Test DiaryModal component', () => {
  const props = {
    diaryOptions: {
      reasons: [],
      tags: []
    },
    entityEndDate: '2018-01-01',
    assigneeAnswers: [
      { answer: '1', label: '1', type: 'user' },
      { answer: '2', label: 'Underwriting', type: 'estate' }
    ],
    submitting: false,
    user: { profile: { given_name: 'test', family_name: 'testing' } },
    handleSubmit: x => x,
    setAppError: x => x,
    toggleDiary: x => x,
    submitDiary: x => x,
    toggleMinimizeDiary: x => x
  };
  it('renders without crashing', () => {
    const wrapper = shallow(<DiaryModal {...props} />);
    expect(wrapper.exists()).toBeTruthy();

    wrapper.instance().handleMinimize();
    wrapper.instance().handleClose();
    wrapper
      .instance()
      .submitDiary(
        { assignee: { id: '1' }, foo: '1', bar: '2' },
        x => x,
        props
      );
  });
});
