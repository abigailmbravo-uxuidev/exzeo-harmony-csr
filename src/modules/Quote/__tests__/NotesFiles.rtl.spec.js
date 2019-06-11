import React from 'react';
import { waitForElement, fireEvent } from 'react-testing-library';

import {
  renderWithForm,
  defaultQuoteWorkflowProps,
  mockServiceRunner,
  notesResult as result,
  checkHeader
} from '../../../test-utils';
import { QuoteWorkflow } from '../QuoteWorkflow';

const pageHeaders = [{ text: 'History' }];
const notesColumns = ['Created', 'Author', 'Contact', 'Note', 'File Type', 'File'];
const diariesColumns = ['Status', 'Due', 'Assignee', 'Reason', 'Message', 'Updated', 'UpdatedBy', 'Actions'];

mockServiceRunner([]);

describe('Notes Files Testing', () => {
  const props = {
    ...defaultQuoteWorkflowProps,
    location: { pathname: '/quote/12-345-67/notes' }
  };

  it('POS:Header and Tab Buttons', async () => {
    const { getByText } = renderWithForm(<QuoteWorkflow {...props} />);
    await waitForElement(() => getByText('Search Table Data'));

    pageHeaders.forEach(header => checkHeader(getByText, header));
    expect(getByText('Notes').className).toEqual('btn btn-tab selected');
    expect(getByText('Files').className).toEqual('btn btn-tab');
    expect(getByText('Diaries').className).toEqual('btn btn-tab');
    expect(getByText('Search Table Data'));
  });

  it('POS:Search Input', async () => {
    const { getByText, getByPlaceholderText } = renderWithForm(<QuoteWorkflow {...props} />);
    await waitForElement(() => getByText('Search Table Data'));
    const searchbar = getByPlaceholderText('Search');

    fireEvent.change(searchbar, { target: { value: 'ZZZ' }});

    expect(searchbar.value).toBe('ZZZ');
  });

  it('POS:Table Data Testing', async () => {
    const { getByText } = renderWithForm(<QuoteWorkflow {...props} />);
    await waitForElement(() => getByText('Search Table Data'));

    notesColumns.forEach(col => expect(getByText(col)));
  });

  it('POS:Files', async () => {
    const { getByText, queryByText } = renderWithForm(<QuoteWorkflow {...props} />);
    await waitForElement(() => getByText('Search Table Data'));

    fireEvent.click(getByText('Files'));
    expect(getByText('There is no data to display'));
    expect(queryByText('Contact')).not.toBeVisible();
    expect(queryByText('Note')).not.toBeVisible();
  });

  it('POS:Diaries', async () => {
    const { getByText, queryByText } = renderWithForm(<QuoteWorkflow {...props} />);
    await waitForElement(() => getByText('Search Table Data'));

    fireEvent.click(getByText('Diaries'));
    // await waitForElement(() => getByText('Assignee'));
    expect(getByText('There is no data to display'));
    notesColumns.forEach(col => expect(queryByText(col)).toBeNull());
    diariesColumns.forEach(col => {
      expect(getByText(col));
      if (!['Message', 'Actions'].includes(col)) expect(getByText(col).children[0].className).toEqual('order');
    });
  });

  it('POS:Table Sorting', async () => {
    mockServiceRunner(result);
    const { getByText } = renderWithForm(<QuoteWorkflow {...props} />);
    await waitForElement(() => getByText('Search Table Data'));

    expect(getByText('03/21/2019 8:00 PM EDT'));
    expect(getByText('AAA user author'));
    expect(getByText('AAA contact'));
    expect(getByText('AAA content note'));
    expect(getByText('04/21/2019 8:00 PM EDT'));
    expect(getByText('ZZZ user author'));
    expect(getByText('ZZZ contact'));
    expect(getByText('ZZZ content note'));

    const checkOrder = order =>
      expect(document.querySelectorAll('tbody tr td.created-by')[0].textContent)
        .toEqual(order === 'asc' ? 'AAA user author' : 'ZZZ user author');

    const checkArrows = (col, className = 'order dropup') =>
      expect(getByText(col).children[0].className).toEqual(className);

    notesColumns.forEach(columnToClick => {
      const dropArrows = getByText(columnToClick).children[0];
      // Click the arrow once, confirm all columns still have up arrows or nothing.
      fireEvent.click(dropArrows);
      notesColumns.forEach(col => checkArrows(col, 'order'));

      // Author, Filetype, and File sorts ascending, so if author is clicked we check sorting order ascending first.
      if (['Author', 'File Type', 'File'].includes(columnToClick)) checkOrder('asc');
      else checkOrder('desc');

      fireEvent.click(dropArrows);
      // Check all columns for their classnames to check their arrow settings.
      notesColumns.forEach(col => {
        // File Type and File flip together, so check that those have both flipped up together.
        if (['File Type', 'File'].includes(columnToClick)) {
          if (!['File Type', 'File'].includes(col)) checkArrows(col, 'order');
          else checkArrows(col);
        } else {
          if (col !== columnToClick) checkArrows(col, 'order');
          else checkArrows(col);
        }
      });
      // Check our sorting order again.
      if (['Author', 'File Type', 'File'].includes(columnToClick)) checkOrder('desc');
      else checkOrder('asc');
    });
  });
});
