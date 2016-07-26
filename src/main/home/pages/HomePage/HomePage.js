import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-async-connect';
import {Paper} from 'main/common/components';
import {LogList} from 'main/home/components';
import {loadLogsAction, toggleLogDetailDialog} from 'main/home/actions';

@asyncConnect([{
  promise: ({store}) => {
    const {dispatch} = store;
    const promises = [
      dispatch(loadLogsAction())
    ];
    return Promise.all(promises);
  }
}])
@connect(
  ({home}) => ({
    logs: home.logs,
    isDetailDialogOpen: home.isDetailDialogOpen,
    selectedLog: home.selectedLog,
  }), {loadLogsAction, toggleLogDetailDialog})
export default class HomePage extends Component {
  static propTypes = {
    logs: PropTypes.array.isRequired,
    isDetailDialogOpen: PropTypes.bool.isRequired,
    selectedLog: PropTypes.object.isRequired,
    toggleLogDetailDialog: PropTypes.func.isRequired,
    loadLogsAction: PropTypes.func.isRequired
  }

  componentDidMount() {
    window.setInterval(() => this.props.loadLogsAction(), 5000);
  }

  render() {
    const css = require('./HomePage.scss');
    const {logs, selectedLog, isDetailDialogOpen} = this.props;

    return (
      <Paper className={css.HomePage}>
        <Helmet title="AppDirect - Logs" />

        <LogList
          logs={logs}
          isDetailDialogOpen={isDetailDialogOpen}
          selectedLog={selectedLog}
          toggleLogDetailDialog={this.props.toggleLogDetailDialog} />
      </Paper>
    );
  }
}
