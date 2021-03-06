import React from 'react';
import { fireEvent, waitForElement } from '@testing-library/react';

import {
  render,
  defaultQuoteWorkflowProps,
  underwritingException,
  jestResolve
} from '../../../test-utils';
import { QuoteWorkflow } from '../QuoteWorkflow';

describe('Application Testing', () => {
  const props = {
    ...defaultQuoteWorkflowProps,
    location: { pathname: '/quote/12-345-67/application' },
    match: { params: { step: 'application' } }
  };

  it('POS:Shows error with underwriting exceptions', () => {
    const newProps = {
      ...props,
      quote: {
        ...props.quote,
        quoteInputState: 'Qualified',
        blockSendApplication: true,
        underwritingExceptions: [underwritingException]
      }
    };
    const { getByText } = render(<QuoteWorkflow {...newProps} />);

    expect(
      getByText('Application cannot be sent due to Underwriting Validations.')
    );
  });

  it('POS:Tests button', () => {
    const { getByText } = render(<QuoteWorkflow {...props} />);
    expect(getByText('Send To Docusign').textContent).toMatch(
      /Send To Docusign/
    );
  });

  it('POS:Congratulations Modal Testing', async () => {
    const newProps = {
      ...props,
      verifyQuote: jestResolve({ quoteState: 'Application Ready' }),
      quote: {
        ...props.quote,
        quoteInputState: 'Qualified',
        quoteState: 'Application Ready'
      }
    };
    const { getByText, getByTestId } = render(<QuoteWorkflow {...newProps} />);
    fireEvent.click(getByText('Send To Docusign'));
    await waitForElement(() => getByTestId('modal'));

    expect(getByText('Congratulations'));
    expect(
      getByText(
        'I need to confirm a few more items prior to sending the application'
      )
    );
    expect(
      getByText('Do you have a pool or similar structure on the property?')
    );
    expect(getByText('Is it completely fenced, walled, or screened?'));
    expect(getByText('Are there any slides or diving boards?'));
    expect(getByText('Do you maintain a separate flood policy?'));
    expect(getByText('Home is in flood zone: A'));
    expect(getByText('Does the property have any existing unrepaired damage?'));
    expect(getByText('What is the roof covering on the home?'));
    expect(
      getByText(
        'Asphalt, Fiberglass, Composition/Wood Shake Shingles, Built-up Tar and Gravel'
      )
    );
    expect(getByText('Is the roof over 20 years old?'));
    expect(getByText('Before: 1999'));
    expect(getByText('Tile, Slate, Concrete, or Metal'));
    expect(getByText('Is the roof over 40 years old?'));
    expect(getByText('Before: 1979'));
    expect(getByText('If any adverse information'));
    expect(
      getByText(
        'Your policy request will be referred to Underwriting for review.'
      )
    );
    expect(getByText('Click “CANCEL” below.'));
    expect(getByText('If no adverse information'));
    expect(
      getByText('We will generate the Homeowners Application and e-mail it to:')
    );
    expect(getByText('Robert Pollard (AlienLanes@gbv.com)'));
    expect(getByText('Is this the correct email address?'));
    expect(
      getByText(
        'Once all electronic signatures have been received, the policy will automatically be bound and the policy documents will be emailed to you.'
      )
    );
    expect(
      getByText(
        'PLEASE NOTE: All signatures must be completed within 10 days, or the application will expire.'
      )
    );
    expect(
      getByText(
        'All properties are inspected within 30 days of the effective date. One of our representatives will be in contact with you to schedule it. Please plan to have someone present at the inspection as the inspector will need to enter the home.'
      )
    );
    expect(
      getByText(
        'Click “SEND” below to generate the Homeowners Application. Once you click “SEND” no changes can be made to this quote.'
      )
    );

    expect(getByTestId('modal-cancel'));
    expect(getByTestId('modal-submit'));
  });
});
