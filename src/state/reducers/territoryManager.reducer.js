import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function territoryManagerReducer(state = initialState.territoryManagers, action) {
  switch (action.type) {
    case types.SET_TERRITORY_MANAGERS:
      return setTerritoryManagers(state, action);
    default:
      return state;
  }
}

function setTerritoryManagers(state, action) {
  return {
    ...state,
    territoryManagers: action.territoryManagers
  };
}
