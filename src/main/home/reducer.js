import * as actionTypes from './actionTypes';

const initialState = {
  logs: [],
  query: {type: '', size: 30, page: 0},
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

    case actionTypes.INCREASE_PAGE_SIZE:
      return {
        ...state,
        query: {
          ...state.query,
          size: action.result.pageSize
        }
      };

    case actionTypes.CHANGE_SEARCH_TYPE:
      return {
        ...state,
        query: {
          ...state.query,
          type: action.result.type
        }
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
