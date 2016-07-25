import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {push as pushState} from 'react-router-redux';
import config from 'config';
import {AppHeader, AppFooter, AppNavigationDrawer, LinearProgress} from 'main/common/components';
import {toggleNavigationDrawer} from 'main/common/actions';

@connect(
  ({reduxAsyncConnect, common}) => ({
    reduxAsyncConnect,
    isNavDrawerOpened: common.isNavDrawerOpened,
  }),
  {pushState, toggleNavigationDrawer}
)
export default class AppContainer extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    isNavDrawerOpened: PropTypes.bool.isRequired,
    reduxAsyncConnect: PropTypes.object.isRequired,
    pushState: PropTypes.func.isRequired,
    toggleNavigationDrawer: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    const css = require('./AppContainer.scss');
    const {children, isNavDrawerOpened, reduxAsyncConnect} = this.props;
    const isRouterLoadingActions = reduxAsyncConnect && !reduxAsyncConnect.loaded;

    return (
      <div className={css.AppContainer}>
        <Helmet {...config.app}/>

        {<LinearProgress
            style={{
              position: 'absolute',
              top: '0',
              zIndex: '99999',
              visibility: isRouterLoadingActions ? 'visible' : 'hidden'
            }}
            mode="indeterminate"/>}

        <AppHeader
          toggleNavigationDrawer={this.props.toggleNavigationDrawer}/>

        <AppNavigationDrawer
          isNavDrawerOpened={isNavDrawerOpened}
          toggleNavigationDrawer={this.props.toggleNavigationDrawer}
          pushState={this.props.pushState} />

        <div>
          {children}
        </div>

        <AppFooter />
      </div>
    );
  }
}
