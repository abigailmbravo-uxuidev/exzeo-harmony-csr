import React from 'react';
import { shallow } from 'enzyme/build';

import { DiaryModal } from './DiaryModal';

describe('Test DiaryModal component', () => {
  const props = {
    effectiveDate: '2018-01-01',
    change() {},
    assigneeAnswers: [{ answer: '1', label: '1', type: 'user' },
      { answer: '2', label: 'Underwriting', type: 'estate' }],
    submitting: false,
    user: { profile: { given_name: 'test', family_name: 'testing' } },
    handleSubmit: x => x,
    setAppErrorAction: x => x,
    toggleDiaryAction: x => x,
    submitDiaryAction: x => x
  };
  it('renders without crashing', () => {
    const wrapper = shallow(<DiaryModal {...props} />);
    expect(wrapper.exists())
      .toBeTruthy();

    wrapper.instance().componentDidMount();
    wrapper.instance().handleMinimize();
    wrapper.instance().handleClose();
    wrapper.instance().submitDiary({ assignee: { id: '1' }, foo: '1', bar: '2' }, x => x, props);
  });

  it('warns if no user profile is present', () => {
    const wrapper = shallow(<DiaryModal {...props} user={{ test: '1' }} />);
    expect(wrapper.exists())
      .toBeTruthy();

    wrapper.instance().componentDidMount();

    expect(wrapper.instance().normalizeDiaryReason('none')).toEqual('none');
    expect(wrapper.instance().normalizeDiaryReason('additional_interest')).toEqual('additional_interest');
    expect(wrapper.instance().normalizeDiaryReason('estate')).toEqual('estate');
  });
});

