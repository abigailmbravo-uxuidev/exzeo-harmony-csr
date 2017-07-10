import configureStore from 'redux-mock-store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as types from './actionTypes';
import * as questionsActions from './questionsActions';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Questions Actions', () => {
  it('should call getQuestions', () => {
    const initialState = {};
    const store = mockStore(initialState);


    const stateObj = [{
      type: types.GET_QUESTIONS,
      questions: []
    }];

    store.dispatch(questionsActions.getQuestions([]));
    expect(store.getActions()).toEqual(stateObj);
  });

  it('should call start getUIQuestions', () => {
    const mockAdapter = new MockAdapter(axios);
    const step = 'askToCustomizeDefaultQuote';

    const question = { _id: '58c300a9711411e6b4d3b615',
      name: 'sprinkler',
      question: 'Sprinkler',
      answerType: 'radio',
      defaultValueLocation: 'property.sprinkler',
      answers: [{ answer: 'N' }, { answer: 'A' }, { answer: 'B' }],
      models: ['quote'],
      steps: ['askToCustomizeDefaultQuote'],
      group: ['discounts'],
      order: 53 };

    const axiosOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/questions`,
      data: {
        step
      }
    };

    mockAdapter.onPost(axiosOptions.url, axiosOptions.data).reply(200, {
      data: [question]
    });

    const initialState = {};
    const store = mockStore(initialState);

    return questionsActions.getUIQuestions(step)(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].type).toEqual(types.GET_QUESTIONS);
      });
  });


  it('should call start getUIQuestions with error', () => {
    const mockAdapter = new MockAdapter(axios);
    const step = 'askToCustomizeDefaultQuote';

    const question = { _id: '58c300a9711411e6b4d3b615',
      name: 'sprinkler',
      question: 'Sprinkler',
      answerType: 'radio',
      defaultValueLocation: 'property.sprinkler',
      answers: [{ answer: 'N' }, { answer: 'A' }, { answer: 'B' }],
      models: ['quote'],
      steps: ['askToCustomizeDefaultQuote'],
      group: ['discounts'],
      order: 53 };

    const axiosOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/questions`,
      data: {
        step
      }
    };

    mockAdapter.onPost(axiosOptions.url, axiosOptions.data).reply(400, {
      data: [question]
    });

    const initialState = {};
    const store = mockStore(initialState);

    return questionsActions.getUIQuestions(step)(store.dispatch)
      .then(() => {
        expect(store.getActions()[0].payload[0].type).toEqual(types.APP_ERROR);
      });
  });
});
