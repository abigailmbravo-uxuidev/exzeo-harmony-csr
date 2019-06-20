import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Auth from '../Auth';

import { Authentication } from './Authentication';

describe('Test the Authentication Component', () => {
  localStorage.setItem(
    'id_token',
    'eyJhbGciOiJSUzI1NiIsImtpZCI6IjEzMjQ1Njc5IiwidHlwIjoiSldUIn0.eyJodHRwczovL2hlaW1kYWxsLnNlY3VyaXR5L2hlaW1kYWxsX2FkbWluaXN0cmF0aW9uIjpmYWxzZSwiaHR0cHM6Ly9oZWltZGFsbC5zZWN1cml0eS9ncm91cHMiOlt7Il9pZCI6IjEyMzQ1Njc4OSIsIm5hbWUiOiJUVElDQ1NSIiwiYWdlbmN5Q29kZSI6bnVsbCwiY29tcGFueUNvZGUiOiJUVElDIiwic3RhdGUiOiJGTCIsImlzQ1NSIjp0cnVlLCJpc0FnZW5jeSI6ZmFsc2UsImV4dGVuZGVkUHJvcGVydGllcyI6eyJoYXJtb255R3JvdXAiOnRydWUsImNvbXBhbnlDb2RlIjoiVFRJQyIsInN0YXRlIjoiRkwiLCJhZ2VuY3lDb2RlIjoiIiwiYWdlbmN5SWQiOiIiLCJpc0NTUiI6dHJ1ZSwiaXNBZ2VuY3kiOmZhbHNlfSwiX192IjowLCJyb2xlcyI6W10sImNoaWxkR3JvdXBzIjpbXX1dLCJodHRwczovL2hlaW1kYWxsLnNlY3VyaXR5L3JvbGVzIjpbXSwiaHR0cHM6Ly9oZWltZGFsbC5zZWN1cml0eS91c2VybmFtZSI6IlRFU1RVU0VSIiwiaHR0cHM6Ly9oZWltZGFsbC5zZWN1cml0eS9naXZlbl9uYW1lIjoiVEVTVCIsImh0dHBzOi8vaGVpbWRhbGwuc2VjdXJpdHkvZmFtaWx5X25hbWUiOiJVU0VSIiwiZW1haWwiOiJURVNUVVNFUkB0eXB0YXAuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5pY2tuYW1lIjoiVEVTVFVTRVIiLCJuYW1lIjoiVEVTVFVTRVJAdHlwdGFwLmNvbSIsInBpY3R1cmUiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci83MzVkYWZlMmEyODcyOGM1ZThjZDA4MmE3OTEwMzNiZD9zPTQ4MCZyPXBnJmQ9aHR0cHMlM0ElMkYlMkZjZG4uYXV0aDAuY29tJTJGYXZhdGFycyUyRmJiLnBuZyIsInVwZGF0ZWRfYXQiOiIyMDE3LTEwLTA2VDEzOjU5OjU1LjI1NloiLCJzdWIiOiJhdXRoMHxDU1IxMjM0NTY3ODkwIiwiaXNzIjoiaHR0cHM6Ly9tb2NrLWF1dGgwOjg4ODgvIiwiYXVkIjoiaHR0cHM6Ly9tb2NrLWF1dGgwOjg4ODgiLCJub25jZSI6IjRVdFBTTkRtTGJFNVhJOUZYUDFuYXk2di5yMWY3enNPIiwianRpIjoiNzVjMWM0MTgxZGE1Y2UyZjM5MjcwZjViNTUwNDQzZTgiLCJpYXQiOjE1NDAyMjQ2MzYsIm5iZiI6MTQ4MzIyODgwMCwiZXhwIjoxNTc3ODM2ODAwfQ.PxqoWs5RYw2xuL8t7vL2s9odlqAPKYMX3iF0aEaBg-TW5t5ZEwSiLPWJvYyjdtT2wGOjWrhbJfzTO4n16PPkLqZjGC5W2JH5NWWDwWcZVugH6z930Lfaj4cSshLqs8IgrVjaP8MOWLLjTAsVNWa_ShSaZl2lFWGhXfKmEeqovCCU639K8b1hq_DDIJVGcW8YZBWxDhipOlutPGgX2rmTNE4JAJBus4E8YLJyBRAkM0G_iCDZU1C-aOcX4dW60Iw6Qo0eRtVgX_bBkaEBQvd_Ldp3sVSOTJtNOPRSZXfCilCmfs7GINL9jjc59dOMp7FzHwNjyfcoJObmdWHoHDr0qg'
  );

  it('Should Render', () => {
    const config = {
      profileLocation: 'test1',
      tokenLocation: 'test2',
      unauthRedirect: '/test3',
      publicPaths: ['/test', '/tests']
    };
    const props = {
      config,
      setAppErrorAction: x => x,
      setUserProfileAction: x => x,
      userProfile: { userName: 'testing' },
      render: x => x
    };
    const wrapper = shallow(<Authentication {...props} />);

    expect(wrapper.exists()).toBeTruthy();
    wrapper.instance().componentWillMount();
  });
});
