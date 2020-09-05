import React from 'react';
import { date } from '@exzeo/core-ui';
import { quote } from '../../../test-utils/fixtures';
import {
  render,
  wait,
  waitForElementToBeRemoved,
  jestResolve,
  screen,
  fireEvent,
  within,
  defaultDiaries
} from '../../../test-utils';
import {
  notesResult,
  filesResult,
  diariesResult,
  diaryOptions
} from '../fixtures';
import * as notesFilesData from '../data';
import NotesFiles from '../@components/NotesFiles';

describe('NotesFiles', () => {
  const props = {
    initialValues: {
      sourceNumber: quote
    },
    options: {
      agents: [],
      mortgagee: [],
      order: [],
      uiQuestions: {}
    },
    customHandlers: {
      notesSynced: jest.fn(),
      setAppError: jest.fn()
    }
  };

  const formattedDate_forNotes = createdDate =>
    date.moment
      .tz(createdDate, 'America/New_York')
      .format('MM/DD/YYYY h:mm A zz');

  const formattedDate_forFiles = createdDate =>
    date.moment
      .tz(date.moment.unix(createdDate), 'America/New_York')
      .format('MM/DD/YYYY h:mm A zz');

  const formattedDate_forDiaries = createdDate =>
    date.moment.utc(createdDate).format('MM/DD/YYYY');

  it('NotesFiles: Header, tabs, and search bar are all present', async () => {
    notesFilesData.fetchNotes = jestResolve({ data: { result: [] } });
    notesFilesData.fetchFiles = jestResolve({ data: { result: [] } });

    render(<NotesFiles {...props} />);
    await waitForElementToBeRemoved(() => screen.queryByRole('status'));

    expect(screen.getByText('Search Table Data')).toBeInTheDocument();
    expect(screen.getByLabelText('Search this table')).toHaveValue('');
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /notes/i })).toBeEnabled();
    expect(screen.getByRole('button', { name: /files/i })).toBeEnabled();
    expect(screen.getByRole('button', { name: /diaries/i })).toBeEnabled();
  });

  it('NotesFiles: Notes table headers are present (no data in table)', async () => {
    notesFilesData.fetchNotes = jestResolve({ data: { result: [] } });
    notesFilesData.fetchFiles = jestResolve({ data: { result: [] } });

    render(<NotesFiles {...props} />);
    await waitForElementToBeRemoved(() => screen.queryByRole('status'));
    const notesTab = screen.getByRole('button', { name: /notes/i });
    const filesTab = screen.getByRole('button', { name: /files/i });
    const diariesTab = screen.getByRole('button', { name: /diaries/i });

    expect(notesTab).toHaveAttribute('class', 'btn btn-tab selected');
    expect(filesTab).toHaveAttribute('class', 'btn btn-tab');
    expect(diariesTab).toHaveAttribute('class', 'btn btn-tab');
    expect(screen.getByText('There is no data to display')).toBeInTheDocument();
    expect(screen.getByLabelText('Created sortable')).toHaveTextContent(
      'Created'
    );
    expect(screen.getByLabelText('Term sortable')).toHaveTextContent('Term');
    expect(screen.getByLabelText('Author sortable')).toHaveTextContent(
      'Author'
    );
    expect(screen.getByLabelText('Contact sortable')).toHaveTextContent(
      'Contact'
    );
    expect(screen.getByLabelText('Note sortable')).toHaveTextContent('Note');
    expect(screen.getByLabelText('File Type sortable')).toHaveTextContent(
      'File Type'
    );
    expect(screen.getByLabelText('File sortable')).toHaveTextContent('File');
  });

  it('NotesFiles: Files table headers are present (no data in table)', async () => {
    notesFilesData.fetchNotes = jestResolve({ data: { result: [] } });
    notesFilesData.fetchFiles = jestResolve({ data: { result: [] } });

    render(<NotesFiles {...props} />);
    await waitForElementToBeRemoved(() => screen.queryByRole('status'));
    const notesTab = screen.getByRole('button', { name: /notes/i });
    const filesTab = screen.getByRole('button', { name: /files/i });
    const diariesTab = screen.getByRole('button', { name: /diaries/i });

    fireEvent.click(filesTab);
    await wait(() =>
      expect(filesTab).toHaveAttribute('class', 'btn btn-tab selected')
    );
    expect(notesTab).toHaveAttribute('class', 'btn btn-tab');
    expect(diariesTab).toHaveAttribute('class', 'btn btn-tab');
    expect(screen.getByText('There is no data to display')).toBeInTheDocument();
    expect(screen.getByLabelText('Created sortable')).toHaveTextContent(
      'Created'
    );
    expect(screen.getByLabelText('Term sortable')).toHaveTextContent('Term');
    expect(screen.getByLabelText('Author sortable')).toHaveTextContent(
      'Author'
    );
    expect(screen.getByLabelText('File Type sortable')).toHaveTextContent(
      'File Type'
    );
    expect(screen.getByLabelText('File sortable')).toHaveTextContent('File');
    expect(screen.queryByLabelText('Contact sortable')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Note sortable')).not.toBeInTheDocument();
  });

  it('NotesFiles: Diaries table headers are present (no data in table)', async () => {
    notesFilesData.fetchNotes = jestResolve({ data: { result: [] } });
    notesFilesData.fetchFiles = jestResolve({ data: { result: [] } });

    render(<NotesFiles {...props} />);
    await waitForElementToBeRemoved(() => screen.queryByRole('status'));
    const notesTab = screen.getByRole('button', { name: /notes/i });
    const filesTab = screen.getByRole('button', { name: /files/i });
    const diariesTab = screen.getByRole('button', { name: /diaries/i });

    expect(notesTab).toBeEnabled();
    expect(filesTab).toBeEnabled();
    expect(diariesTab).toBeEnabled();

    fireEvent.click(diariesTab);
    await wait(() =>
      expect(diariesTab).toHaveAttribute('class', 'btn btn-tab selected')
    );
    expect(filesTab).toHaveAttribute('class', 'btn btn-tab');
    expect(filesTab).toHaveAttribute('class', 'btn btn-tab');
    expect(screen.getByText('There is no data to display')).toBeInTheDocument();
    expect(screen.getByLabelText('Status sortable')).toHaveTextContent(
      'Status'
    );
    expect(screen.getByLabelText('Due sortable')).toHaveTextContent('Due');
    expect(screen.getByLabelText('Assignee sortable')).toHaveTextContent(
      'Assignee'
    );
    expect(screen.getByLabelText('Reason sortable')).toHaveTextContent(
      'Reason'
    );
    expect(screen.getByLabelText('Message sortable')).toHaveTextContent(
      'Message'
    );
    expect(screen.getByLabelText('Updated sortable')).toHaveTextContent(
      'Updated'
    );
    expect(screen.getByLabelText('Updated By sortable')).toHaveTextContent(
      'Updated By'
    );
    expect(screen.getByText('Actions')).toBeInTheDocument();
  });

  it('NotesFiles: Notes table values are formatted', async () => {
    // The mock data used in these tests is shaped such that that
    // note_1 sorts by default to to row_1, note_2 to row_2, etc.
    // This makes it easier to test the sorting and formatting of rows of data
    notesFilesData.fetchNotes = jestResolve({ data: { result: notesResult } });
    notesFilesData.fetchFiles = jestResolve({ data: { result: [] } });

    const note_1 = notesResult.filter(note => note._id === '1')[0];
    const note_2 = notesResult.filter(note => note._id === '2')[0];
    const note_3 = notesResult.filter(note => note._id === '3')[0];

    render(<NotesFiles {...props} />);
    await waitForElementToBeRemoved(() => screen.queryByRole('status'));
    const tableBody = document.querySelector('tbody');

    expect(within(tableBody).getAllByRole('row')).toHaveLength(3);
    const row1 = within(tableBody).getAllByRole('row')[0];
    const row2 = within(tableBody).getAllByRole('row')[1];
    const row3 = within(tableBody).getAllByRole('row')[2];

    expect(row1.querySelector('.created-date').textContent).toBe(
      formattedDate_forNotes(note_1.createdAt)
    );
    expect(row2.querySelector('.created-date').textContent).toBe(
      formattedDate_forNotes(note_2.createdAt)
    );
    expect(row3.querySelector('.created-date').textContent).toBe(
      formattedDate_forNotes(note_3.createdAt)
    );
    expect(row1.querySelector('.term').textContent).toBe('1');
    expect(row2.querySelector('.term').textContent).toBe('1');
    expect(row3.querySelector('.term').textContent).toBe('2');
    expect(row1.querySelector('.created-by').textContent).toBe('user1');
    expect(row2.querySelector('.created-by').textContent).toBe('user2');
    expect(row3.querySelector('.created-by').textContent).toBe('user3');
    expect(row1.querySelector('.note-type').textContent).toBe('System');
    expect(row2.querySelector('.note-type').textContent).toBe('System');
    expect(row3.querySelector('.note-type').textContent).toBe('Agent');
    expect(row1.querySelector('.note').textContent).toBe('aa content1');
    expect(row2.querySelector('.note').textContent).toBe('BB content2');
    expect(row3.querySelector('.note').textContent).toBe(
      'cc content3 inside a p tag!'
    );
    expect(row1.querySelector('.file-type').textContent).toBe('');
    expect(row2.querySelector('.file-type').textContent).toBe(
      'Application Packet'
    );
    expect(row3.querySelector('.file-type').textContent).toBe('');
    expect(row1.querySelector('.attachments').textContent).toBe('');
    expect(
      within(row2.querySelector('.attachments')).getByTitle(/^.*AppPacket.*$/)
    ).toHaveClass('fa fa-file');
  });

  it('NotesFiles: Files table values are formatted', async () => {
    // The mock data used in these tests is shaped such that that
    // note_1 sorts by default to to row_1, note_2 to row_2, etc.
    // This makes it easier to test the sorting and formatting of rows of data
    notesFilesData.fetchNotes = jestResolve({ data: { result: notesResult } });
    notesFilesData.fetchFiles = jestResolve({ data: { result: filesResult } });

    const file_1 = notesResult.filter(note => {
      return note.noteAttachments.length > 0;
    })[0]; // in NotesFiles fixtures, this is the only note with an attachment
    const file_2 = filesResult.filter(file => file.fileUrl.includes('123'))[0];
    const file_3 = filesResult.filter(file => file.fileUrl.includes('456'))[0];
    const file_4 = filesResult.filter(file => file.fileUrl.includes('789'))[0];

    render(<NotesFiles {...props} />);
    await waitForElementToBeRemoved(() => screen.queryByRole('status'));
    const filesTab = screen.getByText('Files');

    fireEvent.click(filesTab);
    await wait(() =>
      expect(filesTab).toHaveAttribute('class', 'btn btn-tab selected')
    );

    const tableBody = document.querySelector('tbody');

    expect(within(tableBody).getAllByRole('row')).toHaveLength(4);
    const row1 = within(tableBody).getAllByRole('row')[0];
    const row2 = within(tableBody).getAllByRole('row')[1];
    const row3 = within(tableBody).getAllByRole('row')[2];
    const row4 = within(tableBody).getAllByRole('row')[3];

    expect(row1.querySelector('.created-date').textContent).toBe(
      formattedDate_forNotes(file_1.createdAt)
    );
    expect(row2.querySelector('.created-date').textContent).toBe(
      formattedDate_forFiles(file_2.createdDate)
    );
    expect(row3.querySelector('.created-date').textContent).toBe(
      formattedDate_forFiles(file_3.createdDate)
    );
    expect(row4.querySelector('.created-date').textContent).toBe(
      formattedDate_forFiles(file_4.createdDate)
    );
    expect(row2.querySelector('.term').textContent).toBe('1');
    expect(row3.querySelector('.term').textContent).toBe('2');
    expect(row4.querySelector('.term').textContent).toBe('3');
    expect(row1.querySelector('.created-by').textContent).toBe('user2');
    expect(row2.querySelector('.created-by').textContent).toBe('System');
    expect(row3.querySelector('.created-by').textContent).toBe('System');
    expect(row4.querySelector('.created-by').textContent).toBe('System');

    expect(row1.querySelector('.file-type').textContent).toBe(
      'Application Packet'
    );
    expect(row2.querySelector('.file-type').textContent).toBe('System');
    expect(row3.querySelector('.file-type').textContent).toBe('System');
    expect(row4.querySelector('.file-type').textContent).toBe('System');

    expect(row1.querySelector('.attachments').textContent).toBe(
      'AppPacket-123-123.pdf'
    );
    expect(row2.querySelector('.attachments').textContent).toBe(
      'AppPacket-11-1111.pdf'
    );
    expect(row3.querySelector('.attachments').textContent).toBe(
      'Invoice-11-1112.pdf'
    );
    expect(row4.querySelector('.attachments').textContent).toBe(
      'FullPolicy-11-1113.pdf'
    );

    expect(
      within(row1.querySelector('.attachments')).getByTitle(/^.*AppPacket.*$/)
    ).toHaveClass('fa fa-file');
    expect(
      within(row2.querySelector('.attachments')).getByTitle(/^.*AppPacket.*$/)
    ).toHaveClass('fa fa-file');
    expect(
      within(row3.querySelector('.attachments')).getByTitle(/^.*Invoice.*$/)
    ).toHaveClass('fa fa-file');
    expect(
      within(row4.querySelector('.attachments')).getByTitle(/^.*FullPolicy.*$/)
    ).toHaveClass('fa fa-file');
  });

  it('NotesFiles: Diaries table values are formatted', async () => {
    // The mock data used in these tests is shaped such that that
    // note_1 sorts by default to to row_1, note_2 to row_2, etc.
    // This makes it easier to test the sorting and formatting of rows of data
    notesFilesData.fetchNotes = jestResolve({ data: { result: [] } });
    notesFilesData.fetchFiles = jestResolve({ data: { result: [] } });

    render(<NotesFiles {...props} />, {
      diaries: {
        ...defaultDiaries,
        diaries: diariesResult,
        diaryEnums: diaryOptions
      }
    });

    await waitForElementToBeRemoved(() => screen.queryByRole('status'));
    const diariesTab = screen.getByText('Diaries');

    fireEvent.click(diariesTab);
    await wait(() =>
      expect(diariesTab).toHaveAttribute('class', 'btn btn-tab selected')
    );

    const diary_1 = diariesResult.filter(diary => diary._id === '1')[0];
    const diary_2 = diariesResult.filter(diary => diary._id === '2')[0];
    const diary_3 = diariesResult.filter(diary => diary._id === '3')[0];
    const diary_4 = diariesResult.filter(diary => diary._id === '4')[0];

    const tableBody = document.querySelector('tbody');
    expect(within(tableBody).getAllByRole('row')).toHaveLength(4);
    const row1 = within(tableBody).getAllByRole('row')[0];
    const row2 = within(tableBody).getAllByRole('row')[1];
    const row3 = within(tableBody).getAllByRole('row')[2];
    const row4 = within(tableBody).getAllByRole('row')[3];

    expect(row1.querySelector('.due-status').textContent).toBe(
      'OPEN | Due Soon'
    );
    expect(row2.querySelector('.due-status').textContent).toBe(
      'OPEN | Due Soon'
    );
    expect(row3.querySelector('.due-status').textContent).toBe(
      'OPEN | Upcoming'
    );
    expect(row4.querySelector('.due-status').textContent).toBe('CLOSED');

    expect(row1.querySelector('.due').textContent).toBe(
      formattedDate_forDiaries(diary_1.entries[0].due)
    );
    expect(row2.querySelector('.due').textContent).toBe(
      formattedDate_forDiaries(diary_2.entries[0].due)
    );
    expect(row3.querySelector('.due').textContent).toBe(
      formattedDate_forDiaries(diary_3.entries[0].due)
    );
    expect(row4.querySelector('.due').textContent).toBe(
      formattedDate_forDiaries(diary_4.entries[0].due)
    );

    expect(row1.querySelector('.assignee').textContent).toBe('TTIC CSR');
    expect(row2.querySelector('.assignee').textContent).toBe('Underwriting');
    expect(row3.querySelector('.assignee').textContent).toBe('Processing');
    expect(row4.querySelector('.assignee').textContent).toBe('Processing');

    expect(row1.querySelector('.reason').textContent).toBe(
      'Information Needed'
    );
    expect(row2.querySelector('.reason').textContent).toBe('Estate');
    expect(row3.querySelector('.reason').textContent).toBe('New Policy');
    expect(row4.querySelector('.reason').textContent).toBe('New Policy');

    expect(row1.querySelector('.message').textContent).toBe(
      'test content with history'
    );
    expect(row2.querySelector('.message').textContent).toBe('test content 2');
    expect(row3.querySelector('.message').textContent).toBe('Test content 3');
    expect(row4.querySelector('.message').textContent).toBe(
      'test content 4 closed'
    );

    expect(row1.querySelector('.updated-at').textContent).toBe(
      formattedDate_forDiaries(diary_1.entries[0].updatedAt)
    );
    expect(row2.querySelector('.updated-at').textContent).toBe(
      formattedDate_forDiaries(diary_2.entries[0].updatedAt)
    );
    expect(row3.querySelector('.updated-at').textContent).toBe(
      formattedDate_forDiaries(diary_3.entries[0].updatedAt)
    );
    expect(row4.querySelector('.updated-at').textContent).toBe(
      formattedDate_forDiaries(diary_4.entries[0].updatedAt)
    );

    expect(row1.querySelector('.created-by').textContent).toBe(
      diary_1.entries[0].createdBy.userName
    );
    expect(row2.querySelector('.created-by').textContent).toBe(
      diary_2.entries[0].createdBy.userName
    );
    expect(row3.querySelector('.created-by').textContent).toBe(
      diary_3.entries[0].createdBy.userName
    );
    expect(row4.querySelector('.created-by').textContent).toBe(
      diary_4.entries[0].createdBy.userName
    );

    // 'fa-chevron-circle-up' button should be available only if the diary is open:true
    // 'fa-caret-square-down' button should be available only if the diary has history
    expect(within(row1).getAllByRole('button')[0].firstChild).toHaveClass(
      'fa fa-chevron-circle-up'
    );
    expect(within(row2).getAllByRole('button')[0].firstChild).toHaveClass(
      'fa fa-chevron-circle-up'
    );
    expect(within(row3).getAllByRole('button')[0].firstChild).toHaveClass(
      'fa fa-chevron-circle-up'
    );
    expect(within(row1).getAllByRole('button')[1]).toHaveClass(
      'fa fa-caret-square-o-down'
    );
    expect(within(row2).getAllByRole('button')[1]).toHaveClass(
      'fa fa-caret-square-o-down'
    );
    expect(within(row4).getAllByRole('button')[0]).toHaveClass(
      'fa fa-caret-square-o-down'
    );
    expect(row3.querySelector('.fa-caret-square-o-down')).toBe(null); //open diary; no history
    expect(row4.querySelector('.fa-chevron-circle-up')).toBe(null); // closed diary with history
  });

  it('NotesFiles: Search bar gets passed correct value', async () => {
    notesFilesData.fetchNotes = jestResolve({ data: { result: notesResult } });
    notesFilesData.fetchFiles = jestResolve({ data: { result: [] } });

    render(<NotesFiles {...props} />);
    await waitForElementToBeRemoved(() => screen.queryByRole('status'));
    const searchInput = screen.getByLabelText('Search this table');

    // Search functionality comes from BootstrapTable's ToolkitProvider library
    // Here we are just testing our ability to pass a search value
    fireEvent.change(searchInput, { target: { value: 'aa content1' } });
    await wait(() => expect(searchInput.value).toBe('aa content1'));
  });

  it('NotesFiles: Notes table sort works', async () => {
    // The mock data used in these tests is shaped such that that
    // note_1 sorts by default to to row_1, note_2 to row_2, etc.
    // This makes it easier to test the sorting and formatting of rows of data
    notesFilesData.fetchNotes = jestResolve({ data: { result: notesResult } });
    notesFilesData.fetchFiles = jestResolve({ data: { result: [] } });

    render(<NotesFiles {...props} />);
    await waitForElementToBeRemoved(() => screen.queryByRole('status'));
    const tableBody = document.querySelector('tbody');

    expect(within(tableBody).getAllByRole('row')).toHaveLength(3);
    const note_1 = notesResult.filter(note => note._id === '1')[0];
    const note_2 = notesResult.filter(note => note._id === '2')[0];
    const note_3 = notesResult.filter(note => note._id === '3')[0];
    fireEvent.click(screen.getByText('Created').firstChild);
    await wait(() =>
      expect(screen.getByLabelText('Created sort desc')).toBeInTheDocument()
    );
    expect(
      document.querySelectorAll('tbody tr td.created-date')[0].textContent
    ).toBe(formattedDate_forNotes(note_3.createdAt));
    expect(
      document.querySelectorAll('tbody tr td.created-date')[1].textContent
    ).toBe(formattedDate_forNotes(note_2.createdAt));

    expect(
      document.querySelectorAll('tbody tr td.created-date')[2].textContent
    ).toBe(formattedDate_forNotes(note_1.createdAt));

    fireEvent.click(screen.getByText('Created').firstChild);
    await wait(() =>
      expect(screen.getByLabelText('Created sort asc')).toHaveTextContent(
        'Created'
      )
    );
    expect(
      document.querySelectorAll('tbody tr td.created-date')[0].textContent
    ).toBe(formattedDate_forNotes(note_1.createdAt));
    expect(
      document.querySelectorAll('tbody tr td.created-date')[1].textContent
    ).toBe(formattedDate_forNotes(note_2.createdAt));
    expect(
      document.querySelectorAll('tbody tr td.created-date')[2].textContent
    ).toBe(formattedDate_forNotes(note_3.createdAt));

    fireEvent.click(screen.getByText('Term').firstChild);
    await wait(() =>
      expect(screen.getByLabelText('Term sort desc')).toBeInTheDocument()
    );
    expect(document.querySelectorAll('tbody tr td.term')[0].textContent).toBe(
      '2'
    );
    expect(document.querySelectorAll('tbody tr td.term')[1].textContent).toBe(
      '1'
    );
    expect(document.querySelectorAll('tbody tr td.term')[2].textContent).toBe(
      '1'
    );

    fireEvent.click(screen.getByText('Term').firstChild);
    await wait(() =>
      expect(screen.getByLabelText('Term sort asc')).toBeInTheDocument()
    );
    expect(document.querySelectorAll('tbody tr td.term')[0].textContent).toBe(
      '1'
    );
    expect(document.querySelectorAll('tbody tr td.term')[1].textContent).toBe(
      '1'
    );
    expect(document.querySelectorAll('tbody tr td.term')[2].textContent).toBe(
      '2'
    );

    fireEvent.click(screen.getByText('Author').firstChild);
    await wait(() =>
      expect(screen.getByLabelText('Author sort desc')).toBeInTheDocument()
    );
    expect(
      document.querySelectorAll('tbody tr td.created-by')[0].textContent
    ).toBe('user1');
    expect(
      document.querySelectorAll('tbody tr td.created-by')[1].textContent
    ).toBe('user2');
    expect(
      document.querySelectorAll('tbody tr td.created-by')[2].textContent
    ).toBe('user3');

    fireEvent.click(screen.getByText('Author').firstChild);
    await wait(() =>
      expect(screen.getByLabelText('Author sort asc')).toBeInTheDocument()
    );
    expect(
      document.querySelectorAll('tbody tr td.created-by')[0].textContent
    ).toBe('user3');
    expect(
      document.querySelectorAll('tbody tr td.created-by')[1].textContent
    ).toBe('user2');
    expect(
      document.querySelectorAll('tbody tr td.created-by')[2].textContent
    ).toBe('user1');

    fireEvent.click(screen.getByText('Contact').firstChild);
    await wait(() =>
      expect(screen.getByLabelText('Contact sort desc')).toBeInTheDocument()
    );
    expect(
      document.querySelectorAll('tbody tr td.note-type')[0].textContent
    ).toBe('System');
    expect(
      document.querySelectorAll('tbody tr td.note-type')[1].textContent
    ).toBe('System');
    expect(
      document.querySelectorAll('tbody tr td.note-type')[2].textContent
    ).toBe('Agent');

    fireEvent.click(screen.getByText('Contact').firstChild);
    await wait(() =>
      expect(screen.getByLabelText('Contact sort asc')).toBeInTheDocument()
    );
    expect(
      document.querySelectorAll('tbody tr td.note-type')[0].textContent
    ).toBe('Agent');
    expect(
      document.querySelectorAll('tbody tr td.note-type')[1].textContent
    ).toBe('System');
    expect(
      document.querySelectorAll('tbody tr td.note-type')[2].textContent
    ).toBe('System');

    fireEvent.click(screen.getByText('Note').firstChild);
    await wait(() =>
      expect(screen.getByLabelText('Note sort desc')).toBeInTheDocument()
    );
    expect(document.querySelectorAll('tbody tr td.note')[0].textContent).toBe(
      'aa content1'
    );
    expect(document.querySelectorAll('tbody tr td.note')[1].textContent).toBe(
      'BB content2'
    );
    expect(document.querySelectorAll('tbody tr td.note')[2].textContent).toBe(
      'cc content3 inside a p tag!'
    );

    fireEvent.click(screen.getByText('Note').firstChild);
    await wait(() =>
      expect(screen.getByLabelText('Note sort asc')).toBeInTheDocument()
    );
    expect(document.querySelectorAll('tbody tr td.note')[0].textContent).toBe(
      'cc content3 inside a p tag!'
    );
    expect(document.querySelectorAll('tbody tr td.note')[1].textContent).toBe(
      'BB content2'
    );
    expect(document.querySelectorAll('tbody tr td.note')[2].textContent).toBe(
      'aa content1'
    );

    fireEvent.click(screen.getByText('File Type').firstChild);
    await wait(() =>
      expect(screen.getByLabelText('File Type sort desc')).toBeInTheDocument()
    );
    expect(
      document.querySelectorAll('tbody tr td.file-type')[0].textContent
    ).toBe('Application Packet');
    expect(
      document.querySelectorAll('tbody tr td.file-type')[1].textContent
    ).toBe('');
    expect(
      document.querySelectorAll('tbody tr td.file-type')[2].textContent
    ).toBe('');

    fireEvent.click(screen.getByText('File Type').firstChild);
    await wait(() =>
      expect(screen.getByLabelText('File Type sort asc')).toBeInTheDocument()
    );
    expect(
      document.querySelectorAll('tbody tr td.file-type')[0].textContent
    ).toBe('');
    expect(
      document.querySelectorAll('tbody tr td.file-type')[1].textContent
    ).toBe('');
    expect(
      document.querySelectorAll('tbody tr td.file-type')[2].textContent
    ).toBe('Application Packet');

    fireEvent.click(screen.getByText('File').firstChild);
    await wait(() =>
      expect(screen.getByLabelText('File sort desc')).toBeInTheDocument()
    );
    expect(
      document.querySelectorAll('tbody tr td.attachments span')[0]
        .childElementCount
    ).toBe(0);
    expect(
      document.querySelectorAll('tbody tr td.attachments span')[1]
        .childElementCount
    ).toBe(0);
    expect(
      document.querySelectorAll('tbody tr td.attachments span')[2]
        .childElementCount
    ).toBe(1);

    fireEvent.click(screen.getByText('File').firstChild);
    await wait(() =>
      expect(screen.getByLabelText('File sort asc')).toBeInTheDocument()
    );
    expect(
      document.querySelectorAll('tbody tr td.attachments span')[0]
        .childElementCount
    ).toBe(1);
    expect(
      document.querySelectorAll('tbody tr td.attachments span')[1]
        .childElementCount
    ).toBe(0);
    expect(
      document.querySelectorAll('tbody tr td.attachments span')[2]
        .childElementCount
    ).toBe(0);
  });

  it('NotesFiles: Files table sort works', async () => {
    // The mock data used in these tests is shaped such that that
    // file_1 sorts by default to to row_1, file_2 to row_2, etc.
    // This makes it easier to test the sorting and formatting of rows of data
    notesFilesData.fetchNotes = jestResolve({ data: { result: notesResult } }); // 1 file comes from notes fixtures
    notesFilesData.fetchFiles = jestResolve({ data: { result: filesResult } }); // 3 file come from files fixtures

    const file_1 = notesResult.filter(note => {
      return note.noteAttachments.length > 0;
    })[0]; // in NotesFiles fixtures, this is the only note with an attachment
    const file_2 = filesResult.filter(file => file.fileUrl.includes('123'))[0];
    const file_3 = filesResult.filter(file => file.fileUrl.includes('456'))[0];
    const file_4 = filesResult.filter(file => file.fileUrl.includes('789'))[0];

    render(<NotesFiles {...props} />);
    await waitForElementToBeRemoved(() => screen.queryByRole('status'));
    const filesTab = screen.getByText('Files');

    fireEvent.click(filesTab);
    await wait(() =>
      expect(filesTab).toHaveAttribute('class', 'btn btn-tab selected')
    );

    const tableBody = document.querySelector('tbody');

    expect(within(tableBody).getAllByRole('row')).toHaveLength(4);

    fireEvent.click(filesTab);
    await wait(() =>
      expect(filesTab).toHaveAttribute('class', 'btn btn-tab selected')
    );

    fireEvent.click(screen.getByText('Created').firstChild);
    await wait(() => screen.getByLabelText('Created sort desc'));
    expect(
      document.querySelectorAll('tbody tr td.created-date')[0].textContent
    ).toBe(formattedDate_forFiles(file_4.createdDate));
    expect(
      document.querySelectorAll('tbody tr td.created-date')[1].textContent
    ).toBe(formattedDate_forFiles(file_3.createdDate));
    expect(
      document.querySelectorAll('tbody tr td.created-date')[2].textContent
    ).toBe(formattedDate_forNotes(file_1.createdAt));
    expect(
      document.querySelectorAll('tbody tr td.created-date')[3].textContent
    ).toBe(formattedDate_forFiles(file_2.createdDate));

    fireEvent.click(screen.getByText('Created').firstChild);
    await wait(() => screen.getByLabelText('Created sort asc'));
    expect(
      document.querySelectorAll('tbody tr td.created-date')[0].textContent
    ).toBe(formattedDate_forFiles(file_2.createdDate));
    expect(
      document.querySelectorAll('tbody tr td.created-date')[1].textContent
    ).toBe(formattedDate_forNotes(file_1.createdAt));
    expect(
      document.querySelectorAll('tbody tr td.created-date')[2].textContent
    ).toBe(formattedDate_forFiles(file_3.createdDate));
    expect(
      document.querySelectorAll('tbody tr td.created-date')[3].textContent
    ).toBe(formattedDate_forFiles(file_4.createdDate));

    fireEvent.click(screen.getByText('Term').firstChild);
    await wait(() => screen.getByLabelText('Term sort desc'));
    expect(document.querySelectorAll('tbody tr td.term')[0].textContent).toBe(
      '3'
    );
    expect(document.querySelectorAll('tbody tr td.term')[1].textContent).toBe(
      '2'
    );
    expect(document.querySelectorAll('tbody tr td.term')[2].textContent).toBe(
      '1'
    );
    expect(document.querySelectorAll('tbody tr td.term')[3].textContent).toBe(
      '1'
    );

    fireEvent.click(screen.getByText('Term').firstChild);
    await wait(() => screen.getByLabelText('Term sort asc'));
    expect(document.querySelectorAll('tbody tr td.term')[0].textContent).toBe(
      '1'
    );
    expect(document.querySelectorAll('tbody tr td.term')[1].textContent).toBe(
      '1'
    );
    expect(document.querySelectorAll('tbody tr td.term')[2].textContent).toBe(
      '2'
    );
    expect(document.querySelectorAll('tbody tr td.term')[3].textContent).toBe(
      '3'
    );

    fireEvent.click(screen.getByText('Author').firstChild);
    await wait(() => screen.getByLabelText('Author sort desc'));
    expect(
      document.querySelectorAll('tbody tr td.created-by')[0].textContent
    ).toBe('System');
    expect(
      document.querySelectorAll('tbody tr td.created-by')[1].textContent
    ).toBe('System');
    expect(
      document.querySelectorAll('tbody tr td.created-by')[2].textContent
    ).toBe('System');
    expect(
      document.querySelectorAll('tbody tr td.created-by')[3].textContent
    ).toBe('user2');

    fireEvent.click(screen.getByText('Author').firstChild);
    await wait(() => screen.getByLabelText('Author sort asc'));
    expect(
      document.querySelectorAll('tbody tr td.created-by')[0].textContent
    ).toBe('user2');
    expect(
      document.querySelectorAll('tbody tr td.created-by')[1].textContent
    ).toBe('System');
    expect(
      document.querySelectorAll('tbody tr td.created-by')[2].textContent
    ).toBe('System');
    expect(
      document.querySelectorAll('tbody tr td.created-by')[3].textContent
    ).toBe('System');

    fireEvent.click(screen.getByText('File Type').firstChild);
    await wait(() => screen.getByLabelText('File Type sort desc'));
    expect(
      document.querySelectorAll('tbody tr td.file-type')[0].textContent
    ).toBe('System');
    expect(
      document.querySelectorAll('tbody tr td.file-type')[1].textContent
    ).toBe('System');
    expect(
      document.querySelectorAll('tbody tr td.file-type')[2].textContent
    ).toBe('System');
    expect(
      document.querySelectorAll('tbody tr td.file-type')[3].textContent
    ).toBe('Application Packet');

    fireEvent.click(screen.getByText('File Type').firstChild);
    await wait(() => screen.getByLabelText('File Type sort asc'));
    expect(
      document.querySelectorAll('tbody tr td.file-type')[0].textContent
    ).toBe('Application Packet');
    expect(
      document.querySelectorAll('tbody tr td.file-type')[1].textContent
    ).toBe('System');
    expect(
      document.querySelectorAll('tbody tr td.file-type')[2].textContent
    ).toBe('System');
    expect(
      document.querySelectorAll('tbody tr td.file-type')[3].textContent
    ).toBe('System');

    fireEvent.click(screen.getByText('File').firstChild);
    await wait(() => screen.getByLabelText('File sort desc'));
    expect(
      document.querySelectorAll('tbody tr td.attachments')[0].textContent
    ).toBe('AppPacket-11-1111.pdf');
    expect(
      document.querySelectorAll('tbody tr td.attachments')[1].textContent
    ).toBe('AppPacket-123-123.pdf');
    expect(
      document.querySelectorAll('tbody tr td.attachments')[2].textContent
    ).toBe('FullPolicy-11-1113.pdf');
    expect(
      document.querySelectorAll('tbody tr td.attachments')[3].textContent
    ).toBe('Invoice-11-1112.pdf');

    fireEvent.click(screen.getByText('File').firstChild);
    await wait(() => screen.getByLabelText('File sort asc'));
    expect(
      document.querySelectorAll('tbody tr td.attachments')[0].textContent
    ).toBe('Invoice-11-1112.pdf');
    expect(
      document.querySelectorAll('tbody tr td.attachments')[1].textContent
    ).toBe('FullPolicy-11-1113.pdf');
    expect(
      document.querySelectorAll('tbody tr td.attachments')[2].textContent
    ).toBe('AppPacket-123-123.pdf');
    expect(
      document.querySelectorAll('tbody tr td.attachments')[3].textContent
    ).toBe('AppPacket-11-1111.pdf');
  });

  it('NotesFiles: Diaries table sort works', async () => {
    // The mock data used in these tests is shaped such that that
    // diary_1 sorts by default to to row_1, diary_2 to row_2, etc.
    // This makes it easier to test the sorting and formatting of rows of data
    notesFilesData.fetchNotes = jestResolve({ data: { result: [] } });
    notesFilesData.fetchFiles = jestResolve({ data: { result: [] } });

    render(<NotesFiles {...props} />, {
      diaries: {
        ...defaultDiaries,
        diaries: diariesResult,
        diaryEnums: diaryOptions
      }
    });

    await waitForElementToBeRemoved(() => screen.queryByRole('status'));
    const diariesTab = screen.getByText('Diaries');

    fireEvent.click(diariesTab);
    await wait(() =>
      expect(diariesTab).toHaveAttribute('class', 'btn btn-tab selected')
    );

    const diary_1 = diariesResult.filter(diary => diary._id === '1')[0];
    const diary_2 = diariesResult.filter(diary => diary._id === '2')[0];
    const diary_3 = diariesResult.filter(diary => diary._id === '3')[0];
    const diary_4 = diariesResult.filter(diary => diary._id === '4')[0];

    const tableBody = document.querySelector('tbody');
    expect(within(tableBody).getAllByRole('row')).toHaveLength(4);

    fireEvent.click(screen.getByText('Status').firstChild);
    await wait(() =>
      expect(screen.getByLabelText('Status sort desc')).toBeInTheDocument()
    );
    expect(
      document.querySelectorAll('tbody tr td.due-status')[0].textContent
    ).toBe('OPEN | Due Soon');
    expect(
      document.querySelectorAll('tbody tr td.due-status')[1].textContent
    ).toBe('OPEN | Due Soon');
    expect(
      document.querySelectorAll('tbody tr td.due-status')[2].textContent
    ).toBe('OPEN | Upcoming');
    expect(
      document.querySelectorAll('tbody tr td.due-status')[3].textContent
    ).toBe('CLOSED');

    fireEvent.click(screen.getByText('Status').firstChild);
    await wait(() =>
      expect(screen.getByLabelText('Status sort asc')).toBeInTheDocument()
    );
    expect(
      document.querySelectorAll('tbody tr td.due-status')[0].textContent
    ).toBe('CLOSED');
    expect(
      document.querySelectorAll('tbody tr td.due-status')[1].textContent
    ).toBe('OPEN | Upcoming');
    expect(
      document.querySelectorAll('tbody tr td.due-status')[2].textContent
    ).toBe('OPEN | Due Soon');
    expect(
      document.querySelectorAll('tbody tr td.due-status')[3].textContent
    ).toBe('OPEN | Due Soon');

    fireEvent.click(screen.getByText('Due').firstChild);
    await wait(() =>
      expect(screen.getByLabelText('Due sort desc')).toBeInTheDocument()
    );
    expect(document.querySelectorAll('tbody tr td.due')[0].textContent).toBe(
      formattedDate_forDiaries(diary_1.entries[0].due)
    );
    expect(document.querySelectorAll('tbody tr td.due')[1].textContent).toBe(
      formattedDate_forDiaries(diary_2.entries[0].due)
    );
    expect(document.querySelectorAll('tbody tr td.due')[2].textContent).toBe(
      formattedDate_forDiaries(diary_3.entries[0].due)
    );
    expect(document.querySelectorAll('tbody tr td.due')[3].textContent).toBe(
      formattedDate_forDiaries(diary_4.entries[0].due)
    );

    fireEvent.click(screen.getByText('Due').firstChild);
    await wait(() =>
      expect(screen.getByLabelText('Due sort asc')).toBeInTheDocument()
    );
    expect(document.querySelectorAll('tbody tr td.due')[0].textContent).toBe(
      formattedDate_forDiaries(diary_4.entries[0].due)
    );
    expect(document.querySelectorAll('tbody tr td.due')[1].textContent).toBe(
      formattedDate_forDiaries(diary_3.entries[0].due)
    );
    expect(document.querySelectorAll('tbody tr td.due')[2].textContent).toBe(
      formattedDate_forDiaries(diary_2.entries[0].due)
    );
    expect(document.querySelectorAll('tbody tr td.due')[3].textContent).toBe(
      formattedDate_forDiaries(diary_1.entries[0].due)
    );

    fireEvent.click(screen.getByText('Assignee').firstChild);
    await wait(() =>
      expect(screen.getByLabelText('Assignee sort desc')).toBeInTheDocument()
    );
    expect(
      document.querySelectorAll('tbody tr td.assignee')[0].textContent
    ).toBe('Underwriting');
    expect(
      document.querySelectorAll('tbody tr td.assignee')[1].textContent
    ).toBe('TTIC CSR');
    expect(
      document.querySelectorAll('tbody tr td.assignee')[2].textContent
    ).toBe('Processing');
    expect(
      document.querySelectorAll('tbody tr td.assignee')[3].textContent
    ).toBe('Processing');

    fireEvent.click(screen.getByText('Assignee').firstChild);
    await wait(() =>
      expect(screen.getByLabelText('Assignee sort asc')).toBeInTheDocument()
    );
    expect(
      document.querySelectorAll('tbody tr td.assignee')[0].textContent
    ).toBe('Processing');
    expect(
      document.querySelectorAll('tbody tr td.assignee')[1].textContent
    ).toBe('Processing');
    expect(
      document.querySelectorAll('tbody tr td.assignee')[2].textContent
    ).toBe('TTIC CSR');
    expect(
      document.querySelectorAll('tbody tr td.assignee')[3].textContent
    ).toBe('Underwriting');

    fireEvent.click(screen.getByText('Reason').firstChild);
    await wait(() =>
      expect(screen.getByLabelText('Reason sort desc')).toBeInTheDocument()
    );
    expect(document.querySelectorAll('tbody tr td.reason')[0].textContent).toBe(
      'New Policy'
    );
    expect(document.querySelectorAll('tbody tr td.reason')[1].textContent).toBe(
      'New Policy'
    );
    expect(document.querySelectorAll('tbody tr td.reason')[2].textContent).toBe(
      'Information Needed'
    );
    expect(document.querySelectorAll('tbody tr td.reason')[3].textContent).toBe(
      'Estate'
    );

    fireEvent.click(screen.getByText('Reason').firstChild);
    await wait(() =>
      expect(screen.getByLabelText('Reason sort asc')).toBeInTheDocument()
    );
    expect(document.querySelectorAll('tbody tr td.reason')[0].textContent).toBe(
      'Estate'
    );
    expect(document.querySelectorAll('tbody tr td.reason')[1].textContent).toBe(
      'Information Needed'
    );
    expect(document.querySelectorAll('tbody tr td.reason')[2].textContent).toBe(
      'New Policy'
    );
    expect(document.querySelectorAll('tbody tr td.reason')[3].textContent).toBe(
      'New Policy'
    );

    fireEvent.click(screen.getByText('Message').firstChild);
    await wait(() =>
      expect(screen.getByLabelText('Message sort desc')).toBeInTheDocument()
    );
    expect(
      document.querySelectorAll('tbody tr td.message')[0].textContent
    ).toBe('test content 2');
    expect(
      document.querySelectorAll('tbody tr td.message')[1].textContent
    ).toBe('Test content 3');
    expect(
      document.querySelectorAll('tbody tr td.message')[2].textContent
    ).toBe('test content 4 closed');
    expect(
      document.querySelectorAll('tbody tr td.message')[3].textContent
    ).toBe('test content with history');

    fireEvent.click(screen.getByText('Message').firstChild);
    await wait(() =>
      expect(screen.getByLabelText('Message sort asc')).toBeInTheDocument()
    );
    expect(
      document.querySelectorAll('tbody tr td.message')[0].textContent
    ).toBe('test content with history');
    expect(
      document.querySelectorAll('tbody tr td.message')[1].textContent
    ).toBe('test content 4 closed');
    expect(
      document.querySelectorAll('tbody tr td.message')[2].textContent
    ).toBe('Test content 3');
    expect(
      document.querySelectorAll('tbody tr td.message')[3].textContent
    ).toBe('test content 2');

    fireEvent.click(screen.getByText('Updated').firstChild);
    await wait(() =>
      expect(screen.getByLabelText('Updated sort desc')).toBeInTheDocument()
    );
    expect(
      document.querySelectorAll('tbody tr td.updated-at')[0].textContent
    ).toBe(formattedDate_forDiaries(diary_4.updatedAt));
    expect(
      document.querySelectorAll('tbody tr td.updated-at')[1].textContent
    ).toBe(formattedDate_forDiaries(diary_3.updatedAt));
    expect(
      document.querySelectorAll('tbody tr td.updated-at')[2].textContent
    ).toBe(formattedDate_forDiaries(diary_2.updatedAt));
    expect(
      document.querySelectorAll('tbody tr td.updated-at')[3].textContent
    ).toBe(formattedDate_forDiaries(diary_1.updatedAt));

    fireEvent.click(screen.getByText('Updated').firstChild);
    await wait(() =>
      expect(screen.getByLabelText('Updated sort asc')).toBeInTheDocument()
    );
    expect(
      document.querySelectorAll('tbody tr td.updated-at')[0].textContent
    ).toBe(formattedDate_forDiaries(diary_1.updatedAt));
    expect(
      document.querySelectorAll('tbody tr td.updated-at')[1].textContent
    ).toBe(formattedDate_forDiaries(diary_2.updatedAt));
    expect(
      document.querySelectorAll('tbody tr td.updated-at')[2].textContent
    ).toBe(formattedDate_forDiaries(diary_3.updatedAt));
    expect(
      document.querySelectorAll('tbody tr td.updated-at')[3].textContent
    ).toBe(formattedDate_forDiaries(diary_4.updatedAt));

    fireEvent.click(screen.getByText('Updated By').firstChild);
    await wait(() =>
      expect(screen.getByLabelText('Updated By sort desc')).toBeInTheDocument()
    );
    expect(
      document.querySelectorAll('tbody tr td.created-by')[0].textContent
    ).toBe('user4');
    expect(
      document.querySelectorAll('tbody tr td.created-by')[1].textContent
    ).toBe('user3');
    expect(
      document.querySelectorAll('tbody tr td.created-by')[2].textContent
    ).toBe('tticcsr');
    expect(
      document.querySelectorAll('tbody tr td.created-by')[3].textContent
    ).toBe('tticcsr');

    fireEvent.click(screen.getByText('Updated By').firstChild);
    await wait(() =>
      expect(screen.getByLabelText('Updated By sort asc')).toBeInTheDocument()
    );
    expect(
      document.querySelectorAll('tbody tr td.created-by')[0].textContent
    ).toBe('tticcsr');
    expect(
      document.querySelectorAll('tbody tr td.created-by')[1].textContent
    ).toBe('tticcsr');
    expect(
      document.querySelectorAll('tbody tr td.created-by')[2].textContent
    ).toBe('user3');
    expect(
      document.querySelectorAll('tbody tr td.created-by')[3].textContent
    ).toBe('user4');
  });

  it('NotesFiles: Diaries table show/hide history works', async () => {
    notesFilesData.fetchNotes = jestResolve({ data: { result: [] } });
    notesFilesData.fetchFiles = jestResolve({ data: { result: [] } });

    render(<NotesFiles {...props} />, {
      diaries: {
        ...defaultDiaries,
        diaries: diariesResult,
        diaryEnums: diaryOptions
      }
    });

    await waitForElementToBeRemoved(() => screen.queryByRole('status'));
    const diariesTab = screen.getByText('Diaries');

    fireEvent.click(diariesTab);
    await wait(() =>
      expect(diariesTab).toHaveAttribute('class', 'btn btn-tab selected')
    );
    const tableBody = document.querySelector('tbody');
    const historyButton = within(tableBody)
      .getAllByRole('row')[0]
      .querySelector('.fa-caret-square-o-down');
    expect(within(tableBody).getAllByRole('row')).toHaveLength(4);
    expect(screen.queryByText('test content')).not.toBeInTheDocument();

    fireEvent.click(historyButton);
    await wait(() =>
      expect(within(tableBody).getAllByRole('row')).toHaveLength(7)
    );
    expect(historyButton).toHaveClass('fa-caret-square-o-up');
    expect(screen.getByText('test content')).toBeInTheDocument();

    fireEvent.click(historyButton);
    await wait(() =>
      expect(within(tableBody).getAllByRole('row')).toHaveLength(4)
    );
    expect(screen.queryByText('test content')).not.toBeInTheDocument();
  });
});
