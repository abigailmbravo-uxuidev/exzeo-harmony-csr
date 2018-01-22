import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Downloader from './Downloader';

const props = {
  fileName: 'testfile', 
  fileUrl: 'http://test/test.pdf',
  fileType: 'other'
}

describe('Testing Downloader component', () => {
  it('should test downloader', () => {
    const wrapper = shallow(<Downloader {...props} />);
    expect(wrapper.props().children).toEqual([ 'testfile', ' - ', 'other' ]);
  });
});