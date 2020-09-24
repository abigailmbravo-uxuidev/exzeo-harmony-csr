import React from 'react';
import { date } from '@exzeo/core-ui';
import {
  tl_render,
  fireEvent,
  screen,
  within,
  jestResolve,
  render,
  wait
} from '../../../test-utils';
import {
  defaultAuth,
  defaultDiaries
} from '../../../test-utils/defaultPropsAndState';
import { DiariesProvider } from '../../../context/diaries-context';
import { Auth0Context } from '../../../context/auth-context';
import { UserContext } from '../../../context/user-context';
import Header from '../../../components/Header.jsx';
import OpenDiariesBar from '../@components/OpenDiariesBar.jsx';
import DiaryIndicator from '../@components/DiaryIndicator.jsx';
import DiaryModal from '../@components/DiaryModal.jsx';
import { diariesResult, diaryOptions } from '../fixtures';
import * as diariesData from '../data';

// TODO: Talk to Jordan -- split into separate files, use
describe('OpenDiaries Bar', () => {
  it('Diaries Bar displays open diaries', async () => {
    const props = {
      document: {
        companyCode: 'TTIC',
        state: 'FL',
        product: 'HO3',
        policyNumber: '12-1111111-01',
        sourceNumber: '11-1111111-01'
      }
    };

    render(<OpenDiariesBar {...props} />, {
      diaries: {
        ...defaultDiaries,
        diaries: diariesResult,
        diaryEnums: diaryOptions
      }
    });

    // Get formatted due dates of mock diaries in ascending
    const openDiariesDueDates = diariesResult
      .filter(d => d.entries[0].open === true)
      .sort()
      .map(d => date.moment.utc(d.entries[0].due).format('MM/DD/YYYY'));

    const diaries = within(
      document.querySelector('div.diaries-list')
    ).getAllByRole('listitem');
    const headings = screen.getAllByRole('heading');

    expect(diaries.length).toBe(3);
    expect(diaries[0].textContent).toBe(
      `${openDiariesDueDates[0]} OpenReason 1: test content with historyAssignee 1`
    );
    expect(diaries[1].textContent).toBe(
      `${openDiariesDueDates[1]} OpenReason 2: test content 2Assignee 2`
    );
    expect(diaries[2].textContent).toBe(
      `${openDiariesDueDates[2]} OpenReason 3: Test content 3Assignee 3`
    );

    expect(headings[0].textContent).toBe('Open Diaries');
    expect(headings[1].textContent).toBe(' Past Due');
    expect(headings[2].textContent).toBe(' Due Soon');
    expect(headings[3].textContent).toBe(' Upcoming');
    expect(document.querySelector('i.fa-bell-o')).toBeInTheDocument();
    expect(document.querySelector('i.fa-calendar-o')).toBeInTheDocument();
    expect(document.querySelector('i.fa-clock-o')).toBeInTheDocument();
  });

  it('DiariesModal displays selected diary', async () => {
    render(<DiaryModal errorHandler={() => {}} />, {
      diaries: {
        ...defaultDiaries,
        diaries: diariesResult,
        diaryEnums: diaryOptions,
        selectedDiary: diariesResult[0]
      }
    });

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Diary')).toBeInTheDocument();

    const reason = screen.getByLabelText('Reason');
    const assignee = screen.getByLabelText('Assignee');
    const dueDate = screen.getByLabelText('Due Date');
    const message = screen.getByLabelText('Message');

    expect(reason.value).toBe('reason_1');
    expect(assignee.value).toBe('assignee_1');
    expect(dueDate.value).toBe(
      date.moment.utc(diariesResult[0].entries[0].due).format('YYYY-MM-DD')
    );
    expect(message.value).toBe('test content with history');

    fireEvent.change(reason, {
      target: { value: 'reason_2' }
    });

    await wait(() => expect(reason.value).toBe('reason_2'));
    expect(dueDate.value).toBe(
      date.moment
        .utc()
        .add(2, 'days')
        .format('YYYY-MM-DD')
    );

    fireEvent.change(assignee, {
      target: { value: 'assignee_2' }
    });
    await wait(() => expect(assignee.value).toBe('assignee_2'));

    fireEvent.change(message, {
      target: { value: 'new message' }
    });

    await wait(() => expect(message.value).toBe('new message'));

    expect(
      screen.getByRole('button', { name: /MARK AS CLOSED/i })
    ).not.toBeDisabled();
    expect(screen.getByRole('button', { name: /CANCEL/i })).not.toBeDisabled();
    expect(screen.getByRole('button', { name: /SAVE/i })).not.toBeDisabled();
    expect(screen.getByTestId('diary-window-minimize')).not.toBeDisabled();
    expect(screen.getByTestId('diary-window-close')).not.toBeDisabled();
  });

  it('DiariesIndicator shows number of open diaries', async () => {
    diariesData.fetchDiaries = jestResolve(diariesResult);
    diariesData.fetchDiaryEnums = jestResolve(diaryOptions);

    const auth = {
      ...defaultAuth,
      userProfile: {
        ...defaultAuth.userProfile,
        resources: [
          { right: 'READ', uri: 'TTIC:FL:HO3:DIARIES:DiariesService:*' },
          { right: 'UPDATE', uri: 'TTIC:FL:HO3:DIARIES:DiariesService:*' },
          { right: 'INSERT', uri: 'TTIC:FL:HO3:DIARIES:DiariesService:*' }
        ]
      }
    };

    const headerProps = {
      title: <div>Test</div>,
      diaryPollingFilter: {
        resourceId: ['111', '222'],
        resourceType: 'Policy'
      }
    };

    const diaryIndicatorProps = {
      meta: {
        company: 'TTIC',
        product: 'HO3',
        state: 'FL'
      }
    };

    // Included Header in order to mock fetching diaries, since the Header is where polling gets called
    tl_render(
      <Auth0Context.Provider value={auth}>
        <UserContext.Provider value={auth.userProfile}>
          <DiariesProvider>
            <Header {...headerProps}>
              <DiaryIndicator {...diaryIndicatorProps} />
            </Header>
          </DiariesProvider>
        </UserContext.Provider>
      </Auth0Context.Provider>
    );

    await wait(() =>
      expect(screen.getByTestId('diary-btn-wrapper').textContent).toBe('3Show')
    );
    expect(screen.getByTestId('diary-btn-wrapper')).toHaveClass(
      'diary-btn-wrapper panel-closed'
    );
    fireEvent.click(screen.getByTestId('diary-btn-wrapper'));
    await wait(() =>
      expect(screen.getByTestId('diary-btn-wrapper')).toHaveClass(
        'diary-btn-wrapper panel-open'
      )
    );
  });
});
