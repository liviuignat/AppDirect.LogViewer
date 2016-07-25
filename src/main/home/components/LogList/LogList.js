import React, {Component, PropTypes} from 'react';
import {Dialog, FlatButton, CodeEditor} from 'main/common/components';
import {formatDate} from 'helpers/formatters';

export default class LogList extends Component {
  static propTypes = {
    logs: PropTypes.array.isRequired,
    isDetailDialogOpen: PropTypes.bool.isRequired,
    selectedLog: PropTypes.object.isRequired,
    toggleLogDetailDialog: PropTypes.func.isRequired
  }

  onRowClick(log) {
    return () => {
      const {toggleLogDetailDialog} = this.props;
      toggleLogDetailDialog(true, log);
    };
  }

  renderLogRow(log, index) {
    const css = require('./LogList.scss');

    const created = log.created;
    const subscriptionStatus = log.contentJson && log.contentJson.resource.content.status;
    const subscriptionUUID = log.contentJson && log.contentJson.resource.uuid;
    const orderStatus = log.contentJson && log.contentJson.resource.content.order.status;

    return (
      <div key={index} className={css.LogRow} onTouchTap={::this.onRowClick(log)}>
        <span className={css.label}>
          {formatDate(created)}
        </span>:
        <span className={css.label}>
          {subscriptionStatus}
        </span>:
        <span className={css.label}>
          {orderStatus}
        </span>:
        <span className={css.label}>
          {subscriptionUUID}
        </span>
      </div>
    );
  }

  render() {
    const css = require('./LogList.scss');
    const {logs, isDetailDialogOpen, toggleLogDetailDialog, selectedLog} = this.props;

    return (
      <div className={css.LogList}>
        <div>
          {logs.map((log, index) => ::this.renderLogRow(log, index))}
        </div>

         <Dialog
          title="Log Detail"
          actions={[<FlatButton
            label="Close"
            secondary
            onTouchTap={() => toggleLogDetailDialog(false)}
          />]}
          modal
          open={isDetailDialogOpen}>
            <CodeEditor
              readOnly
              theme=""
              height={500}
              mode={{
                name: 'javascript',
                json: true
              }}
              value={selectedLog.prettyContent} />
        </Dialog>
      </div>
    );
  }
}
