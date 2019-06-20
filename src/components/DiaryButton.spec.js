import React from 'react';
import { shallow } from 'enzyme';
import DiaryButton from './DiaryButton';

describe('Test the DiaryButton Component', () => {
  it('Should Render DiaryButton', () => {
    const wrapper = shallow(
      <DiaryButton toggleDiaries={fn => fn} showDiaries />
    );
    expect(wrapper.exists()).toBeTruthy();
  });

  it('Should Render DiaryButton showDiaries is false', () => {
    const wrapper = shallow(
      <DiaryButton toggleDiaries={fn => fn} showDiaries={false} />
    );
    expect(wrapper.exists()).toBeTruthy();
  });
});
