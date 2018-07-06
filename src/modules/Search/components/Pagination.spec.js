import React from 'react';
import { shallow } from 'enzyme';
import Pagination from './Pagination';

it('renders without crashing', () => {
  const wrapper = shallow(<Pagination changePageBack={() => {}} changePageForward={() => {}} fieldValues={{ pageNumber: '1' }} />);
  expect(wrapper.props().children[0].type).toEqual('button');
  expect(wrapper.props().children[1].type).toEqual('div');
  expect(wrapper.props().children[2].type).toEqual('button');
});
