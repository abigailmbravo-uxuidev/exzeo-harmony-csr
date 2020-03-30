import React from 'react';
import { waitForElement, fireEvent, wait } from '@testing-library/react';

import {
  renderWithForm,
  defaultQuoteWorkflowProps,
  mockServiceRunner,
  notesResult as result,
  checkHeader
} from '../../../test-utils';

import NotesFiles from '../index';

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
    options: defaultQuoteWorkflowProps.options,
    customHandlers: {
      notesSynced: jest.fn(),
      setAppError: jest.fn(),
      toggleDiary: jest.fn()
    },
    initialValues: defaultQuoteWorkflowProps.quote
  };

  it('POS:Header and Tab Buttons', async () => {
    const { getByRole, getByText } = renderWithForm(<NotesFiles {...props} />);
    await waitForElement(() => getByText('Search Table Data'));

    expect(getByText('Notes').className).toEqual('btn btn-tab selected');
    expect(getByText('Files').className).toEqual('btn btn-tab');
    expect(getByText('Diaries').className).toEqual('btn btn-tab');
    expect(getByText('Search Table Data'));
  });

  it('POS:Search Input', async () => {
    const { getByText, getByPlaceholderText } = renderWithForm(
      <NotesFiles {...props} />
    );
    await waitForElement(() => getByText('Search Table Data'));
    const searchbar = getByPlaceholderText('Search');

    fireEvent.change(searchbar, { target: { value: 'ZZZ' } });

    await wait(() => expect(searchbar.value).toBe('ZZZ'));
  });

  it('POS:Table Data Testing', async () => {
    const { getByText } = renderWithForm(<NotesFiles {...props} />);
    await waitForElement(() => getByText('Search Table Data'));

    notesColumns.forEach(col => expect(getByText(col)));
  });

  it('POS:Files', async () => {
    const { getByText, queryByText } = renderWithForm(
      <NotesFiles {...props} />
    );
    await waitForElement(() => getByText('Search Table Data'));

    fireEvent.click(getByText('Files'));

    await wait(() => {
      expect(getByText('There is no data to display'));
      expect(queryByText('Contact')).not.toBeVisible();
      expect(queryByText('Note')).not.toBeVisible();
    });
  });

  it('POS:Diaries', async () => {
    const { getByText, queryByText } = renderWithForm(
      <NotesFiles {...props} />
    );
    await waitForElement(() => getByText('Search Table Data'));

    fireEvent.click(getByText('Diaries'));
    await wait(() => {
      expect(getByText('There is no data to display'));
    });

    fireEvent.click(getByText('Diaries'));

    await wait(() => {
      expect(getByText('There is no data to display'));
      notesColumns.forEach(col => expect(queryByText(col)).toBeNull());
      diariesColumns.forEach(col => expect(getByText(col)));
    });
  });

  it('POS:Table Sorting', async () => {
    mockServiceRunner(result);
    const { debug, getByText } = renderWithForm(<NotesFiles {...props} />);
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
      expect(
        document.querySelectorAll('tbody tr td.created-by')[0].textContent
      ).toEqual(order === 'asc' ? 'AAA user author' : 'ZZZ user author');

    const checkArrows = (col, className = 'order dropup') =>
      expect(getByText(col).children[0].className).toEqual(className);

    notesColumns.forEach(columnToClick => {
      const dropArrows = getByText(columnToClick).children[0];
      // Click the arrow once, confirm all columns still have up arrows or nothing.
      fireEvent.click(dropArrows);
      notesColumns.forEach(col => checkArrows(col, 'order'));

      // Author, Filetype, and File sorts ascending, so if author is clicked we check sorting order ascending first.
      if (
        ['Author', 'File Type', 'File', 'Created', 'Contact', 'Note'].includes(
          columnToClick
        )
      )
        checkOrder('asc');
      else checkOrder('desc');

      fireEvent.click(dropArrows);

      // Check our sorting order again.
      if (
        ['Author', 'File Type', 'File', 'Created', 'Contact', 'Note'].includes(
          columnToClick
        )
      )
        checkOrder('desc');
      else checkOrder('asc');
    });
  });
});
