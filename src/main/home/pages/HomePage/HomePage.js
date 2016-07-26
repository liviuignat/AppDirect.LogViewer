import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-async-connect';
import {initialize} from 'redux-form';
import {Paper} from 'main/common/components';
import {LogList} from 'main/home/components';
import LogSearchForm, {LOG_SEARCH_FORM} from 'main/home/components/LogSearchForm/LogSearchForm';
import {loadLogsAction, toggleLogDetailDialog, viewMoreLogsAction, changeSearchParamAction} from 'main/home/actions';

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
    query: home.query,
    isDetailDialogOpen: home.isDetailDialogOpen,
    selectedLog: home.selectedLog,
  }), {initialize, loadLogsAction, toggleLogDetailDialog, viewMoreLogsAction, changeSearchParamAction})
export default class HomePage extends Component {
  static propTypes = {
    logs: PropTypes.array.isRequired,
    initialize: PropTypes.func.isRequired,
    query: PropTypes.object.isRequired,
    isDetailDialogOpen: PropTypes.bool.isRequired,
    selectedLog: PropTypes.object.isRequired,
    toggleLogDetailDialog: PropTypes.func.isRequired,
    loadLogsAction: PropTypes.func.isRequired,
    viewMoreLogsAction: PropTypes.func.isRequired,
    changeSearchParamAction: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.props.initialize(LOG_SEARCH_FORM, {type: this.props.query.type});
  }

  componentDidMount() {
    window.setInterval(() => {
      this.loadLogs();
    }, 5000);
  }

  onSearchSubmit({type}) {
    this.props.changeSearchParamAction(type);
    this.loadLogs({type});
  }

  loadLogs({type = '', size = 0} = {}) {
    this.props.loadLogsAction({size: size || this.props.query.size, type: type || this.props.query.type});
  }

  render() {
    const css = require('./HomePage.scss');
    const {logs, selectedLog, isDetailDialogOpen, query} = this.props;
    return (
      <Paper className={css.HomePage}>
        <Helmet title="AppDirect - Notifications" />
        <LogSearchForm
          onSubmit={::this.onSearchSubmit}
        />
        <br/>
        <LogList
          logs={logs}
          query={query}
          isDetailDialogOpen={isDetailDialogOpen}
          selectedLog={selectedLog}
          toggleLogDetailDialog={this.props.toggleLogDetailDialog}
          loadLogsAction={::this.loadLogs}
          viewMoreLogsAction={this.props.viewMoreLogsAction}/>
      </Paper>
    );
  }
}
