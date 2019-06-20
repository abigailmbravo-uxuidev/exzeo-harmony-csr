import React from 'react';
import { mount } from 'enzyme';

import ShortenText from './ShortenText';

describe('Test the ShortenText Component', () => {
  it('Should Render ShortenText', () => {
    const wrapper = mount(<ShortenText text="test" />);
    expect(wrapper.exists()).toBeTruthy();
  });

  it('Should not shorten text', () => {
    const testText = 'test';
    const wrapper = mount(<ShortenText text={testText} />);
    expect(wrapper.text()).toBe(testText);
  });

  it('Should shorten text and add Ellipsis', () => {
    const testText =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ut eros eu justo sodales dignissim. Donec amet.';
    const wrapper = mount(<ShortenText text={testText} />);
    expect(wrapper.text().length).toBeLessThan(testText.length);
    expect(wrapper.text()).toContain('\u2026');
  });
});
