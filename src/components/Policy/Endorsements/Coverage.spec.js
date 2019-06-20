import React from 'react';
import { shallow } from 'enzyme';
import CoverageComponent from './Coverage';

describe('Testing Endorsements / Coverage component', () => {
  it('should test app render', () => {
    const props = {
      initialValues: {
        coverageLimits: { dwelling: { minAmount: 1, maxAmount: 2 } }
      },
      normalizeDwellingAmount: value => value,
      normalizeDwellingDependencies: value => value,
      normalizePersonalPropertyPercentage: value => value,
      normalizeIncidentalOccupancies: value => value,
      normalizeSinkholeAmount: value => value,
      personalPropertyNewVal: 0,
      questions: {},
      underwritingQuestions: []
    };
    const wrapper = shallow(<CoverageComponent {...props} />);

    wrapper
      .find('[name="coverageLimits.dwelling.amount"]')
      .simulate('change', { target: { value: '4,540' } });
    wrapper
      .find('[name="coverageLimits.otherStructures.amount"]')
      .simulate('change', { target: { value: '4,540' } });
    wrapper
      .find('[name="coverageLimits.otherStructures.percentage"]')
      .simulate('change', { target: { value: '4,540' } });
    wrapper
      .find('[name="coverageLimits.personalProperty.amount"]')
      .simulate('change', { target: { value: '10,000' } });
    wrapper
      .find('[name="coverageLimits.personalProperty.percentage"]')
      .simulate('change', { target: { value: '50,000' } });
    wrapper
      .find('[name="coverageLimits.lossOfUse.amount"]')
      .simulate('change', { target: { value: '1,000' } });
    wrapper
      .find('[name="coverageLimits.personalLiability.amount"]')
      .simulate('change', { target: { value: '2,000' } });
    wrapper
      .find('[name="coverageLimits.medicalPayments.amount"]')
      .simulate('change', { target: { value: true } });
    wrapper
      .find('[name="coverageLimits.moldProperty.amount"]')
      .simulate('change', { target: { value: true } });
    wrapper
      .find('[name="coverageLimits.moldLiability.amount"]')
      .simulate('change', { target: { value: 25 } });
    wrapper
      .find('[name="deductibles.allOtherPerils.amount"]')
      .simulate('change', { target: { value: true } });
    wrapper
      .find('[name="deductibles.hurricane.amount"]')
      .simulate('change', { target: { value: true } });
    wrapper
      .find('[name="coverageOptions.sinkholePerilCoverage.answer"]')
      .simulate('change', { target: { value: true } });
  });
});
