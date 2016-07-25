import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';
import {reducer as form} from 'redux-form';
import {reducer as common} from 'main/common/reducer';
import {reducer as home} from 'main/home/reducer';

export default combineReducers({
  routing,
  form,
  reduxAsyncConnect,
  common,
  home,
});
