// Basic navigation through the entire app
import merge from 'lodash/merge'; //eslint-disable-line
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
} from '../helpers';
import routes from './routes';

Cypress.Commands.add('workflow', (stop, start = 'login', underwritingMod = {}, user = stockUser) => {
  const { address1, address2, city, zip, country } = user;
  let prev;

  // Remake all stubbed xhr routes every time this function is used
  routes();
    if (start === 'login') {
      cy.login();
      prev = 'login';
    }

    if ((stop !== 'newQuote' && prev === 'login') || start === 'newQuote') {
      _newQuote(adress1);
      prev = 'newQuote';
    }

    if ((stop !== 'coverage' && prev === 'newQuote') || start === 'coverage') {
      _coverage(pH1, currentFixture);
      prev = 'coverage';
    }

    if ((stop !== 'underwriting' && prev === 'coverage') || start === 'underwriting') {
      const updatedInfo = {
        data: {
          previousTask: {
            value: {
              result: {
                ...underwritingMod,
                underwritingAnswers: {
                  rented: { answer: "Never" }
                }
              }
            }
          }
        }
      };
      currentFixture = merge(currentFixture, updatedInfo);
      _underwriting(underwriting, currentFixture);
      prev = 'underwriting';
    }

    if ((stop !== 'additionalInterests' && prev === 'underwriting') || start === 'additionalInterests') {
      _additionalInterests();
      prev = 'additionalInterests';
    }

    if ((stop !== 'mailingBilling' && prev === 'additionalInterests') || start === 'mailingBilling') {
      _mailingBilling({ address1, address2, city, zip, country });
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
