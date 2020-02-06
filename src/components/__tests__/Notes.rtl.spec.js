import React from 'react';
import { fireEvent } from '@testing-library/react';

import {
  renderWithReduxAndRouter,
  defaultInitialState,
  defaultInitialProps
} from '../../test-utils';

import Notes from '../Notes';

describe('Notes Testing', () => {
  const props = {
    ...defaultInitialProps,
    numbers: [],
    numberType: 'testNumType'
  };
  const notesColumns = [
    'Created',
    'Author',
    'Contact',
    'Note',
    'File Type',
    'File'
  ];

  it('POS:Table Sorting', () => {
    const state = {
      ...defaultInitialState,
      quoteState: { quote: { quoteNumber: '123' } },
      appState: {},
      notes: [
        {
          _id: '1',
          companyCode: 'TTIC',
          createdAt: '2019-03-22T00:00:00.00Z',
          createdBy: { userName: 'AAA user author' },
          noteAttachments: [
            { fileUrl: 'foo.com/aaa', fileType: 'AAA filetype' }
          ],
          noteContactType: 'AAA contact',
          noteContent: 'AAA content note',
          noteType: 'Quote Note',
          number: '123',
          numberType: 'quoteNumber',
          product: 'HO3',
          quoteNumber: '123'
        },
        {
          _id: '123',
          companyCode: 'TTIC',
          createdAt: '2019-04-22T00:00:00.00Z',
          createdBy: { userName: 'ZZZ user author' },
          noteAttachments: [
            { fileUrl: 'foo.com/zzz', fileType: 'ZZZ filetype' }
          ],
          noteContactType: 'ZZZ contact',
          noteContent: 'ZZZ content note',
          noteType: 'Quote Note',
          number: '123',
          numberType: 'quoteNumber',
          product: 'HO3',
          quoteNumber: '123'
        }
      ]
    };

    const { getByText } = renderWithReduxAndRouter(<Notes {...props} />, {
      state
    });

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
      if (['Author', 'File Type', 'File'].includes(columnToClick))
        checkOrder('asc');
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
      if (['Author', 'File Type', 'File'].includes(columnToClick))
        checkOrder('desc');
      else checkOrder('asc');
    });
  });
});
