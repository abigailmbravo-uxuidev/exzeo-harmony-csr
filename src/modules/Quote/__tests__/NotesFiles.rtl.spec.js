import React from 'react';
import { waitForElement, fireEvent, within } from '@testing-library/react';

import {
  renderWithForm,
  defaultQuoteWorkflowProps,
  mockServiceRunner,
  notesResult as result,
  checkHeader
} from '../../../test-utils';
import { QuoteWorkflow } from '../QuoteWorkflow';

const pageHeaders = [{ text: 'History' }];
const notesColumns = [
  'Created',
  'Term',
  'Author',
  'Contact',
  'Note',
  'File Type',
  'File'
];
const diariesColumns = [
  'Status',
  'Due',
  'Assignee',
  'Reason',
  'Message',
  'Updated',
  'Updated By',
  'Actions'
];

mockServiceRunner([]);

describe('Notes Files Testing', () => {
  const props = {
    ...defaultQuoteWorkflowProps,
    location: { pathname: '/quote/12-345-67/notes' }
  };

  it('POS:Header and Tab Buttons', async () => {
    const { getByText } = renderWithForm(<QuoteWorkflow {...props} />);
    await waitForElement(() => getByText('Search Table Data'));

    const { getByText: getByTextInsideForm } = within(
      document.getElementById('QuoteWorkflowCSR')
    );

    pageHeaders.forEach(header => expect(getByTextInsideForm(header.text)));
    expect(getByText('Notes').className).toEqual('btn btn-tab selected');
    expect(getByText('Files').className).toEqual('btn btn-tab');
    expect(getByText('Diaries').className).toEqual('btn btn-tab');
    expect(getByText('Search Table Data'));
  });

  it('POS:Search Input', async () => {
    const { getByText, getByPlaceholderText } = renderWithForm(
      <QuoteWorkflow {...props} />
    );
    await waitForElement(() => getByText('Search Table Data'));
    const searchbar = getByPlaceholderText('Search');

    fireEvent.change(searchbar, { target: { value: 'ZZZ' } });

    expect(searchbar.value).toBe('ZZZ');
  });

  it('POS:Table Data Testing', async () => {
    const { getByText } = renderWithForm(<QuoteWorkflow {...props} />);
    await waitForElement(() => getByText('Search Table Data'));

    notesColumns.forEach(col => expect(getByText(col)));
  });

  it('POS:Files', async () => {
    const { getByText, queryByText } = renderWithForm(
      <QuoteWorkflow {...props} />
    );
    await waitForElement(() => getByText('Search Table Data'));

    fireEvent.click(getByText('Files'));
    expect(getByText('There is no data to display'));
    expect(queryByText('Contact')).not.toBeVisible();
    expect(queryByText('Note')).not.toBeVisible();
  });

  it('POS:Diaries', async () => {
    const { getByText, queryByText } = renderWithForm(
      <QuoteWorkflow {...props} />
    );
    await waitForElement(() => getByText('Search Table Data'));

    fireEvent.click(getByText('Diaries'));
    // await waitForElement(() => getByText('Assignee'));
    expect(getByText('There is no data to display'));
    notesColumns.forEach(col => expect(queryByText(col)).toBeNull());
    diariesColumns.forEach(col => {
      expect(getByText(col));
      if (!['Message', 'Actions'].includes(col))
        expect(getByText(col).children[0].className).toEqual('order');
    });
  });
});
