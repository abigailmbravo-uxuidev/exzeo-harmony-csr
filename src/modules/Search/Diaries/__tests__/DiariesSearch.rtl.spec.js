import React from 'react';

import {
  fireEvent,
  jestResolve,
  render,
  wait,
  waitForElementToBeRemoved,
  within
} from '../../../../test-utils';

import * as searchData from '../data';
import {
  assigneeOptions,
  diaryOptions,
  searchResults,
  transferResult
} from '../fixtures.js';
import DiariesSearch from '../@components/DiariesSearch';
import * as diariesData from '../../../Diaries/data';

describe('DiariesSearch and Transfer Testing', () => {
  describe('Diaries Search tests', () => {
    searchData.searchDiaries = jestResolve([]);
    diariesData.fetchDiaryOptions = jestResolve(diaryOptions);
    diariesData.fetchAssigneeOptions = jestResolve(assigneeOptions);

    const props = {
      userProfile: {
        userId: '123',
        profile: { given_name: 'John', family_name: 'Smith' },
        resources: [
          { right: 'READ', uri: 'TTIC:FL:HO3:Diaries:DiariesService:*' },
          { right: 'INSERT', uri: 'TTIC:FL:HO3:Diaries:DiariesService:*' },
          { right: 'UPDATE', uri: 'TTIC:FL:HO3:Diaries:DiariesService:*' },
          { right: 'TRANSFER', uri: 'TTIC:FL:HO3:Diaries:DiariesService:*' }
        ]
      }
    };

    it('POS:Renders and has fields and labels to user with access', async () => {
      const { getByLabelText, getByTestId, getByRole, queryByRole } = render(
        <DiariesSearch {...props} />
      );

      await waitForElementToBeRemoved(() => queryByRole('status'));

      const statusField = getByLabelText(/diary status/i);
      expect(statusField).toBeInTheDocument();
      expect(statusField.value).toEqual('true');

      const reasonField = getByLabelText(/reason/i);
      expect(reasonField).toBeInTheDocument();
      expect(reasonField.value).toEqual('');

      expect(getByTestId('assignees_label')).toBeInTheDocument();
      expect(getByTestId('date-range_label')).toBeInTheDocument();

      expect(within(statusField).queryAllByRole('option').length).toBe(2);
      expect(within(reasonField).queryAllByRole('option').length).toBe(2);

      expect(getByRole('button', { name: /search/i })).not.toBeDisabled();
    });
  });

  describe('Transfer Diaries Testing', () => {
    diariesData.fetchDiaryOptions = jestResolve(diaryOptions);
    diariesData.fetchAssigneeOptions = jestResolve(assigneeOptions);
    searchData.searchDiaries = jestResolve(searchResults);
    searchData.transferDiaries = jestResolve(transferResult);

    const props = {
      userProfile: {
        userId: '234',
        profile: { given_name: 'John', family_name: 'Smith' },
        resources: [
          { right: 'READ', uri: 'TTIC:FL:HO3:Diaries:DiariesService:*' },
          { right: 'INSERT', uri: 'TTIC:FL:HO3:Diaries:DiariesService:*' },
          { right: 'UPDATE', uri: 'TTIC:FL:HO3:Diaries:DiariesService:*' },
          { right: 'TRANSFER', uri: 'TTIC:FL:HO3:Diaries:DiariesService:*' }
        ]
      },
      errorHandler: x => x
    };

    it('Should toggle the transfer diaries section', async () => {
      const {
        getByTestId,
        getByText,
        queryByText,
        queryByTestId,
        getByRole
      } = render(<DiariesSearch {...props} />);

      await waitForElementToBeRemoved(() => getByTestId('loader'));

      const transferButton = getByRole('button', { name: /transfer/i });
      expect(transferButton).toBeInTheDocument();

      expect(queryByText('Select All')).not.toBeInTheDocument();
      expect(queryByText('Transfer To')).not.toBeInTheDocument();
      expect(queryByTestId('reset-transfer')).not.toBeInTheDocument();
      expect(queryByTestId('submit-transfer')).not.toBeInTheDocument();

      fireEvent.click(transferButton);

      await wait(() => expect(getByText('Select All')).toBeInTheDocument());
      expect(getByText('Transfer To')).toBeInTheDocument();
      expect(getByTestId('reset-transfer')).toBeInTheDocument();
      expect(getByTestId('submit-transfer')).toBeInTheDocument();

      fireEvent.click(getByRole('button', { name: /cancel/i }));

      await wait(() =>
        expect(queryByText('Select All')).not.toBeInTheDocument()
      );
      expect(queryByText('Transfer To')).not.toBeInTheDocument();
      expect(queryByTestId('reset-transfer')).not.toBeInTheDocument();
      expect(queryByTestId('submit-transfer')).not.toBeInTheDocument();
    });

    it('Should submit transfer diaries: select all', async () => {
      const { getByTestId, getByText, getByLabelText, getByRole } = render(
        <DiariesSearch {...props} />
      );

      await waitForElementToBeRemoved(() => getByTestId('loader'));

      const transferButton = getByRole('button', { name: /TRANSFER/ });
      expect(transferButton).toBeInTheDocument();

      const searchResultsContainer = getByRole('article');
      const diaryResult = within(searchResultsContainer).getByRole('listitem');

      expect(
        within(diaryResult).getByText(/12-1018323-01/)
      ).toBeInTheDocument();
      expect(
        within(diaryResult).getByText(/Information Needed/)
      ).toBeInTheDocument();
      expect(
        within(diaryResult).getByText(/Diary entry message!/)
      ).toBeInTheDocument();

      fireEvent.click(transferButton);

      await wait(() =>
        expect(getByLabelText('Select All')).toBeInTheDocument()
      );

      const transferTo = getByTestId('transfer-to_wrapper');
      await wait(() => expect(getByText(/Start typing to search.../)));

      fireEvent.keyDown(
        transferTo.querySelector('input:not([type="hidden"])'),
        {
          keyCode: 40
        }
      );

      await wait(() => expect(getByText(/Test User/)).toBeInTheDocument());

      fireEvent.click(getByLabelText('Select All'));

      await wait(() => expect(getByLabelText('Select All').checked).toBe(true));

      // TODO need to decide what we want to assert after clicking this button. Serves no purpose otherwise.
      expect(getByTestId('submit-transfer')).not.toBeDisabled();
    });
  });
});
