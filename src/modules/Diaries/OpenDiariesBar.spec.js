import React from 'react';
import { shallow } from 'enzyme';
import { OpenDiariesBar } from './OpenDiariesBar';


describe('Test the OpenDiariesBar Component', () => {
  it('Should Render OpenDiariesBar', () => {
    const wrapper = shallow(<OpenDiariesBar handleSubmit={x => x} openHandler={x => x} />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
