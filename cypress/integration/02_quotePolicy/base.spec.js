import {
  setRouteAliases,
  navigateThroughNewQuote,
  fillOutCoverage,
  fillOutUnderwriting,
  changeCoverageAndAgency,
  fillOutAdditionalInterests,
  fillOutMailingBilling,
  fillOutNotesFiles,
  fillOutSummary,
  fillOutApplication,
  navigateThroughDocusign,
  sendQuote,
  changeBillTo,
  searchPolicy,
  searchQoute,
  searchDiary
} from '../../helpers';
import {
  coverageRatingTest,
  underwritingTest,
  aiTest,
  mailingBillingTest,
  notesFilesTest,
  quoteSummaryTest,
  applicationTest,
  afterDocuSignTest
} from '../../pageTests';
import {
  coverage,
  unQuestions,
  MODIFY_EFFECTIVE_DATE,
  ADD_ENDORSEMENTS,
  ADD_MORTGAGEE,
  ADD_PAYMENT,
  SWITCH_AOR
} from '../../fixtures';

describe('Base Path - HO3, create a quote, bind the Policy and make Endorsements', () => {
  before('Login', () => cy.login());
  beforeEach('Set aliases', () => setRouteAliases());

  it('Navigate through Quote Workflow', () => {
    navigateThroughNewQuote();

    fillOutCoverage();
    coverageRatingTest();

    fillOutUnderwriting(unQuestions);
    underwritingTest();
    changeCoverageAndAgency(coverage);

    fillOutAdditionalInterests();
    aiTest();

    fillOutMailingBilling();
    mailingBillingTest();

    fillOutNotesFiles();
    notesFilesTest();

    fillOutSummary();
    quoteSummaryTest();
    sendQuote();

    fillOutApplication();
    applicationTest();

    navigateThroughDocusign();
    searchDiary();
    searchQoute();

    // Combine 2 tests with different way of writing the code. As we decided - we will format 2nd or 1st part in the future in order the  whole test be written in one way

    cy.visit('/');
    cy.task('log', 'Search Policy and open')
      .get('@policyNumber')
      .then(polNum => {
        cy.findDataTag('searchType')
          .select('policy')
          // This will be relevant once ALL users can see the product dropdown
          .findDataTag('policyNumber')
          .type(polNum)
          .clickSubmit()
          .wait('@fetchPolicies')
          .then(({ response }) => {
            expect(response.body.totalNumberOfRecords).to.equal(1);
          })
          // This makes it so we don't open up a new window
          .findDataTag(polNum)
          .then($a => {
            $a.prop('onclick', () => cy.visit($a.prop('dataset').url));
          });

        cy.task('log', 'Effective Date Change');
        cy.findDataTag('edit-effective-date')
          .click()
          .findDataTag('effective-date')
          .type(MODIFY_EFFECTIVE_DATE.effectiveDate)
          .findDataTag('effective-date-change-reason')
          .select('Other')
          .findDataTag('modal-submit')
          .click();
        cy.wait('@postCreateTransaction').then(({ response }) => {
          expect(response.body.status, 'Effective Date: status').to.equal(200);
        });

        cy.get('.spinner').should('not.be.visible');

        cy.findDataTag('effectiveDateDetail').contains(
          MODIFY_EFFECTIVE_DATE.effectiveDateAlternate
        );

        cy.goToNav('endorsements');
        // Cypress checks an element's visibility with a special algo, and our
        // sticky footer causes problems with that. https://github.com/cypress-io/cypress/issues/2037
        // Here we are overriding some styling to force the footer to the bottom of its container, keeping it out of the
        // way for testing purposes
        // prettier-ignore
        cy.get('.content-wrapper').invoke('attr', 'style', 'overflow-y: auto');
        // prettier-ignore
        cy.get('.route-content').invoke('attr', 'style', 'overflow: unset');

        cy.task('log', 'Filling out Endorsements');
        cy.findDataTag('coverageLimits.dwelling.value')
          .type(`{selectall}{backspace}${ADD_ENDORSEMENTS.dwelling.value}`)
          .findDataTag('coverageLimits.personalProperty.value')
          .select(`${ADD_ENDORSEMENTS.personalProperty.value}`)
          .findDataTag('property.burglarAlarm_true')
          .click()
          .findDataTag('coverageOptions.sinkholePerilCoverage.answer')
          .select(ADD_ENDORSEMENTS.sinkholePerilCoverageAnswerText)
          .findDataTag('property.windMitigation.roofCovering')
          .select(ADD_ENDORSEMENTS.windMitigation.roofCovering)
          .findDataTag('property.windMitigation.roofGeometry')
          .select(ADD_ENDORSEMENTS.windMitigation.roofGeometry)
          .findDataTag('property.protectionClass')
          .select(ADD_ENDORSEMENTS.protectionClassText)
          .findDataTag('policyHolders[0].primaryPhoneNumber')
          .type(
            `{selectall}{backspace}${ADD_ENDORSEMENTS.policyHolders[0].primaryPhoneNumber}`
          )
          .findDataTag('policyHolders[0].secondaryPhoneNumber')
          .type(
            `{selectall}{backspace}${ADD_ENDORSEMENTS.policyHolders[0].secondaryPhoneNumber}`
          )
          .findDataTag('policyHolders[1].firstName')
          .type(
            `{selectall}{backspace}${ADD_ENDORSEMENTS.policyHolders[1].firstName}`
          )
          .findDataTag('policyHolders[1].lastName')
          .type(
            `{selectall}{backspace}${ADD_ENDORSEMENTS.policyHolders[1].lastName}`
          )
          .findDataTag('policyHolders[1].emailAddress')
          .type(
            `{selectall}{backspace}${ADD_ENDORSEMENTS.policyHolders[1].emailAddress}`
          )
          .findDataTag('policyHolders[1].primaryPhoneNumber')
          .type(
            `{selectall}{backspace}${ADD_ENDORSEMENTS.policyHolders[1].primaryPhoneNumber}`
          )
          .findDataTag('policyHolders[1].secondaryPhoneNumber')
          .type(
            `{selectall}{backspace}${ADD_ENDORSEMENTS.policyHolders[1].secondaryPhoneNumber}`
          )
          .findDataTag('policyHolderMailingAddress.address2')
          .type(
            `{selectall}{backspace}${ADD_ENDORSEMENTS.policyHolderMailingAddress.address2}`
          )
          .findDataTag('property.physicalAddress.address2')
          .type(
            `{selectall}{backspace}${ADD_ENDORSEMENTS.property.physicalAddress.address2}`
          )
          .findDataTag('modal-submit')
          .click();

        cy.wait('@rateEndorsement').then(({ response }) => {
          expect(response.body.status, 'Rate Endorsement request').to.equal(
            200
          );
        });

        cy.findDataTag('modal-submit').click();

        cy.wait('@saveEndorsement').then(({ response }) => {
          expect(
            response.body.status,
            'PolicyHolder Endorsement request'
          ).to.equal(200);
        });
        cy.wait('@fetchPolicy')
          .then(xhr => {
            expect(xhr.status, 'Latest Policy request').to.equal(200);
          })
          // Have to wait here, 'saveEndorsement' resolves before some async work is finished on the backend.
          .wait(5000);

        cy.findDataTag('effectiveDateDetail').contains(
          MODIFY_EFFECTIVE_DATE.effectiveDateAlternate
        );

        cy.goToNav('notes')
          .wait('@fetchFiles')
          .then(({ response }) => {
            expect(response.body.status).to.equal(200);
          });

        cy.get('.table tbody')
          .contains('.table tbody', 'System')
          .contains('.table tbody', 'tticcsr')
          .contains('div', `Multiple Endorsements Endorsement`)
          .then($div => {
            expect($div).to.have.length(1);
          });
      });
  });

  it('AOR Transfer', () => {
    cy.goToNav('policyholder');

    cy.wait('@fetchAgency').then(({ response }) => {
      expect(response.body.status, 'AOR Transfer modal: status').to.equal(200);
    });
    cy.wait('@fetchAgentsByAgencyCode').then(({ response }) => {
      expect(response.body.status, 'AOR Transfer: status').to.equal(200);
    });

    cy.findDataTag('edit-aor')
      .click()
      .clearReactSelectField('agencyCode_wrapper')
      // not using 'chooseReactSelectOption' helper here because it does not support 'server-backed' typeahead yet.
      .get('[data-test="agencyCode_wrapper"] .react-select__value-container')
      .type(SWITCH_AOR.agencies[0].agencyCode + '{enter}', { delay: 1000 })
      .get('[data-test="agentCode_wrapper"] .react-select__value-container')
      .type(SWITCH_AOR.firstName + '{enter}', { delay: 1000 })
      .findDataTag('modal-submit')
      .click();

    cy.wait('@aorTransfer').then(({ response }) =>
      expect(response.body.status, 'AOR Transfer: status').to.equal(200)
    );
    cy.wait('@fetchPolicy').then(xhr => {
      expect(xhr.status).to.equal(200);
    });
    cy.wait('@fetchAgency').then(({ response }) => {
      expect(response.body.status, 'AOR Transfer modal: status').to.equal(200);
    });

    // cy.wait('@fetchAgentsByAgencyCode');
    // cy.wait('@fetchAgentsByAgencyCode');
    // cy.wait('@fetchAgentsByAgencyCode').then(({ response }) => {
    //   expect(response.body.status, 'AOR Transfer: status').to.equal(200);
    // });

    cy.findDataTag('loader').should('not.be.visible');

    cy.findDataTag('agency-card')
      .contains('[data-test="agency-card"]', SWITCH_AOR.agencies[0].agencyCode)
      .contains(SWITCH_AOR.agencyName);
  });

  it('Add an Additional Interest', () => {
    cy.goToNav('billing');
    cy.findDataTag('mortgagee')
      .click()
      .findDataTag('name1')
      .click()
      .type(ADD_MORTGAGEE.additionalInterests[0].name1)
      .findDataTag('name2')
      .click()
      .type(ADD_MORTGAGEE.additionalInterests[0].name2)
      .findDataTag('address1')
      .click()
      .type(ADD_MORTGAGEE.additionalInterests[0].mailingAddress.address1)
      .findDataTag('address2')
      .click()
      .type(ADD_MORTGAGEE.additionalInterests[0].mailingAddress.address2)
      .findDataTag('city')
      .click()
      .type(ADD_MORTGAGEE.additionalInterests[0].mailingAddress.city)
      .findDataTag('state')
      .click()
      .type(ADD_MORTGAGEE.additionalInterests[0].mailingAddress.state)
      .findDataTag('zip')
      .click()
      .type(ADD_MORTGAGEE.additionalInterests[0].mailingAddress.zip)
      .findDataTag('phoneNumber')
      .click()
      .type(ADD_MORTGAGEE.additionalInterests[0].phoneNumber)
      .findDataTag('referenceNumber')
      .click()
      .type(ADD_MORTGAGEE.additionalInterests[0].referenceNumber)
      .findDataTag('ai-modal-submit')
      .click();

    cy.wait('@postCreateTransaction').then(({ response }) => {
      expect(response.body.status, 'Add AI: status').to.equal(200);
    });

    cy.findDataTag('Mortgagee-0')
      .contains(
        '[data-test="Mortgagee-0"]',
        ADD_MORTGAGEE.additionalInterests[0].name1
      )
      .contains(
        '[data-test="Mortgagee-0"]',
        ADD_MORTGAGEE.additionalInterests[0].name2
      )
      .contains(
        '[data-test="Mortgagee-0"]',
        ADD_MORTGAGEE.additionalInterests[0].mailingAddress.address1
      )
      .contains(
        '[data-test="Mortgagee-0"]',
        ADD_MORTGAGEE.additionalInterests[0].mailingAddress.address2
      )
      .contains(ADD_MORTGAGEE.additionalInterests[0].referenceNumber);
  });

  it('Add Payment', () => {
    cy.goToNav('billing');
    cy.findDataTag('cashType')
      .select('Electronic Deposit')
      .findDataTag('batchNumber')
      .click()
      .type('11')
      .findDataTag('cashDescription')
      .select('Payment Received')
      .findDataTag('amount')
      .type('100')
      .get('.btn-footer .btn-primary')
      .click();

    cy.wait('@postPaymentTransaction').then(({ response }) => {
      expect(response.body.status, 'Add AI: status').to.equal(200);
    });

    cy.get('.spinner').should('not.be.visible');

    cy.findDataTag('total-payments').contains(
      ADD_PAYMENT.cashReceived.$numberDecimal
    );
  });

  it('Generate Doc: Invoice', () => {
    cy.findDataTag('generate-document-btn')
      .click()
      .findDataTag('documentType')
      .select('Policy Invoice')
      .findDataTag('doc-submit')
      .click();
    cy.wait('@getDocumentPacketFiles').then(({ response }) => {
      expect(response.body.status, 'Generate Doc: status').to.equal(200);
    });
  });

  it('Cancel Policy', () => {
    cy.goToNav('cancel')
      .findDataTag('cancelType_Voluntary Cancellation')
      .click()
      .findDataTag('cancelReason')
      .select('Other')
      .findDataTag('submit')
      .click();

    cy.wait('@cancelPolicy').then(({ response }) => {
      expect(response.body.status, 'Cancel Policy: status').to.equal(200);
    });

    cy.findDataTag('cancellationDetail')
      .contains(
        '[data-test="cancellationDetail"]',
        'Voluntary Cancellation Date'
      )
      .contains(
        '[data-test="cancellationDetail"]',
        MODIFY_EFFECTIVE_DATE.effectiveDateAlternate
      )
      .findDataTag('policyDetails')
      .contains('Pending Voluntary Cancellation / Partial Payment Received');
  });
});
