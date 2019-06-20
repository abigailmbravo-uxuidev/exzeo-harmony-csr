import React from 'react';
import { shallow } from 'enzyme';
import AdditionalInterestCard from './AdditionalInterestCard';

describe('Test the Payments Component', () => {
  it('Should Render active mortgagee', () => {
    const wrapper = shallow(
      <AdditionalInterestCard
        editAI={function() {}}
        toggleAIState={function() {}}
        ai={{
          _id: '332424',
          type: 'Mortgagee',
          active: true,
          mailingAddress: {}
        }}
      />
    );
    expect(wrapper.exists()).toBeTruthy();
  });

  it('Should Render inactive mortgagee', () => {
    const wrapper = shallow(
      <AdditionalInterestCard
        editAI={function() {}}
        toggleAIState={function() {}}
        ai={{
          _id: '332424',
          type: 'Mortgagee',
          active: false,
          mailingAddress: {}
        }}
      />
    );
    expect(wrapper.exists()).toBeTruthy();
  });
});
