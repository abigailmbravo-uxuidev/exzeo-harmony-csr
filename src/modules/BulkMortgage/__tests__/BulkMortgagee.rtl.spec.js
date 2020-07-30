import React from 'react';
import {
  waitForElement,
  fireEvent,
  wait,
  within
} from '@testing-library/react';

import { renderWithForm, jestResolve } from '../../../test-utils';

import BulkMortgagee from '../@components/BulkMortgagee';
import { noop } from '@exzeo/core-ui';
import * as bulkMortgageData from '../data';
import topMortgagees from '../../../test-utils/fixtures/topMortgagees';
import mockPolicies from '../../../test-utils/fixtures/policiesWithMortgagees';
import { jobs } from '../testJobs';

describe('BulkMortgagee By Policy Testing', () => {
  bulkMortgageData.getTopMortgagees = jestResolve(topMortgagees);
  bulkMortgageData.fetchMortgageesFromPolicies = jestResolve(mockPolicies);

  it('Renders BulkMortgagee and check headers / labels', async () => {
    const props = {
      errorHandler: noop
    };
    const { getByText, getByTestId } = renderWithForm(
      <BulkMortgagee {...props} />
    );

    await wait(() => {
      // Page Headers
      expect(getByText('Queued For Update'));
    });

    expect(getByText('Bulk Mortgagee'));
    expect(getByText('By Policy'));
    expect(getByText('By Job'));
    //Mortgagee Form Labels
    expect(getByText('Top Mortgagees'));
    expect(getByText('Clear & Reset Form'));
    expect(getByText('Name 1'));
    expect(getByText('Name 2'));
    expect(getByText('Address 1'));
    expect(getByText('Address 2'));
    expect(getByText('City'));
    expect(getByText('State'));
    expect(getByText('Zip'));
    expect(getByText('Instruction'));
    expect(getByText('Mail Notice'));
    expect(getByText('Suppress Notice'));
    //Policy Search Labels
    const productWrapper = within(getByTestId('product_wrapper'));
    const searchTypeWrapper = within(getByTestId('searchType_wrapper'));
    const policyNumberWrapper = within(getByTestId('policyNumber_wrapper'));

    expect(productWrapper.getByText('Product'));
    expect(searchTypeWrapper.getByText('Search Type'));
    expect(policyNumberWrapper.getByText('Search'));
  });

  it('Fill out Mortgagee Form', async () => {
    const props = {
      errorHandler: noop
    };
    const { getByText, getByTestId } = renderWithForm(
      <BulkMortgagee {...props} />
    );

    await waitForElement(() => [getByTestId('mortgage_wrapper')]);

    await wait(() => {
      getByText('Start typing to search...');
    });

    expect(getByTestId('mortgage_wrapper'));

    fireEvent.change(getByTestId('name1'), {
      target: { value: "AMERICA'S SERVICING" }
    });
    fireEvent.change(getByTestId('name2'), {
      target: { value: 'COMPANY, ISAOA' }
    });

    fireEvent.change(getByTestId('mailingAddress.address1'), {
      target: { value: 'PO BOX 5106' }
    });

    fireEvent.change(getByTestId('mailingAddress.city'), {
      target: { value: 'SPRINGFIELD' }
    });

    fireEvent.change(getByTestId('mailingAddress.state'), {
      target: { value: 'OH' }
    });

    fireEvent.change(getByTestId('mailingAddress.zip'), {
      target: { value: '45501' }
    });

    await wait(() => {
      expect(getByTestId('name1').value).toBe("AMERICA'S SERVICING");
    });

    expect(getByTestId('name2').value).toBe('COMPANY, ISAOA');
    expect(getByTestId('mailingAddress.address1').value).toBe('PO BOX 5106');
    expect(getByTestId('mailingAddress.city').value).toBe('SPRINGFIELD');
    expect(getByTestId('mailingAddress.state').value).toBe('OH');
    expect(getByTestId('mailingAddress.zip').value).toBe('45501');
  });

  it('Search Policy', async () => {
    const props = {
      errorHandler: noop
    };
    const { getByTestId } = renderWithForm(<BulkMortgagee {...props} />);
    await waitForElement(() => [getByTestId('policyNumber')]);
    getByTestId('search-policy-submit');

    fireEvent.change(getByTestId('policyNumber'), {
      target: { value: '12-1008954-01' }
    });

    await wait(() => {
      expect(getByTestId('policyNumber').value).toBe('12-1008954-01');
    });

    fireEvent.click(getByTestId('search-policy-submit'));

    await waitForElement(() => [
      getByTestId('mortgagee-5d3774ca92a4b700125909ad')
    ]);

    getByTestId('mortgagee-5d3774ca92a4b700125909ae');

    const firstMortgageeCard = within(
      getByTestId('mortgagee-5d3774ca92a4b700125909ad')
    );

    expect(firstMortgageeCard.getByText('Mortgagee 1'));
    expect(firstMortgageeCard.getByText('SUNTRUST BANK'));
    expect(firstMortgageeCard.getByText('PO BOX 47047, ATLANTA, GA 30362'));
    expect(firstMortgageeCard.getByText('Current Bill To:'));
    expect(firstMortgageeCard.getByText('Yes'));
    expect(firstMortgageeCard.getByText('Loan No:'));
    expect(firstMortgageeCard.getByText('HO3'));
    expect(firstMortgageeCard.getByText(/TTIC/));
    expect(firstMortgageeCard.getByText('12-1008954-01'));
    expect(firstMortgageeCard.getByText('Matthew Overton'));
    expect(firstMortgageeCard.getByText('4019 BRAESGATE LN, TAMPA, FL 33624'));
    expect(firstMortgageeCard.getByText('QUEUE'));

    const secondMortgageeCard = within(
      getByTestId('mortgagee-5d3774ca92a4b700125909ae')
    );

    expect(secondMortgageeCard.getByText('Mortgagee 2'));
    expect(secondMortgageeCard.getByText('BANK OF AMERICA'));
    expect(secondMortgageeCard.getByText('PO BOX 22005, TAMPA, FL 33607'));
    expect(secondMortgageeCard.getByText('Make Bill To'));
    expect(firstMortgageeCard.getByText('HO3'));
    expect(firstMortgageeCard.getByText(/TTIC/));
    expect(secondMortgageeCard.getByText('12-1008954-01'));
    expect(firstMortgageeCard.getByText('Loan No:'));
    expect(firstMortgageeCard.getByText('Matthew Overton'));
    expect(secondMortgageeCard.getByText('4019 BRAESGATE LN, TAMPA, FL 33624'));
    expect(secondMortgageeCard.getByText('QUEUE'));
  });

  it('Queue policy, check Queue card fields, then remove from queue', async () => {
    const props = {
      errorHandler: noop
    };
    const { getByText, getByTestId } = renderWithForm(
      <BulkMortgagee {...props} />
    );
    await waitForElement(() => [getByTestId('policyNumber')]);

    getByTestId('search-policy-submit');

    fireEvent.change(getByTestId('policyNumber'), {
      target: { value: '12-1008954-01' }
    });

    await wait(() => {
      expect(getByTestId('policyNumber').value).toBe('12-1008954-01');
    });

    fireEvent.click(getByTestId('search-policy-submit'));
    await waitForElement(() => [
      getByTestId('mortgagee-5d3774ca92a4b700125909ad')
    ]);

    getByTestId('mortgagee-5d3774ca92a4b700125909ae');

    const firstMortgageeCard = within(
      getByTestId('mortgagee-5d3774ca92a4b700125909ad')
    );

    fireEvent.click(firstMortgageeCard.getByText('QUEUE'));

    await wait(() => [
      getByTestId('queued-mortgagee-5d3774ca92a4b700125909ad')
    ]);

    getByText(/1 queued/);

    const queuedMortgageeCard = within(
      getByTestId('queued-mortgagee-5d3774ca92a4b700125909ad')
    );
    expect(queuedMortgageeCard.getByText('HO3'));
    expect(queuedMortgageeCard.getByText(/SUNTRUST BANK/));
    expect(queuedMortgageeCard.getByText('PO BOX 47047, ATLANTA, GA 30362'));
    expect(queuedMortgageeCard.getByText('Bill To:'));
    expect(queuedMortgageeCard.getByText(/Loan Number/));
    expect(queuedMortgageeCard.getByText(/12-1008954-01/));
    expect(firstMortgageeCard.getByText('Matthew Overton'));
    expect(queuedMortgageeCard.getByText('Remove'));

    fireEvent.click(queuedMortgageeCard.getByText('Remove'));

    await wait(() => {
      getByText(/0 queued/);
    });
  });

  it('Queue 2 policies, check Queue card fields, then remove all from queue', async () => {
    const props = {
      errorHandler: noop
    };
    const { getByText, getByTestId } = renderWithForm(
      <BulkMortgagee {...props} />
    );
    await waitForElement(() => [
      getByTestId('policyNumber'),
      getByTestId('search-policy-submit')
    ]);

    fireEvent.change(getByTestId('policyNumber'), {
      target: { value: '12-1008954-01' }
    });

    await wait(() => {
      expect(getByTestId('policyNumber').value).toBe('12-1008954-01');
    });

    fireEvent.click(getByTestId('search-policy-submit'));
    await waitForElement(() => [
      getByTestId('mortgagee-5d3774ca92a4b700125909ad')
    ]);

    getByTestId('mortgagee-5d3774ca92a4b700125909ae');

    const firstMortgageeCard = within(
      getByTestId('mortgagee-5d3774ca92a4b700125909ad')
    );
    const secondMortgageeCard = within(
      getByTestId('mortgagee-5d3774ca92a4b700125909ae')
    );
    //const queuedMortgageeSection = within(getByTestId('queued-mortgagee'));

    fireEvent.click(firstMortgageeCard.getByText('QUEUE'));

    await wait(() => [
      getByTestId('queued-mortgagee-5d3774ca92a4b700125909ad')
    ]);

    getByText(/1 queued/);

    fireEvent.click(secondMortgageeCard.getByText('QUEUE'));

    await wait(() => [
      getByTestId('queued-mortgagee-5d3774ca92a4b700125909ae')
    ]);

    getByText(/2 queued/);

    const queuedMortgageeCard1 = within(
      getByTestId('queued-mortgagee-5d3774ca92a4b700125909ad')
    );

    const queuedMortgageeCard2 = within(
      getByTestId('queued-mortgagee-5d3774ca92a4b700125909ae')
    );

    const removeAllWrapper = within(getByTestId('queue-mortgagee'));

    expect(queuedMortgageeCard1.getByText('HO3'));
    expect(queuedMortgageeCard1.getByText(/SUNTRUST BANK/));
    expect(queuedMortgageeCard1.getByText('PO BOX 47047, ATLANTA, GA 30362'));
    expect(queuedMortgageeCard1.getByText('Bill To:'));
    expect(queuedMortgageeCard1.getByText(/Loan Number/));
    expect(queuedMortgageeCard1.getByText(/12-1008954-01/));
    expect(firstMortgageeCard.getByText('Matthew Overton'));
    expect(queuedMortgageeCard1.getByText('Remove'));

    expect(queuedMortgageeCard2.getByText('HO3'));
    expect(queuedMortgageeCard2.getByText(/BANK OF AMERICA/));
    expect(queuedMortgageeCard2.getByText('PO BOX 22005, TAMPA, FL 33607'));
    expect(queuedMortgageeCard2.getByText('Bill To:'));
    expect(queuedMortgageeCard2.getByText(/Loan Number/));
    expect(queuedMortgageeCard2.getByText(/12-1008954-01/));
    expect(secondMortgageeCard.getByText('Matthew Overton'));
    expect(queuedMortgageeCard2.getByText('Remove'));

    expect(removeAllWrapper.getByText('Remove All'));

    fireEvent.click(removeAllWrapper.getByText('Remove All'));

    await wait(() => {
      getByText(/0 queued/);
    });
  });
});

describe('Bulk Mortgagee By Job Testing', () => {
  bulkMortgageData.getMortgageeJobs = jestResolve({ jobs });

  it('Renders BulkMortgagee By Job and check headers / labels', async () => {
    const props = {
      errorHandler: noop
    };
    const { getByText } = renderWithForm(<BulkMortgagee {...props} />);

    fireEvent.click(getByText('By Job'));

    await wait(() => {
      expect(getByText('Filter Parameters'));
    });

    expect(getByText('Job Number'));
    expect(getByText('Completed By'));
    expect(getByText('Date Range'));
    expect(getByText('Mortgagee Name'));
    expect(getByText('Filter'));
    expect(getByText('Jobs'));
  });

  it('Renders Bulk Mortgagee By Job filter by Job Number', async () => {
    const props = {
      errorHandler: noop
    };
    const { getByText, getByTestId } = renderWithForm(
      <BulkMortgagee {...props} />
    );

    fireEvent.click(getByText('By Job'));

    await wait(() => {
      expect(getByText('Filter Parameters'));
    });

    fireEvent.change(getByTestId('jobId'), {
      target: { value: '2e7' }
    });

    fireEvent.click(getByText('Filter'));

    await wait(() => {
      const jobWrapper = within(getByTestId('job-2e78b038e9dd2f00286cb58a'));
      expect(jobWrapper.getByText('2e78b038e9dd2f00286cb58a'));
      expect(jobWrapper.getByText(/Bank of Tampa/));
    });

    fireEvent.change(getByTestId('jobId'), {
      target: { value: '3e7' }
    });

    fireEvent.click(getByText('Filter'));

    await wait(() => {
      const jobWrapper = within(getByTestId('job-3e78b038e9dd2f00286cb58a'));
      expect(jobWrapper.getByText('3e78b038e9dd2f00286cb58a'));
      expect(jobWrapper.getByText(/Bank of Miami/));
    });
  });

  it('Renders Bulk Mortgagee By Job filter by Mortgagee Name', async () => {
    const props = {
      errorHandler: noop
    };
    const { getByText, getByTestId } = renderWithForm(
      <BulkMortgagee {...props} />
    );

    fireEvent.click(getByText('By Job'));

    await wait(() => {
      expect(getByText('Filter Parameters'));
    });

    fireEvent.change(getByTestId('name'), {
      target: { value: 'Bank of America' }
    });

    fireEvent.click(getByText('Filter'));

    await wait(() => {
      const jobWrapper = within(getByTestId('job-4e78b038e9dd2f00286cb58a'));
      expect(jobWrapper.getByText('4e78b038e9dd2f00286cb58a'));
      expect(jobWrapper.getByText(/Bank of America/));
    });

    fireEvent.change(getByTestId('name'), {
      target: { value: 'Bank of Miami' }
    });

    fireEvent.click(getByText('Filter'));

    await wait(() => {
      const jobWrapper = within(getByTestId('job-3e78b038e9dd2f00286cb58a'));
      expect(jobWrapper.getByText('3e78b038e9dd2f00286cb58a'));
      expect(jobWrapper.getByText(/Bank of Miami/));
    });
  });

  it('Renders Bulk Mortgagee By Job filter by Date Range', async () => {
    const props = {
      errorHandler: noop
    };
    const { getByText, getByTestId } = renderWithForm(
      <BulkMortgagee {...props} />
    );

    fireEvent.click(getByText('By Job'));

    await wait(() => {
      expect(getByText('Filter Parameters'));
    });

    fireEvent.change(getByTestId('date-range-start'), {
      target: { value: '2020-02-19' }
    });
    fireEvent.change(getByTestId('date-range-end'), {
      target: { value: '2020-02-24' }
    });

    fireEvent.click(getByText('Filter'));

    await wait(() => {
      const jobWrapper = within(getByTestId('job-4e78b038e9dd2f00286cb58a'));
      expect(jobWrapper.getByText('4e78b038e9dd2f00286cb58a'));
      expect(jobWrapper.getByText(/Created/));

      expect(jobWrapper.getByText(/Policy Mortgagees Updated:/));
      expect(jobWrapper.getByText(/Download Policy CSV/));

      expect(jobWrapper.getByText(/Bank of America/));
      expect(jobWrapper.getByText(/5115 Garden Vale Ave, Tampa, FL 33624/));
    });

    await wait(() => {
      const jobWrapper = within(getByTestId('job-3e78b038e9dd2f00286cb58a'));
      expect(jobWrapper.getByText('3e78b038e9dd2f00286cb58a'));
      expect(jobWrapper.getByText(/Running/));

      expect(jobWrapper.getByText(/Policy Mortgagees Updated:/));
      expect(jobWrapper.getByText(/Download Policy CSV/));

      expect(jobWrapper.getByText(/Bank of Miami/));
      expect(jobWrapper.getByText(/5115 Garden Vale Ave, Miami, FL 33624/));
    });

    await wait(() => {
      const jobWrapper = within(getByTestId('job-2e78b038e9dd2f00286cb58a'));
      expect(jobWrapper.getByText('2e78b038e9dd2f00286cb58a'));
      expect(jobWrapper.getByText(/Stopped/));

      expect(jobWrapper.getByText(/Policy Mortgagees Updated:/));
      expect(jobWrapper.getByText(/Download Policy CSV/));

      expect(jobWrapper.getByText(/Bank of Tampa/));
      expect(jobWrapper.getByText(/5115 Garden Vale Ave, Tampa, FL 33624/));
    });

    await wait(() => {
      const jobWrapper = within(getByTestId('job-1e78b038e9dd2f00286cb58a'));
      expect(jobWrapper.getByText('1e78b038e9dd2f00286cb58a'));
      expect(jobWrapper.getAllByText(/Completed/).length).toBe(3);

      expect(jobWrapper.getByText(/Completed By:/));
      expect(jobWrapper.getByText(/auth0\|SYSTEMUSER\|0/));
      expect(jobWrapper.getByText(/Completed:/));
      expect(jobWrapper.getByText(/Policy Mortgagees Updated:/));
      expect(jobWrapper.getByText(/Download Policy CSV/));

      expect(jobWrapper.getByText(/Bank of Canada/));
      expect(jobWrapper.getByText(/5115 Garden Vale Ave, Tampa, FL 33624/));
    });

    await wait(() => {
      const jobWrapper = within(getByTestId('job-9e78b038e9dd2f00286cb58a'));
      expect(jobWrapper.getByText('9e78b038e9dd2f00286cb58a'));
      expect(jobWrapper.getByText(/Stop Requested/));

      expect(jobWrapper.getByText(/Policy Mortgagees Updated:/));
      expect(jobWrapper.getByText(/Download Policy CSV/));

      expect(jobWrapper.getByText(/Bank of New York/));
      expect(jobWrapper.getByText(/5115 Garden Vale Ave, Tampa, FL 33624/));
    });
  });
});
