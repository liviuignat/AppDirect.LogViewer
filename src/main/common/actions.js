import * as actionTypes from './actionTypes';

export function toggleNavigationDrawer(isOpen) {
  return {
    type: actionTypes.OPEN_NAV_DRAWER,
    result: isOpen
  };
}
