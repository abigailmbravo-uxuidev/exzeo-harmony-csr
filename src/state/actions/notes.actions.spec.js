import configureStore from 'redux-mock-store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as types from './actionTypes';
import * as serviceActions from './notes.actions';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Service Actions', () => {
  const baseProps = {
    endorsementDate: '2017-02-02',
    zipcodeSettings: { timezone: 'America/New_York' },
    policy: {
      policyHolders: [{}, {}],
      property: { windMitigation: {}, physicalAddress: {} },
      policyHolderMailingAddress: {},
      coverageLimits: {
        dwelling: {},
        otherStructures: {},
        personalProperty: {},
        lossOfUse: {},
        medicalPayments: {},
        moldProperty: {},
        personalLiability: {},
        moldLiability: {},
        ordinanceOrLaw: {}
      },
      deductibles: {
        allOtherPerils: {},
        hurricane: {},
        sinkhole: {}

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
        totalPremium: '1',
        worksheet: {
          elements: {
            windMitigationFactors: {

            }
          }
        }
      }
    },
    summaryLedger: { currentPremium: '1' }
  };

  it('should call start getNotes', () => {
    const mockAdapter = new MockAdapter(axios);
    const notes = [
      {
        noteType: 'test',
        noteContent: 'test',
        contactType: 'Agent',
        createdAt: new Date().getTime(),
        attachments: [],
        createdBy: {},
        updatedBy: {}
      }
    ];
    const axiosNotesOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/svc`,
      data: {
        service: 'transaction-logs',
        method: 'GET',
        path: 'history?number=test'
      }
    };

    const axiosDocsOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/svc`,
      data: {
        service: 'file-index',
        method: 'GET',
        path: 'v1/fileindex/test'
      }
    };

    mockAdapter
      .onPost(axiosNotesOptions.url).reply(200, { result: notes })
      .onPost(axiosDocsOptions.url).reply(200, { result: notes });

    const initialState = {};
    const store = mockStore(initialState);

    return serviceActions.getNotes('test-01', 'test-01')(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].type).toEqual(types.SERVICE_REQUEST);
      });
  });
});
