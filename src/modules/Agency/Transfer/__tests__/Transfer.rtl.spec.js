import React from 'react';
import { within, fireEvent, waitForElement } from '@testing-library/react';
import {
  renderWithReduxAndRouter,
  mockServiceRunner,
  mockAgency,
  mockAgents,
  mockPolicy
} from '../../../../test-utils';

import Transfer from '../index';

mockServiceRunner([]);

describe('Testing the Transfer Page', () => {
  const defaultProps = {
    agencyCode: mockAgency.agencyCode,
    match: {
      url: ''
    }
  };

  const state = {
    agencyState: {
      agency: mockAgency,
      agents: mockAgents
    },
    policyState: {
      agencyPolicies: [mockPolicy]
    },
    questions: {
      lists: {
        US_states: [
          {
            isActive: true,
            type: 'string',
            displayText: 'Florida',
            key: 'FL'
          },
          {
            isActive: true,
            type: 'string',
            displayText: 'Georgia',
            key: 'GA'
          }
        ],
        Products: [
          {
            displayText: 'AF3',
            type: 'string',
            isActive: true,
            key: 'AF3'
          },
          {
            displayText: 'HO3',
            type: 'string',
            isActive: true,
            key: 'HO3'
          }
        ]
      }
    }
  };

  it('POS:Check Correct Labels for Transfer', () => {
    const props = {
      ...defaultProps
    };
    const { getByText } = renderWithReduxAndRouter(<Transfer {...props} />, {
      state
    });

    //Transfer Filter
    expect(getByText('Filter By Policy Number'));
    expect(getByText('Filter By State'));
    expect(getByText('Filter By Product'));
    expect(getByText('Filter By Agent'));
    expect(getByText('Clear Filters'));

    //Actions
    expect(getByText('Clear Selections'));
    expect(getByText('Stage Selected For Transfer'));
  });

  it('POS:Check List of Policies for Transfer and toggle policy', async () => {
    const props = {
      ...defaultProps
    };
    const { getByTestId } = renderWithReduxAndRouter(<Transfer {...props} />, {
      state
    });

    const headerRow = getByTestId('list_item_header');

    const { getByText: getByTextWithinHeader } = within(headerRow);
    expect(getByTextWithinHeader('Policy Number'));
    expect(getByTextWithinHeader('Company'));
    expect(getByTextWithinHeader('State'));
    expect(getByTextWithinHeader('Product'));
    expect(getByTextWithinHeader('Property Address'));
    expect(getByTextWithinHeader('Primary Policyholder'));
    expect(getByTextWithinHeader('Effective Date'));

    const { getByText: getByTextWithinPolicyFiltered } = within(
      getByTestId(`${mockPolicy.policyNumber}_filtered`)
    );

    expect(getByTextWithinPolicyFiltered(mockPolicy.policyNumber));
    expect(getByTextWithinPolicyFiltered(mockPolicy.companyCode));
    expect(getByTextWithinPolicyFiltered(mockPolicy.state));
    expect(getByTextWithinPolicyFiltered(mockPolicy.product));
    expect(getByTextWithinPolicyFiltered(/4131 TEST ADDRESS/));
    expect(getByTextWithinPolicyFiltered(/SARASOTA, FL 00001/));
    expect(getByTextWithinPolicyFiltered('Oberyn Martell'));
    expect(getByTextWithinPolicyFiltered('10/03/2019'));

    fireEvent.click(getByTestId(`${mockPolicy.policyNumber}_filtered`));

    await waitForElement(() =>
      getByTestId(`${mockPolicy.policyNumber}_selected`)
    );
    const { getByText: getByTextWithinPolicySelected } = within(
      getByTestId(`${mockPolicy.policyNumber}_selected`)
    );

    expect(getByTextWithinPolicySelected(mockPolicy.policyNumber));
    expect(getByTextWithinPolicySelected(mockPolicy.companyCode));
    expect(getByTextWithinPolicySelected(mockPolicy.state));
    expect(getByTextWithinPolicySelected(mockPolicy.product));
    expect(getByTextWithinPolicySelected(/4131 TEST ADDRESS/));
    expect(getByTextWithinPolicySelected(/SARASOTA, FL 00001/));
    expect(getByTextWithinPolicySelected('Oberyn Martell'));
    expect(getByTextWithinPolicySelected('10/03/2019'));

    fireEvent.click(getByTestId(`${mockPolicy.policyNumber}_selected`));
    await waitForElement(() =>
      getByTestId(`${mockPolicy.policyNumber}_filtered`)
    );

    expect(getByTextWithinPolicyFiltered(mockPolicy.policyNumber));
    expect(getByTextWithinPolicyFiltered(mockPolicy.companyCode));
    expect(getByTextWithinPolicyFiltered(mockPolicy.state));
    expect(getByTextWithinPolicyFiltered(mockPolicy.product));
    expect(getByTextWithinPolicyFiltered(/4131 TEST ADDRESS/));
    expect(getByTextWithinPolicyFiltered(/SARASOTA, FL 00001/));
    expect(getByTextWithinPolicyFiltered('Oberyn Martell'));
    expect(getByTextWithinPolicyFiltered('10/03/2019'));
  });

  it('POS:Clear Selected Policies with the Clear Selections Button', async () => {
    const props = {
      ...defaultProps
    };
    const { getByTestId, getByText } = renderWithReduxAndRouter(
      <Transfer {...props} />,
      {
        state
      }
    );

    const { getByText: getByTextWithinPolicyFiltered } = within(
      getByTestId(`${mockPolicy.policyNumber}_filtered`)
    );

    expect(getByTextWithinPolicyFiltered(mockPolicy.policyNumber));
    expect(getByTextWithinPolicyFiltered(mockPolicy.companyCode));
    expect(getByTextWithinPolicyFiltered(mockPolicy.state));
    expect(getByTextWithinPolicyFiltered(mockPolicy.product));
    expect(getByTextWithinPolicyFiltered(/4131 TEST ADDRESS/));
    expect(getByTextWithinPolicyFiltered(/SARASOTA, FL 00001/));
    expect(getByTextWithinPolicyFiltered('Oberyn Martell'));
    expect(getByTextWithinPolicyFiltered('10/03/2019'));

    fireEvent.click(getByTestId(`${mockPolicy.policyNumber}_filtered`));

    await waitForElement(() =>
      getByTestId(`${mockPolicy.policyNumber}_selected`)
    );
    const { getByText: getByTextWithinPolicySelected } = within(
      getByTestId(`${mockPolicy.policyNumber}_selected`)
    );

    expect(getByTextWithinPolicySelected(mockPolicy.policyNumber));
    expect(getByTextWithinPolicySelected(mockPolicy.companyCode));
    expect(getByTextWithinPolicySelected(mockPolicy.state));
    expect(getByTextWithinPolicySelected(mockPolicy.product));
    expect(getByTextWithinPolicySelected(/4131 TEST ADDRESS/));
    expect(getByTextWithinPolicySelected(/SARASOTA, FL 00001/));
    expect(getByTextWithinPolicySelected('Oberyn Martell'));
    expect(getByTextWithinPolicySelected('10/03/2019'));

    fireEvent.click(getByText(`Clear Selections`));
    await waitForElement(() =>
      getByTestId(`${mockPolicy.policyNumber}_filtered`)
    );

    expect(getByTextWithinPolicyFiltered(mockPolicy.policyNumber));
    expect(getByTextWithinPolicyFiltered(mockPolicy.companyCode));
    expect(getByTextWithinPolicyFiltered(mockPolicy.state));
    expect(getByTextWithinPolicyFiltered(mockPolicy.product));
    expect(getByTextWithinPolicyFiltered(/4131 TEST ADDRESS/));
    expect(getByTextWithinPolicyFiltered(/SARASOTA, FL 00001/));
    expect(getByTextWithinPolicyFiltered('Oberyn Martell'));
    expect(getByTextWithinPolicyFiltered('10/03/2019'));
  });

  // WIP
  it('POS:Should Filter By Policy Number', async () => {});

  it('POS:Should Filter By Product', async () => {});

  it('POS:Should Filter By Agent', async () => {});

  it('NEG:Should Not Show Filtered Policy For Wrong Policy Number', async () => {});

  it('NEG:Should Not Show Filtered Policy For Wrong Product', async () => {});

  it('NEG:Should Not Show Filtered Policy For Wrong Agent', async () => {});

  it('POS:Should Open And Close Transfer Policy Modal', async () => {});

  it('POS:Should Transfer Policy ', async () => {});
});
