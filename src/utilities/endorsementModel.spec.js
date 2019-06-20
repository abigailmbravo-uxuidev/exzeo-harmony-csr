import * as endorsementModel from './endorsementModel';

describe('Test endorsementModel', () => {
  const policyMock = {
    policyID: '123',
    policyHolders: [{}, {}],
    property: {
      windMitigation: {},
      physicalAddress: {},
      distanceToFireHydrant: 0,
      yearOfRoof: 1987
    },
    policyHolderMailingAddress: {},
    coverageLimits: {
      dwelling: {
        amount: 1
      },
      otherStructures: {
        amount: 1
      },
      personalProperty: {
        amount: 1
      },
      lossOfUse: {
        amount: 1
      },
      medicalPayments: {
        amount: 1
      },
      moldProperty: {
        amount: 1
      },
      personalLiability: {
        amount: 1
      },
      moldLiability: {
        amount: 1
      },
      ordinanceOrLaw: {
        amount: 1
      }
    },
    deductibles: {
      allOtherPerils: {},
      hurricane: { amount: 2000 },
      sinkhole: { amount: 2000 }
    },
    coverageOptions: {
      sinkholePerilCoverage: {},
      propertyIncidentalOccupanciesMainDwelling: {},
      propertyIncidentalOccupanciesOtherStructures: {},
      liabilityIncidentalOccupancies: {},
      personalPropertyReplacementCost: {}
    },
    underwritingAnswers: {
      rented: {},
      monthsOccupied: {},
      noPriorInsuranceSurcharge: {}
    },
    rating: {
      worksheet: {
        elements: {
          windMitigationFactors: {
            windMitigationDiscount: 0
          }
        }
      }
    }
  };

  describe('calculateEndorsementDate', () => {
    it('Should calculateEndorsementDate for America/New_York', () => {
      expect(
        endorsementModel.calculateEndorsementDate(
          '2017-05-05',
          'America/New_York'
        )
      ).toBe('2017-05-05T04:00:00Z');
    });

    describe('calculateEndorsementDate', () => {
      it('Should setEndorsementDate same as effectiveDate', () => {
        expect(
          endorsementModel.setEndorsementDate('2017-05-05', '2017-05-05')
        ).toBe('2017-05-05');
      });

      it('Should setEndorsementDate equal to effectiveDate when less than effectiveDate', () => {
        expect(
          endorsementModel.setEndorsementDate('2017-05-04', '2017-05-05')
        ).toBe('2017-05-05');
      });

      it('Should setEndorsementDate equal to endDate', () => {
        expect(
          endorsementModel.setEndorsementDate('2017-05-06', '2017-05-10')
        ).toBe('2017-05-10');
      });
    });

    it('Should set premiumAmountFormatter', () => {
      expect(endorsementModel.premiumAmountFormatter('1000')).toBe('$1,000.00');
    });

    it('Should set calculatePercentage', () => {
      expect(endorsementModel.calculatePercentage(1000, 0)).toBe(0);
      expect(endorsementModel.calculatePercentage(0, 1000)).toBe(0);
      expect(endorsementModel.calculatePercentage(1000, 1000)).toBe(100);
    });

    it('Should initializeEndorsementForm', () => {
      const result = endorsementModel.initializeEndorsementForm(policyMock);
      expect(result.policyID).toBe('123');
    });

    it('Should set premiumAmountFormatter', () => {
      const result = endorsementModel.generateModel(
        { ...policyMock, endorsementDate: '2017-05-05' },
        {
          getRate: {},
          zipcodeSettings: { timezone: 'America/New_York' },
          summaryLedger: { status: { code: 5 } }
        }
      );
      expect(result.policyID).toBe('123');
      expect(result.property.distanceToFireHydrant).toBe(0);
      expect(result.property.yearOfRoof).toBe(1987);
    });
  });
});
