import React from 'react';
import { shallow } from 'enzyme';
import { DiaryModal } from './DiaryModal';

describe('Test the DiaryModal Component', () => {
  it('Should Render DiaryModal', () => {
    const wrapper = shallow(<DiaryModal handleSubmit={x => x} closeHandler={x => x} />);
    expect(wrapper.exists()).toBeTruthy();
    const inst = wrapper.instance();
    inst.minimzeButtonHandler();
    inst.submitDiary();
    inst.closeDiary();
  });
});
