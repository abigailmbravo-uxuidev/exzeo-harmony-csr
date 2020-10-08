import React from 'react';
import SideNav from '../../components/SideNav.jsx';
import { render, screen } from '../../test-utils/test-utils';

describe('Workflow Side Nav', () => {
  describe('Quote Side Nav', () => {
    const props = {
      documentType: 'quote',
      number: '123',
      children: <p>CHILDREN GET RENDERED HERE</p>
    };
    it('Displays nav links and children', async () => {
      render(<SideNav {...props} />);

      await screen.getByRole('navigation');

      const coverageRating = screen.getByRole('link', {
        name: /coverage \/ rating/i
      });
      const underwriting = screen.getByRole('link', { name: /underwriting/i });
      const additionalInterests = screen.getByRole('link', {
        name: /additional interests/i
      });
      const mailingBilling = screen.getByRole('link', {
        name: /mailing \/ billing/i
      });
      const notesFilesDiaries = screen.getByRole('link', {
        name: /notes \/ files \/ diaries/i
      });
      const quoteSummary = screen.getByRole('link', { name: /quote summary/i });
      const application = screen.getByRole('link', { name: /application/i });
      expect(screen.getByRole('list').children.length).toBe(9);
      expect(coverageRating).toBeEnabled();
      expect(underwriting).toBeEnabled();
      expect(additionalInterests).toBeEnabled();
      expect(mailingBilling).toBeEnabled();
      expect(notesFilesDiaries).toBeEnabled();
      expect(quoteSummary).toBeEnabled();
      expect(application).toBeEnabled();
      expect(screen.getByText('CHILDREN GET RENDERED HERE'));
      expect(screen.getByRole('separator')).toBeVisible();
      expect(coverageRating.href).toContain(
        `${props.documentType}/${props.number}/coverage`
      );
      expect(underwriting.href).toContain(
        `${props.documentType}/${props.number}/underwriting`
      );
      expect(additionalInterests.href).toContain(
        `${props.documentType}/${props.number}/additionalInterests`
      );
      expect(mailingBilling.href).toContain(
        `${props.documentType}/${props.number}/billing`
      );
      expect(notesFilesDiaries.href).toContain(
        `${props.documentType}/${props.number}/notes`
      );
      expect(quoteSummary.href).toContain(
        `${props.documentType}/${props.number}/summary`
      );
      expect(application.href).toContain(
        `${props.documentType}/${props.number}/application`
      );
    });
  });

  describe('Policy Side Nav', () => {
    const props = {
      documentType: 'policy',
      number: '123',
      children: <p>CHILDREN GET RENDERED HERE</p>
    };
    it('Displays nav links and children', async () => {
      render(<SideNav {...props} />);

      await screen.getByRole('navigation');

      const coverageRating = screen.getByRole('link', {
        name: /coverage \/ rating/i
      });
      const policyholderAgent = screen.getByRole('link', {
        name: /policyholder \/ agent/i
      });
      const mortgageBilling = screen.getByRole('link', {
        name: /mortgage \/ billing/i
      });
      const notesFilesDiaries = screen.getByRole('link', {
        name: /notes \/ files \/ diaries/i
      });
      const cancelPolicy = screen.getByRole('link', { name: /cancel policy/i });

      const endorsements = screen.getByRole('link', { name: /endorsements/i });

      expect(screen.getByRole('list').children.length).toBe(8);
      expect(coverageRating).toBeEnabled();
      expect(policyholderAgent).toBeEnabled();
      expect(mortgageBilling).toBeEnabled();
      expect(notesFilesDiaries).toBeEnabled();
      expect(cancelPolicy).toBeEnabled();
      expect(endorsements).toBeEnabled();
      expect(screen.getByText('CHILDREN GET RENDERED HERE'));
      expect(screen.getByRole('separator')).toBeVisible();
      expect(coverageRating.href).toContain(
        `${props.documentType}/${props.number}/coverage`
      );
      expect(policyholderAgent.href).toContain(
        `${props.documentType}/${props.number}/policyHolder`
      );
      expect(mortgageBilling.href).toContain(
        `${props.documentType}/${props.number}/billing`
      );
      expect(notesFilesDiaries.href).toContain(
        `${props.documentType}/${props.number}/notes`
      );
      expect(cancelPolicy.href).toContain(
        `${props.documentType}/${props.number}/cancel`
      );
      expect(endorsements.href).toContain(
        `${props.documentType}/${props.number}/endorsements`
      );
    });
  });
});
