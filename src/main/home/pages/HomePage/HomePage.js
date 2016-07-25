import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-async-connect';
import {initHomePageAction} from 'main/home/actions';
import {Paper} from 'main/common/components';

@asyncConnect([{
  promise: ({store}) => {
    const {dispatch} = store;
    const promises = [
      dispatch(initHomePageAction())
    ];
    return Promise.all(promises);
  }
}])
@connect(
  ({home}) => ({
    welcomeMessage: home.welcomeMessage,
  }), {})
export default class HomePage extends Component {
  static propTypes = {
    welcomeMessage: PropTypes.string.isRequired
  }

  render() {
    const css = require('./HomePage.scss');
    const {welcomeMessage} = this.props;

    return (
      <Paper className={css.HomePage}>
        <Helmet title="AppDirect - Logs" />

        {welcomeMessage}
      </Paper>
    );
  }
}
