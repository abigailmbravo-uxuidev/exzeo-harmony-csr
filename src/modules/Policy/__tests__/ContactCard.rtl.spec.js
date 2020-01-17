import React from 'react';
import { render, debug } from 'react-testing-library';

import ContactCard from '../ContactCard';

describe('ContactCard testing', () => {
  it('Test Territory Manager', async () => {
    const props = {
      name: 'Stephen Dedalus',
      phoneNumber: '1231231234',
      phoneNumberExtension: '123',
      emailAddress: 'stephen@dedalus.com',
      handleClick: jest.fn(),
      policyHolders: {
        firstName: 'Molly',
        lastName: 'Bloom'
      },
      icon: 'fa-globe'
    };

    const { getByText } = render(<ContactCard {...props} />);

    expect(getByText('Territory Manager'));
    expect(getByText(props.name));
    expect(getByText('(123) 123-1234').closest('a')).toHaveAttribute(
      'href',
      'tel:1231231234'
    );
    expect(getByText(props.emailAddress).closest('a')).toHaveAttribute(
      'href',
      'mailto:stephen@dedalus.com?subject=undefined%20Molly%20Bloom'
    );
  });
});
