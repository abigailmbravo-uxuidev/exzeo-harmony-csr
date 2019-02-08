import stockUser from '../fixtures/stockData/user.json';
import pH1 from '../fixtures/stockData/pH1.json';
import underwriting from '../fixtures/stockData/underwriting.json';
import {
  _newQuote,
  _coverage,
  _underwriting,
  _additionalInterests,
  _mailingBilling,
  _notesFiles,
  _summary,
  _application,
  _docusign
} from './navigation.js';
import { stub } from './functions';

Cypress.Commands.add('workflow', (stop, start = 'login', user = stockUser) => {
  const { address } = user;
  let prev;

  if (start === 'login') {
    cy.server()
      .route('POST', '/cg/start?csrSubmitApplication').as('csrSubmitApplication')
      .route('POST', '/cg/start?csrGetQuoteWithUnderwriting').as('csrGetQuoteWithUnderwriting')
      .route('POST', '/cg/start?csrAdditionalInterest').as('csrAdditionalInterest')
      .route('POST', '/svc?fetchDiaries').as('fetchDiaries')
      .route('POST', '/svc?fetchAddresses', stub('fx:stubs/fetchAddresses')).as('fetchAddresses')
      .route('POST', '/svc?fetchPolicies', stub('fx:stubs/fetchPolicies')).as('fetchPolicies')
      .route('POST', '/svc?summary').as('summary');
    cy.login();
    prev = 'login';
  }

  if ((stop !== 'newQuote' && prev === 'login') || start === 'newQuote') {
    _newQuote(address);
    prev = 'newQuote';
  }

  if ((stop !== 'coverage' && prev === 'newQuote') || start === 'coverage') {
    _coverage(pH1);
    prev = 'coverage';
  }

  if ((stop !== 'underwriting' && prev === 'coverage') || start === 'underwriting') {
    _underwriting(underwriting);
    prev = 'underwriting';
  }

  if ((stop !== 'additionalInterests' && prev === 'underwriting') || start === 'additionalInterests') {
    _additionalInterests();
    prev = 'additionalInterests';
  }

  if ((stop !== 'mailingBilling' && prev === 'additionalInterests') || start === 'mailingBilling') {
    _mailingBilling();
    prev = 'mailingBilling';
  }

  if ((stop !== 'notesFiles' && prev === 'mailingBilling') || start === 'notesFiles') {
    _notesFiles();
    prev = 'notesFiles';
  }

  if ((stop !== 'summary' && prev === 'notesFiles') || start === 'summary') {
    _summary();
    prev = 'summary';
  }

  if ((stop !== 'application' && prev === 'summary') || start === 'application') {
    _application();
    prev = 'application';
  }

  if ((stop !== 'docusign' && prev === 'application') || start === 'docusign') {
    _docusign();
    prev = 'docusign';
  }
});
