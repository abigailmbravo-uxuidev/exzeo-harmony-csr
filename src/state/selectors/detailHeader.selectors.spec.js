import * as detailSelectors from './detailHeader.selectors';

describe('Detail Header selectors', () => {
  it('should get Policy Details', () => {
    const state = {
      list: {
        appraisers: [
          {
            answer: 'http://www.acpafl.org/',
            label: 'ALACHUA'
          }
        ]
      },
      policyState: {
        policy: {
          coverageLimits: {
            personalProperty: {
              _id: '5bb77c0b940ee70012e2cc5b',
              format: 'Currency',
              amount: 175000,
              letterDesignation: 'C',
              displayText: 'Personal Property'
            },
            otherStructures: {
              _id: '5bb77c0b940ee70012e2cc5c',
              format: 'Currency',
              amount: 25000,
              letterDesignation: 'B',
              displayText: 'Other Structures'
            },
            medicalPayments: {
              _id: '5bb77c0b940ee70012e2cc5d',
              format: 'Currency',
              amount: 2000,
              letterDesignation: 'F',
              displayText: 'Medical Payments'
            },
            moldProperty: {
              _id: '5bb77c0b940ee70012e2cc5e',
              amount: 10000,
              displayText: 'Mold Property',
              format: 'Currency'
            },
            ordinanceOrLaw: {
              _id: '5bb77c0b940ee70012e2cc5f',
              format: 'Percentage',
              amount: 50,
              displayText: 'Ordinance or Law',
              ofCoverageLimit: 'dwelling'
            },
            lossOfUse: {
              _id: '5bb77c0b940ee70012e2cc60',
              format: 'Currency',
              amount: 50000,
              letterDesignation: 'D',
              displayText: 'Loss of Use'
            },
            personalLiability: {
              _id: '5bb77c0b940ee70012e2cc61',
              format: 'Currency',
              amount: 300000,
              letterDesignation: 'E',
              displayText: 'Personal Liability'
            },
            dwelling: {
              _id: '5bb77c0b940ee70012e2cc62',
              format: 'Currency',
              maxAmount: 605000,
              amount: 500000,
              letterDesignation: 'A',
              minAmount: 419000,
              displayText: 'Dwelling'
            },
            moldLiability: {
              _id: '5bb77c0b940ee70012e2cc63',
              amount: 50000,
              displayText: 'Mold Liability',
              format: 'Currency'
            }
          },
          coverageOptions: {
            sinkholePerilCoverage: {
              _id: '5bb77c0b940ee70012e2cc55',
              answer: false,
              displayText: 'Sinkhole Peril Coverage'
            },
            propertyIncidentalOccupanciesOtherStructures: {
              _id: '5bb77c0b940ee70012e2cc56',
              answer: true,
              displayText:
                'Property Permitted Incidental Occupancies Other Structures'
            },
            liabilityIncidentalOccupancies: {
              _id: '5bb77c0b940ee70012e2cc57',
              answer: true,
              displayText: 'Liability Permitted Incidental Occupancies'
            },
            personalPropertyReplacementCost: {
              _id: '5bb77c0b940ee70012e2cc58',
              answer: true,
              displayText: 'Personal Property Replacement Cost'
            },
            propertyIncidentalOccupanciesMainDwelling: {
              _id: '5bb77c0b940ee70012e2cc59',
              answer: false,
              displayText:
                'Property Permitted Incidental Occupancies Main Dwelling'
            }
          },
          deductibles: {
            hurricane: {
              _id: '5bb77c0b940ee70012e2cc53',
              format: 'Percentage',
              amount: 5,
              displayText: 'Hurricane',
              ofCoverageLimit: 'dwelling',
              calculatedAmount: 25000
            },
            allOtherPerils: {
              _id: '5bb77c0b940ee70012e2cc52',
              amount: 1000,
              displayText: 'All Other Perils',
              format: 'Currency'
            }
          },
          underwritingAnswers: {
            previousClaims: {
              _id: '5bb77c77a0a55800133fc1fc',
              answer: 'No claims ever filed',
              question: 'How many claims in the past 5 years?',
              source: 'Customer'
            },
            rented: {
              _id: '5bb77c77a0a55800133fc1fd',
              answer: 'Never',
              question:
                'Is the home or any structures on the property ever rented?',
              source: 'Customer'
            },
            monthsOccupied: {
              _id: '5bb77c77a0a55800133fc1fe',
              answer: '10+',
              question:
                'How many months a year does the owner live in the home?',
              source: 'Customer'
            },
            fourPointUpdates: {
              _id: '5bb77c77a0a55800133fc1ff',
              answer: 'Yes',
              question:
                'Has the wiring, plumbing, HVAC, and roof been updated in the last 35 years?',
              source: 'Customer'
            },
            noPriorInsuranceSurcharge: {
              _id: '5bb77be4a0a55800133fae66',
              question:
                'If not new purchase, please provide proof of prior insurance.',
              answer: 'No',
              source: 'Default'
            },
            floodCoverage: {
              _id: '5bb77be4a0a55800133fae65',
              question:
                'Does this property have a separate insurance policy covering flood losses?',
              answer: 'Yes',
              source: 'Default'
            }
          },
          issueDate: '2018-10-05T15:07:23.042Z',
          billPlan: 'Annual',
          billToId: '5bb77c0b940ee70012e2cc12',
          policyHolders: [
            {
              electronicDelivery: false,
              _id: '5bb77c0b940ee70012e2cc12',
              secondaryPhoneNumber: '7272223344',
              emailAddress: 'exzeoqa2@exzeo.com',
              primaryPhoneNumber: '7271231234',
              lastName: 'Robin CSR006',
              firstName: 'Batman',
              entityType: 'Person',
              order: 0
            },
            {
              electronicDelivery: false,
              _id: '5bb77c0b940ee70012e2cc11',
              secondaryPhoneNumber: '8135556677',
              emailAddress: 'exzeoqa2@exzeo.com',
              primaryPhoneNumber: '8132223344',
              lastName: 'Woman',
              firstName: 'Wonder',
              entityType: 'Person',
              order: 1
            }
          ],
          state: 'FL',
          agencyCode: 20000,
          companyCode: 'TTIC',
          sourceNumber: '12-5148842-01',
          billToType: 'Policyholder',
          transactionType: 'Pending Voluntary Cancellation',
          additionalInterests: [
            {
              active: true,
              _id: '5bb77c35940ee70012e2dd3d',
              phoneNumber: null,
              name2: 'Karen Williamson',
              name1: 'Mark Williamson',
              order: 0,
              type: 'Additional Interest',
              mailingAddress: {
                _id: '5bb77c35940ee70012e2dd3f',
                city: 'St. Petersburg',
                zip: '33701',
                state: 'FL',
                country: {
                  _id: '5bb77c35940ee70012e2dd40',
                  displayText: 'United States of America',
                  code: 'USA'
                },
                address2: '8321 57th Street N',
                address1: 'PO Box 8321'
              },
              referenceNumber: 'AddInt1Ref101LM89'
            },
            {
              active: true,
              _id: '5bb77c3fa0a55800133fb7e2',
              phoneNumber: null,
              name2: '',
              name1: 'Roger Levin',
              order: 1,
              type: 'Additional Interest',
              mailingAddress: {
                _id: '5bb77c3fa0a55800133fb7e4',
                city: 'Wayne',
                zip: '07470',
                state: 'NJ',
                country: {
                  _id: '5bb77c3fa0a55800133fb7e5',
                  code: 'USA',
                  displayText: 'United States of America'
                },
                address2: '1 Littleton Rd',
                address1: 'Suite 223'
              },
              referenceNumber: 'AddInt2Ref212PY'
            },
            {
              active: true,
              _id: '5bb77c4a940ee70012e2e21c',
              phoneNumber: null,
              name2: 'Bill Payer Name2',
              name1: 'William Payer',
              order: 0,
              type: 'Bill Payer',
              mailingAddress: {
                _id: '5bb77c4a940ee70012e2e21e',
                city: 'Tampa',
                zip: '33607',
                state: 'FL',
                country: {
                  _id: '5bb77c4a940ee70012e2e21f',
                  displayText: 'United States of America',
                  code: 'USA'
                },
                address2: '747 Waters Edge',
                address1: 'Suite 747'
              },
              referenceNumber: 'BillRef88779'
            }
          ],
          policyHolderMailingAddress: {
            _id: '5bb77e2b91d95900122182c5',
            city: 'TAMPA',
            zip: '33607',
            state: 'FL',
            country: {
              _id: '5bb77c6ba0a55800133fbc0d',
              code: 'USA',
              displayText: 'United States of America'
            },
            address2: 'TEST MAILING ADDRESS2',
            careOf: '',
            address1: 'TEST MAILING ADDRESS1'
          },
          cost: {
            totalCost: 125,
            worksheet: {
              inputFields: {
                coverageD: 46500,
                aopDeductible: 1000,
                currentYear: '2018',
                roofGeometry: 'Hip',
                zip: '00019',
                state: 'FL',
                coverageA: 465000,
                companyCode: 'TTIC',
                sinkholeDeductible: 10,
                constructionType: 'S',
                coverageB: 23250,
                version: '201801',
                yearBuilt: 2007,
                replacementCost: true,
                openingProtection: 'N',
                hurricaneDeductible: 5,
                coverageC: 232500,
                product: 'HO3'
              },
              lookupFields: {
                hurricaneConstructionTypeFactor: 1,
                hurricaneRetentionMult: 1.463338,
                claimCost: 1500,
                hurricaneRoofShapeFactor: 0.753726,
                hurricaneYearBuiltFactor: 0.327291,
                hurricaneDeductibleFactor: 0.781534,
                baseCost: 125,
                baseCoverageA: 250000,
                hurricaneOpeningProtectionFactor: 1,
                maxCoverageA: 750000,
                minCoverageA: 150000,
                nonCatConstructionLossCost: 0
              },
              calculatedFields: {
                adminExp: 125,
                nonCatExp: 0,
                catExp: 0,
                coverageAFactor: 1.215,
                retentionExp: 0,
                hurricaneTEFactor: 767.25
              }
            }
          },
          rating: {
            windMitigationDiscount: 0,
            _id: '5bb7838c91d9590012218574',
            totalFees: 27,
            rateCode: 201704,
            engineCode: 'HO3ByPeril',
            worksheet: {
              elements: {
                bcegFactors: {
                  fire: 1,
                  allOtherPerils: 1,
                  water: 1,
                  territoryGroup: 4,
                  otherWind: 0.912,
                  grade: 2,
                  liability: 1,
                  sinkhole: 1,
                  hurricane: 0.912
                },
                townRowHouseFactors: {
                  fire: 1,
                  allOtherPerils: 1,
                  water: 1,
                  otherWind: 1,
                  units: '1-2',
                  liability: 1,
                  sinkhole: 1,
                  hurricane: 1,
                  protectionClass: 4
                },
                burglarAlarmFactors: {
                  fire: 1,
                  allOtherPerils: 0.549,
                  burglarAlarm: true,
                  water: 1,
                  otherWind: 1,
                  liability: 1,
                  sinkhole: 1,
                  hurricane: 1
                },
                windMitigationFactors: {
                  fire: 1,
                  windMitigationDiscount: 0.81,
                  allOtherPerils: 1,
                  water: 1,
                  otherWind: 0.19,
                  liability: 1,
                  sinkhole: 1,
                  hurricane: 0.19
                },
                deductibleFactors: {
                  allOtherPerilsDeductible: 1000,
                  fire: 0.97,
                  allOtherPerils: 0.97,
                  water: 0.97,
                  otherWind: 0.97,
                  hurricaneDeductible: 5,
                  liability: 1,
                  sinkhole: 1,
                  exWind: false,
                  hurricane: 0.97
                },
                coverageCFactors: {
                  fire: 0.955,
                  allOtherPerils: 0.955,
                  water: 0.955,
                  otherWind: 0.955,
                  liability: 1,
                  sinkhole: 1,
                  hurricane: 0.91
                },
                coverageBFactors: {
                  fire: 0.982,
                  allOtherPerils: 0.982,
                  water: 0.982,
                  otherWind: 0.982,
                  liability: 1,
                  sinkhole: 1,
                  hurricane: 0.982
                },
                territoryFactors: {
                  name: 'PalmBeach,Remainder',
                  fire: 0.504,
                  allOtherPerils: 0.504,
                  code: '038-0',
                  water: 0.504,
                  otherWind: 2.627,
                  minPremium: 0.002,
                  liability: 0.493,
                  sinkhole: 1,
                  group: 4,
                  hurricane: 2.627
                },
                coverageAFactors: {
                  fire: 3.467,
                  allOtherPerils: 3.467,
                  water: 3.467,
                  otherWind: 3.467,
                  liability: 1,
                  sinkhole: 1,
                  hurricane: 3.527
                },
                ordinanceOrLawFactors: {
                  fire: 1.054,
                  allOtherPerils: 1.054,
                  water: 1.054,
                  otherWind: 1.054,
                  ordinanceOrLaw: true,
                  liability: 1,
                  sinkhole: 1,
                  hurricane: 1.054
                },
                replacementCostFactors: {
                  fire: 1.125,
                  allOtherPerils: 1.125,
                  water: 1.125,
                  otherWind: 1.125,
                  replacementCost: true,
                  liability: 1,
                  sinkhole: 1,
                  hurricane: 1.125
                },
                fireAlarmAndSprinklerFactors: {
                  fireAlarm: true,
                  fire: 0.411,
                  allOtherPerils: 1,
                  water: 1,
                  otherWind: 1,
                  sprinkler: 'B',
                  liability: 1,
                  sinkhole: 1,
                  hurricane: 1
                },
                seasonalFactors: {
                  fire: 1,
                  allOtherPerils: 1,
                  water: 1,
                  otherWind: 1,
                  seasonal: false,
                  liability: 1,
                  sinkhole: 1,
                  hurricane: 1
                },
                noPriorInsuranceFactors: {
                  fire: 1,
                  allOtherPerils: 1,
                  noPriorInsurance: false,
                  water: 1,
                  otherWind: 1,
                  liability: 1,
                  sinkhole: 1,
                  hurricane: 1
                },
                ageOfHomeFactors: {
                  fire: 1.831,
                  allOtherPerils: 1.831,
                  water: 1.831,
                  liability: 1.831,
                  sinkhole: 1,
                  ageOfHome: 11
                },
                ageOfHomeByYearFactors: {
                  yearBuilt: 2007,
                  hurricane: 1,
                  otherWind: 1
                },
                baseRates: {
                  fire: 309.05,
                  allOtherPerils: 153.35,
                  water: 516.56,
                  otherWind: 22.98,
                  liability: 56.96,
                  sinkhole: 0,
                  hurricane: 613.41
                },
                protectionClassFactors: {
                  fire: 0.792,
                  allOtherPerils: 0.792,
                  constructionCode: 'S',
                  constructionType: 'Superior',
                  water: 0.792,
                  otherWind: 0.761,
                  liability: 1,
                  sinkhole: 1,
                  hurricane: 0.761,
                  protectionClass: 4
                }
              },
              totalFees: 27,
              bcegAdjustment: -78,
              minimumPremiumAdjustment: 0,
              perilPremiumsSum: 2840,
              additionalCoveragesSum: 188,
              subtotalPremium: 3028,
              additionalCoverages: {
                increasedLiabilityMoldFungiLimit: 0,
                liabilityIncidentalOccupancies: 16,
                increasedPropertyMoldFungiLimit: 0,
                increasedPersonalLiabilityLimit: 22,
                propertyIncidentalOccupancies: 150,
                otherStructIncLimits: 0
              },
              netPremium: 3028,
              totalPremium: 3055,
              perilPremiums: {
                fire: 347,
                allOtherPerils: 230,
                water: 1412,
                otherWind: 30,
                liability: 51,
                sinkhole: 0,
                hurricane: 770
              },
              fees: {
                citizensFee: 0,
                empTrustFee: 2,
                mgaPolicyFee: 25,
                fhcfFee: 0,
                figaFee: 0
              }
            },
            netPremium: 3028,
            totalPremium: 3055
          },
          forms: [
            {
              _id: '5bb7838c91d959001221858a',
              formName: 'Mailing page',
              formNumber: 'TTIC HO3 Mail Page',
              editionDate: '01 17'
            },
            {
              _id: '5bb7838c91d9590012218589',
              formName: 'Welcome letter',
              formNumber: 'TTIC NB HO Welcome',
              editionDate: '03 18'
            },
            {
              _id: '5bb7838c91d9590012218588',
              formName: 'Privacy Policy',
              formNumber: 'TTIC Privacy',
              editionDate: '01 16'
            },
            {
              _id: '5bb7838c91d9590012218587',
              formName: 'Policy Jacket',
              formNumber: 'TTIC HO3J',
              editionDate: '01 17'
            },
            {
              _id: '5bb7838c91d9590012218586',
              formName: 'Dec Page',
              formNumber: 'TTIC HO3 DEC',
              editionDate: '01 17'
            },
            {
              _id: '5bb7838c91d9590012218585',
              formName: 'Outline Of Coverage',
              formNumber: 'TTIC OC HO3',
              editionDate: '04 17'
            },
            {
              _id: '5bb7838c91d9590012218584',
              formName: 'Checklist of Coverage',
              formNumber: 'OIR-B1-1670',
              editionDate: '01 01 06'
            },
            {
              _id: '5bb7838c91d9590012218583',
              formName: 'Table of Contents HO3',
              formNumber: 'TTIC HO3 TOC',
              editionDate: '01 17'
            },
            {
              _id: '5bb7838c91d9590012218582',
              formName: 'Homeowners 3 - Special Form',
              formNumber: 'TTIC HO3',
              editionDate: '01 17'
            },
            {
              _id: '5bb7838c91d9590012218581',
              formName:
                'Notice of Premium Discounts for Hurricane Loss Mitigation',
              formNumber: 'OIR-B1-1655',
              editionDate: '02 10'
            },
            {
              _id: '5bb7838c91d9590012218580',
              formName:
                'Windstorm Exterior Paint or Waterproofing Exclusion - Seacoast - FL',
              formNumber: 'TTIC HO 23 70',
              editionDate: '01 17'
            },
            {
              _id: '5bb7838c91d959001221857f',
              formName: 'No Section II Liab Cov Home Daycare',
              formNumber: 'TTIC HO 04 96',
              editionDate: '10 16'
            },
            {
              _id: '5bb7838c91d959001221857e',
              formName: 'Additional Interests',
              formNumber: 'TTIC HO 04 10',
              editionDate: '10 16'
            },
            {
              _id: '5bb7838c91d959001221857d',
              formName: 'Sinkhole Loss Coverage',
              formNumber: 'TTIC HO3 SLCR',
              editionDate: '05 18'
            },
            {
              _id: '5bb7838c91d959001221857c',
              formName: 'Sinkhole Loss Coverage - FL',
              formNumber: 'TTIC 23 94',
              editionDate: '01 17'
            },
            {
              _id: '5bb7838c91d959001221857b',
              formName: 'Personal Property Replacement Cost',
              formNumber: 'HO 04 90',
              editionDate: '10 00'
            },
            {
              _id: '5bb7838c91d959001221857a',
              formName: 'Deductible Options',
              formNumber: 'TTIC HO3 DO',
              editionDate: '01 17'
            },
            {
              _id: '5bb7838c91d9590012218579',
              formName: 'Ordinance or Law Coverage',
              formNumber: 'TTIC HO3 OL',
              editionDate: '04 17'
            },
            {
              _id: '5bb7838c91d9590012218578',
              formName: 'Fungi, Wet or Dry Rot',
              formNumber: 'TTIC HO 03 33',
              editionDate: '10 16'
            },
            {
              _id: '5bb7838c91d9590012218577',
              formName: 'Premises Alarm or Fire Protection System',
              formNumber: 'HO 04 16',
              editionDate: '10 00'
            },
            {
              _id: '5bb7838c91d9590012218576',
              formName: 'Calendar Year Hurricane Deductible FL',
              formNumber: 'HO 03 51',
              editionDate: '05 05'
            },
            {
              _id: '5bb7838c91d9590012218575',
              formName: 'Invoice',
              formNumber: 'TTIC PD',
              editionDate: '01 16'
            }
          ],
          effectiveDate: '2018-12-04T05:00:00.000Z',
          property: {
            townhouseRowhouse: false,
            pool: false,
            poolSecured: true,
            divingBoard: false,
            trampoline: false,
            fireAlarm: true,
            burglarAlarm: true,
            sprinkler: 'B',
            gatedCommunity: false,
            _id: '5bb77c0b940ee70012e2cc50',
            windMitigation: {
              _id: '5bb77c0b940ee70012e2cc51',
              roofGeometry: 'Hip',
              floridaBuildingCodeWindSpeed: 140,
              secondaryWaterResistance: 'No',
              internalPressureDesign: 'Enclosed',
              roofCovering: 'Other',
              openingProtection: 'None',
              terrain: 'B',
              floridaBuildingCodeWindSpeedDesign: 140,
              roofDeckAttachment: 'Other',
              windBorneDebrisRegion: 'Yes',
              roofToWallConnection: 'Other'
            },
            floodZone: 'X',
            source: 'CasaClue',
            squareFeet: 3615,
            residenceType: 'SINGLE FAMILY',
            timezone: 'America/New_York',
            distanceToTidalWater: 12460.8,
            buildingCodeEffectivenessGrading: 2,
            familyUnits: '1-2',
            constructionType: 'SUPERIOR',
            distanceToFireStation: 0.96,
            id: '12000000000000019',
            yearBuilt: 2007,
            territory: '038-0',
            yearOfRoof: null,
            physicalAddress: {
              _id: '5bb77be4a0a55800133fae7b',
              city: 'JUPITER',
              latitude: 26.90447,
              zip: '00019',
              state: 'FL',
              address2: '',
              longitude: -80.11851,
              county: 'ALACHUA',
              address1: '1378 TEST ADDRESS'
            },
            distanceToFireHydrant: 91.14,
            protectionClass: 4
          },
          agentCode: 60000,
          product: 'HO3',
          updatedBy: {
            _id: '5bb78613c2793c0012ad5771',
            userId: 'auth0|59419e3a43e76f16f68c3349',
            userName: 'tticcsr'
          },
          createdAt: '2018-10-05T15:07:22.980Z',
          createdBy: {
            _id: '5bb77e2b91d95900122182ea',
            userId: 'auth0|SYSTEMUSER|0',
            userName: 'SYSTEMUSER'
          },
          policyNumber: '12-1011068-01',
          policyTerm: 1,
          policyVersion: 3,
          policyAccountCode: 10000,
          endDate: '2019-12-04T05:00:00.000Z',
          status: 'Pending Voluntary Cancellation',
          cancelDate: '2018-12-04T05:00:00.000Z',
          cancelReason: 'Sold',
          nextActionNeeded: 'Send Cancel Notice',
          nextActionDate: '2018-10-05T19:41:07.956Z',
          nextActionCancelType: 'Voluntary Cancellation',
          nextActionPolicyNumber: '12-1011068-01',
          nextStatusActionNeeded: null,
          nextStatusActionDate: null,
          __v: 0,
          updatedAt: '2018-10-05T15:41:07.921Z',
          policyID: '5bb78613c2793c0012ad5733'
        },
        summaryLedger: {
          _id: '5bb7843f7a9d7800110a03b3',
          createdBy: {
            userId: 'auth0|RUNNERCSR|0',
            userName: 'RUNNERCSR',
            _id: '5bb7843f7a9d7800110a03b5'
          },
          updatedBy: {
            userId: 'auth0|RUNNERCSR|0',
            userName: 'RUNNERCSR',
            _id: '5bb7843f7a9d7800110a03b4'
          },
          companyCode: 'TTIC',
          state: 'FL',
          product: 'HO3',
          policyNumber: '12-1011068-01',
          policyTerm: 1,
          policyAccountCode: 10000,
          effectiveDate: '2018-12-04T05:00:00.000Z',
          cashNeeded: '3055.00',
          cashReceived: '0.00',
          balance: '3055.00',
          initialPremium: 2860,
          currentPremium: 3055,
          sumOfEndorsements: 195,
          fullyEarnedFees: 27,
          equityDate: '2018-12-04T05:00:00.000Z',
          paymentPlanFees: 0,
          billToId: '5bb77c0b940ee70012e2cc12',
          billPlan: 'Annual',
          billToType: 'Policyholder',
          invoiceDate: '2018-10-20T04:00:00.000Z',
          invoiceDueDate: '2018-12-04T05:00:00.000Z',
          nonPaymentNoticeDate: '2018-12-14T05:00:00.000Z',
          nonPaymentNoticeDueDate: '2019-01-03T05:00:00.000Z',
          refundWriteOffDate: null,
          nextActionNeeded: 'Send Payment Invoice',
          nextActionDate: '2018-10-20T04:00:00.000Z',
          noticeAmountDue: '3055.00',
          __v: 0,
          invoice: {
            annual: {
              dueDate: '2018-12-04T05:00:00.000Z',
              amount: 3055,
              invoiceDate: '2018-10-20T04:00:00.000Z'
            }
          },
          status: {
            code: 0,
            displayText: 'No Payment Received'
          },
          updatedAt: '2018-10-05T15:33:19.873Z',
          createdAt: '2018-10-05T15:33:19.873Z'
        }
      }
    };
    const result = detailSelectors.getPolicyDetails(state);
    expect(result).toEqual({
      cancellation: {
        value: '12/04/2018',
        label: 'Voluntary Cancellation Date',
        showRescindCancel: true
      },
      floodZone: 'X',
      constructionType: 'SUPERIOR',
      policyID: '5bb78613c2793c0012ad5733',
      policyNumber: '12-1011068-01',
      sourceNumber: '12-5148842-01',
      territory: '038-0',
      county: 'ALACHUA',
      currentPremium: '$ 3,055',
      effectiveDate: '12/04/2018',
      appraisalURI: { label: 'PAS', value: 'http://www.acpafl.org/' },
      mapURI:
        'https://www.google.com/maps/search/?api=1&query=1378%20TEST%20ADDRESS%20%20JUPITER%2C%20FL%2000019',
      status: 'Pending Voluntary Cancellation / No Payment Received',
      details: { product: 'HO3 Homeowners' },
      policyHolder: {
        displayName: 'Batman Robin CSR006',
        phone: '(727) 123-1234'
      },
      mailingAddress: {
        address1: 'TEST MAILING ADDRESS1',
        address2: 'TEST MAILING ADDRESS2',
        csz: 'TAMPA, FL 33607'
      },
      propertyAddress: {
        address1: '1378 TEST ADDRESS',
        address2: '',
        csz: 'JUPITER, FL 00019'
      },
      nonPaymentNoticeDate: '',
      nonPaymentNoticeDueDate: '',
      sourcePath: '/quote/12-5148842-01/coverage'
    });
  });
});
