import * as actionTypes from './actionTypes';

const initialState = {
  isNavDrawerOpened: false
};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.OPEN_NAV_DRAWER:
      return {
        ...state,
        isNavDrawerOpened: action.result
      };

    default:
      return state;
  }
}
