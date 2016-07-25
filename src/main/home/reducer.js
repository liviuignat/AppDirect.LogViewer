import * as actionTypes from './actionTypes';

const initialState = {
  welcomeMessage: ''
};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.INIT_HOME_MESSAGE:
      return {
        ...state,
        welcomeMessage: 'Hello World'
      };

    default:
      return state;
  }
}
