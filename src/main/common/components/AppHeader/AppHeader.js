import React, {Component, PropTypes} from 'react';
import {IconButton, SvgIcon} from 'main/common/components';

export default class AppHeader extends Component {
  static propTypes = {
    toggleNavigationDrawer: PropTypes.func.isRequired,
  };

  openNavigationDrawer() {
    this.props.toggleNavigationDrawer(true);
  }

  render() {
    const css = require('./AppHeader.scss');

    return (
      <header className={css.AppHeader}>
        <div className={css.DrawerIcon}>
          <IconButton onClick={::this.openNavigationDrawer}>
            <SvgIcon color="black">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
            </SvgIcon>
          </IconButton>
        </div>

        <a className={css.AppLogoLink} src="http://www.simscale.com">
          AppDirect Logs
        </a>
      </header>
    );
  }
}
