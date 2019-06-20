import React from 'react';
import { shallow } from 'enzyme';
import UserSearch from './UserSearch';

describe('Test UserSearch component', () => {
  it('renders without being passed props', () => {
    const wrapper = shallow(<UserSearch />);
    expect(wrapper);
  });

  it("has a disabled submit button when passed 'submitting' prop", () => {
    const wrapper = shallow(<UserSearch submitting={true} />);
    expect(wrapper.find('button').prop('disabled')).toBeTruthy();
  });
});
