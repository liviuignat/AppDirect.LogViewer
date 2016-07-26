import React, {Component, PropTypes} from 'react';
import {LeftNav} from 'material-ui';
import {Link} from 'react-router';
import {Divider, MenuItem, Card, CardMedia, CardTitle} from 'main/common/components';

export default class AppNavigationDrawer extends Component {
  static propTypes = {
    isNavDrawerOpened: PropTypes.bool.isRequired,
    pushState: PropTypes.func.isRequired,
    toggleNavigationDrawer: PropTypes.func.isRequired
  };

  close() {
    const {toggleNavigationDrawer} = this.props;
    toggleNavigationDrawer(false);
  }

  render() {
    const css = require('./AppNavigationDrawer.scss');
    const {isNavDrawerOpened} = this.props;

    return (
      <LeftNav
        className={css.AppNavigationDrawer}
        width={220}
        docked={false}
        open={isNavDrawerOpened}
        onRequestChange={open => this.props.toggleNavigationDrawer(open)}>
        <div style={{cursor: 'pointer'}}>
          <Card>
            <CardMedia
              overlay={<CardTitle subtitle="Guest"/>}>
              <img src="https://pbs.twimg.com/profile_images/3430349373/c10e337e41565eff02758d7fa3a85946_400x400.png" />
            </CardMedia>
          </Card>
        </div>

        <Divider />

        <MenuItem>
          <Link className={css.AppNavigationDrawer_link} to="/log-viewer">
            Logs
          </Link>
        </MenuItem>
      </LeftNav>
    );
  }
}
