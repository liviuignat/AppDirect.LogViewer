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
              <img src="https://d1qb2nb5cznatu.cloudfront.net/startups/i/39904-dc51fcb38683e0e2e4f323682a817992-medium_jpg.jpg?buster=1428521947" />
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
