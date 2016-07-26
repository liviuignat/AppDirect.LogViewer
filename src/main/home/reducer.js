import * as actionTypes from './actionTypes';

const initialState = {
  logs: [],
  query: {type: '', size: 20, page: 0},
  isDetailDialogOpen: false,
  selectedLog: {}
};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.LOAD_LOGS_SUCCESS:
      return {
        ...state,
        logs: action.result.logs,
        query: action.result.query
      };

    case actionTypes.TOGGLE_LOG_DETAIL_DIALOG:
      return {
        ...state,
        isDetailDialogOpen: action.result.isOpen,
        selectedLog: action.result.selectedLog
      };

    default:
      return state;
  }
}
