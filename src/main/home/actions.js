import * as actionTypes from './actionTypes';

export function loadLogsAction({type = 'vfitaly', size = 30, page = 0} = {}) {
  const url = `/logs/search/type?name=${type}&size=${size}&page=${page}`;
  return {
    types: [
      actionTypes.LOAD_LOGS,
      actionTypes.LOAD_LOGS_SUCCESS,
      actionTypes.LOAD_LOGS_FAIL
    ],
    promise: client => client.get(url).then(response => {
      const logs = response._embedded.logs.map(log => {
        return {
          ...log,
          contentJson: tryParseJson(log.content)
        };
      });

      return {
        logs,
        query: {
          type,
          size,
          page
        }
      };
    })
  };
}

export function toggleLogDetailDialog(isOpen, selectedLog = {}) {
  return {
    type: actionTypes.TOGGLE_LOG_DETAIL_DIALOG,
    result: {
      isOpen,
      selectedLog: {
        ...selectedLog,
        prettyContent: printJson(selectedLog.contentJson)
      }
    }
  };
}

export function viewMoreLogsAction(pageSize) {
  return {
    type: actionTypes.INCREASE_PAGE_SIZE,
    result: {
      pageSize
    }
  };
}

function tryParseJson(json) {
  try {
    return JSON.parse(json);
  } catch (ex) {
    return null;
  }
}

function printJson(json) {
  return JSON.stringify(json, null, 2);
}
