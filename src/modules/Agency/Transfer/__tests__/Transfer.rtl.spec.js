import React from 'react';
import {
  within,
  fireEvent,
  waitForElement,
  wait,
  getByText as getByTextDocument,
  queryByText as queryByTextDocument
} from '@testing-library/react';
import {
  renderWithReduxAndRouter,
  mockServiceRunner,
  jestResolve,
  mockAgency,
  mockAgents,
  mockPolicy,
  searchAgenciesResult,
  searchAgentsResult
} from '../../../../test-utils';

import Transfer from '../index';

import * as agencyData from '../../../../state/actions/agency.actions';

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
  it('POS:Should Filter By Policy Number', async () => {
    const props = {
      ...defaultProps
    };
    const { getByTestId, getByText } = renderWithReduxAndRouter(
      <Transfer {...props} />,
      {
        state
      }
    );

    await waitForElement(() => getByTestId('policyNumber'));

    fireEvent.change(getByTestId('policyNumber'), {
      target: { value: mockPolicy.policyNumber }
    });

    await waitForElement(() =>
      expect(getByTestId(`${mockPolicy.policyNumber}_filtered`))
    );
  });

  it('POS:Should Filter By Product', async () => {
    const props = {
      ...defaultProps
    };
    const { getByTestId } = renderWithReduxAndRouter(<Transfer {...props} />, {
      state
    });

    const product = getByTestId('product_wrapper');

    fireEvent.change(product.querySelector('input:not([type="hidden"])'), {
      target: { value: mockPolicy.product }
    });

    await wait(() => {
      expect(product.querySelector('input:not([type="hidden"])').value).toEqual(
        mockPolicy.product
      );
      expect(getByTestId(`${mockPolicy.policyNumber}_filtered`));
    });
  });

  it('POS:Should Filter By Agent', async () => {
    const props = {
      ...defaultProps
    };
    const { getByTestId } = renderWithReduxAndRouter(<Transfer {...props} />, {
      state
    });

    const product = getByTestId('agentCode_wrapper');

    fireEvent.change(product.querySelector('input:not([type="hidden"])'), {
      target: { value: mockPolicy.agentCode }
    });

    await wait(() => {
      expect(product.querySelector('input:not([type="hidden"])').value).toEqual(
        String(mockPolicy.agentCode)
      );
      expect(getByTestId(`${mockPolicy.policyNumber}_filtered`));
    });
  });

  it('POS:Should Open And Close Transfer Policy Modal', async () => {
    const props = {
      ...defaultProps
    };
    const { getByTestId } = renderWithReduxAndRouter(<Transfer {...props} />, {
      state
    });

    await wait(() => {
      expect(getByTestId('stage-transfer')).toBeDisabled();
    });

    fireEvent.click(getByTestId(`${mockPolicy.policyNumber}_filtered`));

    await waitForElement(() =>
      getByTestId(`${mockPolicy.policyNumber}_filtered`)
    );

    await wait(() => {
      expect(getByTestId('stage-transfer')).not.toBeDisabled();
    });

    fireEvent.click(getByTestId('stage-transfer'));

    await wait(() => {
      expect(getByTextDocument(document, 'Agent Receiving Selected Policy'));
    });

    fireEvent.click(getByTestId('cancel'));

    await wait(() => {
      expect(
        queryByTextDocument(document, 'Agent Receiving Selected Policy')
      ).toEqual(null);
    });
  });

  it('POS:Should Submit Transfer Policy ', async () => {
    agencyData.fetchAgenciesByAgencyCodeOrName = jestResolve(
      searchAgenciesResult
    );
    agencyData.fetchAgentsByAgencyCode = jestResolve(searchAgentsResult);
    const props = {
      ...defaultProps
    };
    const { getByTestId, getByText } = renderWithReduxAndRouter(
      <Transfer {...props} />,
      {
        state
      }
    );

    await wait(() => {
      expect(getByTestId('stage-transfer')).toBeDisabled();
    });

    fireEvent.click(getByTestId(`${mockPolicy.policyNumber}_filtered`));

    await waitForElement(() =>
      getByTestId(`${mockPolicy.policyNumber}_filtered`)
    );

    await wait(() => {
      expect(getByTestId('stage-transfer')).not.toBeDisabled();
    });

    fireEvent.click(getByTestId('stage-transfer'));

    await wait(() => {
      expect(getByTextDocument(document, 'Agent Receiving Selected Policy'));
    });

    const agencyCodeTo = getByTestId('agencyCodeTo_wrapper');
    const agentCodeTo = getByTestId('agentCodeTo_wrapper');

    fireEvent.change(agencyCodeTo.querySelector('input:not([type="hidden"])'), {
      target: { value: '20000' }
    });

    await wait(() =>
      expect(
        agencyCodeTo.querySelector('input:not([type="hidden"])').value
      ).toEqual('20000')
    );

    fireEvent.change(agentCodeTo.querySelector('input:not([type="hidden"])'), {
      target: { value: '60000' }
    });

    await wait(() =>
      expect(
        agentCodeTo.querySelector('input:not([type="hidden"])').value
      ).toEqual('60000')
    );

    expect(fireEvent.click(getByTestId('submit')));
  });
});
