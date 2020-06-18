import React from 'react';

import { fireEvent, wait } from '@testing-library/react';

import {
  renderWithForm,
  checkLabel,
  checkSelect,
  checkButton
} from '../../../../test-utils';
import SearchForm from '../../index';

const fields = [
  {
    dataTest: 'searchType',
    type: 'select',
    label: 'Search Context',
    selected: 'agent',
    options: ['Agent Search', 'Agency Search']
  },
  {
    dataTest: 'agentCode',
    type: 'text',
    label: 'Agent ID',
    placeholderText: 'Agent ID Search',
    value: '1234'
  },
  {
    dataTest: 'firstName',
    type: 'text',
    label: 'First Name',
    placeholderText: 'First Name Search',
    value: 'Holly'
  },
  {
    dataTest: 'lastName',
    type: 'text',
    label: 'Last Name',
    placeholderText: 'Last Name Search',
    value: 'Hunter'
  },
  {
    dataTest: 'address',
    type: 'text',
    label: 'Agent Address',
    placeholderText: 'Agent Address Search',
    value: '1234 Mulholland Drive'
  },
  {
    dataTest: 'licenseNumber',
    type: 'text',
    label: 'Lic Number',
    placeholderText: 'Lic No Search',
    value: '123456'
  }
];

describe('Agent Search Testing', () => {
  const props = {
    pathName: '/agency'
  };

  const selectFields = fields.filter(({ type }) => type === 'select');
  const textFields = fields.filter(({ type }) => type === 'text');

  it('POS:Renders and has fields and labels', async () => {
    const { getByPlaceholderText, getByTestId } = renderWithForm(
      <SearchForm {...props} />
    );

    fireEvent.change(getByTestId('searchType'), {
      target: { value: 'agent' }
    });

    await wait(() => {
      expect(getByTestId('searchType').value).toBe('agent');
    });

    fields.forEach(field => checkLabel(getByTestId, field));
    textFields.forEach(({ placeholderText }) =>
      expect(getByPlaceholderText(placeholderText))
    );
    selectFields.forEach(({ dataTest, selected }) =>
      expect(getByTestId(dataTest).getAttribute('data-selected')).toEqual(
        selected
      )
    );
  });

  it('POS:Checks that all fields are working', async () => {
    const { getByPlaceholderText, getByTestId } = renderWithForm(
      <SearchForm {...props} />
    );

    fireEvent.change(getByTestId('searchType'), {
      target: { value: 'agent' }
    });

    await wait(() => {
      expect(getByTestId('searchType').value).toBe('agent');
    });
    selectFields.forEach(field => checkSelect(getByTestId, field));
    textFields.forEach(field =>
      expect(getByPlaceholderText(field.placeholderText))
    );
  });

  it('POS:Agent Search Button', async () => {
    const { getByTestId } = renderWithForm(<SearchForm {...props} />);

    fireEvent.change(getByTestId('searchType'), {
      target: { value: 'agent' }
    });

    await wait(() => {
      expect(getByTestId('searchType').value).toBe('agent');
    });

    checkButton(getByTestId, {
      dataTest: 'submit',
      text: 'Search',
      type: 'submit'
    });
  });
});
