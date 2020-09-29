import React from 'react';
import { fireEvent, within } from '@testing-library/react';

import {
  render,
  defaultQuoteWorkflowProps,
  rating,
  clearText,
  checkError,
  mockServiceRunner
} from '../../../test-utils';
import { QuoteWorkflow } from '../QuoteWorkflow';

const pageHeaders = [
  { text: 'Quote Details' },
  { text: 'Coverage / Rating' },
  { text: 'Primary Policyholder' },
  { text: 'Mailing Address' },
  { text: 'Additional Interests' }
];

const fields = [
  { dataTest: 'name', label: 'Email To Name', value: 'Robert Pollard' },
  { dataTest: 'email', label: 'Email Address', value: 'fake@aol.com' }
];

const agencyResult = [
  {
    agentCode: 60000,
    firstName: 'WALLY',
    lastName: 'WAGONER'
  }
];

mockServiceRunner(agencyResult);

describe('Summary testing with finished Quote', () => {
  const props = {
    ...defaultQuoteWorkflowProps,
    quote: {
      ...defaultQuoteWorkflowProps.quote,
      agencyCode: '',
      quoteInputState: 'Qualified',
      rating
    },
    location: { pathname: '/quote/12-345-67/summary' }
  };

  it('POS:Checks Headers', () => {
    render(<QuoteWorkflow {...props} />);

    const { getByText: getByTextInsideForm } = within(
      document.getElementById('QuoteWorkflowCSR')
    );

    pageHeaders.forEach(header => expect(getByTextInsideForm(header.text)));
  });

  it('Displays quote details', () => {
    render(<QuoteWorkflow {...props} />);

    const { getByText: getByTextInsideForm } = within(
      document.getElementById('QuoteWorkflowCSR')
    );

    expect(getByTextInsideForm('Quote Number'));
    expect(getByTextInsideForm('12-345-67'));
    expect(getByTextInsideForm('Property Address'));
    expect(getByTextInsideForm('4131 TEST ADDRESS'));
    expect(getByTextInsideForm('Year Built'));
    expect(getByTextInsideForm('1958'));
    expect(getByTextInsideForm('Effective Date'));
    expect(getByTextInsideForm('05/23/2019'));
    expect(getByTextInsideForm('Agent'));
  });

  it('POS:Coverage Rating', () => {
    const { getByText, getByTestId } = render(<QuoteWorkflow {...props} />);

    expect(getByText('Yearly Premium'));
    expect(getByTestId('Yearly Premium').nextSibling.textContent).toBe(
      '$9,876'
    );
    expect(getByText('A. Dwelling'));
    expect(getByText('$100'));
    expect(getByText('B. Other Structures'));
    expect(getByText('$50'));
    expect(getByText('C. Personal Property'));
    expect(getByText('$999'));
    expect(getByText('D. Loss Of Use'));
    expect(getByText('$666'));
    expect(getByText('E. Personal Liability'));
    expect(getByText('$55'));
    expect(getByText('F. Medical Payments'));
    expect(getByText('$88'));
    expect(getByText('Personal Property Replacement Cost'));
    expect(getByText('Yes'));
    expect(getByText('Mold Property'));
    expect(getByText('$44'));
    expect(getByText('Mold Liability'));
    expect(getByText('$23'));
    expect(getByText('Ordinance or Law'));
    expect(getByText('29%'));
    expect(getByText('All Other Perils Deductible'));
    expect(getByText('$22'));
    expect(getByText('Hurricane Deductible'));
    expect(getByText('11%'));
    expect(getByText('Calculated Hurricane Deductible'));
    expect(getByText('$12,345'));
    expect(getByText('Sinkhole Deductible'));
    expect(getByText('32%'));
    expect(getByText('Calculated Sinkhole Deductible'));
    expect(getByText('$2,468'));
  });

  it('POS:Primary Policyholder Testing', () => {
    const { getByText } = render(<QuoteWorkflow {...props} />);
    const quoteWorkflow = document.querySelector('form#QuoteWorkflowCSR');
    expect(within(quoteWorkflow).getByText('Policyholder Name'));
    expect(within(quoteWorkflow).getByText('Robert Pollard'));
    expect(within(quoteWorkflow).getByText('Phone Number'));
    expect(within(quoteWorkflow).getByText('(123) 123-1231'));
    expect(within(quoteWorkflow).getByText('Email'));
    expect(within(quoteWorkflow).getByText('AlienLanes@gbv.com'));
    expect(within(quoteWorkflow).getByText('Electronic Delivery'));
    expect(within(quoteWorkflow).getByText('No'));
  });

  it('POS:Mailing Address', () => {
    const { getByText, getByTestId } = render(<QuoteWorkflow {...props} />);
    const quoteWorkflow = document.querySelector('form#QuoteWorkflowCSR');

    expect(getByText('Address'));
    expect(getByTestId('Address').nextSibling.textContent).toBe(
      '6666 mailing address'
    );
    expect(getByText('City/State/Zip'));
    expect(getByTestId('City/State/Zip').nextSibling.textContent).toBe(
      'TAMPA, FL 98765'
    );
    expect(getByText('Country'));
    expect(getByText('test country'));
  });

  it('POS:Share Fields', () => {
    const { getByTestId } = render(<QuoteWorkflow {...props} />);

    fields.forEach(field => {
      const fieldInput = getByTestId(field.dataTest);
      clearText(getByTestId, field);
      fireEvent.blur(fieldInput);
      checkError(getByTestId, field);
    });
  });
});

describe('Summary Testing with Default Quote', () => {
  const props = {
    ...defaultQuoteWorkflowProps,
    quote: {
      ...defaultQuoteWorkflowProps.quote,
      rating
    },
    location: { pathname: '/quote/12-345-67/summary' }
  };

  it('POS:Underwriting Violation Error with initial quote data', () => {
    const { getByText } = render(<QuoteWorkflow {...props} />);

    expect(
      getByText('Quote Summary cannot be sent due to Underwriting Validations')
    );
  });

  it('POS:Underwriting Violations Error Message in Underwriting State', () => {
    const newProps = {
      ...props,
      quote: {
        ...props.quote,
        quoteInputState: 'Underwriting'
      }
    };
    const { getByText } = render(<QuoteWorkflow {...newProps} />);

    expect(
      getByText('Quote Summary cannot be sent due to Underwriting Validations')
    );
  });

  it('POS:Underwriting Violations Error Message in Qualified State w/ UW Error', () => {
    const newProps = {
      ...props,
      quote: {
        ...props.quote,
        quoteInputState: 'Qualified',
        blockQuoteSummary: true
      }
    };
    const { getByText } = render(<QuoteWorkflow {...newProps} />);

    expect(
      getByText('Quote Summary cannot be sent due to Underwriting Validations')
    );
  });

  it('NEG:No Error Message with Qualified State and no UW Errors', () => {
    const newProps = {
      ...props,
      quote: {
        ...props.quote,
        quoteInputState: 'Qualified'
      }
    };
    const { queryByText } = render(<QuoteWorkflow {...newProps} />);

    expect(
      queryByText(
        'Quote Summary cannot be sent due to Underwriting Validations'
      )
    ).toBeNull();
  });

  it('POS:Underwriting Violations Error Message in Ready State w/ UW Error', () => {
    const newProps = {
      ...props,
      quote: {
        ...props.quote,
        quoteInputState: 'Ready',
        blockQuoteSummary: true
      }
    };
    const { getByText } = render(<QuoteWorkflow {...newProps} />);

    expect(
      getByText('Quote Summary cannot be sent due to Underwriting Validations')
    );
  });

  it('NEG:No Error Message with Ready State and no UW Errors', () => {
    const newProps = {
      ...props,
      quote: {
        ...props.quote,
        quoteInputState: 'Ready'
      }
    };

    const { queryByText } = render(<QuoteWorkflow {...newProps} />);

    expect(
      queryByText(
        'Quote Summary cannot be sent due to Underwriting Validations'
      )
    ).toBeNull();
  });
});
