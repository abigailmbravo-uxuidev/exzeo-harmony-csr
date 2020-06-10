export const mockPolicies = {
  policies: [
    {
      _id: '5d386f49d2f7664110bd6752',
      policyNumber: '12-1008954-01',
      __v: 0,
      additionalInterests: [
        {
          name2: 'ISAOA/ATIMA',
          active: true,
          _id: '5d3774ca92a4b700125909ad',
          order: 0,
          type: 'Mortgagee',
          mailingAddress: {
            _id: '5d3774ca42313b0012ed6930',
            country: {
              _id: '5d3774ca42313b0012ed6931',
              code: 'USA',
              displayText: 'United States of America'
            },
            address1: 'PO BOX 47047',
            city: 'ATLANTA',
            state: 'GA',
            zip: '30362'
          },
          name1: 'SUNTRUST BANK'
        },
        {
          name2: '',
          active: true,
          _id: '5d3774ca92a4b700125909ae',
          order: 1,
          type: 'Mortgagee',
          mailingAddress: {
            _id: '5d3774ca42313b0012ed6932',
            country: {
              _id: '5d3774ca42313b0012ed6933',
              code: 'USA',
              displayText: 'United States of America'
            },
            address1: 'PO BOX 22005',
            city: 'TAMPA',
            state: 'FL',
            zip: '33607'
          },
          name1: 'BANK OF AMERICA'
        },
        {
          name2: '',
          active: false,
          _id: '5d3774ca92a4b700125909af',
          order: null,
          type: 'Mortgagee',
          mailingAddress: {
            _id: '5d3774ca42313b0012ed6934',
            country: {
              _id: '5d3774ca42313b0012ed6935',
              code: 'USA',
              displayText: 'United States of America'
            },
            address1: 'PO BOX 55667',
            city: 'TAMPA',
            state: 'FL',
            zip: '33607'
          },
          name1: 'FIRST BANK'
        }
      ],
      agencyCode: 20000,
      agentCode: 60000,
      billPlan: 'Annual',
      billToId: '5d3774ca92a4b700125909ad',
      billToType: 'Additional Interest',
      companyCode: 'TTIC',
      cost: {
        totalCost: 1194,
        worksheet: {
          calculatedFields: {
            adminExp: 208,
            catExp: 179,
            coverageAFactor: 1.007,
            hurricaneTEFactor: 352.09,
            nonCatExp: 545,
            retentionExp: 262.46
          },
          inputFields: {
            aopDeductible: 1000,
            companyCode: 'TTIC',
            constructionType: 'M',
            coverageA: 257000,
            coverageB: 5140,
            coverageC: 64250,
            coverageD: 25700,
            currentYear: '2018',
            hurricaneDeductible: 2,
            openingProtection: 'N',
            product: 'HO3',
            replacementCost: false,
            roofGeometry: 'Gable',
            sinkholeDeductible: 10,
            state: 'FL',
            version: '201801',
            yearBuilt: 1994,
            zip: '33624'
          },
          lookupFields: {
            baseCost: 125,
            baseCoverageA: 250000,
            claimCost: 1500,
            claimRateFactor: 5.5,
            countyName: 'HILLSBOROUGH',
            exteriorWaterLossCost: 22,
            fireLossCost: 101,
            hailLossCost: 19,
            hurricaneConstructionTypeFactor: 1,
            hurricaneDeductibleFactor: 1,
            hurricaneFactor: 0.509403,
            hurricaneOpeningProtectionFactor: 1,
            hurricaneRetentionMult: 1.463338,
            hurricaneRoofShapeFactor: 1,
            hurricaneYearBuiltFactor: 1,
            interiorWaterLossCost: 188,
            liabilityLossCost: 2,
            lossCostAdjust: 100,
            maxCoverageA: 750000,
            minCoverageA: 150000,
            miscLossCost: 38,
            nonCatConstructionLossCost: 0,
            otherWindLossCost: 45,
            sinkholeLossCost: 26,
            theftLossCost: 3
          }
        }
      },
      coverageLimits: {
        dwelling: {
          amount: 257000,
          displayText: 'Dwelling',
          format: 'Currency',
          inflationFactor: 1.04,
          initialValue: 257000,
          letterDesignation: 'A',
          maxAmount: 334000,
          minAmount: 231000,
          name: 'dwelling',
          required: true,
          root: true,
          value: 257000
        },
        lossOfUse: {
          amount: 25700,
          displayText: 'Loss of Use',
          format: 'Percentage',
          initialValue: 10,
          letterDesignation: 'D',
          name: 'lossOfUse',
          ofCoverageLimit: 'dwelling',
          required: true,
          value: 10
        },
        medicalPayments: {
          amount: 2000,
          displayText: 'Medical Payments',
          format: 'Currency',
          initialValue: 2000,
          letterDesignation: 'F',
          name: 'medicalPayments',
          required: true,
          value: 2000
        },
        moldLiability: {
          amount: 50000,
          displayText: 'Mold Liability',
          format: 'Currency',
          initialValue: 50000,
          name: 'moldLiability',
          required: true,
          value: 50000
        },
        moldProperty: {
          amount: 10000,
          displayText: 'Mold Property',
          format: 'Currency',
          initialValue: 10000,
          name: 'moldProperty',
          required: true,
          value: 10000
        },
        ordinanceOrLaw: {
          amount: 25,
          calculatedAmount: 64250,
          displayText: 'Ordinance or Law',
          format: 'Percentage',
          initialValue: 25,
          name: 'ordinanceOrLaw',
          ofCoverageLimit: 'dwelling',
          required: true,
          value: 25
        },
        otherStructures: {
          amount: 5140,
          displayText: 'Other Structures',
          format: 'Currency',
          initialValue: 2,
          letterDesignation: 'B',
          name: 'otherStructures',
          required: true,
          value: 2
        },
        personalLiability: {
          amount: 300000,
          displayText: 'Personal Liability',
          format: 'Currency',
          initialValue: 300000,
          letterDesignation: 'E',
          name: 'personalLiability',
          required: true,
          value: 300000
        },
        personalProperty: {
          amount: 64250,
          displayText: 'Personal Property',
          format: 'Currency',
          initialValue: 25,
          letterDesignation: 'C',
          name: 'personalProperty',
          required: true,
          value: 25
        }
      },
      coverageOptions: {
        liabilityIncidentalOccupancies: {
          answer: false,
          default: false,
          displayText: 'Liability Permitted Incidental Occupancies',
          name: 'liabilityIncidentalOccupancies'
        },
        personalPropertyReplacementCost: {
          answer: false,
          default: true,
          displayText: 'Personal Property Replacement Cost',
          name: 'personalPropertyReplacementCost'
        },
        propertyIncidentalOccupanciesMainDwelling: {
          answer: false,
          default: false,
          displayText:
            'Property Permitted Incidental Occupancies Main Dwelling',
          name: 'propertyIncidentalOccupanciesMainDwelling'
        },
        propertyIncidentalOccupanciesOtherStructures: {
          answer: false,
          default: false,
          displayText:
            'Property Permitted Incidental Occupancies Other Structures',
          name: 'propertyIncidentalOccupanciesOtherStructures'
        },
        sinkholePerilCoverage: {
          answer: true,
          default: true,
          displayText: 'Sinkhole Peril Coverage',
          name: 'sinkholePerilCoverage'
        }
      },
      createdAt: '2019-07-24T14:46:33.372Z',
      createdBy: {
        _id: '5e5585487f60b00072148f30',
        userId: 'auth0|SYSTEMUSER|0',
        userName: 'SYSTEMUSER'
      },
      deductibles: {
        allOtherPerils: {
          amount: 1000,
          displayText: 'All Other Perils',
          format: 'Currency',
          initialValue: 1000,
          name: 'allOtherPerils',
          required: true,
          value: 1000
        },
        hurricane: {
          amount: 2,
          calculatedAmount: 5140,
          displayText: 'Hurricane',
          format: 'Currency',
          initialValue: 2,
          name: 'hurricane',
          required: true,
          value: 2
        },
        sinkhole: {
          amount: 10,
          calculatedAmount: 25700,
          displayText: 'Sinkhole',
          format: 'Percentage',
          initialValue: 10,
          name: 'sinkhole',
          ofCoverageLimit: 'dwelling',
          required: true,
          value: 10
        }
      },
      editHash:
        'f2b75431cf5f3bb35c4f58ebe478373dc94fc6aa3141266b197763add102bf34',
      effectiveDate: '2019-07-30T04:00:00.000Z',
      endDate: '2020-07-30T04:00:00.000Z',
      forms: [
        {
          _id: '5d386f49ba28f500120cbc52',
          formNumber: 'TTIC HO3 Mail Page',
          formName: 'Mailing page',
          editionDate: '01 17'
        },
        {
          _id: '5d386f49ba28f500120cbc51',
          formNumber: 'TTIC NB HO Welcome',
          formName: 'Welcome letter',
          editionDate: '03 18'
        },
        {
          _id: '5d386f49ba28f500120cbc50',
          formNumber: 'TTIC Privacy',
          formName: 'Privacy Policy',
          editionDate: '01 16'
        },
        {
          _id: '5d386f49ba28f500120cbc4f',
          formNumber: 'TTIC HO3J',
          formName: 'Policy Jacket',
          editionDate: '01 17'
        },
        {
          _id: '5d386f49ba28f500120cbc4e',
          formNumber: 'TTIC HO3 DEC',
          formName: 'Dec Page',
          editionDate: '01 17'
        },
        {
          _id: '5d386f49ba28f500120cbc4d',
          formNumber: 'TTIC OC HO3',
          formName: 'Outline Of Coverage',
          editionDate: '04 17'
        },
        {
          _id: '5d386f49ba28f500120cbc4c',
          formNumber: 'OIR-B1-1670',
          formName: 'Checklist of Coverage',
          editionDate: '01 01 06'
        },
        {
          _id: '5d386f49ba28f500120cbc4b',
          formNumber: 'TTIC HO3 TOC',
          formName: 'Table of Contents HO3',
          editionDate: '01 17'
        },
        {
          _id: '5d386f49ba28f500120cbc4a',
          formNumber: 'TTIC HO3',
          formName: 'Homeowners 3 - Special Form',
          editionDate: '01 17'
        },
        {
          _id: '5d386f49ba28f500120cbc49',
          formNumber: 'OIR-B1-1655',
          formName: 'Notice of Premium Discounts for Hurricane Loss Mitigation',
          editionDate: '02 10'
        },
        {
          _id: '5d386f49ba28f500120cbc48',
          formNumber: 'TTIC HO 04 96',
          formName: 'No Section II Liab Cov Home Daycare',
          editionDate: '10 16'
        },
        {
          _id: '5d386f49ba28f500120cbc47',
          formNumber: 'TTIC HO3 SLCR',
          formName: 'Sinkhole Loss Coverage',
          editionDate: '05 18'
        },
        {
          _id: '5d386f49ba28f500120cbc46',
          formNumber: 'TTIC 23 94',
          formName: 'Sinkhole Loss Coverage - FL',
          editionDate: '01 17'
        },
        {
          _id: '5d386f49ba28f500120cbc45',
          formNumber: 'TTIC HO3 DO',
          formName: 'Deductible Options',
          editionDate: '01 17'
        },
        {
          _id: '5d386f49ba28f500120cbc44',
          formNumber: 'TTIC HO3 OL',
          formName: 'Ordinance or Law Coverage',
          editionDate: '04 17'
        },
        {
          _id: '5d386f49ba28f500120cbc43',
          formNumber: 'HO 03 51',
          formName: 'Calendar Year Hurricane Deductible FL',
          editionDate: '05 05'
        },
        {
          _id: '5d386f49ba28f500120cbc42',
          formNumber: 'TTIC PD',
          formName: 'Invoice',
          editionDate: '01 16'
        }
      ],
      issueDate: '2019-07-24T14:46:33.359Z',
      policyAccountCode: 10000,
      policyHolderMailingAddress: {
        _id: '5d386f49ba28f500120cbc57',
        address1: '4019 BRAESGATE LN',
        address2: '',
        careOf: '',
        city: 'TAMPA',
        country: {
          _id: '5d3774e6f147e900120671c3',
          code: 'USA',
          displayText: 'United States of America'
        },
        state: 'FL',
        zip: '33624',
        zipExtension: '1808'
      },
      policyHolders: [
        {
          electronicDelivery: false,
          _id: '5d376a121d3bac0012c14c6e',
          firstName: 'Matthew',
          lastName: 'Overton',
          emailAddress: 'test@typtap.com',
          primaryPhoneNumber: '8136103643',
          order: 0,
          entityType: 'Person'
        },
        {
          electronicDelivery: false,
          _id: '5d376a121d3bac0012c14c6d',
          firstName: 'Jennifer',
          lastName: 'Overton',
          emailAddress: 'test@typtap.com',
          primaryPhoneNumber: '8136103643',
          order: 1,
          entityType: 'Person'
        }
      ],
      policyTerm: 1,
      policyVersion: 4,
      product: 'HO3',
      property: {
        townhouseRowhouse: false,
        pool: true,
        poolSecured: true,
        divingBoard: false,
        trampoline: false,
        fireAlarm: false,
        burglarAlarm: false,
        sprinkler: 'N',
        gatedCommunity: false,
        _id: '5d37699f1d3bac0012c14aa4',
        FEMAfloodZone: 'X',
        birdcage: '1',
        buildingCodeEffectivenessGrading: 99,
        constructionType: 'MASONRY',
        coverageLimits: {
          dwelling: {
            amount: '256736',
            displayText: 'Dwelling',
            format: 'Currency'
          }
        },
        distanceToFireHydrant: 215.2542493,
        distanceToFireStation: 0.49,
        distanceToTidalWater: 47150.4,
        familyUnits: '1-2',
        floodZone: 'X',
        id: '12057E9A4FFCF7794',
        physicalAddress: {
          _id: '5d37699f1d3bac0012c14aa5',
          address1: '4019 BRAESGATE LN',
          address2: '',
          city: 'TAMPA',
          county: 'HILLSBOROUGH',
          latitude: 28.09416,
          longitude: -82.51191,
          state: 'FL',
          zip: '33624'
        },
        protectionClass: 5,
        relativeElevation: 42,
        residenceType: 'SINGLE FAMILY',
        source: 'CasaClue',
        squareFeet: 1772,
        territory: '080-0',
        timezone: 'AMERICA/NEW_YORK',
        windMitigation: {
          _id: '5d37699f1d3bac0012c14aa6',
          floridaBuildingCodeWindSpeed: 120,
          floridaBuildingCodeWindSpeedDesign: 120,
          internalPressureDesign: 'Other',
          openingProtection: 'None',
          roofCovering: 'FBC',
          roofDeckAttachment: 'B',
          roofGeometry: 'Gable',
          roofToWallConnection: 'Toe Nails',
          secondaryWaterResistance: 'Other',
          terrain: 'B',
          windBorneDebrisRegion: 'Yes'
        },
        yearBuilt: 1978,
        yearOfRoof: 2010
      },
      rating: {
        windMitigationDiscount: 0,
        _id: '5d376a28f147e90012065640',
        engineCode: 'HO3ByPeril',
        netPremium: 1602,
        rateCode: 201704,
        totalFees: 27,
        totalPremium: 1629,
        worksheet: {
          additionalCoverages: {
            increasedLiabilityMoldFungiLimit: 0,
            increasedPersonalLiabilityLimit: 22,
            increasedPropertyMoldFungiLimit: 0,
            liabilityIncidentalOccupancies: 0,
            otherStructIncLimits: 0,
            propertyIncidentalOccupancies: 0
          },
          additionalCoveragesSum: 22,
          bcegAdjustment: 3,
          elements: {
            ageOfHomeByYearFactors: {
              hurricane: 1.08,
              otherWind: 1.08,
              yearBuilt: 1978
            },
            ageOfHomeFactors: {
              ageOfHome: 41,
              allOtherPerils: 2.358,
              fire: 2.358,
              liability: 2.358,
              sinkhole: 2.358,
              water: 2.358
            },
            baseRates: {
              allOtherPerils: 153.35,
              fire: 309.05,
              hurricane: 613.41,
              liability: 56.96,
              otherWind: 22.98,
              sinkhole: 7.47,
              water: 516.56
            },
            bcegFactors: {
              allOtherPerils: 1,
              fire: 1,
              grade: 99,
              hurricane: 1.01,
              liability: 1,
              otherWind: 1.01,
              sinkhole: 1,
              territoryGroup: 3,
              water: 1
            },
            burglarAlarmFactors: {
              allOtherPerils: 1,
              burglarAlarm: false,
              fire: 1,
              hurricane: 1,
              liability: 1,
              otherWind: 1,
              sinkhole: 1,
              water: 1
            },
            coverageAFactors: {
              allOtherPerils: 1.931,
              fire: 1.931,
              hurricane: 1.931,
              liability: 1,
              otherWind: 1.931,
              sinkhole: 1.931,
              water: 1.931
            },
            coverageBFactors: {
              allOtherPerils: 0.97,
              fire: 0.97,
              hurricane: 0.97,
              liability: 1,
              otherWind: 0.97,
              sinkhole: 0.97,
              water: 0.97
            },
            coverageCFactors: {
              allOtherPerils: 0.925,
              fire: 0.925,
              hurricane: 0.85,
              liability: 1,
              otherWind: 0.925,
              sinkhole: 0.925,
              water: 0.925
            },
            deductibleFactors: {
              allOtherPerils: 1,
              allOtherPerilsDeductible: 1000,
              exWind: false,
              fire: 1,
              hurricane: 1,
              hurricaneDeductible: 2,
              liability: 1,
              otherWind: 1,
              sinkhole: 1,
              water: 1
            },
            fireAlarmAndSprinklerFactors: {
              allOtherPerils: 1,
              fire: 1,
              fireAlarm: false,
              hurricane: 1,
              liability: 1,
              otherWind: 1,
              sinkhole: 1,
              sprinkler: 'N',
              water: 1
            },
            noPriorInsuranceFactors: {
              allOtherPerils: 1,
              fire: 1,
              hurricane: 1,
              liability: 1,
              noPriorInsurance: false,
              otherWind: 1,
              sinkhole: 1,
              water: 1
            },
            ordinanceOrLawFactors: {
              allOtherPerils: 1,
              fire: 1,
              hurricane: 1,
              liability: 1,
              ordinanceOrLaw: false,
              otherWind: 1,
              sinkhole: 1,
              water: 1
            },
            protectionClassFactors: {
              allOtherPerils: 0.852,
              constructionCode: 'M',
              constructionType: 'Masonry',
              fire: 0.852,
              hurricane: 0.817,
              liability: 1,
              otherWind: 0.817,
              protectionClass: 5,
              sinkhole: 0.852,
              water: 0.852
            },
            replacementCostFactors: {
              allOtherPerils: 1,
              fire: 1,
              hurricane: 1,
              liability: 1,
              otherWind: 1,
              replacementCost: false,
              sinkhole: 1,
              water: 1
            },
            seasonalFactors: {
              allOtherPerils: 1,
              fire: 1,
              hurricane: 1,
              liability: 1,
              otherWind: 1,
              seasonal: false,
              sinkhole: 1,
              water: 1
            },
            territoryFactors: {
              allOtherPerils: 0.172,
              code: '080-0',
              fire: 0.172,
              group: 3,
              hurricane: 0.477,
              liability: 0.17,
              minPremium: 0.002,
              name: 'Hillsborough,Excl.Tampa',
              otherWind: 0.477,
              sinkhole: 23.731,
              water: 0.172
            },
            townRowHouseFactors: {
              allOtherPerils: 1,
              fire: 1,
              hurricane: 1,
              liability: 1,
              otherWind: 1,
              protectionClass: 5,
              sinkhole: 1,
              units: '1-2',
              water: 1
            },
            windMitigationFactors: {
              allOtherPerils: 1,
              fire: 1,
              hurricane: 0.82,
              liability: 1,
              otherWind: 0.82,
              sinkhole: 1,
              water: 1,
              windMitigationDiscount: 0.18
            }
          },
          fees: {
            citizensFee: 0,
            empTrustFee: 2,
            fhcfFee: 0,
            figaFee: 0,
            mgaPolicyFee: 25
          },
          minimumPremiumAdjustment: 0,
          netPremium: 1602,
          perilPremiums: {
            allOtherPerils: 92,
            fire: 185,
            hurricane: 340,
            liability: 23,
            otherWind: 14,
            sinkhole: 617,
            water: 309
          },
          perilPremiumsSum: 1580,
          subtotalPremium: 1602,
          totalFees: 27,
          totalPremium: 1629
        }
      },
      sourceNumber: '12-5152582-01',
      state: 'FL',
      status: 1,
      transactionId: '5e55854805f5587b6c98f9f4',
      transactionType: 'AOR Endorsement',
      underwritingAnswers: {
        business: {
          answer: 'No',
          question: 'Is a business conducted on the property?',
          source: 'Customer'
        },
        fourPointUpdates: {
          answer: 'Yes',
          question:
            'Have the wiring, plumbing, and HVAC been updated in the last 35 years?',
          source: 'Customer'
        },
        monthsOccupied: {
          answer: '10+',
          question: 'How many months a year does the owner live in the home?',
          source: 'Customer'
        },
        noPriorInsuranceSurcharge: {
          answer: 'No',
          question:
            'If not new purchase, please provide proof of prior insurance.',
          source: 'Customer'
        },
        previousClaims: {
          answer: 'No claims ever filed',
          question: 'When was the last claim filed?',
          source: 'Customer'
        },
        rented: {
          answer: 'Never',
          question:
            'Is the home or any structures on the property ever rented?',
          source: 'Customer'
        }
      },
      updatedAt: '2020-02-25T20:36:24.164Z',
      updatedBy: {
        _id: '5e5585487f60b00072148f16',
        userId: 'auth0|59419e3a43e76f16f68c3349',
        userName: 'tticcsr'
      },
      nextActionPolicyNumber: '12-1008954-01',
      nextStatusActionDate: '2020-05-31T04:00:00.000Z',
      nextStatusActionNeeded: 'Renew Policy',
      manualInterventionRequired: false,
      policyID: '5d3fc10390e78f0011d236a0'
    }
  ]
};

export default mockPolicies;
