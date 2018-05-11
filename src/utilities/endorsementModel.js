import _ from "lodash";
import moment from "moment/moment";

export const setPercentageOfValue = (value, percent) => Math.ceil(value * (percent / 100));

export const generateModel = (data, policyObject, props) => {
  const policy = policyObject;
  const endorseDate = moment.tz(moment.utc(data.endorsementDateNew).format('YYYY-MM-DD'), props.zipcodeSettings.timezone).utc().format();
  const sinkholeAmount = _.get(policy, 'deductibles.sinkhole.amount') || 10;

  policy.transactionType = 'Endorsement';
  return {
    ...policy,
    policyID: policy._id,
    formListTransactionType: 'Endorsement',
    endorsementAmountNew: data.newEndorsementAmount || 0,
    endorsementDate: endorseDate,
    country: policy.policyHolderMailingAddress.country,
    pH1Id: _.get(policy, 'policyHolders[0]._id', ''),
    pH2Id: _.get(policy, 'policyHolders[1]._id', ''),
    pH1FirstName: data.pH1FirstName,
    pH1LastName: data.pH1LastName,
    pH1email: data.pH1email,
    pH1phone: data.pH1phone,
    pH1secondaryPhone: data.pH1secondaryPhone,
    pH2FirstName: data.pH2FirstName,
    pH2LastName: data.pH2LastName,
    pH2email: data.pH2email,
    pH2phone: data.pH2phone,
    pH2secondaryPhone: data.pH2secondaryPhone,
    floodZoneNew: data.floodZoneNew,
    squareFeetNew: data.squareFeetNew,
    residenceTypeNew: data.residenceTypeNew,
    distanceToTidalWaterNew: data.distanceToTidalWaterNew,
    propertyCityNew: data.propertyCityNew,
    propertyZipNew: data.propertyZipNew,
    propertyStateNew: data.propertyStateNew,
    propertyAddress1New: data.propertyAddress1New,
    propertyAddress2New: data.propertyAddress2New,
    protectionClassNew: data.protectionClassNew,
    stateNew: data.stateNew,
    cityNew: data.cityNew,
    zipNew: data.zipNew,
    address2New: data.address2New,
    address1New: data.address1New,
    roofGeometryNew: data.roofGeometryNew,
    floridaBuildingCodeWindSpeedNew: data.floridaBuildingCodeWindSpeedNew,
    secondaryWaterResistanceNew: data.secondaryWaterResistanceNew,
    internalPressureDesignNew: data.internalPressureDesignNew,
    roofCoveringNew: data.roofCoveringNew,
    openingProtectionNew: data.openingProtectionNew,
    terrainNew: data.terrainNew,
    floridaBuildingCodeWindSpeedDesignNew: data.floridaBuildingCodeWindSpeedDesignNew,
    roofDeckAttachmentNew: data.roofDeckAttachmentNew,
    windBorneDebrisRegionNew: data.windBorneDebrisRegionNew,
    roofToWallConnectionNew: data.roofToWallConnectionNew,
    electronicDeliveryNew: data.electronicDeliveryNew,
    distanceToFireStationNew: data.distanceToFireStationNew || 0,
    distanceToFireHydrantNew: data.distanceToFireHydrantNew || 0,
    yearOfRoofNew: data.yearOfRoofNew || null,
    fireAlarmNew: data.fireAlarmNew,
    burglarAlarmNew: data.burglarAlarmNew,
    buildingCodeEffectivenessGradingNew: data.buildingCodeEffectivenessGradingNew || null,
    yearBuiltNew: data.yearBuiltNew || null,
    townhouseRowhouseNew: data.townhouseRowhouseNew,
    familyUnitsNew: data.familyUnitsNew,
    constructionTypeNew: data.constructionTypeNew,
    sprinklerNew: data.sprinklerNew,
    // Premium Coverage Limits
    dwellingAmountNew: Math.round(data.dwellingAmountNew / 1000) * 1000,
    otherStructuresAmountNew: data.otherStructuresAmountNew,
    personalPropertyAmountNew: data.personalPropertyAmountNew,
    personalLiabilityNew: data.personalLiabilityNew,
    medicalPaymentsNew: data.medicalPaymentsNew,
    lossOfUseNew: data.lossOfUseNew,
    moldPropertyNew: data.moldPropertyNew,
    moldLiabilityNew: data.moldLiabilityNew,
    ordinanceOrLawNew: data.ordinanceOrLawNew,
    // Premium Coverage Options
    sinkholePerilCoverageNew: data.sinkholePerilCoverageNew,
    propertyIncidentalOccupanciesMainDwellingNew: data.propertyIncidentalOccupanciesMainDwellingNew,
    propertyIncidentalOccupanciesOtherStructuresNew: data.propertyIncidentalOccupanciesOtherStructuresNew,
    liabilityIncidentalOccupanciesNew: data.liabilityIncidentalOccupanciesNew,
    personalPropertyReplacementCostCoverageNew: data.personalPropertyReplacementCostCoverageNew,
    // Premium Deductibles
    allOtherPerilsNew: data.allOtherPerilsNew,
    hurricaneNew: data.hurricaneNew,
    calculatedHurricaneNew: data.calculatedHurricaneNew,
    sinkholeNew: data.sinkholePerilCoverageNew === 'true' ? sinkholeAmount : 0,
    // underwriting answers
    noPriorInsuranceNew: data.noPriorInsuranceNew,
    monthsOccupiedNew: data.monthsOccupiedNew,
    rentedNew: data.rentedNew
  };
};

export const convertToRateData = (changePolicyData, currentPremium) => {
  return {
    effectiveDate: changePolicyData.effectiveDate,
    policyNumber: changePolicyData.policyNumber,
    companyCode: changePolicyData.companyCode,
    state: changePolicyData.state,
    product: changePolicyData.product,
    property: {
      windMitigation: {
        roofGeometry: changePolicyData.roofGeometryNew,
        floridaBuildingCodeWindSpeed: changePolicyData.floridaBuildingCodeWindSpeedNew,
        secondaryWaterResistance: changePolicyData.secondaryWaterResistanceNew,
        internalPressureDesign: changePolicyData.internalPressureDesignNew,
        roofCovering: changePolicyData.roofCoveringNew,
        openingProtection: changePolicyData.openingProtectionNew,
        terrain: changePolicyData.terrainNew,
        floridaBuildingCodeWindSpeedDesign: changePolicyData.floridaBuildingCodeWindSpeedDesignNew,
        roofDeckAttachment: changePolicyData.roofDeckAttachmentNew,
        windBorneDebrisRegion: changePolicyData.windBorneDebrisRegionNew,
        roofToWallConnection: changePolicyData.roofToWallConnectionNew
      },
      territory: changePolicyData.property.territory,
      buildingCodeEffectivenessGrading: changePolicyData.buildingCodeEffectivenessGradingNew,
      familyUnits: changePolicyData.familyUnitsNew,
      fireAlarm: changePolicyData.fireAlarmNew,
      burglarAlarm: changePolicyData.burglarAlarmNew,
      constructionType: changePolicyData.constructionTypeNew,
      yearBuilt: changePolicyData.yearBuiltNew || null,
      sprinkler: changePolicyData.sprinklerNew,
      protectionClass: changePolicyData.protectionClassNew,
      townhouseRowhouse: changePolicyData.townhouseRowhouseNew
    },
    coverageLimits: {
      dwelling: {
        amount: changePolicyData.dwellingAmountNew
      },
      otherStructures: {
        amount: changePolicyData.otherStructuresAmountNew
      },
      personalProperty: {
        amount: changePolicyData.personalPropertyAmountNew
      },
      personalLiability: {
        amount: changePolicyData.personalLiabilityNew
      },
      medicalPayments: {
        amount: changePolicyData.medicalPaymentsNew
      },
      lossOfUse: {
        amount: changePolicyData.lossOfUseNew
      },
      moldProperty: {
        amount: changePolicyData.moldPropertyNew
      },
      moldLiability: {
        amount: changePolicyData.moldLiabilityNew
      },
      ordinanceOrLaw: {
        amount: changePolicyData.ordinanceOrLawNew
      }
    },
    coverageOptions: {
      sinkholePerilCoverage: {
        answer: changePolicyData.sinkholePerilCoverageNew
      },
      propertyIncidentalOccupanciesMainDwelling: {
        answer: changePolicyData.propertyIncidentalOccupanciesMainDwellingNew
      },
      propertyIncidentalOccupanciesOtherStructures: {
        answer: changePolicyData.propertyIncidentalOccupanciesOtherStructuresNew
      },
      liabilityIncidentalOccupancies: {
        answer: changePolicyData.liabilityIncidentalOccupanciesNew
      },
      personalPropertyReplacementCost: {
        answer: changePolicyData.personalPropertyReplacementCostCoverageNew
      }
    },
    deductibles: {
      allOtherPerils: {
        amount: changePolicyData.allOtherPerilsNew
      },
      hurricane: {
        amount: changePolicyData.hurricaneNew,
        calculatedAmount: setPercentageOfValue(changePolicyData.dwellingAmountNew, changePolicyData.hurricaneNew)
      },
      sinkhole: {
        amount: changePolicyData.sinkholeNew,
        calculatedAmount: setPercentageOfValue(changePolicyData.dwellingAmountNew, changePolicyData.sinkholeNew)
      }
    },
    underwritingAnswers: {
      rented: {
        answer: changePolicyData.rentedNew
      },
      monthsOccupied: {
        answer: changePolicyData.monthsOccupiedNew
      },
      noPriorInsuranceSurcharge: {
        answer: changePolicyData.noPriorInsuranceNew
      }
    },
    oldTotalPremium: changePolicyData.rating.totalPremium,
    oldCurrentPremium: currentPremium,
    endorsementDate: changePolicyData.endorsementDate
  };
};

export default {
  convertToRateData,
  generateModel,
  setPercentageOfValue,
}
