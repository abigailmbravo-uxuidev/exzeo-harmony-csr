import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Auth from '../Auth';

import { Authentication } from './Authentication';


describe('Test the Authentication Component', () => {
  it('Should Render', () => {
    const config = {
      profileLocation: 'test1',
      tokenLocation: 'test2',
      unauthRedirect: '/test3',
      publicPaths: ['/test', '/tests']
    }
    const props = {
      config,
      setAppErrorAction: x => x,
      setUserProfileAction: x => x,
      userProfile: { userName: 'testing' },
      render: x => x
    };
    const wrapper = shallow(<Authentication {...props} />);

    expect(wrapper.exists()).toBeTruthy();
    wrapper.instance().componentDidMount();
  });
});
